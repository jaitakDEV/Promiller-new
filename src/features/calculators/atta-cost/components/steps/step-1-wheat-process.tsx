"use client";

import Card from "@/features/calculators/atta-cost/components/ui/Card";
import Field from "@/features/calculators/atta-cost/components/ui/field";
import Button from "@/features/calculators/atta-cost/components/ui/Button";
import { useLang } from "@/features/calculators/atta-cost/components/language-provider";
import type { CostInputs } from "@/features/calculators/atta-cost/lib/calculator";

export default function Step1WheatProcess({
  inputs,
  update,
  onNext,
}: {
  inputs: CostInputs;
  update: <K extends keyof CostInputs>(key: K, value: CostInputs[K]) => void;
  onNext: () => void;
}) {
  const { t } = useLang();

  return (
    // <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <Card
        title={t("s1Title")}
        subtitle={t("s1Sub")}
        className="order-2 lg:order-none"
      >
        <Field
          label={t("in_wheat")}
          hint="₹/kg"
          prefix="₹"
          value={inputs.wheatPrice}
          onChange={(v) => update("wheatPrice", v)}
          guide={t("guide_inWheat")}
        />
        <Field
          label={t("in_unload")}
          hint="₹/kg"
          prefix="₹"
          step={0.01}
          value={inputs.unloading}
          onChange={(v) => update("unloading", v)}
          guide={t("guide_inUnload")}
        />
        <Field
          label={t("in_milling")}
          hint="₹/kg"
          prefix="₹"
          value={inputs.millingCharges}
          onChange={(v) => update("millingCharges", v)}
          guide={t("guide_inMilling")}
        />
        <Field
          label={t("in_loading")}
          hint="₹/kg"
          prefix="₹"
          step={0.01}
          value={inputs.loadingOfAtta}
          onChange={(v) => update("loadingOfAtta", v)}
          guide={t("guide_inLoading")}
        />

        <div className="mt-5 flex justify-end">
          <Button variant="primary" onClick={onNext}>
            {t("btnNext")}
          </Button>
        </div>
      </Card>

      {/* Side card — mobile pe upar, desktop pe right */}
      <Card
        accent="orange"
        title={t("sideTitle1")}
        subtitle={t("sideSub1")}
        className="order-1 lg:order-none"
      >
        <ul className="divide-y divide-dashed divide-stone-200 text-[12.5px] text-stone-500">
          {[
            [t("side1a"), "+"],
            [t("side1b"), "+"],
            [t("side1c"), "+"],
            [t("side1d"), "="],
          ].map(([label, op]) => (
            <li key={label} className="flex items-center justify-between py-2">
              <span>{label}</span>
              <b className="font-mono text-stone-900">{op}</b>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] leading-relaxed text-stone-500">
          {t("side1e")}
        </p>
      </Card>
    </div>
  );
}
