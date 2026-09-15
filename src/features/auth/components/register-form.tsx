"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { registerSchema, type RegisterInput } from "@/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterInput) {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setLoading(false);

    if (!json.success) {
      const errorMessage = json.error ?? "Something went wrong";
      setError(errorMessage);
      toast.error("Registration failed", {
        description: errorMessage,
        duration: 4000,
      });
      return;
    }

    toast.success("Account created!", {
      description: "Check your inbox and verify your email to get started.",
      duration: 5000,
    });
    setSuccess(true);
  }

  if (success) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          padding: "16px 18px",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "10px",
          fontSize: "14px",
          color: "#15803d",
        }}
      >
        <span style={{ fontSize: "18px", lineHeight: 1 }}>📬</span>
        <div>
          <p style={{ fontWeight: 600, margin: "0 0 4px" }}>Check your email</p>
          <p style={{ margin: 0, lineHeight: 1.6, color: "#166534" }}>
            We&apos;ve sent a verification link. Click it to activate your
            account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Label
          htmlFor="name"
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#0951a5",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Name Surname"
          autoComplete="name"
          suppressHydrationWarning
          style={{
            height: "44px",
            borderRadius: "10px",
            borderColor: errors.name ? "#ef4444" : "#e2e8f0",
            fontSize: "14px",
            width: "100%",
            boxSizing: "border-box",
          }}
          {...register("name")}
        />
        {errors.name && (
          <p style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Label
          htmlFor="email"
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#0951a5",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Work Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          suppressHydrationWarning
          style={{
            height: "44px",
            borderRadius: "10px",
            borderColor: errors.email ? "#ef4444" : "#e2e8f0",
            fontSize: "14px",
            width: "100%",
            boxSizing: "border-box",
          }}
          {...register("email")}
        />
        {errors.email && (
          <p style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Label
          htmlFor="password"
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#0951a5 ",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Password
        </Label>
        <div style={{ position: "relative" }}>
          <Input
            id="password"
            type={showPass ? "text" : "password"}
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            autoComplete="new-password"
            suppressHydrationWarning
            style={{
              height: "44px",
              borderRadius: "10px",
              borderColor: errors.password ? "#ef4444" : "#e2e8f0",
              fontSize: "14px",
              paddingRight: "90px",
              width: "100%",
              boxSizing: "border-box",
            }}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              color: "#94a3b8",
              fontWeight: 500,
              padding: 0,
              whiteSpace: "nowrap",
            }}
          >
            {showPass ? "Hide" : "Show password"}
          </button>
        </div>
        {errors.password && (
          <p style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            padding: "10px 14px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "10px",
            fontSize: "13px",
            color: "#dc2626",
          }}
        >
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        style={{
          height: "44px",
          width: "100%",
          background: loading ? "#1a6fd4 " : "#0951a5 ",
          color: "#fff",
          fontWeight: 600,
          fontSize: "14px",
          borderRadius: "10px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          marginTop: "4px",
        }}
      >
        {loading ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
