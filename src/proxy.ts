// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";

// // export function proxy(_request: NextRequest) {
// //   return NextResponse.next();
// // }

// import { auth } from "@/server/auth";
// import { NextResponse } from "next/server";
// import { ROUTES } from "@/config/app";

// export const proxy = auth((req) => {
//   const { pathname } = req.nextUrl;
//   const session = req.auth;

//   if (pathname.startsWith("/dashboard") && !session) {
//     return NextResponse.redirect(new URL(ROUTES.login, req.url));
//   }

//   if (pathname.startsWith("/admin")) {
//     if (!session) {
//       return NextResponse.redirect(new URL(ROUTES.login, req.url));
//     }
//     if (session.user?.role !== "ADMIN") {
//       return NextResponse.redirect(new URL(ROUTES.dashboard, req.url));
//     }
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"],
// };

import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { ROUTES } from "@/config/app";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role;

  // Logged in user login/register pe na jaye
  if (pathname === ROUTES.login || pathname === ROUTES.register) {
    if (session) {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL(ROUTES.admin, req.url));
      }
      return NextResponse.redirect(new URL(ROUTES.dashboard, req.url));
    }
  }

  // Dashboard — sirf USER, ADMIN ko admin pe bhejo
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL(ROUTES.login, req.url));
    }
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL(ROUTES.admin, req.url));
    }
  }

  // Admin — sirf ADMIN, baaki ko dashboard pe bhejo
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL(ROUTES.login, req.url));
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL(ROUTES.dashboard, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
