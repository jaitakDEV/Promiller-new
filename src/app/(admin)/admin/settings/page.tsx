import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/app";
import { DeleteAccountButton } from "@/features/profile/components/delete-account-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata = { title: "Admin — Settings" };

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session?.user) redirect(ROUTES.login);

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
          Settings
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
          Manage your account preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle
            style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}
          >
            Notifications
          </CardTitle>
          <CardDescription>
            Email notification preferences coming in Version 2.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{
              padding: "12px 14px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "13px",
              color: "#94a3b8",
            }}
          >
            🔔 Notification settings will be available in the next update.
          </div>
        </CardContent>
      </Card>

      <Card style={{ borderColor: "#fecaca" }}>
        <CardHeader>
          <CardTitle
            style={{ fontSize: "14px", fontWeight: 600, color: "#dc2626" }}
          >
            Danger zone
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{
              padding: "12px 14px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              fontSize: "13px",
              color: "#dc2626",
              marginBottom: "1rem",
            }}
          >
            ⚠️ Once deleted, your account cannot be recovered.
          </div>
          <DeleteAccountButton userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  );
}
