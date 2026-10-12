import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/app";

export class AdminAuthError extends Error {}

/**
 * Confirms against the database (not just the session token) that the caller
 * is an active admin. A demoted or deactivated admin loses access immediately.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new AdminAuthError("Unauthorized");

  const admin = await db.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true, isActive: true },
  });
  if (!admin || admin.role !== "ADMIN" || !admin.isActive) {
    throw new AdminAuthError("Unauthorized");
  }
  return admin;
}

/** Records who did what to whom. Ids only: no names, emails or phone numbers. */
export function logAdminAction(
  actorId: string,
  action: string,
  targetId: string,
) {
  console.info(
    "[ADMIN_ACTION]",
    JSON.stringify({ at: new Date().toISOString(), actorId, action, targetId }),
  );
}

/**
 * For server-rendered admin pages: same check as requireAdmin(), but sends
 * the visitor away instead of throwing.
 */
export async function requireAdminPage() {
  try {
    return await requireAdmin();
  } catch (error) {
    if (error instanceof AdminAuthError) redirect(ROUTES.dashboard);
    throw error;
  }
}
