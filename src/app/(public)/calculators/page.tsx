import type { Metadata } from "next";
import { auth } from "@/server/auth";
import Calculators from "@/features/calculators/components/calculators-list";

export const metadata: Metadata = {
  title: "Calculators",
  description:
    "Atta pricing, conveying capacity and power saving calculators built for flour mills.",
};

export default async function CalculatorsPage() {
  // Read on the server only to choose the button state; nothing private is rendered.
  const session = await auth();
  const access = !session?.user
    ? "guest"
    : session.user.emailVerified
      ? "ready"
      : "unverified";

  return <Calculators access={access} />;
}
