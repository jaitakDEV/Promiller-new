// "use client";

// import { signOut } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import { ROUTES } from "@/config/app";
// import type { Session } from "next-auth";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// const pageTitles: Record<string, string> = {
//   [ROUTES.admin]: "Overview",
//   [ROUTES.adminUsers]: "Users",
//   [ROUTES.adminProfile]: "Profile",
//   [ROUTES.adminSettings]: "Settings",
// };

// export function AdminTopbar({ user }: { user: Session["user"] }) {
//   const pathname = usePathname();
//   const base = "/" + pathname.split("/").slice(1, 3).join("/");
//   const title = pageTitles[pathname] ?? pageTitles[base] ?? "Admin";

//   return (
//     <header
//       style={{
//         height: "60px",
//         borderBottom: "1px solid #e2e8f0",
//         background: "#DCE8F8",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "0 2rem",
//         flexShrink: 0,
//         position: "sticky",
//         top: 0,
//         zIndex: 10,
//       }}
//     >
//       {/* Left */}
//       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//         <h1
//           style={{
//             fontSize: "15px",
//             fontWeight: 700,
//             color: "#0f172a",
//             margin: 0,
//           }}
//         >
//           {title}
//         </h1>
//         <span
//           style={{
//             fontSize: "10px",
//             padding: "2px 8px",
//             borderRadius: "20px",
//             background: "#fef2f2",
//             color: "#dc2626",
//             fontWeight: 700,
//             textTransform: "uppercase",
//             letterSpacing: "0.05em",
//           }}
//         >
//           Admin
//         </span>
//       </div>

//       {/* Right */}
//       <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             padding: "5px 12px 5px 6px",
//             border: "1px solid #e2e8f0",
//             borderRadius: "20px",
//             background: "#f8fafc",
//           }}
//         >
//           <div
//             style={{
//               width: "24px",
//               height: "24px",
//               borderRadius: "50%",
//               background: "#fef2f2",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "11px",
//             }}
//           >
//             🛡️
//           </div>
//           <span style={{ fontSize: "12px", fontWeight: 500, color: "#475569" }}>
//             {user?.name?.split(" ")[0] ?? "Admin"}
//           </span>
//         </div>

//         {/* Sign out with AlertDialog */}
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button
//               style={{
//                 height: "34px",
//                 padding: "0 12px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//                 background: "none",
//                 border: "1px solid #e2e8f0",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 fontSize: "12px",
//                 color: "#64748b",
//                 fontWeight: 500,
//               }}
//             >
//               Sign out
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Sign out of PROMILLER?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 You will be redirected to the login page. Any unsaved changes
//                 will be lost.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => signOut({ callbackUrl: ROUTES.login })}
//                 style={{ background: "#dc2626" }}
//               >
//                 Yes, sign out
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </header>
//   );
// }

"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/app";
import type { Session } from "next-auth";
import { Shield } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const pageTitles: Record<string, string> = {
  [ROUTES.admin]: "Overview",
  [ROUTES.adminUsers]: "Users",
  [ROUTES.adminProfile]: "Profile",
  [ROUTES.adminSettings]: "Settings",
};

export function AdminTopbar({ user }: { user: Session["user"] }) {
  const pathname = usePathname();
  const base = "/" + pathname.split("/").slice(1, 3).join("/");
  const title = pageTitles[pathname] ?? pageTitles[base] ?? "Admin";

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-3.5 backdrop-blur-md sm:h-[60px] sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="relative min-w-0 pl-3 before:absolute before:left-0 before:top-1/2 before:h-[18px] before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-gradient-to-b before:from-blue-500 before:to-blue-700 before:content-['']">
          <h1 className="truncate text-[15px] font-bold tracking-tight text-slate-900">
            {title}
          </h1>
        </div>
        <span className="hidden items-center gap-1 whitespace-nowrap rounded-full border border-blue-900 bg-blue-900 px-2.5 py-[3px] text-[10px] font-extrabold uppercase tracking-wider text-white min-[380px]:inline-flex">
          <Shield size={10} strokeWidth={2.5} />
          Admin
        </span>
      </div>

      {/* Right */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-[3px] transition-colors hover:border-blue-200 hover:bg-blue-50 sm:py-1 sm:pl-1 sm:pr-3">
          <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-900 text-white">
            <Shield size={13} strokeWidth={2} />
          </div>
          <span className="hidden whitespace-nowrap text-xs font-semibold text-slate-700 sm:block">
            {user?.name?.split(" ")[0] ?? "Admin"}
          </span>
        </div>

        {/* Sign out with AlertDialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="inline-flex h-[34px] items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 transition-all hover:-translate-y-px hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md hover:shadow-blue-700/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 sm:px-3.5">
              Sign out
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign out of PROMILLER?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be redirected to the login page. Any unsaved changes
                will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-semibold">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => signOut({ callbackUrl: ROUTES.login })}
                className="!bg-blue-700 font-bold !text-white shadow-md shadow-blue-700/20 transition hover:!bg-blue-800"
              >
                Yes, sign out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}
