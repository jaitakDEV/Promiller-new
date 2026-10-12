import type { Metadata } from "next";
import { LEGAL_VERSIONS } from "@/config/legal";
import { LegalDocumentView } from "@/features/legal/components/legal-document";
import { TERMS } from "@/features/legal/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using the platform and its calculators.",
};

export default function TermsPage() {
  return (
    <LegalDocumentView
      content={TERMS}
      version={LEGAL_VERSIONS.TERMS}
      other={{ title: "Privacy Policy", href: "/legal/privacy" }}
    />
  );
}
