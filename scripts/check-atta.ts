import {
  calculateAttaCost,
  fmtINR,
} from "../src/features/calculators/atta-cost/lib/calculator";
import { attaCostInputSchema } from "../src/features/calculators/atta-cost/lib/schema";

const sample = {
  inputs: {
    wheatPrice: 30,
    unloading: 0.2,
    millingCharges: 1.5,
    loadingOfAtta: 0.3,
    cleaningLossPct: 1,
    grindingLossPct: 1,
    processLossPct: 0.5,
    moistureGainPct: 2,
    branRefractionPct: 20,
    branSalePrice: 22,
    branPackingMaterial: 0.5,
    feedRefractionPct: 3,
    feedSalePrice: 12,
    wheatQty: 1000,
    boriQty: 10,
    boriPrice: 15,
    millMarginPct: 5,
  },
  packMaterials: { "5hdpe": 6, "5ld": 4, "10hdpe": 8, "10ld": 6, "50hdpe": 25 },
  packSettings: {
    inner: 0.1,
    outer: 1,
    gstPct: 5,
    distPct: 8,
    retPct: 10,
    selected: "5ld" as const,
  },
};

const parsed = attaCostInputSchema.safeParse(sample);
if (!parsed.success) {
  console.log("Sample rejected:", parsed.error.issues);
  process.exit(1);
}

const { costing, packRows, recommended } = calculateAttaCost(parsed.data);
console.log("Yield %              :", costing.yieldPct);
console.log("Cost at mill gate/kg :", fmtINR(costing.costAtMillGatePerKgAtta));
console.log("Mill sale price/kg   :", fmtINR(costing.millSalePricePerKg));
for (const row of packRows) {
  console.log(row.label.padEnd(20), fmtINR(row.marketPrice));
}
console.log("Recommended          :", recommended?.label);

function expectInvalid(name: string, change: (v: typeof sample) => unknown) {
  const result = attaCostInputSchema.safeParse(change(structuredClone(sample)));
  console.log(
    name.padEnd(26),
    result.success
      ? "ACCEPTED (unexpected!)"
      : "rejected: " + result.error.issues[0].message,
  );
}
console.log("\nInvalid inputs:");
expectInvalid("distributor margin 100%", (v) => {
  v.packSettings.distPct = 100;
  return v;
});
expectInvalid("losses above 100%", (v) => {
  v.inputs.cleaningLossPct = 60;
  v.inputs.grindingLossPct = 60;
  return v;
});
expectInvalid("negative wheat price", (v) => {
  v.inputs.wheatPrice = -1;
  return v;
});
expectInvalid("unknown field", (v) => ({ ...v, extra: 1 }));
