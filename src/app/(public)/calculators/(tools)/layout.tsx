import type { Metadata } from "next";
import { requireUser } from "@/server/guards";

// Tool pages are for signed-in users only, so search engines should skip them.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Layer 2 of the access control: every calculator under (tools) needs a
// signed-in, active, verified user who has accepted the current terms.
export default async function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser("/calculators");
  return <>{children}</>;
}
