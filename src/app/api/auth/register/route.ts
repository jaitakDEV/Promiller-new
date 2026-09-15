import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";
import { registerSchema } from "@/validations/auth";
import { createEmailVerificationToken } from "@/server/tokens";
import { sendVerificationEmail } from "@/server/email";
import { apiError, apiSuccess } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(apiError(parsed.error.issues[0].message), {
        status: 400,
      });
    }

    const { name, email, password } = parsed.data;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        apiError("An account with this email already exists"),
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: { name, email, hashedPassword, role: "USER" },
    });

    const token = await createEmailVerificationToken(user.id, email);
    await sendVerificationEmail(email, token);

    return NextResponse.json(
      apiSuccess({ message: "Check your email to verify your account" }),
      { status: 201 },
    );
  } catch (error) {
    console.error("[REGISTER_POST]", error);
    return NextResponse.json(apiError("Something went wrong"), { status: 500 });
  }
}
