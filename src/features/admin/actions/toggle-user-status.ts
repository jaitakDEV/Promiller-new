// "use server";

// import { auth } from "@/server/auth";
// import { db } from "@/server/db";
// import { revalidatePath } from "next/cache";
// import { ROUTES } from "@/config/app";

// export async function toggleUserStatusAction(
//   userId: string,
//   currentStatus: boolean,
// ) {
//   const session = await auth();

//   // Sirf admin kar sake
//   if (!session?.user || session.user.role !== "ADMIN") {
//     return { success: false, error: "Unauthorized" };
//   }

//   // Admin apna account block na kar sake
//   if (userId === session.user.id) {
//     return { success: false, error: "You cannot deactivate your own account" };
//   }

//   await db.user.update({
//     where: { id: userId },
//     data: { isActive: !currentStatus },
//   });

//   revalidatePath(ROUTES.adminUsers);
//   return { success: true, isActive: !currentStatus };
// }

"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";
import {
  AdminAuthError,
  logAdminAction,
  requireAdmin,
} from "@/server/admin-guard";

// Flips the user's active flag. The new value comes from the database; the
// value the browser holds is only used to detect that the page is stale.
export async function toggleUserStatusAction(
  userId: string,
  currentStatus: boolean,
) {
  try {
    const admin = await requireAdmin();

    if (
      typeof userId !== "string" ||
      userId.length === 0 ||
      userId.length > 64
    ) {
      return { success: false as const, error: "Invalid request" };
    }
    if (userId === admin.id) {
      return {
        success: false as const,
        error: "You cannot deactivate your own account",
      };
    }

    const target = await db.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });
    if (!target) return { success: false as const, error: "User not found" };
    if (target.isActive !== currentStatus) {
      return {
        success: false as const,
        error: "This user's status has changed. Please refresh the page.",
      };
    }

    const isActive = !target.isActive;
    await db.user.update({ where: { id: userId }, data: { isActive } });
    logAdminAction(
      admin.id,
      isActive ? "activate-user" : "deactivate-user",
      userId,
    );

    revalidatePath(ROUTES.adminUsers);
    return { success: true as const, isActive };
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return { success: false as const, error: "Unauthorized" };
    }
    console.error(
      "[TOGGLE_USER_STATUS]",
      error instanceof Error ? error.name : "UnknownError",
    );
    return { success: false as const, error: "Failed to update user" };
  }
}
