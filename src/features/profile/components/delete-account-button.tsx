"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { deleteAccountAction } from "@/features/profile/actions/delete-account";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/config/app";

const dangerButton = {
  fontSize: "13px",
  color: "var(--color-text-danger)",
  background: "none",
  border: "0.5px solid var(--color-border-danger)",
  borderRadius: "var(--border-radius-md)",
  padding: "7px 14px",
  cursor: "pointer",
} as const;

export function DeleteAccountButton() {
  const [confirm, setConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    const res = await deleteAccountAction({ password });
    if (res.success) {
      await signOut({ callbackUrl: ROUTES.login });
      return;
    }
    setError(res.error);
    setLoading(false);
  }

  function cancel() {
    setConfirm(false);
    setPassword("");
    setError(null);
  }

  if (!confirm) {
    return (
      <button onClick={() => setConfirm(true)} style={dangerButton}>
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
        Are you sure? This cannot be undone. Your reports and company details
        will be deleted too.
      </p>
      <div>
        <Label htmlFor="deletePassword">Enter your password to confirm</Label>
        <Input
          id="deletePassword"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: "6px", maxWidth: "320px" }}
        />
      </div>
      {error && (
        <p style={{ fontSize: "13px", color: "var(--color-text-danger)" }}>
          {error}
        </p>
      )}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={handleDelete}
          disabled={loading || password.length === 0}
          style={dangerButton}
        >
          {loading ? "Deleting…" : "Yes, delete my account"}
        </button>
        <button
          onClick={cancel}
          disabled={loading}
          style={{
            ...dangerButton,
            color: "var(--color-text-secondary)",
            border: "0.5px solid var(--color-border-secondary)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
