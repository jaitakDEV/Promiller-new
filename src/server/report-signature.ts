import { createHmac, timingSafeEqual } from "node:crypto";
import type { CalculatorType } from "@prisma/client";
import { env } from "@/env";

/**
 * Report signatures (HMAC-SHA256).
 *
 * Signed: report number, calculator type and version, inputs, results, issuer
 * snapshot and issue time. NOT signed: report name, note and language (the
 * user can change those later without invalidating the report).
 *
 * Key rotation: each report stores the signatureVersion it was signed with.
 * To rotate, add REPORT_SIGNING_SECRET_V2 to env.ts, add `2: ...` below and
 * raise CURRENT_SIGNATURE_VERSION. Old reports keep verifying with their own key.
 */
export const CURRENT_SIGNATURE_VERSION = 1;

const SIGNING_KEYS: Record<number, string | undefined> = {
  1: env.REPORT_SIGNING_SECRET,
};

export type SignedReportContent = {
  reportNo: string;
  calculatorType: CalculatorType;
  calculatorVersion: string;
  inputs: unknown;
  results: unknown;
  issuedTo: unknown;
  /** ISO 8601 UTC, exactly the createdAt stored on the report. */
  issuedAt: string;
};

// ---- Canonical JSON: sorted keys, same text for the same data ----

function normalize(value: unknown): unknown {
  if (value === null) return null;
  if (value instanceof Date) {
    throw new Error("Pass dates as ISO strings when signing");
  }
  switch (typeof value) {
    case "string":
    case "boolean":
      return value;
    case "number":
      if (!Number.isFinite(value)) {
        throw new Error("Cannot sign a number that is not finite");
      }
      return value;
    case "object": {
      if (Array.isArray(value)) return value.map(normalize);
      const source = value as Record<string, unknown>;
      const out: Record<string, unknown> = {};
      for (const key of Object.keys(source).sort()) {
        if (source[key] !== undefined) out[key] = normalize(source[key]);
      }
      return out;
    }
    default:
      throw new Error(`Cannot sign a value of type ${typeof value}`);
  }
}

export function canonicalJson(value: unknown): string {
  return JSON.stringify(normalize(value));
}

// ---- Sign and verify ----

function computeSignature(
  content: SignedReportContent,
  version: number,
  key: string,
): string {
  // The label stops this key from ever producing a valid signature for other data.
  const message = `report-signature:v${version}\n${canonicalJson(content)}`;
  return createHmac("sha256", key).update(message, "utf8").digest("hex");
}

export function signReport(content: SignedReportContent): {
  signature: string;
  signatureVersion: number;
} {
  const key = SIGNING_KEYS[CURRENT_SIGNATURE_VERSION];
  if (!key) throw new Error("Report signing key is not configured");
  return {
    signature: computeSignature(content, CURRENT_SIGNATURE_VERSION, key),
    signatureVersion: CURRENT_SIGNATURE_VERSION,
  };
}

/** True only when the content matches the stored signature. Never throws. */
export function verifyReportSignature(
  content: SignedReportContent,
  signature: string,
  signatureVersion: number,
): boolean {
  try {
    const key = SIGNING_KEYS[signatureVersion];
    if (!key || !/^[0-9a-f]{64}$/i.test(signature)) return false;

    const expected = Buffer.from(
      computeSignature(content, signatureVersion, key),
      "hex",
    );
    const given = Buffer.from(signature, "hex");
    return given.length === expected.length && timingSafeEqual(given, expected);
  } catch {
    return false;
  }
}

/** First 16 hex characters grouped 4-4-4-4, printed on the PDF: A1B2-C3D4-E5F6-0718 */
export function signatureFingerprint(signature: string): string {
  return signature.slice(0, 16).toUpperCase().match(/.{4}/g)?.join("-") ?? "";
}

export function toSignedContent(report: {
  reportNo: string;
  calculatorType: CalculatorType;
  calculatorVersion: string;
  inputs: unknown;
  results: unknown;
  issuedTo: unknown;
  createdAt: Date;
}): SignedReportContent {
  return {
    reportNo: report.reportNo,
    calculatorType: report.calculatorType,
    calculatorVersion: report.calculatorVersion,
    inputs: report.inputs,
    results: report.results,
    issuedTo: report.issuedTo,
    issuedAt: report.createdAt.toISOString(),
  };
}
