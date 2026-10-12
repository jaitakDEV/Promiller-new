import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { ROUTES } from "@/config/app";
import { LEGAL_DOCUMENTS, LEGAL_VERSIONS } from "@/config/legal";
import { getPendingConsents } from "@/server/consent";
import {
  ALLOWED_REDIRECT_PREFIXES,
  safeCallbackUrl,
} from "@/lib/safe-redirect";
import { ReConsentForm } from "@/features/legal/components/re-consent-form";

export const metadata: Metadata = {
  title: "Updated terms",
  robots: { index: false },
};

export default async function ConsentPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.login);

  const { next } = await searchParams;
  const pending = await getPendingConsents(session.user.id);

  // Nothing to accept: continue to where the user was going.
  if (pending.length === 0) {
    const fallback =
      session.user.role === "ADMIN" ? ROUTES.admin : ROUTES.dashboard;
    redirect(
      safeCallbackUrl(next, fallback, [...ALLOWED_REDIRECT_PREFIXES, "/admin"]),
    );
  }

  const documents = LEGAL_DOCUMENTS.filter((d) =>
    pending.includes(d.document),
  ).map((d) => ({
    document: d.document,
    title: d.title,
    href: d.href,
    version: LEGAL_VERSIONS[d.document],
  }));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F9FE",
        padding: "3rem 1rem",
      }}
    >
      <ReConsentForm documents={documents} next={next} />
    </div>
  );
}
