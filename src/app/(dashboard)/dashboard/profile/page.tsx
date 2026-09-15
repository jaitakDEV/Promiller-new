import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { ROUTES } from "@/config/app";
import { ProfileForm } from "@/features/profile/components/profile-form";
import { PasswordChangeForm } from "@/features/profile/components/password-change-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata = { title: "Profile — MDSSC" };

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect(ROUTES.login);

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, image: true },
  });

  if (!user) redirect(ROUTES.login);

  return (
    <div
      style={{
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 6px",
            letterSpacing: "-0.5px",
          }}
        >
          Profile
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
          Update your personal information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle
            style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}
          >
            Personal info
          </CardTitle>
          <CardDescription>
            Update your name and profile picture.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm user={user} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle
            style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}
          >
            Change password
          </CardTitle>
          <CardDescription>
            Choose a strong password with at least 8 characters.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordChangeForm userId={user.id} />
        </CardContent>
      </Card>
    </div>
  );
}
