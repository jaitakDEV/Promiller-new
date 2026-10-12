import type { Metadata } from "next";
import { ComingSoonCalculator } from "@/features/calculators/components/coming-soon-calculator";

export const metadata: Metadata = {
  title: "Conveying Capacity Calculator — Coming soon",
};

export default function ConveyingCapacityPage() {
  return <ComingSoonCalculator slug="conveying-capacity" />;
}
