"use server";

import { redirect } from "next/navigation";
import { auth, signOut } from "@/server/auth";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";
import {
  ALLOWED_REDIRECT_PREFIXES,
  safeCallbackUrl,
} from "@/lib/safe-redirect";
import { apiError } from "@/lib/utils";
import {
  currentConsentRows,
  getConsentEvidence,
  getPendingConsents,
} from "@/server/consent";

/** Records acceptance of every pending document, then continues. */
export async function acceptLegalUpdate(next?: string) {
  const session = await auth();
  if (!session?.user?.id) return apiError("Please sign in again.");
  const userId = session.user.id;

  const pending = await getPendingConsents(userId);
  if (pending.length > 0) {
    const evidence = await getConsentEvidence();
    const rows = currentConsentRows(evidence).filter((r) =>
      pending.includes(r.document),
    );
    await db.consentRecord.createMany({
      data: rows.map((r) => ({ ...r, userId })),
    });
  }

  const fallback =
    session.user.role === "ADMIN" ? ROUTES.admin : ROUTES.dashboard;
  redirect(
    safeCallbackUrl(next, fallback, [...ALLOWED_REDIRECT_PREFIXES, "/admin"]),
  );
}

/** Declining means the user cannot continue: sign out. */
export async function declineLegalUpdate() {
  await signOut({ redirectTo: ROUTES.login });
}
