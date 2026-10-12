import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileNudges } from "@/features/dashboard/components/profile-nudges";
import { UserCog, SlidersHorizontal, ArrowRight } from "lucide-react";

export const metadata = { title: "Dashboard — PROMILLER" };

export default async function DashboardHomePage() {
  const session = await auth();
  if (!session?.user) redirect(ROUTES.login);

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      createdAt: true,
      role: true,
      phone: true,
    },
  });

  if (!user) redirect(ROUTES.login);

  const company = await db.companyProfile.findUnique({
    where: { userId: session.user.id },
    select: { companyName: true },
  });

  const stats = [
    {
      label: "Account status",
      value: "Active",
      valueClass: "text-sky-700",
      cardClass:
        "bg-gradient-to-br from-sky-50 to-white border-sky-200 hover:border-sky-300",
      barClass: "bg-sky-500",
    },
    {
      label: "Role",
      value: user.role,
      valueClass: "text-blue-700",
      cardClass:
        "bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:border-blue-300",
      barClass: "bg-blue-600",
    },
    {
      label: "Member since",
      value: formatDate(user.createdAt),
      valueClass: "text-slate-900",
      cardClass:
        "bg-gradient-to-br from-slate-50 to-white border-slate-200 hover:border-slate-300",
      barClass: "bg-slate-400",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-900">
          Dashboard
        </div>
        <h1 className="m-0 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[28px] lg:text-[34px]">
          Good to see you,{" "}
          <span className="text-blue-600">
            {user.name?.split(" ")[0] ?? "there"}
          </span>{" "}
          👋
        </h1>
        <div className="mt-3.5 h-[3px] w-[38px] rounded-full bg-blue-500" />
        <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-slate-600">
          Here&apos;s an overview of your PROMILLER account.
        </p>
      </div>

      <ProfileNudges
        missingPhone={!user.phone}
        missingCompany={!company?.companyName}
      />

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-3.5 min-[480px]:grid-cols-2 sm:mb-8 lg:grid-cols-3 lg:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`group relative min-w-0 overflow-hidden rounded-[14px] border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(30,64,175,0.10)] ${stat.cardClass}`}
          >
            <span
              className={`absolute inset-y-0 left-0 w-[3px] ${stat.barClass}`}
              aria-hidden="true"
            />
            <p className="m-0 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {stat.label}
            </p>
            <p
              className={`m-0 truncate text-xl font-bold tracking-tight sm:text-2xl ${stat.valueClass}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      {/* Quick Actions */}
      <Card className="rounded-[14px] border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 pb-4">
          <CardTitle className="text-[15px] font-bold tracking-tight text-blue-900">
            Quick actions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Edit profile */}
            <Link
              href={ROUTES.profile}
              className="group flex items-center gap-3.5 rounded-xl border border-slate-200 bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-[0_12px_28px_rgba(30,64,175,0.10)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-md shadow-blue-700/25 transition-transform duration-200 group-hover:scale-105">
                <UserCog size={20} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-bold text-slate-900">
                  Edit profile
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-slate-500">
                  Update your personal &amp; company details
                </span>
              </span>
              <ArrowRight
                size={16}
                className="shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-700"
              />
            </Link>

            {/* Settings */}
            <Link
              href={ROUTES.settings}
              className="group flex items-center gap-3.5 rounded-xl border border-slate-200 bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-[0_12px_28px_rgba(30,64,175,0.10)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-slate-100 text-slate-700 transition-all duration-200 group-hover:scale-105 group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white">
                <SlidersHorizontal size={20} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-bold text-slate-900">
                  Settings
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-slate-500">
                  Manage preferences &amp; account security
                </span>
              </span>
              <ArrowRight
                size={16}
                className="shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-700"
              />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// // Arm path (shoulder -> hand) for 8 points around the chakki handle's orbit.
// // Must stay in sync with the `uc-orbit` keyframes below.
// const ARM = [
//   "M172 126 Q219 168 266 174",
//   "M172 126 Q209 175 247 187",
//   "M172 126 Q186 178 200 193",
//   "M172 126 Q163 175 153 187",
//   "M172 126 Q153 168 134 174",
//   "M172 126 Q163 162 153 161",
//   "M172 126 Q186 159 200 155",
//   "M172 126 Q209 162 247 161",
//   "M172 126 Q219 168 266 174",
// ];
// const DUR = "2.4s";

// export default function DashboardPage() {
//   const [reduce, setReduce] = useState(false);

//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//     setReduce(mq.matches);
//     const on = (e: MediaQueryListEvent) => setReduce(e.matches);
//     mq.addEventListener("change", on);
//     return () => mq.removeEventListener("change", on);
//   }, []);

//   return (
//     <div className="flex min-h-screen items-center justify-center px-4 py-10 pl-20 pb-50">
//       <style>{`
//         @keyframes uc-orbit {
//           0%, 100% { transform: translate(66px, 0); }
//           12.5% { transform: translate(46.7px, 13.4px); }
//           25%   { transform: translate(0, 19px); }
//           37.5% { transform: translate(-46.7px, 13.4px); }
//           50%   { transform: translate(-66px, 0); }
//           62.5% { transform: translate(-46.7px, -13.4px); }
//           75%   { transform: translate(0, -19px); }
//           87.5% { transform: translate(46.7px, -13.4px); }
//         }
//         @keyframes uc-spin  { to { transform: rotate(360deg); } }
//         @keyframes uc-head  { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
//         @keyframes uc-grain {
//           0%   { opacity: 0; transform: translate(0, 0); }
//           20%  { opacity: 1; }
//           100% { opacity: 0; transform: translate(-10px, 17px); }
//         }
//         @keyframes uc-dust {
//           0%   { opacity: 0; transform: translate(0, 0) scale(.6); }
//           30%  { opacity: .8; }
//           100% { opacity: 0; transform: translate(var(--dx), -28px) scale(1.4); }
//         }
//         @keyframes uc-sweat {
//           0%, 20% { opacity: 0; transform: translateY(0); }
//           40%     { opacity: 1; }
//           100%    { opacity: 0; transform: translateY(24px); }
//         }
//         @keyframes uc-bar {
//           0% { width: 18%; } 60%, 80% { width: 78%; } 100% { width: 18%; }
//         }
//         .uc-handle { animation: uc-orbit ${DUR} linear infinite; }
//         .uc-spin   { transform-origin: 0 0; animation: uc-spin ${DUR} linear infinite; }
//         .uc-head   { transform-origin: 200px 112px; animation: uc-head ${DUR} ease-in-out infinite; }
//         .uc-grain  { animation: uc-grain 1s ease-in infinite; }
//         .uc-dust   { animation: uc-dust 2.4s ease-out infinite; }
//         .uc-sweat  { animation: uc-sweat 2.4s ease-in infinite; }
//         .uc-bar    { animation: uc-bar 6s ease-in-out infinite; }
//         @media (prefers-reduced-motion: reduce) {
//           .uc-spin, .uc-head, .uc-grain, .uc-dust, .uc-sweat, .uc-bar { animation: none; }
//           .uc-handle { animation: none; transform: translate(0, 19px); }
//           .uc-bar { width: 72%; }
//           .uc-grain, .uc-dust, .uc-sweat { opacity: 0; }
//         }
//       `}</style>

//       <main className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
//         <div className="w-full max-w-md">
//           <svg
//             viewBox="0 0 400 300"
//             role="img"
//             aria-label="Cartoon man in a Rajasthani turban grinding wheat into atta on a traditional hand-driven stone chakki"
//             className="h-auto w-full"
//           >
//             <circle cx="200" cy="150" r="130" className="fill-muted" />
//             <ellipse
//               cx="200"
//               cy="281"
//               rx="168"
//               ry="9"
//               fill="#000"
//               opacity=".1"
//             />

//             {/* wheat sack (bori) */}
//             <g>
//               <path
//                 d="M40 278 q-8 -42 4 -60 q20 -8 40 0 q12 18 4 60 z"
//                 fill="#d6b98c"
//                 stroke="#92400e"
//                 strokeWidth="2"
//               />
//               <path
//                 d="M48 222 q16 9 32 0"
//                 fill="none"
//                 stroke="#92400e"
//                 strokeWidth="2.5"
//               />
//               <text
//                 x="64"
//                 y="256"
//                 textAnchor="middle"
//                 fontSize="10"
//                 fontWeight="800"
//                 fill="#78350f"
//               >
//                 Wheat
//               </text>
//               <g fill="#f59e0b">
//                 <circle cx="96" cy="276" r="2.5" />
//                 <circle cx="104" cy="272" r="2.5" />
//                 <circle cx="101" cy="278" r="2.5" />
//               </g>
//             </g>

//             {/* fresh atta pile */}
//             <path
//               d="M292 280 q14 -32 40 -32 q26 0 40 32 z"
//               fill="#f8fafc"
//               stroke="#cbd5e1"
//               strokeWidth="2"
//             />
//             <text
//               x="332"
//               y="272"
//               textAnchor="middle"
//               fontSize="10"
//               fontWeight="800"
//               fill="#b45309"
//             >
//               ATTA
//             </text>

//             {/* ---- PERSON (sits behind the chakki) ---- */}
//             <path
//               d="M168 142 Q168 114 200 114 Q232 114 232 142 L232 204 L168 204 Z"
//               fill="#f8fafc"
//               stroke="#cbd5e1"
//               strokeWidth="2"
//             />
//             <path
//               d="M192 114 L200 134 L208 114"
//               fill="none"
//               stroke="#cbd5e1"
//               strokeWidth="2"
//             />
//             <circle cx="200" cy="148" r="2.2" fill="#94a3b8" />
//             <circle cx="200" cy="162" r="2.2" fill="#94a3b8" />
//             <rect x="192" y="104" width="16" height="14" fill="#c98f5e" />

//             <g className="uc-head">
//               <circle cx="200" cy="88" r="26" fill="#d9a06b" />
//               {/* turban */}
//               <path
//                 d="M172 84 Q170 48 200 46 Q230 48 228 84 Q214 70 200 70 Q186 70 172 84 Z"
//                 fill="#dc2626"
//               />
//               <path
//                 d="M174 76 Q200 58 226 76"
//                 fill="none"
//                 stroke="#fbbf24"
//                 strokeWidth="3"
//               />
//               <path
//                 d="M176 64 Q200 50 224 64"
//                 fill="none"
//                 stroke="#fbbf24"
//                 strokeWidth="3"
//               />
//               <circle cx="200" cy="45" r="8" fill="#b91c1c" />
//               <path
//                 d="M226 76 q18 8 12 36"
//                 fill="none"
//                 stroke="#dc2626"
//                 strokeWidth="8"
//                 strokeLinecap="round"
//               />
//               {/* face */}
//               <circle cx="190" cy="90" r="3.4" fill="#1f2937" />
//               <circle cx="210" cy="90" r="3.4" fill="#1f2937" />
//               <circle cx="191" cy="89" r="1.1" fill="#fff" />
//               <circle cx="211" cy="89" r="1.1" fill="#fff" />
//               <path
//                 d="M184 81 q6 -4 11 0 M205 81 q6 -4 11 0"
//                 fill="none"
//                 stroke="#3f2a1d"
//                 strokeWidth="2.2"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M182 101 q-4 -8 3 -8 q7 -2 15 4 q8 -6 15 -4 q7 0 3 8 q-8 -4 -18 2 q-10 -6 -18 -2 z"
//                 fill="#2b1b12"
//               />
//               <path
//                 d="M191 109 q9 8 18 0"
//                 fill="none"
//                 stroke="#7c2d12"
//                 strokeWidth="2.5"
//                 strokeLinecap="round"
//               />
//               <circle cx="178" cy="98" r="4" fill="#fb7185" opacity=".35" />
//               <circle cx="222" cy="98" r="4" fill="#fb7185" opacity=".35" />
//               <path
//                 className="uc-sweat"
//                 d="M176 70 q-5 8 0 11 q5 -3 0 -11 z"
//                 fill="#38bdf8"
//               />
//             </g>

//             {/* other arm: feeding grain into the chakki */}
//             <path
//               d="M228 126 Q248 160 216 182"
//               fill="none"
//               stroke="#cbd5e1"
//               strokeWidth="16"
//               strokeLinecap="round"
//             />
//             <path
//               d="M228 126 Q248 160 216 182"
//               fill="none"
//               stroke="#f8fafc"
//               strokeWidth="12"
//               strokeLinecap="round"
//             />
//             <circle cx="214" cy="183" r="8" fill="#d9a06b" />

//             {/* ---- CHAKKI ---- */}
//             {/* base stone */}
//             <ellipse cx="200" cy="244" rx="118" ry="34" fill="#6b7280" />
//             <rect x="82" y="230" width="236" height="14" fill="#6b7280" />
//             <ellipse cx="200" cy="230" rx="118" ry="34" fill="#cbd5e1" />
//             <ellipse cx="200" cy="231" rx="107" ry="29" fill="#f8fafc" />
//             {/* upper (rotating) stone */}
//             <ellipse cx="200" cy="218" rx="82" ry="24" fill="#78716c" />
//             <rect x="118" y="208" width="164" height="10" fill="#78716c" />
//             <ellipse cx="200" cy="208" rx="82" ry="24" fill="#a8a29e" />
//             <g transform="translate(200 208) scale(1 0.293)">
//               <g
//                 className="uc-spin"
//                 stroke="#78716c"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//               >
//                 <line x1="22" y1="0" x2="70" y2="0" />
//                 <line x1="-22" y1="0" x2="-70" y2="0" />
//                 <line x1="0" y1="22" x2="0" y2="70" />
//                 <line x1="0" y1="-22" x2="0" y2="-70" />
//                 <circle cx="46" cy="-30" r="3" fill="#78716c" />
//                 <circle cx="-44" cy="30" r="3" fill="#78716c" />
//               </g>
//             </g>
//             <ellipse cx="200" cy="207" rx="20" ry="7" fill="#fbbf24" />
//             <ellipse cx="200" cy="207" rx="9" ry="3" fill="#44403c" />

//             {/* falling grains */}
//             <g fill="#f59e0b">
//               <circle className="uc-grain" cx="214" cy="190" r="2.2" />
//               <circle
//                 className="uc-grain"
//                 cx="216"
//                 cy="190"
//                 r="2"
//                 style={{ animationDelay: ".33s" }}
//               />
//               <circle
//                 className="uc-grain"
//                 cx="212"
//                 cy="190"
//                 r="2.2"
//                 style={{ animationDelay: ".66s" }}
//               />
//             </g>

//             {/* flour dust */}
//             <g fill="#fff" stroke="#e2e8f0">
//               <circle
//                 className="uc-dust"
//                 cx="100"
//                 cy="236"
//                 r="5"
//                 style={{ ["--dx" as string]: "-10px" }}
//               />
//               <circle
//                 className="uc-dust"
//                 cx="300"
//                 cy="236"
//                 r="5"
//                 style={{ ["--dx" as string]: "12px", animationDelay: ".8s" }}
//               />
//               <circle
//                 className="uc-dust"
//                 cx="200"
//                 cy="262"
//                 r="4"
//                 style={{ ["--dx" as string]: "6px", animationDelay: "1.6s" }}
//               />
//             </g>

//             {/* moving arm + handle (khunta) */}
//             <path
//               d={reduce ? ARM[2] : ARM[0]}
//               fill="none"
//               stroke="#cbd5e1"
//               strokeWidth="16"
//               strokeLinecap="round"
//             >
//               {!reduce && (
//                 <animate
//                   attributeName="d"
//                   values={ARM.join(";")}
//                   dur={DUR}
//                   repeatCount="indefinite"
//                 />
//               )}
//             </path>
//             <path
//               d={reduce ? ARM[2] : ARM[0]}
//               fill="none"
//               stroke="#f8fafc"
//               strokeWidth="12"
//               strokeLinecap="round"
//             >
//               {!reduce && (
//                 <animate
//                   attributeName="d"
//                   values={ARM.join(";")}
//                   dur={DUR}
//                   repeatCount="indefinite"
//                 />
//               )}
//             </path>
//             <g transform="translate(200 208)">
//               <g className="uc-handle">
//                 <rect
//                   x="-4"
//                   y="-36"
//                   width="8"
//                   height="36"
//                   rx="3"
//                   fill="#92400e"
//                 />
//                 <circle cx="0" cy="-38" r="8" fill="#d9a06b" />
//               </g>
//             </g>
//           </svg>
//         </div>

//         <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
//           Dashboard under construction
//         </h1>
//         <p className="mt-3 max-w-md text-balance text-muted-foreground">
//           We are grinding it the old-fashioned way: slow, steady and fresh. Your
//           dashboard will be ready soon. We will meet again shortly!
//         </p>
//       </main>
//     </div>
//   );
// }
