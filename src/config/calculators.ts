import type { CalculatorType } from "@prisma/client";
import { ATTA_COST_VERSION } from "@/features/calculators/atta-cost/lib/version";
export type Localized = { en: string; hi: string };
export type Locale = keyof Localized;
export type CalculatorStatus = "live" | "coming-soon";

export type CalculatorConfig = {
  /** URL segment and folder name: /calculators/<slug> */
  slug: string;
  /** Prisma enum stored on every report */
  type: CalculatorType;
  name: Localized;
  description: Localized;
  /** Icon key; the card component maps it to an icon */
  icon: "wheat" | "conveyor" | "zap";
  status: CalculatorStatus;
  /** Every tool needs a signed-in, verified user */
  requiresAuth: boolean;
  /** Calculation model version stored on every report */
  version: string;
  /** Report number prefix, e.g. ATC-2026-000123 */
  reportPrefix: "ATC" | "CVC" | "PSC";
};

// Every CalculatorType value in the Prisma enum needs an entry here.
export const CALCULATORS: readonly CalculatorConfig[] = [
  {
    slug: "atta-cost",
    type: "ATTA_PRICING",
    name: {
      en: "Atta Pricing Calculator",
      hi: "आटा प्राइसिंग कैलकुलेटर",
    },
    description: {
      en: "Work out atta cost, yield and pack-wise selling prices for your mill.",
      hi: "अपनी मिल के लिए आटे की लागत, यील्ड और पैक-वार बिक्री मूल्य निकालें।",
    },
    icon: "wheat",
    status: "live",
    requiresAuth: true,
    version: ATTA_COST_VERSION,
    reportPrefix: "ATC",
  },
  {
    slug: "conveying-capacity",
    type: "CONVEYING_CAPACITY",
    name: {
      en: "Conveying Capacity Calculator",
      hi: "कन्वेयिंग क्षमता कैलकुलेटर",
    },
    description: {
      en: "Estimate how much material your conveying line can move per hour.",
      hi: "अनुमान लगाएँ कि आपकी कन्वेयिंग लाइन प्रति घंटे कितना माल ले जा सकती है।",
    },
    icon: "conveyor",
    status: "coming-soon",
    requiresAuth: true,
    version: "conveying-capacity@0.0.0",
    reportPrefix: "CVC",
  },
  {
    slug: "power-saving",
    type: "POWER_SAVING",
    name: {
      en: "Power Saving Calculator",
      hi: "बिजली बचत कैलकुलेटर",
    },
    description: {
      en: "Estimate the electricity and cost you can save in your mill.",
      hi: "अनुमान लगाएँ कि आपकी मिल में बिजली और खर्च में कितनी बचत हो सकती है।",
    },
    icon: "zap",
    status: "coming-soon",
    requiresAuth: true,
    version: "power-saving@0.0.0",
    reportPrefix: "PSC",
  },
];

// Guard against copy-paste mistakes when a calculator is added.
if (new Set(CALCULATORS.map((c) => c.slug)).size !== CALCULATORS.length) {
  throw new Error("Duplicate calculator slug in config/calculators.ts");
}
if (
  new Set(CALCULATORS.map((c) => c.reportPrefix)).size !== CALCULATORS.length
) {
  throw new Error("Duplicate report prefix in config/calculators.ts");
}
if (new Set(CALCULATORS.map((c) => c.type)).size !== CALCULATORS.length) {
  throw new Error("Duplicate calculator type in config/calculators.ts");
}

export function getCalculator(slug: string): CalculatorConfig | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}

export function getCalculatorByType(
  type: CalculatorType,
): CalculatorConfig | undefined {
  return CALCULATORS.find((c) => c.type === type);
}

export function isLive(calculator: CalculatorConfig): boolean {
  return calculator.status === "live";
}

export function calculatorPath(slug: string): string {
  return `/calculators/${slug}`;
}

export function localize(value: Localized, locale: Locale): string {
  return value[locale] ?? value.en;
}
