import type { Metadata, Viewport } from "next";
import { AuthSessionProvider } from "@/components/shared/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { NetworkStatus } from "@/components/shared/network-status";
import "./globals.css";

export const metadata: Metadata = {
  title: "Promiller",
  description: "The all-in-one platform to manage your business smarter.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <AuthSessionProvider>{children}</AuthSessionProvider>
        <Toaster richColors position="top-right" />
        <NetworkStatus />
      </body>
    </html>
  );
}
