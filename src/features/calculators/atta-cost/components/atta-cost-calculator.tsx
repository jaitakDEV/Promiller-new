"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Stepper from "@/features/calculators/atta-cost/components/Stepper";
import LanguageToggle from "@/features/calculators/atta-cost/components/language-toggle";
import { useLang } from "@/features/calculators/atta-cost/components/language-provider";
import Step1WheatProcess from "@/features/calculators/atta-cost/components/steps/step-1-wheat-process";
import Step2Yield from "@/features/calculators/atta-cost/components/steps/Step-2-Yield-process";
import Step3Byproducts from "@/features/calculators/atta-cost/components/steps/Step-3-byproducts-process";
import Step4Packing from "@/features/calculators/atta-cost/components/steps/Step-4-packing-process";
import Step5Results, {
  type PackRow,
} from "@/features/calculators/atta-cost/components/steps/Step-5-results-process";
import {
  computeCosting,
  computePackPrice,
  DEFAULT_INPUTS,
  DEFAULT_PACK_MATERIALS,
  DEFAULT_PACK_SETTINGS,
  PACK_META,
  type CostInputs,
  type PackKey,
  type PackSettings,
} from "@/features/calculators/atta-cost/lib/calculator";

export default function AttaCostCalculator() {
  const { t } = useLang();
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<CostInputs>(DEFAULT_INPUTS);
  const [packMaterials, setPackMaterials] = useState<Record<PackKey, number>>(
    DEFAULT_PACK_MATERIALS,
  );
  const [packSettings, setPackSettings] = useState<PackSettings>(
    DEFAULT_PACK_SETTINGS,
  );

  function update<K extends keyof CostInputs>(key: K, value: CostInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  function updateMaterial(key: PackKey, value: number) {
    setPackMaterials((prev) => ({ ...prev, [key]: value }));
  }

  function updateSetting<K extends keyof PackSettings>(
    key: K,
    value: PackSettings[K],
  ) {
    setPackSettings((prev) => ({ ...prev, [key]: value }));
  }

  function resetAll() {
    setInputs(DEFAULT_INPUTS);
    setPackMaterials(DEFAULT_PACK_MATERIALS);
    setPackSettings(DEFAULT_PACK_SETTINGS);
    setStep(1);
  }

  const costing = useMemo(() => computeCosting(inputs), [inputs]);

  const packRows: PackRow[] = useMemo(() => {
    return (Object.keys(PACK_META) as PackKey[]).map((key) => {
      const meta = PACK_META[key];
      const material = packMaterials[key];
      const pr = computePackPrice(
        costing.millSalePricePerKg,
        meta.weight,
        material,
        packSettings.inner,
        packSettings.outer,
        packSettings.gstPct,
        packSettings.distPct,
        packSettings.retPct,
      );
      return { key, label: meta.label, weight: meta.weight, material, ...pr };
    });
  }, [costing, packMaterials, packSettings]);

  const recommended = packRows.find((p) => p.key === packSettings.selected);

  return (
    <div className="min-h-screen bg-[#fbf9f5]">
      <div className="h-[5px] bg-gradient-to-r from-[#015436] via-[#015436] to-[#fcb82e] print:hidden" />

      {/* ================= BRAND HEADER ================= */}
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur print:hidden">
        <div className="mx-auto max-w-[1180px] px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {/* logos row */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4">
              <Image
                src="/logo-choyal.png"
                alt="Choyal"
                width={220}
                height={66}
                className="h-12 w-auto object-contain sm:h-14 lg:h-16"
                priority
              />
              <span className="h-8 w-px flex-none bg-stone-200" />
              <Image
                src="/logo-rschoyal.png"
                alt="RS Choyal Group"
                width={160}
                height={48}
                className="h-9 w-auto object-contain sm:h-10 lg:h-12"
                priority
              />
              <span className="h-8 w-px flex-none bg-stone-200" />
              <Image
                src="/logo-promiller.png"
                alt="CHARGE"
                width={160}
                height={48}
                className="h-9 w-auto object-contain sm:h-10 lg:h-12"
                priority
              />
            </div>

            {/* controls row: home + language toggle */}
            <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
              <Link
                href="https://charge.org.in/"
                aria-label="Home"
                className="flex flex-none items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-stone-600 transition-colors hover:border-[#015436]/30 hover:text-[#015436]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 flex-none"
                >
                  <path d="M3 11.5 12 4l9 7.5" />
                  <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
                </svg>
                <span className="text-[12.5px] font-semibold">Home</span>
              </Link>

              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      {/* id="calc-top" — Stepper.tsx scrolls here on step change, so this
          heading section stays visible along with the new step, instead of
          the scroll jumping straight down to the stepper alone. */}
      <section id="calc-top" className="relative overflow-hidden print:hidden">
        <div
          className="pointer-events-none absolute -top-36 left-1/2 h-[360px] w-[640px] -translate-x-1/2 rounded-full opacity-[0.12] blur-[100px]"
          style={{
            background: "linear-gradient(90deg, #015436 0%, #fcb82e 100%)",
          }}
        />

        <div className="relative mx-auto max-w-[1180px] px-4 pb-2 pt-6 sm:px-5 sm:pt-8">
          <span className="inline-flex items-center rounded-full border border-[#015436]/20 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#015436]">
            {t("brandSub")}
          </span>

          <h1 className="mb-1.5 mt-3 text-[clamp(22px,4.5vw,32px)] font-extrabold leading-[1.2] text-[#181818]">
            {t("h1")}
          </h1>
          <p className="max-w-[720px] text-[13.5px] leading-relaxed text-stone-500 sm:text-[14.5px]">
            {t("hSub")}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {["5-step wizard", "Live INR pricing"].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-[11.5px] font-semibold text-stone-600"
              >
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-[#015436] to-[#fcb82e]" />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1180px] px-4 pb-16 pt-4 sm:px-5">
        <div className="print:hidden">
          <Stepper current={step} onChange={setStep} />
        </div>

        <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_10px_30px_rgba(28,25,20,.05)] sm:mt-6 sm:p-6 lg:p-8 print:border-none print:p-0 print:shadow-none">
          {step === 1 && (
            <Step1WheatProcess
              inputs={inputs}
              update={update}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2Yield
              inputs={inputs}
              update={update}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step3Byproducts
              inputs={inputs}
              update={update}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <Step4Packing
              inputs={inputs}
              update={update}
              packMaterials={packMaterials}
              updateMaterial={updateMaterial}
              packSettings={packSettings}
              updateSetting={updateSetting}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
              onReset={resetAll}
            />
          )}
          {step === 5 && (
            <Step5Results
              inputs={inputs}
              costing={costing}
              packRows={packRows}
              recommended={recommended}
              onBack={() => setStep(4)}
              onReset={resetAll}
            />
          )}
        </div>
      </main>

      <footer className="mx-auto max-w-[1180px] px-4 pb-12 text-[12.5px] text-stone-500 sm:px-5 print:hidden">
        <div className="border-t border-stone-200 pt-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="mb-1.5 text-[13px] font-bold text-[#181818]">
                {t("aboutTitle")}
              </h3>
              <p className="max-w-[560px] leading-relaxed">{t("aboutText")}</p>
            </div>
            <div className="flex flex-none items-center gap-3 opacity-80">
              <Image
                src="/logo-choyal.png"
                alt="Choyal"
                width={110}
                height={34}
                className="h-6 w-auto object-contain sm:h-7"
              />
              <Image
                src="/logo-rschoyal.png"
                alt="RS Choyal Group"
                width={110}
                height={34}
                className="h-6 w-auto object-contain sm:h-7"
              />
              <Image
                src="/logo-promiller.png"
                alt="CHARGE"
                width={110}
                height={34}
                className="h-6 w-auto object-contain sm:h-7"
              />
            </div>
          </div>
          <p className="mt-3 font-semibold text-[#015436]">
            Atta Costing Calculator · RS Choyal Group
          </p>
        </div>
      </footer>
    </div>
  );
}
