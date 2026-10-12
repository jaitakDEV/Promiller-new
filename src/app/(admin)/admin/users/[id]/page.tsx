import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Link from "next/link";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";
import { LEGAL_DOCUMENTS } from "@/config/legal";
import { formatDate } from "@/lib/utils";
import { formatIst } from "@/lib/datetime";
import { formatPhone } from "@/lib/phone";
import { logAdminAction, requireAdminPage } from "@/server/admin-guard";
import { AdminUserActions } from "@/features/admin/components/admin-user-actions";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
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
        <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>{title}</p>
      </div>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        padding: "10px 1.25rem",
        borderBottom: "0.5px solid var(--color-border-tertiary)",
        fontSize: "13px",
      }}
    >
      <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
      <span
        style={{
          fontWeight: 500,
          color: "var(--color-text-primary)",
          textAlign: "right",
          wordBreak: "break-word",
          ...(mono ? { fontFamily: "var(--font-mono)", fontSize: "12px" } : {}),
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Verified against the database, not just the session token.
  const admin = await requireAdminPage();
  const { id } = await params;

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      phoneVerifiedAt: true,
      role: true,
      isActive: true,
      emailVerified: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      companyProfile: {
        select: { companyName: true, city: true, state: true, gstin: true },
      },
      consentRecords: {
        select: { id: true, document: true, version: true, acceptedAt: true },
        orderBy: { acceptedAt: "desc" },
        take: 20,
      },
      _count: { select: { sessions: true } },
    },
  });

  if (!user) notFound();

  // Full phone and GSTIN are shown below: record who looked (ids only).
  logAdminAction(admin.id, "view-user-details", user.id);

  const isSelf = admin.id === user.id;
  const company = user.companyProfile;

  const fields = [
    { label: "ID", value: user.id, mono: true },
    { label: "Email", value: user.email, mono: true },
    {
      label: "Phone",
      value: user.phone ? formatPhone(user.phone) : "—",
      mono: true,
    },
    {
      label: "Phone verified",
      value: user.phoneVerifiedAt
        ? formatDate(user.phoneVerifiedAt)
        : "Not verified",
    },
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

  const documentTitle = (document: string) =>
    LEGAL_DOCUMENTS.find((d) => d.document === document)?.title ?? document;

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

      <Section title="User info">
        {fields.map((f) => (
          <Row key={f.label} label={f.label} value={f.value} mono={f.mono} />
        ))}
      </Section>

      <Section title="Company details">
        {company &&
        (company.companyName ||
          company.city ||
          company.state ||
          company.gstin) ? (
          <>
            <Row label="Company / mill" value={company.companyName ?? "—"} />
            <Row label="City" value={company.city ?? "—"} />
            <Row label="State" value={company.state ?? "—"} />
            <Row label="GSTIN" value={company.gstin ?? "—"} mono />
          </>
        ) : (
          <p
            style={{
              padding: "12px 1.25rem",
              margin: 0,
              fontSize: "13px",
              color: "var(--color-text-secondary)",
            }}
          >
            Not provided.
          </p>
        )}
      </Section>

      <Section title="Consent history">
        {user.consentRecords.length > 0 ? (
          user.consentRecords.map((c) => (
            <Row
              key={c.id}
              label={`${documentTitle(c.document)} (version ${c.version})`}
              value={formatIst(c.acceptedAt)}
            />
          ))
        ) : (
          <p
            style={{
              padding: "12px 1.25rem",
              margin: 0,
              fontSize: "13px",
              color: "var(--color-text-secondary)",
            }}
          >
            No consent recorded yet. This user will be asked to accept the
            current terms at their next sign-in.
          </p>
        )}
      </Section>

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
