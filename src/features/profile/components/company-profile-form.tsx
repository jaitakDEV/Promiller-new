"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  companyProfileSchema,
  type CompanyProfileInput,
} from "@/validations/company";
import { updateCompanyProfileAction } from "@/features/profile/actions/update-company-profile";
import { INDIAN_STATES } from "@/lib/indian-states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const errorStyle = {
  fontSize: "12px",
  color: "var(--color-text-danger)",
  marginTop: "4px",
} as const;

const helpStyle = {
  fontSize: "12px",
  color: "var(--color-text-secondary)",
  marginTop: "4px",
} as const;

export function CompanyProfileForm({
  defaults,
}: {
  defaults: CompanyProfileInput;
}) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyProfileInput>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: defaults,
  });

  async function onSubmit(data: CompanyProfileInput) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const res = await updateCompanyProfileAction(data);
    setLoading(false);
    if (!res.success) {
      setError(res.error);
      return;
    }
    setSuccess(true);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div>
        <Label htmlFor="companyName">Company / mill name</Label>
        <Input
          id="companyName"
          type="text"
          autoComplete="organization"
          style={{ marginTop: "6px" }}
          {...register("companyName")}
        />
        {errors.companyName && (
          <p style={errorStyle}>{errors.companyName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          type="text"
          autoComplete="address-level2"
          style={{ marginTop: "6px" }}
          {...register("city")}
        />
        {errors.city && <p style={errorStyle}>{errors.city.message}</p>}
      </div>

      <div>
        <Label htmlFor="state">State</Label>
        <select
          id="state"
          suppressHydrationWarning
          style={{
            marginTop: "6px",
            height: "36px",
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            background: "transparent",
            fontSize: "14px",
            padding: "0 8px",
          }}
          {...register("state")}
        >
          <option value="">Select state</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.state && <p style={errorStyle}>{errors.state.message}</p>}
      </div>

      <div>
        <Label htmlFor="gstin">GSTIN (optional)</Label>
        <Input
          id="gstin"
          type="text"
          placeholder="27AAAAA0000A1Z5"
          autoCapitalize="characters"
          autoComplete="off"
          aria-invalid={!!errors.gstin}
          style={{ marginTop: "6px", textTransform: "uppercase" }}
          {...register("gstin")}
        />
        {errors.gstin ? (
          <p style={errorStyle}>{errors.gstin.message}</p>
        ) : (
          <p style={helpStyle}>
            Printed on your reports. All fields on this card are optional.
          </p>
        )}
      </div>

      {success && (
        <p style={{ fontSize: "13px", color: "var(--color-text-success)" }}>
          Company details saved.
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
        {loading ? "Saving…" : "Save company details"}
      </Button>
    </form>
  );
}
