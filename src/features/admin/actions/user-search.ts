// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { ROUTES } from "@/config/app";
// import { requireAdminPage } from "@/server/admin-guard";

// export const USER_SEARCH_COOKIE = "admin_user_q";

// const cookieOptions = {
//   httpOnly: true,
//   sameSite: "lax" as const,
//   secure: process.env.NODE_ENV === "production",
//   path: ROUTES.adminUsers,
// };

// export async function setUserSearchAction(formData: FormData) {
//   await requireAdminPage();

//   const raw = formData.get("q");
//   const q = typeof raw === "string" ? raw.trim().slice(0, 100) : "";

//   const jar = await cookies();
//   if (q) {
//     jar.set(USER_SEARCH_COOKIE, q, { ...cookieOptions, maxAge: 60 * 60 });
//   } else {
//     jar.set(USER_SEARCH_COOKIE, "", { ...cookieOptions, maxAge: 0 });
//   }
//   redirect(ROUTES.adminUsers);
// }

// export async function clearUserSearchAction() {
//   await requireAdminPage();
//   const jar = await cookies();
//   jar.set(USER_SEARCH_COOKIE, "", { ...cookieOptions, maxAge: 0 });
//   redirect(ROUTES.adminUsers);
// }

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES, USER_SEARCH_COOKIE } from "@/config/app";
import { requireAdminPage } from "@/server/admin-guard";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: ROUTES.adminUsers,
};

export async function setUserSearchAction(formData: FormData) {
  await requireAdminPage();

  const raw = formData.get("q");
  const q = typeof raw === "string" ? raw.trim().slice(0, 100) : "";

  const jar = await cookies();
  if (q) {
    jar.set(USER_SEARCH_COOKIE, q, { ...cookieOptions, maxAge: 60 * 60 });
  } else {
    jar.set(USER_SEARCH_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  }
  redirect(ROUTES.adminUsers);
}

export async function clearUserSearchAction() {
  await requireAdminPage();
  const jar = await cookies();
  jar.set(USER_SEARCH_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  redirect(ROUTES.adminUsers);
}
