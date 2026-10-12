// import { auth } from "@/server/auth";
// import { NextResponse } from "next/server";
// import { ROUTES } from "@/config/app";

// export default auth((req) => {
//   const { pathname } = req.nextUrl;
//   const session = req.auth;
//   const role = session?.user?.role;

//   // Logged in user login/register pe na jaye
//   if (pathname === ROUTES.login || pathname === ROUTES.register) {
//     if (session) {
//       if (role === "ADMIN") {
//         return NextResponse.redirect(new URL(ROUTES.admin, req.url));
//       }
//       return NextResponse.redirect(new URL(ROUTES.dashboard, req.url));
//     }
//   }

//   // Dashboard — sirf USER, ADMIN ko admin pe bhejo
//   if (pathname.startsWith("/dashboard")) {
//     if (!session) {
//       return NextResponse.redirect(new URL(ROUTES.login, req.url));
//     }
//     if (role === "ADMIN") {
//       return NextResponse.redirect(new URL(ROUTES.admin, req.url));
//     }
//   }

//   // Admin — sirf ADMIN, baaki ko dashboard pe bhejo
//   if (pathname.startsWith("/admin")) {
//     if (!session) {
//       return NextResponse.redirect(new URL(ROUTES.login, req.url));
//     }
//     if (role !== "ADMIN") {
//       return NextResponse.redirect(new URL(ROUTES.dashboard, req.url));
//     }
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
// };

import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { ROUTES } from "@/config/app";

export default auth((req) => {
  const { pathname, search } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role;

  // Not signed in: go to login and remember where the visitor was heading.
  const toLogin = () => {
    const url = new URL(ROUTES.login, req.url);
    url.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(url);
  };

  // Logged in user login/register pe na jaye
  if (pathname === ROUTES.login || pathname === ROUTES.register) {
    if (session) {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL(ROUTES.admin, req.url));
      }
      return NextResponse.redirect(new URL(ROUTES.dashboard, req.url));
    }
  }

  // Calculator tools (/calculators/<slug>): signed-in users only.
  // The index (/calculators) is public and is not matched by this proxy.
  if (pathname.startsWith("/calculators/")) {
    if (!session) return toLogin();
  }

  // Dashboard — sirf USER, ADMIN ko admin pe bhejo
  if (pathname.startsWith("/dashboard")) {
    if (!session) return toLogin();
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL(ROUTES.admin, req.url));
    }
  }

  // Admin — sirf ADMIN, baaki ko dashboard pe bhejo
  if (pathname.startsWith("/admin")) {
    if (!session) return toLogin();
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL(ROUTES.dashboard, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/calculators/:path+",
    "/login",
    "/register",
  ],
};
