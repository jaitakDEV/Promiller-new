import type {
  CalculationReport,
  CalculatorType,
  CompanyProfile,
  ConsentDocument,
  ConsentRecord,
  ReportStatus,
  Role,
  User,
} from "@prisma/client";

// Prisma models and enums re-exported so features import from one place.
// (Use `import { CalculatorType } from "@prisma/client"` when you need the enum values.)
export type {
  CalculationReport,
  CalculatorType,
  CompanyProfile,
  ConsentDocument,
  ConsentRecord,
  ReportStatus,
  Role,
};

// ───── user types ─────

// password hash must never reach the client
export type SafeUser = Omit<User, "hashedPassword">;

// session mein sirf yeh fields chahiye (no phone, no consent: see guards)
export type SessionUser = {
  id: string;
  name?: string | null;
  email: string | null | undefined;
  image?: string | null;
  role: string;
  emailVerified: Date | null;
};

// ───── role type ─────

export type UserRole = Role; // "USER" | "ADMIN"

// ───── reports ─────

/** Snapshot stored in calculation_reports.issuedTo (JSON) at issue time. */
export type ReportIssuedTo = {
  name: string | null;
  companyName: string | null;
  city: string | null;
  state: string | null;
  gstin: string | null;
};

/** Fields the dashboard reports list needs. */
export type ReportListItem = Pick<
  CalculationReport,
  | "id"
  | "reportNo"
  | "title"
  | "calculatorType"
  | "headline"
  | "status"
  | "createdAt"
>;

// ───── api response wrapper ─────

export type ApiResponse<T> =
  | { success: true; data: T; error?: never }
  | { success: false; error: string; data?: never };
