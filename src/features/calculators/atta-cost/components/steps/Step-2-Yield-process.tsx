"use client";

import Card from "@/features/calculators/atta-cost/components/ui/card";
import Field from "@/features/calculators/atta-cost/components/ui/field";
import Button from "@/features/calculators/atta-cost/components/ui/button";
import { useLang } from "@/features/calculators/atta-cost/components/language-provider";
import type { CostInputs } from "@/features/calculators/atta-cost/lib/calculator";

export default function Step2Yield({
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
        title={t("s2Title")}
        subtitle={t("s2Sub")}
        className="order-2 lg:order-none"
      >
        <Field
          label={t("in_cleanLoss")}
          hint="%"
          suffix="%"
          value={inputs.cleaningLossPct}
          onChange={(v) => update("cleaningLossPct", v)}
          guide={t("guide_inCleanLoss")}
        />
        <Field
          label={t("in_grindLoss")}
          hint="%"
          suffix="%"
          value={inputs.grindingLossPct}
          onChange={(v) => update("grindingLossPct", v)}
          guide={t("guide_inGrindLoss")}
        />
        <Field
          label={t("in_processLoss")}
          hint="%"
          suffix="%"
          step={0.01}
          value={inputs.processLossPct}
          onChange={(v) => update("processLossPct", v)}
          guide={t("guide_inProcessLoss")}
        />
        <Field
          label={t("in_moistGain")}
          hint="%"
          suffix="%"
          value={inputs.moistureGainPct}
          onChange={(v) => update("moistureGainPct", v)}
          guide={t("guide_inMoistGain")}
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
        title={t("sideTitle2")}
        subtitle={t("sideSub2")}
        className="order-1 lg:order-none"
      >
        <p className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 font-mono text-[13px] font-bold text-amber-800">
          {t("sideFormula2")}
        </p>
        <p className="mt-3 text-[12px] leading-relaxed text-stone-500">
          {t("sideSub2b")}
        </p>
      </Card>
    </div>
  );
}
