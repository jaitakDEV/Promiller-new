"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { deleteAccountAction } from "@/features/profile/actions/delete-account";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/app";

export function DeleteAccountButton({ userId }: { userId: string }) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const res = await deleteAccountAction(userId);
    if (res.success) {
      await signOut({ callbackUrl: ROUTES.login });
    }
    setLoading(false);
  }

  if (!confirm) {
    return (
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
        Delete my account
      </button>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <p
        style={{
          fontSize: "13px",
          color: "var(--color-text-danger)",
          fontWeight: 500,
        }}
      >
        Are you sure? This cannot be undone.
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={handleDelete}
          disabled={loading}
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
          {loading ? "Deleting…" : "Yes, delete my account"}
        </button>
        <button
          onClick={() => setConfirm(false)}
          style={{
            fontSize: "13px",
            color: "var(--color-text-secondary)",
            background: "none",
            border: "0.5px solid var(--color-border-secondary)",
            borderRadius: "var(--border-radius-md)",
            padding: "7px 14px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
