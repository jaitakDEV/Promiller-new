import { formatIstDate } from "@/lib/datetime";

export const REPORT_TITLE_MAX = 120;
export const REPORT_NOTE_MAX = 500;

// Invisible or direction-changing characters can make text look different from what it is.
const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;
const ANY_CONTROL = /[\u0000-\u001F\u007F]+/g;
const CONTROL_EXCEPT_NEWLINE =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

// Counts whole characters (not UTF-16 halves), so emoji and Hindi are never cut in the middle.
const cut = (value: string, max: number) =>
  Array.from(value).slice(0, max).join("");

/** One line, no control or invisible characters. Empty becomes null. */
export function cleanTitle(value: string | null | undefined): string | null {
  if (!value) return null;
  const text = value
    .replace(INVISIBLE, "")
    .replace(ANY_CONTROL, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? cut(text, REPORT_TITLE_MAX) : null;
}

/** Plain text that keeps line breaks (at most one blank line in a row). */
export function cleanNote(value: string | null | undefined): string | null {
  if (!value) return null;
  const text = value
    .replace(INVISIBLE, "")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_EXCEPT_NEWLINE, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text ? cut(text, REPORT_NOTE_MAX) : null;
}

/** "Atta Pricing — 07 Oct 2026" */
export function defaultReportTitle(
  calculatorName: string,
  issuedAt: Date,
): string {
  return `${calculatorName.replace(/ Calculator$/i, "")} — ${formatIstDate(issuedAt)}`;
}
