import { z } from "zod";
import {
  consentField,
  phoneFieldShape,
  refinePhone,
} from "@/validations/phone";

//register
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    ...phoneFieldShape,
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    acceptTerms: consentField,
  })
  .superRefine(refinePhone);

export type RegisterInput = z.infer<typeof registerSchema>;

//login
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

//forgot password
export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

//reset password
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

//profile update
export const updateProfileSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    image: z.string().url().optional().or(z.literal("")),
    // Phone is optional here: forms that don't show it simply omit both fields.
    phoneCountry: phoneFieldShape.phoneCountry.optional(),
    phone: z.string().trim().max(20, "Phone number is too long").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.phone) {
      refinePhone(
        { phone: data.phone, phoneCountry: data.phoneCountry ?? "IN" },
        ctx,
      );
    }
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

//change password (signed-in user)
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

//delete account (re-enter password to confirm)
export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Enter your password to confirm"),
});

export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
