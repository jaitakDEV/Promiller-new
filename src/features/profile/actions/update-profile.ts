"use server";

import { Prisma } from "@prisma/client";
import type { CountryCode } from "libphonenumber-js";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { updateProfileSchema } from "@/validations/auth";
import { apiError, apiSuccess } from "@/lib/utils";
import { DEFAULT_COUNTRY, normalizePhone } from "@/lib/phone";
import type { UpdateProfileInput } from "@/validations/auth";

const PHONE_TAKEN_MESSAGE =
  "This phone number cannot be used. Please try a different number.";

// The user id comes from the session, never from the client.
export async function updateProfileAction(data: UpdateProfileInput) {
  const session = await auth();
  if (!session?.user?.id) return apiError("Please sign in again.");
  const userId = session.user.id;

  const parsed = updateProfileSchema.safeParse(data);
  if (!parsed.success) return apiError(parsed.error.issues[0].message);
  const { name, image, phone, phoneCountry } = parsed.data;

  const current = await db.user.findUnique({
    where: { id: userId },
    select: { phone: true },
  });
  if (!current) return apiError("Account not found.");

  // phone === undefined: this form does not manage the phone number.
  let phoneChanged = false;
  let nextPhone: string | null = current.phone;

  if (phone !== undefined) {
    if (phone) {
      const e164 = normalizePhone(
        phone,
        (phoneCountry ?? DEFAULT_COUNTRY) as CountryCode,
      );
      if (!e164) return apiError("Enter a valid phone number");
      nextPhone = e164;
    } else if (current.phone) {
      return apiError("Phone number cannot be removed.");
    }
    phoneChanged = nextPhone !== current.phone;
  }

  if (phoneChanged && nextPhone) {
    const taken = await db.user.findFirst({
      where: { phone: nextPhone, NOT: { id: userId } },
      select: { id: true },
    });
    if (taken) return apiError(PHONE_TAKEN_MESSAGE);
  }

  try {
    await db.user.update({
      where: { id: userId },
      data: {
        name,
        image: image || null,
        // A changed number is unverified again (used from V2 onwards).
        ...(phoneChanged ? { phone: nextPhone, phoneVerifiedAt: null } : {}),
      },
    });
    return apiSuccess(null);
  } catch (error) {
    if (
      phoneChanged &&
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return apiError(PHONE_TAKEN_MESSAGE);
    }
    return apiError("Failed to update profile. Please try again.");
  }
}
