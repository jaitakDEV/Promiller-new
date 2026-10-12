"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCountryCallingCode, type CountryCode } from "libphonenumber-js";
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/validations/auth";
import { updateProfileAction } from "@/features/profile/actions/update-profile";
import { COUNTRY_OPTIONS } from "@/lib/countries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  /**
   * Pass to show the phone field (null = no phone saved yet).
   * Leave undefined to hide the field (e.g. forms that don't manage phone).
   */
  defaultPhone?: { country: CountryCode; national: string } | null;
};

export function ProfileForm({ user, defaultPhone }: Props) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const showPhone = defaultPhone !== undefined;
  const defaultCountry: CountryCode = defaultPhone?.country ?? "IN";
  // A saved number from a country outside the fixed list still shows correctly.
  const countryOptions = COUNTRY_OPTIONS.some((c) => c.code === defaultCountry)
    ? COUNTRY_OPTIONS
    : [
        ...COUNTRY_OPTIONS,
        {
          code: defaultCountry,
          name: defaultCountry,
          dial: getCountryCallingCode(defaultCountry),
        },
      ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name ?? "",
      image: user.image ?? "",
      ...(showPhone
        ? { phoneCountry: defaultCountry, phone: defaultPhone?.national ?? "" }
        : {}),
    },
  });

  const phoneError = errors.phone?.message ?? errors.phoneCountry?.message;

  async function onSubmit(data: UpdateProfileInput) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const res = await updateProfileAction(data);
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
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          type="text"
          style={{ marginTop: "6px" }}
          {...register("name")}
        />
        {errors.name && (
          <p
            style={{
              fontSize: "12px",
              color: "var(--color-text-danger)",
              marginTop: "4px",
            }}
          >
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          value={user.email}
          disabled
          style={{ marginTop: "6px", opacity: 0.6 }}
        />
        <p
          style={{
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            marginTop: "4px",
          }}
        >
          Email cannot be changed.
        </p>
      </div>

      {showPhone && (
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
            <select
              id="phoneCountry"
              aria-label="Country code"
              suppressHydrationWarning
              style={{
                height: "36px",
                width: "150px",
                flexShrink: 0,
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                background: "transparent",
                fontSize: "14px",
                padding: "0 8px",
              }}
              {...register("phoneCountry")}
            >
              {countryOptions.map((c) => (
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
              suppressHydrationWarning
              style={{ flex: 1, minWidth: 0 }}
              {...register("phone")}
            />
          </div>
          {phoneError ? (
            <p
              role="alert"
              style={{
                fontSize: "12px",
                color: "var(--color-text-danger)",
                marginTop: "4px",
              }}
            >
              {phoneError}
            </p>
          ) : (
            <p
              style={{
                fontSize: "12px",
                color: "var(--color-text-secondary)",
                marginTop: "4px",
              }}
            >
              Used for account support and security.
            </p>
          )}
        </div>
      )}

      {success && (
        <p style={{ fontSize: "13px", color: "var(--color-text-success)" }}>
          Profile updated successfully.
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
        {loading ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
