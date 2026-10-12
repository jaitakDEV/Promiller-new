"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { apiError, apiSuccess } from "@/lib/utils";
import { normalizeGstin } from "@/lib/gstin";
import {
  companyProfileSchema,
  type CompanyProfileInput,
} from "@/validations/company";

// The user id comes from the session, never from the client.
export async function updateCompanyProfileAction(data: CompanyProfileInput) {
  const session = await auth();
  if (!session?.user?.id) return apiError("Please sign in again.");
  const userId = session.user.id;

  const parsed = companyProfileSchema.safeParse(data);
  if (!parsed.success) return apiError(parsed.error.issues[0].message);
  const { companyName, city, state, gstin } = parsed.data;

  const values = {
    companyName: companyName || null,
    city: city || null,
    state: state || null,
    gstin: gstin.trim() ? normalizeGstin(gstin) : null,
  };

  try {
    await db.companyProfile.upsert({
      where: { userId },
      update: values,
      create: { userId, ...values },
    });
    return apiSuccess(null);
  } catch {
    return apiError("Failed to save company details. Please try again.");
  }
}
