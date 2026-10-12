// import { auth } from "@/server/auth";
// import { redirect } from "next/navigation";
// import { db } from "@/server/db";
// import { ROUTES } from "@/config/app";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export const metadata = { title: "Admin — Overview" };

// export default async function AdminOverviewPage() {
//   const session = await auth();
//   if (!session?.user || session.user.role !== "ADMIN")
//     redirect(ROUTES.dashboard);

//   const [totalUsers, activeUsers, unverifiedUsers, adminCount] =
//     await Promise.all([
//       db.user.count(),
//       db.user.count({ where: { isActive: true } }),
//       db.user.count({ where: { emailVerified: null } }),
//       db.user.count({ where: { role: "ADMIN" } }),
//     ]);

//   const recentUsers = await db.user.findMany({
//     orderBy: { createdAt: "desc" },
//     take: 5,
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       createdAt: true,
//       role: true,
//       isActive: true,
//     },
//   });

//   const stats = [
//     {
//       label: "Total users",
//       value: totalUsers,
//       bg: "#eff6ff",
//       border: "#bfdbfe",
//       color: "#1d4ed8",
//     },
//     {
//       label: "Active users",
//       value: activeUsers,
//       bg: "#f0fdf4",
//       border: "#bbf7d0",
//       color: "#16a34a",
//     },
//     {
//       label: "Unverified",
//       value: unverifiedUsers,
//       bg: "#fffbeb",
//       border: "#fde68a",
//       color: "#d97706",
//     },
//     {
//       label: "Admins",
//       value: adminCount,
//       bg: "#fef2f2",
//       border: "#fecaca",
//       color: "#dc2626",
//     },
//   ];

//   return (
//     <div>
//       {/* Header */}
//       <div style={{ marginBottom: "2rem" }}>
//         <h1
//           style={{
//             fontSize: "22px",
//             fontWeight: 800,
//             color: "#0f172a",
//             margin: "0 0 6px",
//             letterSpacing: "-0.5px",
//           }}
//         >
//           Admin Overview
//         </h1>
//         <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
//           Platform statistics and recent activity.
//         </p>
//       </div>

//       {/* Stats */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//           gap: "1rem",
//           marginBottom: "2rem",
//         }}
//       >
//         {stats.map((s) => (
//           <div
//             key={s.label}
//             style={{
//               background: s.bg,
//               border: `1px solid ${s.border}`,
//               borderRadius: "12px",
//               padding: "1.25rem",
//             }}
//           >
//             <p
//               style={{
//                 fontSize: "11px",
//                 color: "#64748b",
//                 margin: "0 0 8px",
//                 fontWeight: 600,
//                 textTransform: "uppercase",
//                 letterSpacing: "0.06em",
//               }}
//             >
//               {s.label}
//             </p>
//             <p
//               style={{
//                 fontSize: "28px",
//                 fontWeight: 800,
//                 margin: 0,
//                 color: s.color,
//                 letterSpacing: "-1px",
//               }}
//             >
//               {s.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Recent Users Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle
//             style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}
//           >
//             Recent signups
//           </CardTitle>
//         </CardHeader>
//         <CardContent style={{ padding: 0 }}>
//           <div style={{ overflowX: "auto" }}>
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 fontSize: "13px",
//               }}
//             >
//               <thead>
//                 <tr
//                   style={{
//                     background: "#f8fafc",
//                     borderBottom: "1px solid #e2e8f0",
//                   }}
//                 >
//                   {["Name", "Email", "Role", "Status"].map((h) => (
//                     <th
//                       key={h}
//                       style={{
//                         padding: "10px 16px",
//                         textAlign: "left",
//                         fontWeight: 600,
//                         color: "#64748b",
//                         fontSize: "11px",
//                         textTransform: "uppercase",
//                         letterSpacing: "0.05em",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentUsers.map((u) => (
//                   <tr key={u.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                     <td
//                       style={{
//                         padding: "12px 16px",
//                         fontWeight: 500,
//                         color: "#0f172a",
//                       }}
//                     >
//                       {u.name ?? "—"}
//                     </td>
//                     <td style={{ padding: "12px 16px", color: "#64748b" }}>
//                       {u.email}
//                     </td>
//                     <td style={{ padding: "12px 16px" }}>
//                       <span
//                         style={{
//                           fontSize: "11px",
//                           padding: "2px 8px",
//                           borderRadius: "20px",
//                           fontWeight: 600,
//                           background:
//                             u.role === "ADMIN" ? "#fef2f2" : "#f1f5f9",
//                           color: u.role === "ADMIN" ? "#dc2626" : "#475569",
//                         }}
//                       >
//                         {u.role}
//                       </span>
//                     </td>
//                     <td style={{ padding: "12px 16px" }}>
//                       <span
//                         style={{
//                           fontSize: "11px",
//                           padding: "2px 8px",
//                           borderRadius: "20px",
//                           fontWeight: 600,
//                           background: u.isActive ? "#f0fdf4" : "#fef2f2",
//                           color: u.isActive ? "#16a34a" : "#dc2626",
//                         }}
//                       >
//                         {u.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Admin — Overview" };

export default async function AdminOverviewPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN")
    redirect(ROUTES.dashboard);

  const [totalUsers, activeUsers, unverifiedUsers, adminCount] =
    await Promise.all([
      db.user.count(),
      db.user.count({ where: { isActive: true } }),
      db.user.count({ where: { emailVerified: null } }),
      db.user.count({ where: { role: "ADMIN" } }),
    ]);

  const recentUsers = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      role: true,
      isActive: true,
    },
  });

  const stats = [
    {
      label: "Total users",
      value: totalUsers,
      valueClass: "text-blue-700",
      cardClass:
        "bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:border-blue-300",
      barClass: "bg-blue-600",
    },
    {
      label: "Active users",
      value: activeUsers,
      valueClass: "text-sky-700",
      cardClass:
        "bg-gradient-to-br from-sky-50 to-white border-sky-200 hover:border-sky-300",
      barClass: "bg-sky-500",
    },
    {
      label: "Unverified",
      value: unverifiedUsers,
      valueClass: "text-indigo-700",
      cardClass:
        "bg-gradient-to-br from-indigo-50 to-white border-indigo-200 hover:border-indigo-300",
      barClass: "bg-indigo-500",
    },
    {
      label: "Admins",
      value: adminCount,
      valueClass: "text-slate-900",
      cardClass:
        "bg-gradient-to-br from-slate-50 to-white border-slate-200 hover:border-slate-300",
      barClass: "bg-slate-400",
    },
  ];

  return (
    <div className="w-full max-w-6xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-900">
          Administration
        </div>
        <h1 className="m-0 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[28px] lg:text-[34px]">
          Admin <span className="text-blue-600">Overview</span>
        </h1>
        <div className="mt-3.5 h-[3px] w-[38px] rounded-full bg-blue-500" />
        <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-slate-600">
          Platform statistics and recent activity.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-3.5 min-[480px]:grid-cols-2 sm:mb-8 lg:grid-cols-4 lg:gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`group relative min-w-0 overflow-hidden rounded-[14px] border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(30,64,175,0.10)] ${s.cardClass}`}
          >
            <span
              className={`absolute inset-y-0 left-0 w-[3px] ${s.barClass}`}
              aria-hidden="true"
            />
            <p className="m-0 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {s.label}
            </p>
            <p
              className={`m-0 truncate text-xl font-bold tracking-tight sm:text-2xl ${s.valueClass}`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Users Table */}
      <Card className="overflow-hidden rounded-[14px] border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 pb-4">
          <CardTitle className="text-[15px] font-bold tracking-tight text-blue-900">
            Recent signups
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-slate-200 bg-blue-50/60">
                  {["Name", "Email", "Role", "Status"].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-blue-50/40"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {u.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{u.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                          u.role === "ADMIN"
                            ? "border-blue-900 bg-blue-900 text-white"
                            : "border-slate-200 bg-slate-100 text-slate-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                          u.isActive
                            ? "border-sky-200 bg-sky-50 text-sky-700"
                            : "border-rose-200 bg-rose-50 text-rose-600"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${
                            u.isActive ? "bg-sky-500" : "bg-rose-500"
                          }`}
                        />
                        {u.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
