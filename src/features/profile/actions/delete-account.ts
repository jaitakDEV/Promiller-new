"use server";

import bcrypt from "bcryptjs";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { apiError, apiSuccess } from "@/lib/utils";
import { rateLimit, rateLimitMessage } from "@/lib/rate-limit";
import {
  deleteAccountSchema,
  type DeleteAccountInput,
} from "@/validations/auth";

// The user id comes from the session, never from the client.
// Note: this removes the account immediately (reports, company profile and
// consent records are removed with it through cascading deletes).
export async function deleteAccountAction(data: DeleteAccountInput) {
  const session = await auth();
  if (!session?.user?.id) return apiError("Please sign in again.");
  const userId = session.user.id;

  const limit = await rateLimit("accountDelete", userId);
  if (!limit.success) return apiError(rateLimitMessage(limit));

  const parsed = deleteAccountSchema.safeParse(data);
  if (!parsed.success) return apiError(parsed.error.issues[0].message);

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { hashedPassword: true, role: true },
  });
  if (!user) return apiError("Account not found.");

  if (user.hashedPassword) {
    const match = await bcrypt.compare(
      parsed.data.password,
      user.hashedPassword,
    );
    if (!match) return apiError("Password is incorrect.");
  }

  // Never leave the platform without an active admin.
  if (user.role === "ADMIN") {
    const admins = await db.user.count({
      where: { role: "ADMIN", isActive: true },
    });
    if (admins <= 1) {
      return apiError(
        "You are the only active admin. Make another user an admin before deleting this account.",
      );
    }
  }

  try {
    await db.user.delete({ where: { id: userId } });
    return apiSuccess(null);
  } catch {
    return apiError("Failed to delete account. Please try again.");
  }
}
