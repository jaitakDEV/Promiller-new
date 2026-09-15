// import { auth } from "@/server/auth";
// import { redirect } from "next/navigation";
// import { db } from "@/server/db";
// import { ROUTES } from "@/config/app";

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
//     { label: "Total users", value: totalUsers },
//     { label: "Active users", value: activeUsers },
//     { label: "Unverified", value: unverifiedUsers },
//     { label: "Admins", value: adminCount },
//   ];

//   return (
//     <div>
//       <h1 style={{ fontSize: "22px", fontWeight: 500, marginBottom: "2rem" }}>
//         Overview
//       </h1>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
//           gap: "12px",
//           marginBottom: "2rem",
//         }}
//       >
//         {stats.map((s) => (
//           <div
//             key={s.label}
//             style={{
//               background: "var(--color-background-secondary)",
//               borderRadius: "var(--border-radius-md)",
//               padding: "1rem",
//             }}
//           >
//             <p
//               style={{
//                 fontSize: "13px",
//                 color: "var(--color-text-secondary)",
//                 margin: "0 0 6px",
//               }}
//             >
//               {s.label}
//             </p>
//             <p style={{ fontSize: "24px", fontWeight: 500, margin: 0 }}>
//               {s.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div
//         style={{
//           background: "var(--color-background-primary)",
//           border: "0.5px solid var(--color-border-tertiary)",
//           borderRadius: "var(--border-radius-lg)",
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             padding: "1rem 1.25rem",
//             borderBottom: "0.5px solid var(--color-border-tertiary)",
//           }}
//         >
//           <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
//             Recent signups
//           </p>
//         </div>
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             fontSize: "13px",
//           }}
//         >
//           <thead>
//             <tr style={{ background: "var(--color-background-secondary)" }}>
//               <th
//                 style={{
//                   padding: "10px 16px",
//                   textAlign: "left",
//                   fontWeight: 500,
//                   color: "var(--color-text-secondary)",
//                 }}
//               >
//                 Name
//               </th>
//               <th
//                 style={{
//                   padding: "10px 16px",
//                   textAlign: "left",
//                   fontWeight: 500,
//                   color: "var(--color-text-secondary)",
//                 }}
//               >
//                 Email
//               </th>
//               <th
//                 style={{
//                   padding: "10px 16px",
//                   textAlign: "left",
//                   fontWeight: 500,
//                   color: "var(--color-text-secondary)",
//                 }}
//               >
//                 Role
//               </th>
//               <th
//                 style={{
//                   padding: "10px 16px",
//                   textAlign: "left",
//                   fontWeight: 500,
//                   color: "var(--color-text-secondary)",
//                 }}
//               >
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentUsers.map((u, i) => (
//               <tr
//                 key={u.id}
//                 style={{
//                   borderTop: "0.5px solid var(--color-border-tertiary)",
//                   background:
//                     i % 2 === 1
//                       ? "var(--color-background-secondary)"
//                       : undefined,
//                 }}
//               >
//                 <td style={{ padding: "10px 16px" }}>{u.name ?? "—"}</td>
//                 <td
//                   style={{
//                     padding: "10px 16px",
//                     color: "var(--color-text-secondary)",
//                   }}
//                 >
//                   {u.email}
//                 </td>
//                 <td style={{ padding: "10px 16px" }}>
//                   <span
//                     style={{
//                       fontSize: "11px",
//                       padding: "2px 8px",
//                       borderRadius: "10px",
//                       background:
//                         u.role === "ADMIN"
//                           ? "var(--color-background-warning)"
//                           : "var(--color-background-secondary)",
//                       color:
//                         u.role === "ADMIN"
//                           ? "var(--color-text-warning)"
//                           : "var(--color-text-secondary)",
//                     }}
//                   >
//                     {u.role}
//                   </span>
//                 </td>
//                 <td style={{ padding: "10px 16px" }}>
//                   <span
//                     style={{
//                       fontSize: "11px",
//                       padding: "2px 8px",
//                       borderRadius: "10px",
//                       background: u.isActive
//                         ? "var(--color-background-success)"
//                         : "var(--color-background-danger)",
//                       color: u.isActive
//                         ? "var(--color-text-success)"
//                         : "var(--color-text-danger)",
//                     }}
//                   >
//                     {u.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
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
      bg: "#eff6ff",
      border: "#bfdbfe",
      color: "#1d4ed8",
    },
    {
      label: "Active users",
      value: activeUsers,
      bg: "#f0fdf4",
      border: "#bbf7d0",
      color: "#16a34a",
    },
    {
      label: "Unverified",
      value: unverifiedUsers,
      bg: "#fffbeb",
      border: "#fde68a",
      color: "#d97706",
    },
    {
      label: "Admins",
      value: adminCount,
      bg: "#fef2f2",
      border: "#fecaca",
      color: "#dc2626",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 6px",
            letterSpacing: "-0.5px",
          }}
        >
          Admin Overview
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
          Platform statistics and recent activity.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: s.bg,
              border: `1px solid ${s.border}`,
              borderRadius: "12px",
              padding: "1.25rem",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "#64748b",
                margin: "0 0 8px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {s.label}
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: 800,
                margin: 0,
                color: s.color,
                letterSpacing: "-1px",
              }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Users Table */}
      <Card>
        <CardHeader>
          <CardTitle
            style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}
          >
            Recent signups
          </CardTitle>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {["Name", "Email", "Role", "Status"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#64748b",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontWeight: 500,
                        color: "#0f172a",
                      }}
                    >
                      {u.name ?? "—"}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#64748b" }}>
                      {u.email}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          fontWeight: 600,
                          background:
                            u.role === "ADMIN" ? "#fef2f2" : "#f1f5f9",
                          color: u.role === "ADMIN" ? "#dc2626" : "#475569",
                        }}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          fontWeight: 600,
                          background: u.isActive ? "#f0fdf4" : "#fef2f2",
                          color: u.isActive ? "#16a34a" : "#dc2626",
                        }}
                      >
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
