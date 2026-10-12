// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ROUTES } from "@/config/app";
// import { LayoutDashboard, Users, User, Settings, Shield } from "lucide-react";
// import Image from "next/image";

// const navItems = [
//   { label: "Overview", href: ROUTES.admin, icon: LayoutDashboard },
//   { label: "Users", href: ROUTES.adminUsers, icon: Users },
//   { label: "Profile", href: ROUTES.adminProfile, icon: User },
//   { label: "Settings", href: ROUTES.adminSettings, icon: Settings },
// ];

// export function AdminSidebar() {
//   const pathname = usePathname();

//   return (
//     <aside
//       style={{
//         width: "240px",
//         flexShrink: 0,
//         borderRight: "1px solid #e2e8f0",
//         background: "#CFE0F5",
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         position: "sticky",
//         top: 0,
//       }}
//     >
//       {/* Logo */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           borderBottom: "1px solid #e2e8f0",
//         }}
//       >
//         <Image
//           src="/pro-miller-logo.webp"
//           alt="MDSSC"
//           width={180}
//           height={180}
//         />
//       </div>

//       {/* Nav */}
//       <nav
//         style={{
//           flex: 1,
//           padding: "1rem 0.75rem",
//           display: "flex",
//           flexDirection: "column",
//           gap: "2px",
//         }}
//       >
//         <p
//           style={{
//             fontSize: "15px",
//             fontWeight: 900,
//             color: "#111111",
//             textTransform: "uppercase",
//             letterSpacing: "0.08em",
//             padding: "0 0.75rem",
//             margin: "0 0 6px",
//           }}
//         >
//           Management
//         </p>
//         {navItems.map((item) => {
//           const isActive =
//             item.href === ROUTES.admin
//               ? pathname === item.href
//               : pathname === item.href || pathname.startsWith(item.href + "/");
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 padding: "9px 12px",
//                 borderRadius: "8px",
//                 fontSize: "13px",
//                 fontWeight: isActive ? 600 : 400,
//                 color: isActive ? "#06438a" : "#475569",
//                 background: isActive ? "#fef2f2" : "transparent",
//                 textDecoration: "none",
//                 transition: "all 0.15s",
//               }}
//             >
//               <item.icon size={16} />

//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Admin Badge */}
//       <div
//         style={{
//           padding: "1rem 1.25rem",
//           borderTop: "1px solid #e2e8f0",
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//         }}
//       >
//         <div
//           style={{
//             width: "34px",
//             height: "34px",
//             borderRadius: "50%",
//             background: "#fef2f2",
//             border: "1.5px solid #fecaca",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "14px",
//             flexShrink: 0,
//           }}
//         >
//           <Shield size={16} color="#dc2626" />
//         </div>
//         <div>
//           <p
//             style={{
//               fontSize: "12px",
//               fontWeight: 600,
//               color: "#0f172a",
//               margin: 0,
//             }}
//           >
//             Administrator
//           </p>
//           <p style={{ fontSize: "10px", color: "#94a3b8", margin: 0 }}>
//             Full access
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
import { LayoutDashboard, Users, User, Settings, Shield } from "lucide-react";
import Image from "next/image";

const navGroups = [
  {
    title: "Management",
    items: [
      { label: "Overview", href: ROUTES.admin, icon: LayoutDashboard },
      { label: "Users", href: ROUTES.adminUsers, icon: Users },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: ROUTES.adminProfile, icon: User },
      { label: "Settings", href: ROUTES.adminSettings, icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[72px] shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-200 md:w-[220px] lg:w-[250px]">
      {/* Logo (height matches topbar so bottom borders align) */}
      <div className="flex h-14 shrink-0 items-center justify-center border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white px-2 sm:h-[60px] md:px-4">
        <Image
          src="/pro-miller-logo.webp"
          alt="MDSSC"
          width={180}
          height={180}
          className="h-9 w-auto max-w-full object-contain sm:h-10"
        />
      </div>

      {/* Nav */}
      <nav
        aria-label="Admin navigation"
        className="flex flex-1 flex-col items-center overflow-y-auto px-2.5 pb-3.5 md:items-stretch md:pb-[18px] lg:px-3.5 lg:pb-[22px]"
      >
        {navGroups.map((group, index) => (
          <div
            key={group.title}
            className="flex w-full flex-col items-center gap-1.5 md:items-stretch"
          >
            {/* Line above group name, with left/right spacing */}
            {index > 0 && (
              <span
                aria-hidden="true"
                className="mx-1.5 mb-3 mt-3 h-px self-stretch bg-slate-200 md:mx-3"
              />
            )}

            {/* Group name */}
            <p
              className={`m-0 hidden w-full whitespace-nowrap px-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-900 md:block ${
                index === 0 ? "mb-1 mt-4 lg:mt-[22px]" : "mb-1"
              }`}
            >
              {group.title}
            </p>

            {/* Rail spacing for first group on mobile */}
            {index === 0 && (
              <span className="h-3 md:hidden" aria-hidden="true" />
            )}

            {/* Group links */}
            {group.items.map((item) => {
              const isActive =
                item.href === ROUTES.admin
                  ? pathname === item.href
                  : pathname === item.href ||
                    pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  className={`flex h-11 w-11 items-center justify-center gap-3 rounded-[9px] text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 md:h-auto md:w-auto md:justify-start md:p-3 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-100 to-blue-50 font-bold text-blue-700 shadow-[inset_3px_0_0_#3B82F6]"
                      : "font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <item.icon size={17} className="shrink-0" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Admin Badge */}
      <div className="flex items-center justify-center gap-2.5 border-t border-slate-200 bg-slate-50 px-2 py-3.5 md:justify-start md:px-[18px] md:py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-blue-200 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
          <Shield size={16} />
        </div>
        <div className="hidden min-w-0 flex-1 md:block">
          <p className="m-0 truncate text-[13px] font-bold text-slate-900">
            Administrator
          </p>
          <p className="m-0 mt-px truncate text-[11px] text-slate-500">
            Full access
          </p>
        </div>
      </div>
    </aside>
  );
}
