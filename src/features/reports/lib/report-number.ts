import type { Prisma } from "@prisma/client";
import { CALCULATORS, type CalculatorConfig } from "@/config/calculators";
import { getIstYear } from "@/lib/datetime";

export type ReportPrefix = CalculatorConfig["reportPrefix"];

const SEQUENCE_DIGITS = 6;

// Built from the registry, so a new calculator prefix is accepted automatically.
const REPORT_NO_PATTERN = new RegExp(
  `^(${CALCULATORS.map((c) => c.reportPrefix).join("|")})-(\\d{4})-(\\d{${SEQUENCE_DIGITS},})$`,
);

/** ATC-2026-000123 */
export function formatReportNumber(
  prefix: ReportPrefix,
  year: number,
  sequence: number,
): string {
  return `${prefix}-${year}-${String(sequence).padStart(SEQUENCE_DIGITS, "0")}`;
}

/** Splits a report number, or returns null when it is not a valid one. */
export function parseReportNumber(
  value: string,
): { prefix: ReportPrefix; year: number; sequence: number } | null {
  const match = REPORT_NO_PATTERN.exec(value.trim().toUpperCase());
  if (!match) return null;
  return {
    prefix: match[1] as ReportPrefix,
    year: Number(match[2]),
    sequence: Number(match[3]),
  };
}

/**
 * Takes the next number for this prefix and year.
 *
 * Call it INSIDE the transaction that inserts the report, and as the LAST step
 * before the insert (the counter row stays locked until the transaction ends,
 * so a short gap between allocating and committing keeps other reports moving).
 *
 * - One atomic SQL statement: two concurrent reports can never get the same number.
 * - The increment belongs to the transaction: if the report fails and rolls
 *   back, the counter goes back too, so no number is skipped.
 * - The year is the IST calendar year of `issuedAt`.
 */
export async function allocateReportNumber(
  tx: Prisma.TransactionClient,
  prefix: ReportPrefix,
  issuedAt: Date = new Date(),
): Promise<string> {
  const year = getIstYear(issuedAt);

  const rows = await tx.$queryRaw<{ lastValue: number }[]>`
    INSERT INTO "report_counters" ("prefix", "year", "lastValue")
    VALUES (${prefix}, ${year}::integer, 1)
    ON CONFLICT ("prefix", "year")
    DO UPDATE SET "lastValue" = "report_counters"."lastValue" + 1
    RETURNING "lastValue"
  `;

  const sequence = rows[0]?.lastValue;
  if (typeof sequence !== "number") {
    throw new Error("Could not allocate a report number");
  }
  return formatReportNumber(prefix, year, sequence);
}
