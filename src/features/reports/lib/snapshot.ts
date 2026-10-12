import type { CalculatorType, Prisma } from "@prisma/client";
import type { ReportIssuedTo } from "@/types";
import {
  calculateAttaCost,
  fmtINR,
  type AttaCostInput,
  type AttaCostResult,
} from "@/features/calculators/atta-cost/lib/calculator";
import { ATTA_COST_VERSION } from "@/features/calculators/atta-cost/lib/version";

const clean = (value: string | null | undefined): string | null => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

export function toJsonObject(value: unknown): Prisma.InputJsonObject {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonObject;
}

export function buildIssuedTo(
  user: { name: string | null },
  company: {
    companyName: string | null;
    city: string | null;
    state: string | null;
    gstin: string | null;
  } | null,
): ReportIssuedTo {
  return {
    name: clean(user.name),
    companyName: clean(company?.companyName),
    city: clean(company?.city),
    state: clean(company?.state),
    gstin: clean(company?.gstin)?.toUpperCase() ?? null,
  };
}

export async function loadIssuedTo(
  client: Prisma.TransactionClient,
  userId: string,
): Promise<ReportIssuedTo> {
  const user = await client.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });
  if (!user) throw new Error("User not found");

  const company = await client.companyProfile.findUnique({
    where: { userId },
    select: { companyName: true, city: true, state: true, gstin: true },
  });
  return buildIssuedTo(user, company);
}

export function buildAttaCostHeadline(result: AttaCostResult): string {
  const mill = `Mill price ${fmtINR(result.costing.millSalePricePerKg)}/kg`;
  return result.recommended
    ? `${mill} · ${result.recommended.label} MRP ${fmtINR(result.recommended.marketPrice)}`
    : mill;
}

export type AttaCostSnapshot = {
  calculatorType: CalculatorType;
  calculatorVersion: string;
  inputs: Prisma.InputJsonObject;
  results: Prisma.InputJsonObject;
  headline: string;
};

export function buildAttaCostSnapshot(input: AttaCostInput): AttaCostSnapshot {
  const result = calculateAttaCost(input);
  return {
    calculatorType: "ATTA_PRICING",
    calculatorVersion: ATTA_COST_VERSION,
    inputs: toJsonObject(input),
    results: toJsonObject({
      costing: result.costing,
      packRows: result.packRows,
      recommendedKey: input.packSettings.selected,
    }),
    headline: buildAttaCostHeadline(result),
  };
}
