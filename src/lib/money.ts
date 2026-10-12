import Decimal from "decimal.js";

/**
 * Rounds half-up (a value of exactly .5 goes away from zero) to `decimals`
 * places without binary floating point surprises (1.005 -> 1.01, 2.675 -> 2.68).
 */
export function roundTo(value: number, decimals: number): number {
  if (!Number.isFinite(value)) return 0;
  const rounded = new Decimal(value)
    .toDecimalPlaces(decimals, Decimal.ROUND_HALF_UP)
    .toNumber();
  return rounded === 0 ? 0 : rounded; // never return -0
}

/** Rupees to paise (2 decimals). */
export function roundMoney(value: number): number {
  return roundTo(value, 2);
}

/** Percentages shown in reports use 2 decimals. */
export function roundPercent(value: number): number {
  return roundTo(value, 2);
}
