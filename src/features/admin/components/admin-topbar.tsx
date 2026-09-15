// "use client";

// import { signOut } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import { ROUTES } from "@/config/app";
// import type { SessionUser } from "@/types";

// const pageTitles: Record<string, string> = {
//   [ROUTES.admin]: "Overview",
//   [ROUTES.adminUsers]: "Users",
// };

// export function AdminTopbar({ user }: { user: SessionUser }) {
//   const pathname = usePathname();
//   const base = "/" + pathname.split("/").slice(1, 3).join("/");
//   const title = pageTitles[base] ?? "Admin";

//   return (
//     <header
//       style={{
//         height: "56px",
//         borderBottom: "0.5px solid var(--color-border-tertiary)",
//         background: "var(--color-background-primary)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "0 2rem",
//         flexShrink: 0,
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//         <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>{title}</p>
//         <span
//           style={{
//             fontSize: "11px",
//             padding: "2px 8px",
//             borderRadius: "10px",
//             background: "var(--color-background-warning)",
//             color: "var(--color-text-warning)",
//             fontWeight: 500,
//           }}
//         >
//           ADMIN
//         </span>
//       </div>
//       <button
//         onClick={() => signOut({ callbackUrl: ROUTES.login })}
//         style={{
//           fontSize: "13px",
//           color: "var(--color-text-secondary)",
//           display: "flex",
//           alignItems: "center",
//           gap: "6px",
//           background: "none",
//           border: "none",
//           cursor: "pointer",
//           padding: "6px 10px",
//           borderRadius: "var(--border-radius-md)",
//         }}
//         aria-label="Sign out"
//       >
//         <i
//           className="ti ti-logout"
//           style={{ fontSize: "16px" }}
//           aria-hidden="true"
//         />
//         Sign out
//       </button>
//     </header>
//   );
// }

"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/app";
import type { Session } from "next-auth";
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
    <header
      style={{
        height: "60px",
        borderBottom: "1px solid #e2e8f0",
        background: "#DCE8F8",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h1
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#0f172a",
            margin: 0,
          }}
        >
          {title}
        </h1>
        <span
          style={{
            fontSize: "10px",
            padding: "2px 8px",
            borderRadius: "20px",
            background: "#fef2f2",
            color: "#dc2626",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Admin
        </span>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 12px 5px 6px",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            background: "#f8fafc",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#fef2f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
            }}
          >
            🛡️
          </div>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "#475569" }}>
            {user?.name?.split(" ")[0] ?? "Admin"}
          </span>
        </div>

        {/* Sign out with AlertDialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              style={{
                height: "34px",
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "12px",
                color: "#64748b",
                fontWeight: 500,
              }}
            >
              Sign out
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign out of MDSSC?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be redirected to the login page. Any unsaved changes
                will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => signOut({ callbackUrl: ROUTES.login })}
                style={{ background: "#dc2626" }}
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
