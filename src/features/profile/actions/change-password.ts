"use server";

import bcrypt from "bcryptjs";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { apiError, apiSuccess } from "@/lib/utils";
import { rateLimit, rateLimitMessage } from "@/lib/rate-limit";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/validations/auth";

// The user id comes from the session, never from the client.
export async function changePasswordAction(data: ChangePasswordInput) {
  const session = await auth();
  if (!session?.user?.id) return apiError("Please sign in again.");
  const userId = session.user.id;

  const limit = await rateLimit("passwordChange", userId);
  if (!limit.success) return apiError(rateLimitMessage(limit));

  const parsed = changePasswordSchema.safeParse(data);
  if (!parsed.success) return apiError(parsed.error.issues[0].message);
  const { currentPassword, newPassword } = parsed.data;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { hashedPassword: true },
  });
  if (!user?.hashedPassword) {
    return apiError("No password set on this account.");
  }

  const match = await bcrypt.compare(currentPassword, user.hashedPassword);
  if (!match) return apiError("Current password is incorrect.");

  if (currentPassword === newPassword) {
    return apiError("New password must be different from the current one.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await db.user.update({ where: { id: userId }, data: { hashedPassword } });

  return apiSuccess(null);
}
