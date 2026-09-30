"use client";

import {
  HdpeIcon,
  LdPouchIcon,
} from "@/features/calculators/atta-cost/components/ui/pack-icons";

import {
  PACK_META,
  type CostInputs,
  type PackKey,
  type PackSettings,
} from "@/features/calculators/atta-cost/lib/calculator";

import Card from "@/features/calculators/atta-cost/components/ui/card";
import Field from "@/features/calculators/atta-cost/components/ui/field";
import Button from "@/features/calculators/atta-cost/components/ui/button";
import { useLang } from "@/features/calculators/atta-cost/components/language-provider";

export default function Step4Packing({
  inputs,
  update,
  packMaterials,
  updateMaterial,
  packSettings,
  updateSetting,
  onNext,
  onBack,
  onReset,
}: {
  inputs: CostInputs;
  update: <K extends keyof CostInputs>(key: K, value: CostInputs[K]) => void;
  packMaterials: Record<PackKey, number>;
  updateMaterial: (key: PackKey, value: number) => void;
  packSettings: PackSettings;
  updateSetting: <K extends keyof PackSettings>(
    key: K,
    value: PackSettings[K],
  ) => void;
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}) {
  const { t } = useLang();

  const packOptions = (Object.keys(PACK_META) as PackKey[]).map((key) => ({
    value: key,
    label: PACK_META[key].label,
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      {/* Form card — mobile pe neeche, desktop pe left */}
      <Card
        title={t("packTitle")}
        subtitle={t("packSub")}
        className="order-2 lg:order-none"
      >
        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-[11.5px] font-semibold text-stone-500">
          <span className="flex items-center gap-2">
            <HdpeIcon /> {t("legHdpe")}
          </span>
          <span className="flex items-center gap-2">
            <LdPouchIcon /> {t("legLd")}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
          <Field
            label={t("pk_5hdpe")}
            icon={<HdpeIcon />}
            hint="₹/pack"
            prefix="₹"
            value={packMaterials["5hdpe"]}
            onChange={(v) => updateMaterial("5hdpe", v)}
            guide={t("guide_pk5hdpe")}
          />
          <Field
            label={t("pk_5ld")}
            icon={<LdPouchIcon />}
            hint="₹/pack"
            prefix="₹"
            value={packMaterials["5ld"]}
            onChange={(v) => updateMaterial("5ld", v)}
            guide={t("guide_pk5ld")}
          />
        </div>

        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
          <Field
            label={t("pk_10hdpe")}
            icon={<HdpeIcon />}
            hint="₹/pack"
            prefix="₹"
            value={packMaterials["10hdpe"]}
            onChange={(v) => updateMaterial("10hdpe", v)}
            guide={t("guide_pk10hdpe")}
          />
          <Field
            label={t("pk_10ld")}
            icon={<LdPouchIcon />}
            hint="₹/pack"
            prefix="₹"
            value={packMaterials["10ld"]}
            onChange={(v) => updateMaterial("10ld", v)}
            guide={t("guide_pk10ld")}
          />
        </div>

        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
          <Field
            label={t("pk_50hdpe")}
            icon={<HdpeIcon />}
            hint="₹/pack"
            prefix="₹"
            value={packMaterials["50hdpe"]}
            onChange={(v) => updateMaterial("50hdpe", v)}
            guide={t("guide_pk50hdpe")}
          />
          <Field
            label={t("pk_inner")}
            hint="₹/kg"
            prefix="₹"
            step={0.01}
            value={packSettings.inner}
            onChange={(v) => updateSetting("inner", v)}
            guide={t("guide_pkInner")}
          />
        </div>

        <Field
          label={t("pk_outer")}
          hint="₹/pack"
          prefix="₹"
          value={packSettings.outer}
          onChange={(v) => updateSetting("outer", v)}
          guide={t("guide_pkOuter")}
        />

        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
          <Field
            label={t("pk_millMargin")}
            hint="%"
            suffix="%"
            value={inputs.millMarginPct}
            onChange={(v) => update("millMarginPct", v)}
            guide={t("guide_pkMillMargin")}
          />
          <Field
            label={t("pk_gst")}
            hint="%"
            suffix="%"
            value={packSettings.gstPct}
            onChange={(v) => updateSetting("gstPct", v)}
            guide={t("guide_pkGst")}
          />
        </div>

        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
          <Field
            label={t("pk_distMargin")}
            hint="%"
            suffix="%"
            value={packSettings.distPct}
            onChange={(v) => updateSetting("distPct", v)}
            guide={t("guide_pkDistMargin")}
          />
          <Field
            label={t("pk_retMargin")}
            hint="%"
            suffix="%"
            value={packSettings.retPct}
            onChange={(v) => updateSetting("retPct", v)}
            guide={t("guide_pkRetMargin")}
          />
        </div>

        <Field
          type="select"
          label={t("pk_select")}
          value={packSettings.selected}
          onChange={(v) => updateSetting("selected", v as PackKey)}
          options={packOptions}
          guide={t("guide_pkSelect")}
        />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <Button onClick={onBack}>{t("btnBack")}</Button>
          <div className="flex gap-3">
            <Button onClick={onReset}>{t("btnReset")}</Button>
            <Button variant="primary" onClick={onNext}>
              {t("btnViewResults")}
            </Button>
          </div>
        </div>
      </Card>

      {/* Side card — mobile pe upar, desktop pe right */}
      <Card
        accent="orange"
        title={t("sideTitle4")}
        className="order-1 lg:order-none"
      >
        <p className="mb-3 text-[12px] leading-relaxed text-stone-500">
          <b className="text-stone-800">{t("sideSub4aBold")}</b>{" "}
          {t("sideSub4a")}
        </p>
        <p className="text-[12px] leading-relaxed text-stone-500">
          <b className="text-stone-800">{t("sideSub4bBold")}</b> {" & "}
          <b className="text-stone-800">{t("sideSub4bBold2")}</b>{" "}
          {t("sideSub4b")}
        </p>
      </Card>
    </div>
  );
}
