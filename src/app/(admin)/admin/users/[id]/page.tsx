import { auth } from "@/server/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";
import { formatDate } from "@/lib/utils";
import { AdminUserActions } from "@/features/admin/components/admin-user-actions";
import Link from "next/link";

export default async function AdminUserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN")
    redirect(ROUTES.dashboard);

  const user = await db.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      emailVerified: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { sessions: true } },
    },
  });

  if (!user) notFound();

  const isSelf = session.user.id === user.id;

  const fields = [
    { label: "ID", value: user.id },
    { label: "Email", value: user.email },
    { label: "Role", value: user.role },
    { label: "Status", value: user.isActive ? "Active" : "Inactive" },
    {
      label: "Email verified",
      value: user.emailVerified
        ? formatDate(user.emailVerified)
        : "Not verified",
    },
    { label: "Active sessions", value: String(user._count.sessions) },
    { label: "Member since", value: formatDate(user.createdAt) },
    { label: "Last updated", value: formatDate(user.updatedAt) },
  ];

  return (
    <div style={{ maxWidth: "640px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "1.5rem",
        }}
      >
        <Link
          href={ROUTES.adminUsers}
          style={{
            fontSize: "13px",
            color: "var(--color-text-secondary)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            textDecoration: "none",
          }}
        >
          <i
            className="ti ti-arrow-left"
            style={{ fontSize: "15px" }}
            aria-hidden="true"
          />{" "}
          Users
        </Link>
        <span style={{ color: "var(--color-text-tertiary)" }}>/</span>
        <span
          style={{
            fontSize: "13px",
            color: "var(--color-text-primary)",
            fontWeight: 500,
          }}
        >
          {user.name ?? user.email}
        </span>
      </div>

      <div
        style={{
          background: "var(--color-background-primary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: "var(--border-radius-lg)",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            padding: "1rem 1.25rem",
            borderBottom: "0.5px solid var(--color-border-tertiary)",
          }}
        >
          <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
            User info
          </p>
        </div>
        {fields.map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 1.25rem",
              borderBottom: "0.5px solid var(--color-border-tertiary)",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "var(--color-text-secondary)" }}>
              {label}
            </span>
            <span
              style={{
                fontWeight: 500,
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {!isSelf && (
        <AdminUserActions
          user={{ id: user.id, role: user.role, isActive: user.isActive }}
        />
      )}
      {isSelf && (
        <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
          You cannot modify your own admin account from this panel.
        </p>
      )}
    </div>
  );
}
