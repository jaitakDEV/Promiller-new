import Decimal from "decimal.js";
import { roundMoney, roundPercent } from "@/lib/money";

/*
 * ROUNDING POLICY (atta-cost model)
 * 1. All arithmetic uses exact decimal maths (decimal.js). Nothing is rounded in between.
 * 2. Money results are rounded half-up to 2 decimals (paise), once, at the end.
 *    Percent results use 2 decimals.
 * 3. Pack lines read like an invoice: before-tax is rounded, GST = round(before-tax x rate),
 *    ex-factory = before-tax + GST, and MRP = round(ex-factory / ((1 - dist) x (1 - retail))).
 *    Every printed figure can be reproduced from the figures printed before it.
 * 4. Pack prices use the unrounded per-kg atta price. User inputs are never rounded.
 * Any change to these rules needs a new calculator version (lib/version.ts).
 */

const D = (n: number) => new Decimal(n);
const HALF_UP = Decimal.ROUND_HALF_UP;

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

export const PACK_KEYS = ["5hdpe", "5ld", "10hdpe", "10ld", "50hdpe"] as const;
export type PackKey = (typeof PACK_KEYS)[number];

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
function yieldDecimal(inp: CostInputs): Decimal {
  return D(100)
    .minus(inp.cleaningLossPct)
    .minus(inp.grindingLossPct)
    .minus(inp.branRefractionPct)
    .minus(inp.feedRefractionPct)
    .minus(inp.processLossPct)
    .plus(inp.moistureGainPct);
}

export function computeYield(inp: CostInputs) {
  const y = yieldDecimal(inp);
  return { yieldPct: y.toNumber(), yieldFrac: y.div(100).toNumber() };
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

/** Unrounded costing (see ROUNDING POLICY). Use calculateAttaCost for output. */
export function computeCosting(inp: CostInputs): CostingResult {
  const base = D(inp.wheatPrice)
    .plus(inp.unloading)
    .plus(inp.millingCharges)
    .plus(inp.loadingOfAtta);

  const bran = D(inp.branRefractionPct)
    .div(100)
    .times(D(inp.branSalePrice).minus(inp.branPackingMaterial));
  const feed = D(inp.feedRefractionPct).div(100).times(inp.feedSalePrice);
  const otherTotal = D(inp.boriQty).times(inp.boriPrice);
  const otherPerKg = inp.wheatQty > 0 ? otherTotal.div(inp.wheatQty) : D(0);

  const gateWheat = base.minus(bran).minus(feed).minus(otherPerKg);

  const yieldPct = yieldDecimal(inp);
  const yieldFrac = yieldPct.div(100);
  const gateAtta = yieldFrac.gt(0) ? gateWheat.div(yieldFrac) : D(0);

  const margin = gateAtta.times(D(inp.millMarginPct).div(100));
  const salePrice = gateAtta.plus(margin);

  return {
    wheatCostPerKg: inp.wheatPrice,
    unloadingPerKg: inp.unloading,
    millingChargesPerKg: inp.millingCharges,
    loadingPerKg: inp.loadingOfAtta,
    productCostBasePerKg: base.toNumber(),
    branIncomePerKg: bran.toNumber(),
    feedIncomePerKg: feed.toNumber(),
    otherIncomePerKg: otherPerKg.toNumber(),
    otherIncomeTotal: otherTotal.toNumber(),
    costAtMillGatePerKgWheat: gateWheat.toNumber(),
    yieldPct: yieldPct.toNumber(),
    costAtMillGatePerKgAtta: gateAtta.toNumber(),
    millMarginPerKg: margin.toNumber(),
    millSalePricePerKg: salePrice.toNumber(),
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

export interface PackPriceArgs {
  millSalePricePerKgAtta: number;
  packWeightKg: number;
  packMaterialCost: number;
  innerMaterialPerKg: number;
  outerBag: number;
  gstPct: number;
  distributorMarginPct: number;
  retailerMarginPct: number;
}

export function computePackPrice(a: PackPriceArgs): PackPriceResult {
  const costBeforeTax = D(a.millSalePricePerKgAtta)
    .times(a.packWeightKg)
    .plus(a.packMaterialCost)
    .plus(D(a.innerMaterialPerKg).times(a.packWeightKg))
    .plus(a.outerBag)
    .toDecimalPlaces(2, HALF_UP);

  const gst = costBeforeTax
    .times(a.gstPct)
    .div(100)
    .toDecimalPlaces(2, HALF_UP);
  const exFactory = costBeforeTax.plus(gst);

  // Margins of 100% or more cannot produce a price: return 0 instead of Infinity.
  const divisor = D(1)
    .minus(D(a.distributorMarginPct).div(100))
    .times(D(1).minus(D(a.retailerMarginPct).div(100)));
  const marketPrice = divisor.gt(0)
    ? exFactory.div(divisor).toDecimalPlaces(2, HALF_UP)
    : D(0);

  return {
    costBeforeTax: costBeforeTax.toNumber(),
    gst: gst.toNumber(),
    exFactory: exFactory.toNumber(),
    marketPrice: marketPrice.toNumber(),
  };
}

// ---------------------------------------------------------------------------
// The full calculation (pure: no I/O, no randomness, no clock).
// The browser uses it for the live preview and the server uses it again when
// a report is issued, so both always agree.
// ---------------------------------------------------------------------------
export interface PackRow extends PackPriceResult {
  key: PackKey;
  label: string;
  weight: number;
  material: number;
}

export interface AttaCostInput {
  inputs: CostInputs;
  packMaterials: Record<PackKey, number>;
  packSettings: PackSettings;
}

export interface AttaCostResult {
  costing: CostingResult;
  packRows: PackRow[];
  recommended: PackRow | undefined;
}

// Rounds the costing figures for output (see ROUNDING POLICY at the top).
function roundCosting(c: CostingResult): CostingResult {
  return {
    wheatCostPerKg: roundMoney(c.wheatCostPerKg),
    unloadingPerKg: roundMoney(c.unloadingPerKg),
    millingChargesPerKg: roundMoney(c.millingChargesPerKg),
    loadingPerKg: roundMoney(c.loadingPerKg),
    productCostBasePerKg: roundMoney(c.productCostBasePerKg),
    branIncomePerKg: roundMoney(c.branIncomePerKg),
    feedIncomePerKg: roundMoney(c.feedIncomePerKg),
    otherIncomePerKg: roundMoney(c.otherIncomePerKg),
    otherIncomeTotal: roundMoney(c.otherIncomeTotal),
    costAtMillGatePerKgWheat: roundMoney(c.costAtMillGatePerKgWheat),
    yieldPct: roundPercent(c.yieldPct),
    costAtMillGatePerKgAtta: roundMoney(c.costAtMillGatePerKgAtta),
    millMarginPerKg: roundMoney(c.millMarginPerKg),
    millSalePricePerKg: roundMoney(c.millSalePricePerKg),
  };
}

export function calculateAttaCost(input: AttaCostInput): AttaCostResult {
  const { inputs, packMaterials, packSettings } = input;

  // Packs use the unrounded per-kg price; only the final outputs are rounded.
  const raw = computeCosting(inputs);

  const packRows: PackRow[] = PACK_KEYS.map((key) => {
    const meta = PACK_META[key];
    const material = packMaterials[key];
    const price = computePackPrice({
      millSalePricePerKgAtta: raw.millSalePricePerKg,
      packWeightKg: meta.weight,
      packMaterialCost: material,
      innerMaterialPerKg: packSettings.inner,
      outerBag: packSettings.outer,
      gstPct: packSettings.gstPct,
      distributorMarginPct: packSettings.distPct,
      retailerMarginPct: packSettings.retPct,
    });
    return { key, label: meta.label, weight: meta.weight, material, ...price };
  });

  const recommended = packRows.find((p) => p.key === packSettings.selected);
  return { costing: roundCosting(raw), packRows, recommended };
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
