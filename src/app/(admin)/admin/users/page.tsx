import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleUserStatusButton } from "@/features/admin/components/toggle-user-status-button";

export const metadata = { title: "Admin — Users" };

const PAGE_SIZE = 20;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN")
    redirect(ROUTES.dashboard);

  const { page: pageParam, q } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? 1));
  const query = q?.trim() ?? "";

  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          { email: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
      },
    }),
    db.user.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 4px",
              letterSpacing: "-0.5px",
            }}
          >
            Users
            <span
              style={{
                fontSize: "15px",
                color: "#94a3b8",
                fontWeight: 400,
                marginLeft: "8px",
              }}
            >
              ({total})
            </span>
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
            Manage all registered users.
          </p>
        </div>

        <form method="GET" style={{ display: "flex", gap: "8px" }}>
          <input
            name="q"
            defaultValue={query}
            placeholder="Search name or email…"
            style={{
              fontSize: "13px",
              padding: "8px 12px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              background: "#fff",
              color: "#0f172a",
              width: "220px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              fontSize: "13px",
              padding: "8px 16px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              background: "#1d4ed8",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Search
          </button>
          {query && (
            <Link
              href={ROUTES.adminUsers}
              style={{
                fontSize: "13px",
                padding: "8px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                color: "#64748b",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                background: "#fff",
              }}
            >
              Clear
            </Link>
          )}
        </form>
      </div>

      <Card style={{ marginBottom: "1rem" }}>
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
                  {[
                    "Name",
                    "Email",
                    "Role",
                    "Status",
                    "Verified",
                    "Joined",
                    "Actions",
                  ].map((h) => (
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
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontWeight: 600,
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
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          fontWeight: 600,
                          background: u.emailVerified ? "#f0fdf4" : "#fffbeb",
                          color: u.emailVerified ? "#16a34a" : "#d97706",
                        }}
                      >
                        {u.emailVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#94a3b8" }}>
                      {u.createdAt.toLocaleDateString()}
                    </td>

                    <td style={{ padding: "12px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          alignItems: "center",
                        }}
                      >
                        <ToggleUserStatusButton
                          userId={u.id}
                          isActive={u.isActive}
                          isSelf={u.id === session.user.id}
                        />
                        <Link
                          href={`${ROUTES.adminUsers}/${u.id}`}
                          style={{
                            fontSize: "12px",
                            color: "#1d4ed8",
                            textDecoration: "none",
                            fontWeight: 600,
                            padding: "4px 10px",
                            border: "1px solid #bfdbfe",
                            borderRadius: "6px",
                            background: "#eff6ff",
                          }}
                        >
                          View →
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        padding: "3rem",
                        textAlign: "center",
                        color: "#94a3b8",
                      }}
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div
          style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`${ROUTES.adminUsers}?page=${p}${query ? `&q=${query}` : ""}`}
              style={{
                fontSize: "13px",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                textDecoration: "none",
                background: p === page ? "#1d4ed8" : "#fff",
                color: p === page ? "#fff" : "#475569",
                fontWeight: p === page ? 600 : 400,
              }}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
