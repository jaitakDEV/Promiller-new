import type { Metadata } from "next";
import { ComingSoonCalculator } from "@/features/calculators/components/coming-soon-calculator";

export const metadata: Metadata = {
  title: "Power Saving Calculator — Coming soon",
};

export default function PowerSavingPage() {
  return <ComingSoonCalculator slug="power-saving" />;
}
