"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  adminToggleActiveAction,
  adminToggleRoleAction,
  adminDeleteUserAction,
} from "@/features/admin/actions/admin-user-actions";

type Props = { user: { id: string; role: string; isActive: boolean } };

export function AdminUserActions({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  async function run(
    action: () => Promise<{ success: boolean; error?: string }>,
    key: string,
  ) {
    setLoading(key);
    const res = await action();
    setLoading(null);
    if (res.success) router.refresh();
  }

  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>Actions</p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          onClick={() =>
            run(
              () => adminToggleActiveAction(user.id, !user.isActive),
              "active",
            )
          }
          disabled={loading === "active"}
          style={{
            fontSize: "13px",
            padding: "7px 14px",
            border: `0.5px solid var(--color-border-secondary)`,
            borderRadius: "var(--border-radius-md)",
            background: "none",
            cursor: "pointer",
            color: user.isActive
              ? "var(--color-text-danger)"
              : "var(--color-text-success)",
          }}
        >
          {loading === "active"
            ? "Saving…"
            : user.isActive
              ? "Deactivate account"
              : "Activate account"}
        </button>

        <button
          onClick={() =>
            run(
              () =>
                adminToggleRoleAction(
                  user.id,
                  user.role === "ADMIN" ? "USER" : "ADMIN",
                ),
              "role",
            )
          }
          disabled={loading === "role"}
          style={{
            fontSize: "13px",
            padding: "7px 14px",
            border: "0.5px solid var(--color-border-secondary)",
            borderRadius: "var(--border-radius-md)",
            background: "none",
            cursor: "pointer",
            color: "var(--color-text-primary)",
          }}
        >
          {loading === "role"
            ? "Saving…"
            : user.role === "ADMIN"
              ? "Demote to User"
              : "Promote to Admin"}
        </button>
      </div>

      <div
        style={{
          borderTop: "0.5px solid var(--color-border-tertiary)",
          paddingTop: "10px",
        }}
      >
        {!confirm ? (
          <button
            onClick={() => setConfirm(true)}
            style={{
              fontSize: "13px",
              color: "var(--color-text-danger)",
              background: "none",
              border: "0.5px solid var(--color-border-danger)",
              borderRadius: "var(--border-radius-md)",
              padding: "7px 14px",
              cursor: "pointer",
            }}
          >
            Delete user
          </button>
        ) : (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span
              style={{ fontSize: "13px", color: "var(--color-text-danger)" }}
            >
              Permanently delete this user?
            </span>
            <button
              onClick={() =>
                run(() => adminDeleteUserAction(user.id), "delete")
              }
              disabled={loading === "delete"}
              style={{
                fontSize: "13px",
                color: "var(--color-text-danger)",
                background: "none",
                border: "0.5px solid var(--color-border-danger)",
                borderRadius: "var(--border-radius-md)",
                padding: "5px 12px",
                cursor: "pointer",
              }}
            >
              {loading === "delete" ? "Deleting…" : "Confirm delete"}
            </button>
            <button
              onClick={() => setConfirm(false)}
              style={{
                fontSize: "13px",
                color: "var(--color-text-secondary)",
                background: "none",
                border: "0.5px solid var(--color-border-secondary)",
                borderRadius: "var(--border-radius-md)",
                padding: "5px 12px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
