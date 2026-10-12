// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ROUTES } from "@/config/app";
// import { getInitials } from "@/lib/utils";
// import type { SessionUser } from "@/types";
// import { LayoutDashboard, User, Settings } from "lucide-react";
// import Image from "next/image";

// const navGroups = [
//   {
//     title: "Main",
//     items: [
//       { label: "Overview", href: ROUTES.dashboard, icon: LayoutDashboard },
//     ],
//   },
//   {
//     title: "Account",
//     items: [
//       { label: "Profile", href: ROUTES.profile, icon: User },
//       { label: "Settings", href: ROUTES.settings, icon: Settings },
//     ],
//   },
// ];

// export function DashboardSidebar({ user }: { user: SessionUser }) {
//   const pathname = usePathname();

//   return (
//     <aside className="sticky top-0 flex h-screen w-[72px] shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-200 md:w-[220px] lg:w-[250px]">
//       {/* Logo */}
//       <div className="flex h-14 shrink-0 items-center justify-center border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white px-2 sm:h-[60px] md:px-4">
//         <Image
//           src="/pro-miller-logo.webp"
//           alt="Pro Miller"
//           width={160}
//           height={160}
//           className="h-9 w-auto max-w-full object-contain sm:h-10"
//         />
//       </div>

//       {/* Nav */}
//       <nav
//         aria-label="Dashboard navigation"
//         className="flex flex-1 flex-col items-center overflow-y-auto px-2.5 pb-3.5 md:items-stretch md:pb-[18px] lg:px-3.5 lg:pb-[22px]"
//       >
//         {navGroups.map((group, index) => (
//           <div
//             key={group.title}
//             className="flex w-full flex-col items-center gap-1.5 md:items-stretch"
//           >
//             {/* Full-width line above group name (first group uses logo border) */}
//             {index > 0 && (
//               <span
//                 aria-hidden="true"
//                 className="mx-1.5 mb-3 mt-3 h-px self-stretch bg-slate-200 md:mx-3"
//               />
//             )}

//             {/* Group name */}
//             <p
//               className={`m-0 hidden w-full whitespace-nowrap px-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-900 md:block ${
//                 index === 0 ? "mb-1 mt-4 lg:mt-[22px]" : "mb-1"
//               }`}
//             >
//               {group.title}
//             </p>

//             {/* Rail spacing for first group on mobile */}
//             {index === 0 && (
//               <span className="h-3 md:hidden" aria-hidden="true" />
//             )}

//             {/* Group links */}
//             {group.items.map((item) => {
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   title={item.label}
//                   className={`flex h-11 w-11 items-center justify-center gap-3 rounded-[9px] text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 md:h-auto md:w-auto md:justify-start md:p-3 ${
//                     isActive
//                       ? "bg-gradient-to-r from-blue-100 to-blue-50 font-bold text-blue-700 shadow-[inset_3px_0_0_#3B82F6]"
//                       : "font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700"
//                   }`}
//                 >
//                   <item.icon size={17} className="shrink-0" />
//                   <span className="hidden md:inline">{item.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         ))}
//       </nav>

//       {/* User */}
//       <div className="flex items-center justify-center gap-2.5 border-t border-slate-200 bg-slate-50 px-2 py-3.5 md:justify-start md:px-[18px] md:py-4">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-blue-200 bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-extrabold text-white">
//           {getInitials(user.name ?? null)}
//         </div>
//         <div className="hidden min-w-0 flex-1 md:block">
//           <p className="truncate text-[13px] font-bold text-slate-900">
//             {user.name ?? "User"}
//           </p>
//           <p className="mt-px truncate text-[11px] text-slate-500">
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
import { Calculator, LayoutDashboard, User, Settings } from "lucide-react";
import Image from "next/image";

const navGroups = [
  {
    title: "Main",
    items: [
      { label: "Overview", href: ROUTES.dashboard, icon: LayoutDashboard },
      { label: "Calculators", href: ROUTES.calculators, icon: Calculator },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: ROUTES.profile, icon: User },
      { label: "Settings", href: ROUTES.settings, icon: Settings },
    ],
  },
];

// The dashboard home only matches itself; every other item also stays
// highlighted on the pages below it (e.g. /calculators/atta-cost).
function isItemActive(pathname: string, href: string) {
  if (href === ROUTES.dashboard) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardSidebar({ user }: { user: SessionUser }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[72px] shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-200 md:w-[220px] lg:w-[250px]">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center justify-center border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white px-2 sm:h-[60px] md:px-4">
        <Image
          src="/pro-miller-logo.webp"
          alt="Pro Miller"
          width={160}
          height={160}
          className="h-9 w-auto max-w-full object-contain sm:h-10"
        />
      </div>

      {/* Nav */}
      <nav
        aria-label="Dashboard navigation"
        className="flex flex-1 flex-col items-center overflow-y-auto px-2.5 pb-3.5 md:items-stretch md:pb-[18px] lg:px-3.5 lg:pb-[22px]"
      >
        {navGroups.map((group, index) => (
          <div
            key={group.title}
            className="flex w-full flex-col items-center gap-1.5 md:items-stretch"
          >
            {/* Full-width line above group name (first group uses logo border) */}
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
              const isActive = isItemActive(pathname, item.href);
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

      {/* User */}
      <div className="flex items-center justify-center gap-2.5 border-t border-slate-200 bg-slate-50 px-2 py-3.5 md:justify-start md:px-[18px] md:py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-blue-200 bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-extrabold text-white">
          {getInitials(user.name ?? null)}
        </div>
        <div className="hidden min-w-0 flex-1 md:block">
          <p className="truncate text-[13px] font-bold text-slate-900">
            {user.name ?? "User"}
          </p>
          <p className="mt-px truncate text-[11px] text-slate-500">
            {user.email}
          </p>
        </div>
      </div>
    </aside>
  );
}
