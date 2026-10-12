import { randomBytes } from "crypto";
export type IssuedReport = { id: string; reportNo: string };

type Entry = { key: string; report?: IssuedReport };

const MAX_ENTRIES = 20;
const entries = new Map<string, Entry>();

function newKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  const bytes = randomBytes(16);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function getReportEntry(fingerprint: string): Entry {
  let entry = entries.get(fingerprint);
  if (!entry) {
    entry = { key: newKey() };
    entries.set(fingerprint, entry);
    if (entries.size > MAX_ENTRIES) {
      const oldest = entries.keys().next().value;
      if (oldest !== undefined) entries.delete(oldest);
    }
  }
  return entry;
}

export function rememberIssuedReport(
  fingerprint: string,
  report: IssuedReport,
): void {
  getReportEntry(fingerprint).report = report;
}
