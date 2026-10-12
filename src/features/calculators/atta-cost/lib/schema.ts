import { z } from "zod";
import { PACK_KEYS, computeYield } from "./calculator";

const money = z
  .number()
  .min(0, "Must be 0 or more")
  .max(1_000_000, "Value is too large");
const percent = z
  .number()
  .min(0, "Must be 0 or more")
  .max(100, "Cannot be more than 100%");
// A margin of 100% or more would make the retail price impossible.
const marginBelow100 = z
  .number()
  .min(0, "Must be 0 or more")
  .max(99.99, "Must be less than 100%");
const quantity = z
  .number()
  .min(0, "Must be 0 or more")
  .max(1_000_000_000, "Value is too large");

const costInputsSchema = z.strictObject({
  wheatPrice: money,
  unloading: money,
  millingCharges: money,
  loadingOfAtta: money,
  cleaningLossPct: percent,
  grindingLossPct: percent,
  processLossPct: percent,
  moistureGainPct: percent,
  branRefractionPct: percent,
  branSalePrice: money,
  branPackingMaterial: money,
  feedRefractionPct: percent,
  feedSalePrice: money,
  wheatQty: quantity,
  boriQty: quantity,
  boriPrice: money,
  millMarginPct: z
    .number()
    .min(0, "Must be 0 or more")
    .max(200, "Cannot be more than 200%"),
});

const packMaterialsSchema = z.strictObject({
  "5hdpe": money,
  "5ld": money,
  "10hdpe": money,
  "10ld": money,
  "50hdpe": money,
});

const packSettingsSchema = z.strictObject({
  inner: money,
  outer: money,
  gstPct: percent,
  distPct: marginBelow100,
  retPct: marginBelow100,
  selected: z.enum(PACK_KEYS),
});

/** Everything the calculator needs; used on the server before a report is issued. */
export const attaCostInputSchema = z
  .strictObject({
    inputs: costInputsSchema,
    packMaterials: packMaterialsSchema,
    packSettings: packSettingsSchema,
  })
  .superRefine((value, ctx) => {
    if (computeYield(value.inputs).yieldPct <= 0) {
      ctx.addIssue({
        code: "custom",
        path: ["inputs", "cleaningLossPct"],
        message: "Total losses must stay below 100% to get a valid yield",
      });
    }
  });
