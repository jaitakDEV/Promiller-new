import { redirect } from "next/navigation";
import { auth, signOut } from "@/server/auth";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";

const REASONS = ["inactive", "unverified"] as const;

export async function GET(request: Request) {
  const reasonParam = new URL(request.url).searchParams.get("reason");
  const reason = REASONS.find((r) => r === reasonParam) ?? "inactive";

  // Only end sessions that really are no longer allowed. This stops anyone
  // from logging a user out just by sending them a link.
  const session = await auth();
  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { isActive: true, emailVerified: true },
    });
    if (user?.isActive && user.emailVerified) redirect(ROUTES.dashboard);
  }

  await signOut({ redirectTo: `${ROUTES.login}?error=${reason}` });
  return new Response(null, { status: 204 });
}
