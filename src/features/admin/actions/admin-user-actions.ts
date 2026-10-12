"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { apiError, apiSuccess } from "@/lib/utils";
import { ROUTES } from "@/config/app";
import {
  AdminAuthError,
  logAdminAction,
  requireAdmin,
} from "@/server/admin-guard";

// Never send raw error messages to the browser.
function failure(error: unknown, fallback: string) {
  if (error instanceof AdminAuthError) return apiError("Unauthorized");
  console.error(
    "[ADMIN_ACTION_ERROR]",
    error instanceof Error ? error.name : "UnknownError",
  );
  return apiError(fallback);
}

const isId = (v: unknown): v is string =>
  typeof v === "string" && v.length > 0 && v.length <= 64;

export async function adminToggleActiveAction(
  userId: string,
  isActive: boolean,
) {
  try {
    const admin = await requireAdmin();
    if (!isId(userId) || typeof isActive !== "boolean") {
      return apiError("Invalid request.");
    }
    if (admin.id === userId) {
      return apiError("You cannot modify your own account.");
    }

    await db.user.update({ where: { id: userId }, data: { isActive } });
    logAdminAction(
      admin.id,
      isActive ? "activate-user" : "deactivate-user",
      userId,
    );

    revalidatePath(ROUTES.adminUsers);
    revalidatePath(`${ROUTES.adminUsers}/${userId}`);
    return apiSuccess(null);
  } catch (e) {
    return failure(e, "Failed to update user.");
  }
}

export async function adminToggleRoleAction(
  userId: string,
  role: "USER" | "ADMIN",
) {
  try {
    const admin = await requireAdmin();
    if (!isId(userId) || (role !== "USER" && role !== "ADMIN")) {
      return apiError("Invalid request.");
    }
    if (admin.id === userId) {
      return apiError("You cannot change your own role.");
    }

    await db.user.update({ where: { id: userId }, data: { role } });
    logAdminAction(admin.id, `set-role-${role.toLowerCase()}`, userId);

    revalidatePath(ROUTES.adminUsers);
    revalidatePath(`${ROUTES.adminUsers}/${userId}`);
    return apiSuccess(null);
  } catch (e) {
    return failure(e, "Failed to update role.");
  }
}

export async function adminDeleteUserAction(userId: string) {
  try {
    const admin = await requireAdmin();
    if (!isId(userId)) return apiError("Invalid request.");
    if (admin.id === userId) {
      return apiError("You cannot delete your own account.");
    }

    const target = await db.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (!target) return apiError("User not found.");
    if (target.role === "ADMIN") {
      return apiError(
        "Change this admin's role to User before deleting the account.",
      );
    }

    await db.user.delete({ where: { id: userId } });
    logAdminAction(admin.id, "delete-user", userId);

    revalidatePath(ROUTES.adminUsers);
    return apiSuccess(null);
  } catch (e) {
    return failure(e, "Failed to delete user.");
  }
}
