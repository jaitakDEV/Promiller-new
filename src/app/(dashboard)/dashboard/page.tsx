// import { auth } from "@/server/auth";
// import { redirect } from "next/navigation";
// import { db } from "@/server/db";
// import { ROUTES } from "@/config/app";
// import { formatDate } from "@/lib/utils";

// export const metadata = { title: "Dashboard" };

// export default async function DashboardHomePage() {
//   const session = await auth();
//   if (!session?.user) redirect(ROUTES.login);

//   const user = await db.user.findUnique({
//     where: { id: session.user.id },
//     select: { name: true, email: true, createdAt: true, role: true },
//   });

//   if (!user) redirect(ROUTES.login);

//   return (
//     <div>
//       <h1 style={{ fontSize: "22px", fontWeight: 500, marginBottom: "6px" }}>
//         Welcome back, {user.name?.split(" ")[0] ?? "there"}
//       </h1>
//       <p
//         style={{
//           fontSize: "14px",
//           color: "var(--color-text-secondary)",
//           marginBottom: "2rem",
//         }}
//       >
//         Here's an overview of your account.
//       </p>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//           gap: "12px",
//           marginBottom: "2rem",
//         }}
//       >
//         <div
//           style={{
//             background: "var(--color-background-secondary)",
//             borderRadius: "var(--border-radius-md)",
//             padding: "1rem",
//           }}
//         >
//           <p
//             style={{
//               fontSize: "13px",
//               color: "var(--color-text-secondary)",
//               margin: "0 0 6px",
//             }}
//           >
//             Account status
//           </p>
//           <p
//             style={{
//               fontSize: "18px",
//               fontWeight: 500,
//               margin: 0,
//               color: "var(--color-text-success)",
//             }}
//           >
//             Active
//           </p>
//         </div>
//         <div
//           style={{
//             background: "var(--color-background-secondary)",
//             borderRadius: "var(--border-radius-md)",
//             padding: "1rem",
//           }}
//         >
//           <p
//             style={{
//               fontSize: "13px",
//               color: "var(--color-text-secondary)",
//               margin: "0 0 6px",
//             }}
//           >
//             Role
//           </p>
//           <p style={{ fontSize: "18px", fontWeight: 500, margin: 0 }}>
//             {user.role}
//           </p>
//         </div>
//         <div
//           style={{
//             background: "var(--color-background-secondary)",
//             borderRadius: "var(--border-radius-md)",
//             padding: "1rem",
//           }}
//         >
//           <p
//             style={{
//               fontSize: "13px",
//               color: "var(--color-text-secondary)",
//               margin: "0 0 6px",
//             }}
//           >
//             Member since
//           </p>
//           <p style={{ fontSize: "18px", fontWeight: 500, margin: 0 }}>
//             {formatDate(user.createdAt)}
//           </p>
//         </div>
//       </div>

//       <div
//         style={{
//           background: "var(--color-background-primary)",
//           border: "0.5px solid var(--color-border-tertiary)",
//           borderRadius: "var(--border-radius-lg)",
//           padding: "1.25rem",
//         }}
//       >
//         <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>
//           Quick actions
//         </p>
//         <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//           <a
//             href={ROUTES.profile}
//             style={{
//               fontSize: "13px",
//               padding: "6px 14px",
//               borderRadius: "var(--border-radius-md)",
//               border: "0.5px solid var(--color-border-secondary)",
//               color: "var(--color-text-primary)",
//               textDecoration: "none",
//               display: "flex",
//               alignItems: "center",
//               gap: "6px",
//             }}
//           >
//             <i
//               className="ti ti-user"
//               style={{ fontSize: "15px" }}
//               aria-hidden="true"
//             />{" "}
//             Edit profile
//           </a>
//           <a
//             href={ROUTES.settings}
//             style={{
//               fontSize: "13px",
//               padding: "6px 14px",
//               borderRadius: "var(--border-radius-md)",
//               border: "0.5px solid var(--color-border-secondary)",
//               color: "var(--color-text-primary)",
//               textDecoration: "none",
//               display: "flex",
//               alignItems: "center",
//               gap: "6px",
//             }}
//           >
//             <i
//               className="ti ti-settings"
//               style={{ fontSize: "15px" }}
//               aria-hidden="true"
//             />{" "}
//             Settings
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Dashboard — MDSSC" };

export default async function DashboardHomePage() {
  const session = await auth();
  if (!session?.user) redirect(ROUTES.login);

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, createdAt: true, role: true },
  });

  if (!user) redirect(ROUTES.login);

  const stats = [
    {
      label: "Account status",
      value: "Active",
      valueColor: "#16a34a",
      bg: "#f0fdf4",
      border: "#bbf7d0",
    },
    {
      label: "Role",
      value: user.role,
      valueColor: "#1d4ed8",
      bg: "#eff6ff",
      border: "#bfdbfe",
    },
    {
      label: "Member since",
      value: formatDate(user.createdAt),
      valueColor: "#0f172a",
      bg: "#f8fafc",
      border: "#e2e8f0",
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
          Good to see you, {user.name?.split(" ")[0] ?? "there"} 👋
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
          Here&apos;s an overview of your MDSSC account.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: stat.bg,
              border: `1px solid ${stat.border}`,
              borderRadius: "12px",
              padding: "1.25rem",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                margin: "0 0 8px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "20px",
                fontWeight: 700,
                margin: 0,
                color: stat.valueColor,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle
            style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}
          >
            Quick actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link
              href={ROUTES.profile}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#374151",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              👤 Edit profile
            </Link>
            <Link
              href={ROUTES.settings}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#374151",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              ⚙️ Settings
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
