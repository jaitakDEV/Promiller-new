export const IST_TIME_ZONE = "Asia/Kolkata";

function istParts(date: Date): Record<string, string> {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: IST_TIME_ZONE,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const out: Record<string, string> = {};
  for (const p of parts) out[p.type] = p.value;
  return out;
}

function assertDate(date: Date): void {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new RangeError("Invalid date");
  }
}

/** 02 Oct 2026, 14:35 IST */
export function formatIst(date: Date): string {
  assertDate(date);
  const p = istParts(date);
  return `${p.day} ${p.month} ${p.year}, ${p.hour}:${p.minute} IST`;
}

/** 02 Oct 2026 */
export function formatIstDate(date: Date): string {
  assertDate(date);
  const p = istParts(date);
  return `${p.day} ${p.month} ${p.year}`;
}

/** Calendar year in IST; used for report numbers (ATC-2026-000123). */
export function getIstYear(date: Date): number {
  assertDate(date);
  return Number(istParts(date).year);
}

/** Indian digit grouping: 125000 -> 1,25,000 */
export function formatIndianNumber(
  value: number,
  maximumFractionDigits = 2,
): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits }).format(
    value,
  );
}

/** Rupee amount with Indian grouping: 125000 -> ₹1,25,000 */
export function formatInr(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}
