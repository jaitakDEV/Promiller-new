import { z } from "zod";
import { INDIAN_STATES } from "@/lib/indian-states";
import { validateGstin } from "@/lib/gstin";

// Optional text: empty is fine, otherwise it must fit the length rules.
function optionalText(label: string, min: number, max: number) {
  return z
    .string()
    .trim()
    .max(max, `${label} must be at most ${max} characters`)
    .refine(
      (v) => v === "" || v.length >= min,
      `${label} must be at least ${min} characters`,
    );
}

export const companyProfileSchema = z.object({
  companyName: optionalText("Company name", 2, 100),
  city: optionalText("City", 2, 60),
  state: z
    .string()
    .refine(
      (v) => v === "" || (INDIAN_STATES as readonly string[]).includes(v),
      "Select a valid state",
    ),
  gstin: z.string().superRefine((value, ctx) => {
    if (!value.trim()) return; // optional
    const result = validateGstin(value);
    if (!result.ok) {
      ctx.addIssue({
        code: "custom",
        message:
          result.reason === "format"
            ? "Enter a valid 15-character GSTIN"
            : result.reason === "state"
              ? "GSTIN has an invalid state code"
              : "GSTIN check digit is incorrect",
      });
    }
  }),
});

export type CompanyProfileInput = z.infer<typeof companyProfileSchema>;
