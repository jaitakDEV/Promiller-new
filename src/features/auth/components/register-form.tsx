"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link"; // NEW
import { toast } from "sonner";
import { getCountryCallingCode, type CountryCode } from "libphonenumber-js"; // NEW
import { registerSchema, type RegisterInput } from "@/validations/auth";
import { LEGAL_DOCUMENTS } from "@/config/legal"; // NEW
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// NEW: fixed list keeps server and browser output identical (no hydration warning).
const COUNTRIES: { code: CountryCode; name: string }[] = [
  { code: "IN", name: "India" },
  { code: "AE", name: "UAE" },
  { code: "NP", name: "Nepal" },
  { code: "BD", name: "Bangladesh" },
  { code: "LK", name: "Sri Lanka" },
  { code: "PK", name: "Pakistan" },
  { code: "BT", name: "Bhutan" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" },
  { code: "OM", name: "Oman" },
  { code: "BH", name: "Bahrain" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
];
const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({
  ...c,
  dial: getCountryCallingCode(c.code),
}));

const termsHref =
  LEGAL_DOCUMENTS.find((d) => d.document === "TERMS")?.href ?? "/legal/terms";
const privacyHref =
  LEGAL_DOCUMENTS.find((d) => d.document === "PRIVACY")?.href ??
  "/legal/privacy";

const labelStyle = {
  fontSize: "11px",
  fontWeight: 700,
  color: "#0951a5",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
};
const linkStyle = {
  color: "#0951a5",
  fontWeight: 600,
  textDecoration: "underline",
};

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    // NEW: defaults (India selected, consent unticked)
    defaultValues: {
      name: "",
      email: "",
      phoneCountry: "IN",
      phone: "",
      password: "",
      acceptTerms: false,
    },
  });

  const phoneError = errors.phone?.message ?? errors.phoneCountry?.message; // NEW

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
        <Label htmlFor="name" style={labelStyle}>
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
        <Label htmlFor="email" style={labelStyle}>
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

      {/* NEW: phone number */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Label htmlFor="phone" style={labelStyle}>
          Phone Number
        </Label>
        <div style={{ display: "flex", gap: "8px" }}>
          <select
            id="phoneCountry"
            aria-label="Country code"
            suppressHydrationWarning
            style={{
              height: "44px",
              width: "150px",
              flexShrink: 0,
              borderRadius: "10px",
              border: `1px solid ${errors.phoneCountry ? "#ef4444" : "#e2e8f0"}`,
              background: "#fff",
              fontSize: "14px",
              padding: "0 8px",
              boxSizing: "border-box",
            }}
            {...register("phoneCountry")}
          >
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} (+{c.dial})
              </option>
            ))}
          </select>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="98765 43210"
            autoComplete="tel-national"
            aria-invalid={!!phoneError}
            aria-describedby={phoneError ? "phone-error" : "phone-help"}
            suppressHydrationWarning
            style={{
              height: "44px",
              borderRadius: "10px",
              borderColor: phoneError ? "#ef4444" : "#e2e8f0",
              fontSize: "14px",
              flex: 1,
              minWidth: 0,
              boxSizing: "border-box",
            }}
            {...register("phone")}
          />
        </div>
        {phoneError ? (
          <p
            id="phone-error"
            role="alert"
            style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}
          >
            {phoneError}
          </p>
        ) : (
          <p
            id="phone-help"
            style={{ fontSize: "12px", color: "#64748b", margin: 0 }}
          >
            Used for account support and security. We never sell it.
          </p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Label htmlFor="password" style={labelStyle}>
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

      {/* NEW: consent */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          htmlFor="acceptTerms"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            fontSize: "13px",
            lineHeight: 1.5,
            color: "#334155",
            cursor: "pointer",
          }}
        >
          <input
            id="acceptTerms"
            type="checkbox"
            aria-invalid={!!errors.acceptTerms}
            aria-describedby={errors.acceptTerms ? "consent-error" : undefined}
            style={{
              marginTop: "3px",
              width: "16px",
              height: "16px",
              flexShrink: 0,
            }}
            {...register("acceptTerms")}
          />
          <span>
            I agree to the{" "}
            <Link
              href={termsHref}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Terms of Service
            </Link>{" "}
            and have read the{" "}
            <Link
              href={privacyHref}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.acceptTerms && (
          <p
            id="consent-error"
            role="alert"
            style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}
          >
            {errors.acceptTerms.message}
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
          background: loading ? "#1a6fd4" : "#0951a5",
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
