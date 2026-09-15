import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { createEmailVerificationToken } from "@/server/tokens";
import { sendVerificationEmail } from "@/server/email";
import { apiError, apiSuccess } from "@/lib/utils";

export async function POST() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(apiError("Unauthorized"), { status: 401 });
  }

  const { email } = session.user;

  const user = await db.user.findUnique({
    where: { email },
    select: { id: true, emailVerified: true },
  });

  if (!user)
    return NextResponse.json(apiError("User not found"), { status: 404 });
  if (user.emailVerified)
    return NextResponse.json(apiError("Email already verified"), {
      status: 400,
    });

  const token = await createEmailVerificationToken(user.id, email);
  await sendVerificationEmail(email, token);

  return NextResponse.json(apiSuccess({ message: "Verification email sent." }));
}
