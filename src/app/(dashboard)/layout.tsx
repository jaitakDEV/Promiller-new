import { ROUTES } from "@/config/app";
import { requireUser } from "@/server/guards";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { DashboardTopbar } from "@/features/dashboard/components/dashboard-topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Session, active account, verified email and accepted terms: from the database.
  const user = await requireUser(ROUTES.dashboard);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5F9FE" }}>
      <DashboardSidebar user={user} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <DashboardTopbar user={user} />
        <main
          style={{
            flex: 1,
            padding: "2rem",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
