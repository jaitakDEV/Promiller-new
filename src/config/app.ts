export const APP_NAME = "My SaaS App";
export const APP_DESCRIPTION = "The best SaaS platform";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  dashboard: "/dashboard",
  profile: "/dashboard/profile",
  settings: "/dashboard/settings",
  admin: "/admin",
  adminUsers: "/admin/users",
  adminProfile: "/admin/profile",
  adminSettings: "/admin/settings",
} as const;

export const PROTECTED_ROUTES = ["/dashboard", "/admin"] as const;
export const ADMIN_ROUTES = ["/admin"] as const;
export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
] as const;

export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export const MAX_FILE_SIZE_MB = 4;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const TOKEN_EXPIRY = {
  // passwordReset: 1 * 60 * 60 * 1000, // 1 hour
  passwordReset: 15 * 60 * 1000, // 15 minutes
  emailVerification: 24 * 60 * 60 * 1000, // 24 hours
  session: 30 * 24 * 60 * 60, // 30 days (seconds — NextAuth format)
} as const;
