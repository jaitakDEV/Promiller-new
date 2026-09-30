export interface CostInputs {
  // Step 1 — Wheat & process cost (₹/kg wheat)
  wheatPrice: number;
  unloading: number;
  millingCharges: number;
  loadingOfAtta: number;

  // Step 2 — Yield (wheat → atta conversion, %)
  cleaningLossPct: number;
  grindingLossPct: number;
  processLossPct: number;
  moistureGainPct: number;

  // Step 3 — Byproduct income
  branRefractionPct: number;
  branSalePrice: number;
  branPackingMaterial: number;
  feedRefractionPct: number;
  feedSalePrice: number;
  wheatQty: number;
  boriQty: number;
  boriPrice: number;

  // Step 4 — Mill margin (kept alongside other inputs, feeds Step 4 & 5)
  millMarginPct: number;
}

export type PackKey = "5hdpe" | "5ld" | "10hdpe" | "10ld" | "50hdpe";

export interface PackMeta {
  label: string;
  weight: number;
  type: "hdpe" | "ld";
}

export const PACK_META: Record<PackKey, PackMeta> = {
  "5hdpe": { label: "5 kg HDPE", weight: 5, type: "hdpe" },
  "5ld": { label: "5 kg LD Pouch", weight: 5, type: "ld" },
  "10hdpe": { label: "10 kg HDPE", weight: 10, type: "hdpe" },
  "10ld": { label: "10 kg LD Pouch", weight: 10, type: "ld" },
  "50hdpe": { label: "50 kg HDPE", weight: 50, type: "hdpe" },
};

export interface PackSettings {
  inner: number;
  outer: number;
  gstPct: number;
  distPct: number;
  retPct: number;
  selected: PackKey;
}

// All numeric fields start at 0 — rendered as empty inputs (see Field.tsx),
// so a new user sees a blank form and fills in their own mill's numbers
// instead of being shown someone else's sample data.
export const DEFAULT_INPUTS: CostInputs = {
  wheatPrice: 0,
  unloading: 0,
  millingCharges: 0,
  loadingOfAtta: 0,
  cleaningLossPct: 0,
  grindingLossPct: 0,
  processLossPct: 0,
  moistureGainPct: 0,
  branRefractionPct: 0,
  branSalePrice: 0,
  branPackingMaterial: 0,
  feedRefractionPct: 0,
  feedSalePrice: 0,
  wheatQty: 0,
  boriQty: 0,
  boriPrice: 0,
  millMarginPct: 0,
};

export const DEFAULT_PACK_MATERIALS: Record<PackKey, number> = {
  "5hdpe": 0,
  "5ld": 0,
  "10hdpe": 0,
  "10ld": 0,
  "50hdpe": 0,
};

export const DEFAULT_PACK_SETTINGS: PackSettings = {
  inner: 0,
  outer: 0,
  gstPct: 0,
  distPct: 0,
  retPct: 0,
  // Kept as a real choice, not a "fill me in" value — a select needs some
  // option pre-picked, so this stays instead of being zeroed like the
  // numeric fields above.
  selected: "5ld",
};

// ---------------------------------------------------------------------------
// Yield
// ---------------------------------------------------------------------------
export function computeYield(inp: CostInputs) {
  const yieldPct =
    100 -
    inp.cleaningLossPct -
    inp.grindingLossPct -
    inp.branRefractionPct -
    inp.feedRefractionPct -
    inp.processLossPct +
    inp.moistureGainPct;
  return { yieldPct, yieldFrac: yieldPct / 100 };
}

// ---------------------------------------------------------------------------
// Costing (per kg wheat -> per kg atta via yield)
// ---------------------------------------------------------------------------
export interface CostingResult {
  wheatCostPerKg: number;
  unloadingPerKg: number;
  millingChargesPerKg: number;
  loadingPerKg: number;
  productCostBasePerKg: number;
  branIncomePerKg: number;
  feedIncomePerKg: number;
  otherIncomePerKg: number;
  otherIncomeTotal: number;
  costAtMillGatePerKgWheat: number;
  yieldPct: number;
  costAtMillGatePerKgAtta: number;
  millMarginPerKg: number;
  millSalePricePerKg: number;
}

export function computeCosting(inp: CostInputs): CostingResult {
  const wheatCostPerKg = inp.wheatPrice;
  const unloadingPerKg = inp.unloading;
  const millingChargesPerKg = inp.millingCharges;
  const loadingPerKg = inp.loadingOfAtta;
  const productCostBasePerKg =
    wheatCostPerKg + unloadingPerKg + millingChargesPerKg + loadingPerKg;

  const branIncomePerKg =
    (inp.branRefractionPct / 100) *
    (inp.branSalePrice - inp.branPackingMaterial);
  const feedIncomePerKg = (inp.feedRefractionPct / 100) * inp.feedSalePrice;
  const otherIncomeTotal = inp.boriQty * inp.boriPrice;
  const otherIncomePerKg =
    inp.wheatQty > 0 ? otherIncomeTotal / inp.wheatQty : 0;

  const costAtMillGatePerKgWheat =
    productCostBasePerKg - branIncomePerKg - feedIncomePerKg - otherIncomePerKg;

  const y = computeYield(inp);
  const costAtMillGatePerKgAtta =
    y.yieldFrac > 0 ? costAtMillGatePerKgWheat / y.yieldFrac : 0;

  const millMarginPerKg = costAtMillGatePerKgAtta * (inp.millMarginPct / 100);
  const millSalePricePerKg = costAtMillGatePerKgAtta + millMarginPerKg;

  return {
    wheatCostPerKg,
    unloadingPerKg,
    millingChargesPerKg,
    loadingPerKg,
    productCostBasePerKg,
    branIncomePerKg,
    feedIncomePerKg,
    otherIncomePerKg,
    otherIncomeTotal,
    costAtMillGatePerKgWheat,
    yieldPct: y.yieldPct,
    costAtMillGatePerKgAtta,
    millMarginPerKg,
    millSalePricePerKg,
  };
}

// ---------------------------------------------------------------------------
// Pack pricing (per pack size)
// ---------------------------------------------------------------------------
export interface PackPriceResult {
  costBeforeTax: number;
  gst: number;
  exFactory: number;
  marketPrice: number;
}

export function computePackPrice(
  millSalePricePerKgAtta: number,
  packWeightKg: number,
  packMaterialCost: number,
  innerMaterialPerKg: number,
  outerBag: number,
  gstPct: number,
  distributorMarginPct: number,
  retailerMarginPct: number,
): PackPriceResult {
  const innerMaterialCost = innerMaterialPerKg * packWeightKg;
  const costBeforeTax =
    millSalePricePerKgAtta * packWeightKg +
    packMaterialCost +
    innerMaterialCost +
    outerBag;
  const gst = costBeforeTax * (gstPct / 100);
  const exFactory = costBeforeTax + gst;
  const marketPrice =
    exFactory /
    (1 - distributorMarginPct / 100) /
    (1 - retailerMarginPct / 100);
  return { costBeforeTax, gst, exFactory, marketPrice };
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------
export function fmtINR(num: number): string {
  return (
    "\u20B9" +
    Number(num || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function fmtNum(num: number, dec = 2): string {
  return Number(num || 0).toLocaleString("en-IN", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}
