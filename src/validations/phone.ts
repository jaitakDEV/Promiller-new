import { z } from "zod";
import { getCountries, type CountryCode } from "libphonenumber-js";
import { normalizePhone } from "@/lib/phone";

const COUNTRY_SET: ReadonlySet<string> = new Set(getCountries());

export const phoneFieldShape = {
  phoneCountry: z
    .string()
    .refine((c) => COUNTRY_SET.has(c), "Select a valid country"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(20, "Phone number is too long"),
};

/** Cross-field check: the number must be valid for the selected country. */
export function refinePhone(
  data: { phone: string; phoneCountry: string },
  ctx: z.RefinementCtx,
) {
  if (!data.phone || !COUNTRY_SET.has(data.phoneCountry)) return;
  if (!normalizePhone(data.phone, data.phoneCountry as CountryCode)) {
    ctx.addIssue({
      code: "custom",
      path: ["phone"],
      message: "Enter a valid phone number",
    });
  }
}

/** Required consent checkbox (Terms of Service + Privacy Policy). */
export const consentField = z.boolean().refine((v) => v === true, {
  message: "You must accept the Terms of Service and Privacy Policy",
});
