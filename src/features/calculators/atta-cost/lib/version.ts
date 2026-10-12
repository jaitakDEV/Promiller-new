/**
 * Version of the atta-cost calculation model. It is stored on every report.
 * Bump it (and add a changelog entry) whenever a formula, rounding rule or
 * default changes. Old reports keep the version they were issued under.
 */
export const ATTA_COST_VERSION = "atta-cost@1.0.0";

export const ATTA_COST_CHANGELOG = [
  {
    version: "atta-cost@1.0.0",
    date: "2026-10-05",
    changes: [
      "Initial model: yield, costing per kg and pack-wise pricing.",
      "Pack price returns 0 (not Infinity) when margins reach 100%.",
      "Rounding: full precision inside, half-up to paise at the end, invoice-style pack lines.",
    ],
  },
] as const;
