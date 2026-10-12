"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { changePasswordAction } from "@/features/profile/actions/change-password";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const errorStyle = {
  fontSize: "12px",
  color: "var(--color-text-danger)",
  marginTop: "4px",
} as const;

export function PasswordChangeForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onSubmit(data: ChangePasswordInput) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const res = await changePasswordAction(data);
    setLoading(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess(true);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div>
        <Label htmlFor="currentPassword">Current password</Label>
        <Input
          id="currentPassword"
          type="password"
          autoComplete="current-password"
          style={{ marginTop: "6px" }}
          {...register("currentPassword")}
        />
        {errors.currentPassword && (
          <p style={errorStyle}>{errors.currentPassword.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="newPassword">New password</Label>
        <Input
          id="newPassword"
          type="password"
          autoComplete="new-password"
          style={{ marginTop: "6px" }}
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <p style={errorStyle}>{errors.newPassword.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm new password</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          style={{ marginTop: "6px" }}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p style={errorStyle}>{errors.confirmPassword.message}</p>
        )}
      </div>
      {success && (
        <p style={{ fontSize: "13px", color: "var(--color-text-success)" }}>
          Password changed successfully.
        </p>
      )}
      {error && (
        <p style={{ fontSize: "13px", color: "var(--color-text-danger)" }}>
          {error}
        </p>
      )}
      <Button
        type="submit"
        disabled={loading}
        style={{ alignSelf: "flex-start" }}
      >
        {loading ? "Saving…" : "Change password"}
      </Button>
    </form>
  );
}
