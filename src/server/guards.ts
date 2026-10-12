import { cache } from "react";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";
import { getPendingConsents } from "@/server/consent";

/** Ends a session that is no longer allowed, then goes to the login page. */
export const END_SESSION_ROUTE = "/api/auth/end-session";

export type GuardedUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
  emailVerified: Date;
};

/**
 * Authoritative access check for protected pages. It reads the database, so a
 * deactivated or demoted user loses access immediately (not when the token expires).
 *
 * `next` is where the user should land after accepting updated terms.
 */
export const requireUser = cache(
  async (next?: string): Promise<GuardedUser> => {
    const session = await auth();
    if (!session?.user?.id) redirect(ROUTES.login);

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        isActive: true,
        emailVerified: true,
      },
    });

    // The token can outlive the account. Sending such a visitor to /login would
    // bounce back (the proxy redirects signed-in visitors), so end the session.
    if (!user || !user.isActive) {
      redirect(`${END_SESSION_ROUTE}?reason=inactive`);
    }
    if (!user.emailVerified) {
      redirect(`${END_SESSION_ROUTE}?reason=unverified`);
    }

    const pending = await getPendingConsents(user.id);
    if (pending.length > 0) {
      redirect(
        next
          ? `${ROUTES.consent}?next=${encodeURIComponent(next)}`
          : ROUTES.consent,
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      emailVerified: user.emailVerified,
    };
  },
);

export type UserAccess =
  | { ok: true; user: GuardedUser }
  | { ok: false; error: string };

/**
 * Same checks as requireUser, for server actions: returns an error message
 * instead of redirecting.
 */
export async function getUserAccess(): Promise<UserAccess> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Please sign in again." };

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      isActive: true,
      emailVerified: true,
    },
  });
  if (!user || !user.isActive) {
    return { ok: false, error: "Your account is not active." };
  }
  if (!user.emailVerified) {
    return { ok: false, error: "Please verify your email first." };
  }

  const pending = await getPendingConsents(user.id);
  if (pending.length > 0) {
    return { ok: false, error: "Please accept the updated terms to continue." };
  }

  return {
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      emailVerified: user.emailVerified,
    },
  };
}
