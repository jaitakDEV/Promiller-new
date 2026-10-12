import type { Metadata } from "next";
import { LEGAL_VERSIONS } from "@/config/legal";
import { LegalDocumentView } from "@/features/legal/components/legal-document";
import { PRIVACY_POLICY } from "@/features/legal/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How your personal data is collected, used and protected.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentView
      content={PRIVACY_POLICY}
      version={LEGAL_VERSIONS.PRIVACY}
      other={{ title: "Terms of Service", href: "/legal/terms" }}
    />
  );
}
