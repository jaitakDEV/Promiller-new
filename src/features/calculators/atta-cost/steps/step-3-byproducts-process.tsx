"use client";

import Card from "@/features/calculators/components/ui/card";
import Field from "@/features/calculators/components/ui/field";
import Button from "@/features/calculators/components/ui/button";
import { useLang } from "@/features/calculators/atta-cost/language-provider";
import type { CostInputs } from "@/features/calculators/atta-cost/lib/calculator";

export default function Step3Byproducts({
  inputs,
  update,
  onNext,
  onBack,
}: {
  inputs: CostInputs;
  update: <K extends keyof CostInputs>(key: K, value: CostInputs[K]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { t } = useLang();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      {/* Form card — mobile pe neeche, desktop pe left */}
      <Card
        title={t("s3Title")}
        subtitle={t("s3Sub")}
        className="order-2 lg:order-none"
      >
        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
          <Field
            label={t("in_bran")}
            hint="%"
            suffix="%"
            value={inputs.branRefractionPct}
            onChange={(v) => update("branRefractionPct", v)}
            guide={t("guide_inBranPct")}
          />
          <Field
            label={t("in_branPrice")}
            hint="₹/kg"
            prefix="₹"
            value={inputs.branSalePrice}
            onChange={(v) => update("branSalePrice", v)}
            guide={t("guide_inBranPrice")}
          />
        </div>

        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
          <Field
            label={t("in_branPack")}
            hint="₹/kg bran"
            prefix="₹"
            value={inputs.branPackingMaterial}
            onChange={(v) => update("branPackingMaterial", v)}
            guide={t("guide_inBranPack")}
          />
          <Field
            label={t("in_feedPct")}
            hint="%"
            suffix="%"
            value={inputs.feedRefractionPct}
            onChange={(v) => update("feedRefractionPct", v)}
            guide={t("guide_inFeedPct")}
          />
        </div>

        <Field
          label={t("in_animalFeed")}
          hint="₹/kg"
          prefix="₹"
          value={inputs.feedSalePrice}
          onChange={(v) => update("feedSalePrice", v)}
          guide={t("guide_inAnimalFeed")}
        />

        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
          <Field
            label={t("in_wheatQty")}
            hint="kg"
            suffix="kg"
            step={1}
            value={inputs.wheatQty}
            onChange={(v) => update("wheatQty", v)}
            guide={t("guide_inWheatQty")}
          />
          <Field
            label={t("in_boriQty")}
            hint={t("unitPcs")}
            suffix={t("unitPcs")}
            step={1}
            value={inputs.boriQty}
            onChange={(v) => update("boriQty", v)}
            guide={t("guide_inBoriQty")}
          />
        </div>

        <Field
          label={t("in_bori50")}
          hint="₹/bori"
          prefix="₹"
          value={inputs.boriPrice}
          onChange={(v) => update("boriPrice", v)}
          guide={t("guide_inBori50")}
        />

        <div className="mt-5 flex items-center justify-between">
          <Button onClick={onBack}>{t("btnBack")}</Button>
          <Button variant="primary" onClick={onNext}>
            {t("btnNext")}
          </Button>
        </div>
      </Card>

      {/* Side card — mobile pe upar, desktop pe right */}
      <Card
        accent="orange"
        title={t("sideTitle3")}
        subtitle={t("sideSub3")}
        className="order-1 lg:order-none"
      >
        <ul className="divide-y divide-dashed divide-stone-200 text-[12.5px] text-stone-500">
          <li className="flex items-center justify-between gap-3 py-2">
            <span>{t("side3a")}</span>
            <b className="text-right font-mono text-stone-900">
              {t("side3aval")}
            </b>
          </li>
          <li className="flex items-center justify-between gap-3 py-2">
            <span>{t("side3b")}</span>
            <b className="text-right font-mono text-stone-900">
              {t("side3bval")}
            </b>
          </li>
          <li className="flex items-center justify-between gap-3 py-2">
            <span>{t("side3c")}</span>
            <b className="text-right font-mono text-stone-900">
              {t("side3cval")}
            </b>
          </li>
        </ul>
      </Card>
    </div>
  );
}
