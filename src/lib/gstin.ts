const GSTIN_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** GST state / UT codes: 01-38, 97 (other territory), 99 (centre jurisdiction). */
export const GSTIN_STATE_CODES: ReadonlySet<string> = new Set([
  ...Array.from({ length: 38 }, (_, i) => String(i + 1).padStart(2, "0")),
  "97",
  "99",
]);

export type GstinResult =
  | { ok: true; gstin: string }
  | { ok: false; reason: "format" | "state" | "checksum" };

export function normalizeGstin(input: string): string {
  return input.replace(/\s+/g, "").toUpperCase();
}

/** Mod-36 check character over the first 14 characters. */
export function gstinCheckChar(first14: string): string {
  let sum = 0;
  for (let i = 0; i < first14.length; i++) {
    const value = CHARSET.indexOf(first14[i]);
    const product = value * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(product / 36) + (product % 36);
  }
  return CHARSET[(36 - (sum % 36)) % 36];
}

export function validateGstin(input: string): GstinResult {
  if (typeof input !== "string") return { ok: false, reason: "format" };
  const gstin = normalizeGstin(input);
  if (!GSTIN_PATTERN.test(gstin)) return { ok: false, reason: "format" };
  if (!GSTIN_STATE_CODES.has(gstin.slice(0, 2)))
    return { ok: false, reason: "state" };
  if (gstinCheckChar(gstin.slice(0, 14)) !== gstin[14]) {
    return { ok: false, reason: "checksum" };
  }
  return { ok: true, gstin };
}

export function isValidGstin(input: string): boolean {
  return validateGstin(input).ok;
}
