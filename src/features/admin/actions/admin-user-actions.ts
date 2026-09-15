"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { apiError, apiSuccess } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/config/app";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function adminToggleActiveAction(
  userId: string,
  isActive: boolean,
) {
  try {
    const admin = await requireAdmin();
    if (admin.id === userId)
      return apiError("You cannot modify your own account.");

    await db.user.update({ where: { id: userId }, data: { isActive } });
    revalidatePath(ROUTES.adminUsers);
    revalidatePath(`${ROUTES.adminUsers}/${userId}`);
    return apiSuccess(null);
  } catch (e) {
    return apiError(e instanceof Error ? e.message : "Failed to update user.");
  }
}

export async function adminToggleRoleAction(
  userId: string,
  role: "USER" | "ADMIN",
) {
  try {
    const admin = await requireAdmin();
    if (admin.id === userId)
      return apiError("You cannot change your own role.");

    await db.user.update({ where: { id: userId }, data: { role } });
    revalidatePath(ROUTES.adminUsers);
    revalidatePath(`${ROUTES.adminUsers}/${userId}`);
    return apiSuccess(null);
  } catch (e) {
    return apiError(e instanceof Error ? e.message : "Failed to update role.");
  }
}

export async function adminDeleteUserAction(userId: string) {
  try {
    const admin = await requireAdmin();
    if (admin.id === userId)
      return apiError("You cannot delete your own account.");

    await db.user.delete({ where: { id: userId } });
    revalidatePath(ROUTES.adminUsers);
    return apiSuccess(null);
  } catch (e) {
    return apiError(e instanceof Error ? e.message : "Failed to delete user.");
  }
}
