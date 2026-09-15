// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ROUTES } from "@/config/app";
// import { getInitials } from "@/lib/utils";
// import type { SessionUser } from "@/types";

// const navItems = [
//   { label: "Overview", href: ROUTES.dashboard, icon: "ti-home" },
//   { label: "Profile", href: ROUTES.profile, icon: "ti-user" },
//   { label: "Settings", href: ROUTES.settings, icon: "ti-settings" },
// ];

// export function DashboardSidebar({ user }: { user: SessionUser }) {
//   const pathname = usePathname();

//   return (
//     <aside
//       style={{
//         width: "220px",
//         flexShrink: 0,
//         borderRight: "0.5px solid var(--color-border-tertiary)",
//         background: "var(--color-background-primary)",
//         display: "flex",
//         flexDirection: "column",
//         padding: "1.5rem 0",
//       }}
//     >
//       <div
//         style={{
//           padding: "0 1.25rem 1.5rem",
//           borderBottom: "0.5px solid var(--color-border-tertiary)",
//         }}
//       >
//         <div
//           style={{
//             fontSize: "15px",
//             fontWeight: 500,
//             color: "var(--color-text-primary)",
//           }}
//         >
//           My SaaS
//         </div>
//       </div>

//       <nav
//         style={{
//           flex: 1,
//           padding: "1rem 0.75rem",
//           display: "flex",
//           flexDirection: "column",
//           gap: "2px",
//         }}
//         aria-label="Main navigation"
//       >
//         {navItems.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 padding: "8px 10px",
//                 borderRadius: "var(--border-radius-md)",
//                 fontSize: "13px",
//                 fontWeight: isActive ? 500 : 400,
//                 color: isActive
//                   ? "var(--color-text-info)"
//                   : "var(--color-text-secondary)",
//                 background: isActive
//                   ? "var(--color-background-info)"
//                   : "transparent",
//                 textDecoration: "none",
//               }}
//             >
//               <i
//                 className={`ti ${item.icon}`}
//                 style={{ fontSize: "16px" }}
//                 aria-hidden="true"
//               />
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>

//       <div
//         style={{
//           padding: "1rem 1.25rem",
//           borderTop: "0.5px solid var(--color-border-tertiary)",
//           display: "flex",
//           alignItems: "center",
//           gap: "10px",
//         }}
//       >
//         <div
//           style={{
//             width: "32px",
//             height: "32px",
//             borderRadius: "50%",
//             background: "var(--color-background-info)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "12px",
//             fontWeight: 500,
//             color: "var(--color-text-info)",
//             flexShrink: 0,
//           }}
//         >
//           {getInitials(user.name)}
//         </div>
//         <div style={{ minWidth: 0 }}>
//           <p
//             style={{
//               fontSize: "13px",
//               fontWeight: 500,
//               color: "var(--color-text-primary)",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//               margin: 0,
//             }}
//           >
//             {user.name ?? "User"}
//           </p>
//           <p
//             style={{
//               fontSize: "11px",
//               color: "var(--color-text-secondary)",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//               margin: 0,
//             }}
//           >
//             {user.email}
//           </p>
//         </div>
//       </div>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/app";
import { getInitials } from "@/lib/utils";
import type { SessionUser } from "@/types";
import { LayoutDashboard, User, Settings } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Overview", href: ROUTES.dashboard, icon: LayoutDashboard },
  { label: "Profile", href: ROUTES.profile, icon: User },
  { label: "Settings", href: ROUTES.settings, icon: Settings },
];

export function DashboardSidebar({ user }: { user: SessionUser }) {
  const pathname = usePathname();

  return (
    <>
      <aside
        style={{
          width: "240px",
          flexShrink: 0,
          borderRight: "1px solid #e2e8f0",
          background: "#CFE0F5",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <Image src="/mdssc-logo.svg" alt="MDSSC" width={160} height={160} />
        </div>

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "1rem 0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "0 0.75rem",
              margin: "0 0 6px",
            }}
          >
            Menu
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#1d4ed8" : "#475569",
                  background: isActive ? "#eff6ff" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "#eff6ff",
              border: "1.5px solid #bfdbfe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "#1d4ed8",
              flexShrink: 0,
            }}
          >
            {getInitials(user.name ?? null)}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#0f172a",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.name ?? "User"}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.email}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
