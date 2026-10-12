import type { ConsentDocument } from "@prisma/client";

export const LEGAL_VERSIONS: Record<ConsentDocument, string> = {
  TERMS: "2026-10-03",
  PRIVACY: "2026-10-03",
};

export const LEGAL_DOCUMENTS: ReadonlyArray<{
  document: ConsentDocument;
  title: string;
  href: string;
}> = [
  { document: "TERMS", title: "Terms of Service", href: "/legal/terms" },
  { document: "PRIVACY", title: "Privacy Policy", href: "/legal/privacy" },
];

export function isCurrentLegalVersion(
  document: ConsentDocument,
  version: string,
): boolean {
  return LEGAL_VERSIONS[document] === version;
}
