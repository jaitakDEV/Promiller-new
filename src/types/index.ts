import type { User } from "@prisma/client";

//user types

// password hash kabhi client ko nahi bhejna
export type SafeUser = Omit<User, "password">;

// session mein sirf yeh fields chahiye
export type SessionUser = {
  id: string;
  name?: string | null;
  email: string | null | undefined;
  image?: string | null;
  role: string;
  emailVerified: Date | null;
};

//api response wrapper

export type ApiResponse<T> =
  | { success: true; data: T; error?: never }
  | { success: false; error: string; data?: never };

// role type

export type UserRole = "USER" | "ADMIN";
