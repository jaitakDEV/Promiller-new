import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import type { CountryCode } from "libphonenumber-js";
import { db } from "@/server/db";
import { registerSchema } from "@/validations/auth";
import { createEmailVerificationToken } from "@/server/tokens";
import { sendVerificationEmail } from "@/server/email";
import { apiError, apiSuccess } from "@/lib/utils";
import { normalizePhone } from "@/lib/phone";
import { getRequestIp, rateLimit, rateLimitMessage } from "@/lib/rate-limit";
import { currentConsentRows, getConsentEvidence } from "@/server/consent";

// Same wording for a duplicate email or a duplicate phone, so the response
// does not reveal which one matched.
const DUPLICATE_MESSAGE =
  "An account with these details already exists. Try logging in or resetting your password.";

export async function POST(req: Request) {
  try {
    // 1. Rate limit (every attempt counts, including duplicates)
    const ip = await getRequestIp();
    const limit = await rateLimit("register", ip);
    if (!limit.success) {
      return NextResponse.json(apiError(rateLimitMessage(limit)), {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      });
    }

    // 2. Parse and validate
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(apiError("Invalid request"), { status: 400 });
    }

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(apiError(parsed.error.issues[0].message), {
        status: 400,
      });
    }

    const { name, email, password, phone, phoneCountry } = parsed.data;

    // 3. Normalise phone to E.164 (+919876543210)
    const e164 = normalizePhone(phone, phoneCountry as CountryCode);
    if (!e164) {
      return NextResponse.json(apiError("Enter a valid phone number"), {
        status: 400,
      });
    }

    // 4. Duplicate check (email or phone)
    const existing = await db.user.findFirst({
      where: { OR: [{ email }, { phone: e164 }] },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(apiError(DUPLICATE_MESSAGE), { status: 409 });
    }

    // 5. Create user + consent records in ONE transaction (nested write)
    const hashedPassword = await bcrypt.hash(password, 12);
    const evidence = await getConsentEvidence();

    const user = await db.user.create({
      data: {
        name,
        email,
        phone: e164,
        hashedPassword,
        role: "USER",
        consentRecords: { create: currentConsentRows(evidence) },
      },
    });

    // 6. Email verification (unchanged)
    const token = await createEmailVerificationToken(user.id, email);
    await sendVerificationEmail(email, token);

    return NextResponse.json(
      apiSuccess({ message: "Check your email to verify your account" }),
      { status: 201 },
    );
  } catch (error) {
    // Two concurrent signups can both pass the check above; the unique
    // indexes on email/phone then reject the second one.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(apiError(DUPLICATE_MESSAGE), { status: 409 });
    }
    // Log only the error type: Prisma messages can echo email/phone values.
    console.error(
      "[REGISTER_POST]",
      error instanceof Error ? error.name : "UnknownError",
    );
    return NextResponse.json(apiError("Something went wrong"), { status: 500 });
  }
}
