import { redirect } from "next/navigation";
import { ROUTES } from "@/config/app";
import { requireUser } from "@/server/guards";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { AdminTopbar } from "@/features/admin/components/admin-topbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser(ROUTES.admin);
  // Role comes from the database: a demoted admin loses access immediately.
  if (user.role !== "ADMIN") redirect(ROUTES.dashboard);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5F9FE" }}>
      <AdminSidebar />
      <div
        style={{
          flex: "1 1 0%",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <AdminTopbar user={user} />
        <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
      </div>
    </div>
  );
}
