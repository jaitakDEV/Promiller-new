// "use client";

// import { useState } from "react";
// import Card from "@/features/calculators/components/ui/card";
// import Button from "@/features/calculators/components/ui/button";
// import { useLang } from "../language-provider";
// import { generateCostingPdf } from "@/features/calculators/atta-cost/lib/pdf-report";
// import {
//   fmtINR,
//   fmtNum,
//   type CostingResult,
//   type CostInputs,
//   type PackRow,
// } from "@/features/calculators/atta-cost/lib/calculator";
// import type { DictKey } from "@/features/calculators/atta-cost/lib/i18n";

// export type { PackRow };

// const COST_ROWS: Array<{
//   key: string;
//   labelKey: DictKey;
//   value: (c: CostingResult) => number;
//   style?: "subtotal" | "final" | "neg" | "yield";
// }> = [
//   {
//     key: "wheatCostPerKg",
//     labelKey: "c_wheat",
//     value: (c) => c.wheatCostPerKg,
//   },
//   {
//     key: "unloadingPerKg",
//     labelKey: "c_unload",
//     value: (c) => c.unloadingPerKg,
//   },
//   {
//     key: "millingChargesPerKg",
//     labelKey: "c_milling",
//     value: (c) => c.millingChargesPerKg,
//   },
//   { key: "loadingPerKg", labelKey: "c_loading", value: (c) => c.loadingPerKg },
//   {
//     key: "productCostBasePerKg",
//     labelKey: "c_base",
//     value: (c) => c.productCostBasePerKg,
//     style: "subtotal",
//   },
//   {
//     key: "branIncomePerKg",
//     labelKey: "c_branOnly",
//     value: (c) => -c.branIncomePerKg,
//     style: "neg",
//   },
//   {
//     key: "feedIncomePerKg",
//     labelKey: "c_feedIncome",
//     value: (c) => -c.feedIncomePerKg,
//     style: "neg",
//   },
//   {
//     key: "otherIncomePerKg",
//     labelKey: "c_otherIncome",
//     value: (c) => -c.otherIncomePerKg,
//     style: "neg",
//   },
//   {
//     key: "costAtMillGatePerKgWheat",
//     labelKey: "c_gateWheat",
//     value: (c) => c.costAtMillGatePerKgWheat,
//     style: "subtotal",
//   },
//   {
//     key: "costAtMillGatePerKgAtta",
//     labelKey: "c_gateAtta",
//     value: (c) => c.costAtMillGatePerKgAtta,
//     style: "yield",
//   },
//   {
//     key: "millMarginPerKg",
//     labelKey: "c_margin",
//     value: (c) => c.millMarginPerKg,
//   },
//   {
//     key: "millSalePricePerKg",
//     labelKey: "c_sale",
//     value: (c) => c.millSalePricePerKg,
//     style: "final",
//   },
// ];

// const rowClass: Record<string, string> = {
//   subtotal: "border-t-[1.5px] border-t-stone-900 font-bold text-stone-900",
//   final:
//     "border-t-2 border-t-stone-900 font-bold text-[13.5px] text-indigo-700",
//   neg: "text-emerald-700",
//   yield: "font-bold text-amber-800",
// };

// export default function Step5Results({
//   inputs,
//   costing,
//   packRows,
//   recommended,
//   onBack,
//   onReset,
// }: {
//   inputs: CostInputs;
//   costing: CostingResult;
//   packRows: PackRow[];
//   recommended: PackRow | undefined;
//   onBack: () => void;
//   onReset: () => void;
// }) {
//   const { t, lang } = useLang();
//   const [downloading, setDownloading] = useState(false);

//   const lossSum =
//     inputs.cleaningLossPct +
//     inputs.grindingLossPct +
//     inputs.branRefractionPct +
//     inputs.feedRefractionPct +
//     inputs.processLossPct;

//   const attaWidth = Math.max(0, Math.min(100, costing.yieldPct));
//   const lossWidth = Math.max(0, 100 - costing.yieldPct);

//   async function handleDownloadPdf() {
//     try {
//       setDownloading(true);
//       await generateCostingPdf(inputs, costing, packRows, recommended, {
//         locale: lang,
//       });
//     } finally {
//       setDownloading(false);
//     }
//   }

//   return (
//     <div>
//       <Card accent="indigo" title={t("yieldTitle")} subtitle={t("yieldSub")}>
//         <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
//           <div className="mb-2 flex justify-between text-[11px] font-bold uppercase tracking-wide text-stone-500">
//             <span>{t("yieldTop")}</span>
//             <span>{fmtNum(costing.yieldPct, 2)}%</span>
//           </div>
//           <div className="flex h-5 overflow-hidden rounded-full border border-stone-200 bg-white">
//             <div
//               className="h-full bg-gradient-to-r from-amber-800 to-amber-500 transition-all"
//               style={{ width: `${attaWidth}%` }}
//             />
//             <div
//               className="h-full bg-[repeating-linear-gradient(45deg,#e4c9c4,#e4c9c4_4px,#efdad6_4px,#efdad6_8px)] transition-all"
//               style={{ width: `${lossWidth}%` }}
//             />
//           </div>
//           <div className="mt-2 flex justify-between font-mono text-[11.5px] font-semibold">
//             <span className="text-amber-800">● {t("yieldLegAtta")}</span>
//             <span className="text-[#b4685e]">● {t("yieldLegLoss")}</span>
//           </div>
//         </div>
//         <div className="mt-3 flex items-center justify-between py-1.5 text-[13px]">
//           <span className="text-stone-500">{t("yieldFormula")}</span>
//           <span className="font-mono font-semibold text-stone-900">
//             100 − {fmtNum(lossSum, 2)}% + {fmtNum(inputs.moistureGainPct, 2)}% ={" "}
//             {fmtNum(costing.yieldPct, 2)}%
//           </span>
//         </div>
//       </Card>

//       <Card accent="indigo" title={t("costTitle")} subtitle={t("costSub")}>
//         <table className="w-full border-collapse text-[12.5px]">
//           <tbody>
//             {COST_ROWS.map((row) => (
//               <tr
//                 key={row.key}
//                 className={`border-b border-stone-100 ${rowClass[row.style ?? ""] ?? ""}`}
//               >
//                 <td className="py-1.5 pr-2 text-stone-500 first:text-stone-500">
//                   {t(row.labelKey)}
//                 </td>
//                 <td className="py-1.5 text-right font-mono">
//                   {fmtINR(row.value(costing))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Card>

//       <Card accent="indigo" title={t("finalTitle")} subtitle={t("finalSub")}>
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[560px] border-collapse text-[12.5px]">
//             <thead>
//               <tr className="border-b-2 border-stone-200 text-[10.5px] font-bold text-stone-500">
//                 <th className="py-1.5 pr-2 text-left">{t("ft_pack")}</th>
//                 <th className="py-1.5 text-right">{t("ft_material")}</th>
//                 <th className="py-1.5 text-right">{t("ft_before")}</th>
//                 <th className="py-1.5 text-right">{t("ft_gst")}</th>
//                 <th className="py-1.5 text-right">{t("ft_exfactory")}</th>
//                 <th className="py-1.5 text-right">{t("ft_mrp")}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {packRows.map((p) => (
//                 <tr
//                   key={p.key}
//                   className={`border-b border-stone-100 ${
//                     p.key === recommended?.key
//                       ? "bg-gradient-to-r from-amber-50 to-indigo-50"
//                       : ""
//                   }`}
//                 >
//                   <td
//                     className={`py-1.5 pr-2 font-semibold ${
//                       p.key === recommended?.key
//                         ? "text-indigo-700"
//                         : "text-stone-800"
//                     }`}
//                   >
//                     {p.label}
//                   </td>
//                   <td className="py-1.5 text-right font-mono">
//                     {fmtINR(p.material)}
//                   </td>
//                   <td className="py-1.5 text-right font-mono">
//                     {fmtINR(p.costBeforeTax)}
//                   </td>
//                   <td className="py-1.5 text-right font-mono">
//                     {fmtINR(p.gst)}
//                   </td>
//                   <td className="py-1.5 text-right font-mono">
//                     {fmtINR(p.exFactory)}
//                   </td>
//                   <td className="py-1.5 text-right font-mono font-bold text-orange-600">
//                     {fmtINR(p.marketPrice)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-5 rounded-xl border border-stone-200 bg-gradient-to-br from-amber-50 to-indigo-50 p-5 text-center">
//           <div className="font-mono text-[28px] font-extrabold text-indigo-700">
//             {fmtINR(recommended?.marketPrice ?? 0)}
//           </div>
//           <div className="mt-1 text-[12px] font-semibold text-stone-500">
//             {t("recLbl")}: {recommended?.label})
//           </div>
//         </div>

//         <div className="mt-3 grid grid-cols-2 gap-3">
//           <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
//             <div className="font-mono text-[15px] font-bold text-stone-900">
//               {fmtINR(costing.costAtMillGatePerKgAtta)}
//             </div>
//             <div className="mt-0.5 text-[10.5px] font-semibold text-stone-500">
//               {t("millGateLbl")}
//             </div>
//           </div>
//           <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
//             <div className="font-mono text-[15px] font-bold text-stone-900">
//               {fmtNum(inputs.millMarginPct, 1)}%
//             </div>
//             <div className="mt-0.5 text-[10.5px] font-semibold text-stone-500">
//               {t("millMarginLbl")}
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
//           <Button onClick={onBack}>{t("btnBackEdit")}</Button>
//           <div className="flex gap-3">
//             <Button onClick={onReset}>{t("btnReset")}</Button>
//             <Button
//               variant="primary"
//               onClick={handleDownloadPdf}
//               disabled={downloading}
//             >
//               {downloading ? "Generating PDF…" : "⬇ Download PDF"}
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import Card from "@/features/calculators/components/ui/card";
import Button from "@/features/calculators/components/ui/button";
import { useLang } from "../language-provider";
import { generateCostingPdf } from "@/features/calculators/atta-cost/lib/pdf-report";
import {
  getReportEntry,
  rememberIssuedReport,
  type IssuedReport,
} from "@/features/calculators/atta-cost/lib/report-session";
import { generateReportAction } from "@/features/reports/actions/generate-report";
import {
  REPORT_NOTE_MAX,
  REPORT_TITLE_MAX,
} from "@/features/reports/lib/report-text";
import {
  fmtINR,
  fmtNum,
  type CostingResult,
  type CostInputs,
  type PackKey,
  type PackRow,
  type PackSettings,
} from "@/features/calculators/atta-cost/lib/calculator";
import type { DictKey } from "@/features/calculators/atta-cost/lib/i18n";

// PackRow now lives in calculator.ts; re-exported for older importers (pdf-report.ts).
export type { PackRow };

const COST_ROWS: Array<{
  key: string;
  labelKey: DictKey;
  value: (c: CostingResult) => number;
  style?: "subtotal" | "final" | "neg" | "yield";
}> = [
  {
    key: "wheatCostPerKg",
    labelKey: "c_wheat",
    value: (c) => c.wheatCostPerKg,
  },
  {
    key: "unloadingPerKg",
    labelKey: "c_unload",
    value: (c) => c.unloadingPerKg,
  },
  {
    key: "millingChargesPerKg",
    labelKey: "c_milling",
    value: (c) => c.millingChargesPerKg,
  },
  { key: "loadingPerKg", labelKey: "c_loading", value: (c) => c.loadingPerKg },
  {
    key: "productCostBasePerKg",
    labelKey: "c_base",
    value: (c) => c.productCostBasePerKg,
    style: "subtotal",
  },
  {
    key: "branIncomePerKg",
    labelKey: "c_branOnly",
    value: (c) => -c.branIncomePerKg,
    style: "neg",
  },
  {
    key: "feedIncomePerKg",
    labelKey: "c_feedIncome",
    value: (c) => -c.feedIncomePerKg,
    style: "neg",
  },
  {
    key: "otherIncomePerKg",
    labelKey: "c_otherIncome",
    value: (c) => -c.otherIncomePerKg,
    style: "neg",
  },
  {
    key: "costAtMillGatePerKgWheat",
    labelKey: "c_gateWheat",
    value: (c) => c.costAtMillGatePerKgWheat,
    style: "subtotal",
  },
  {
    key: "costAtMillGatePerKgAtta",
    labelKey: "c_gateAtta",
    value: (c) => c.costAtMillGatePerKgAtta,
    style: "yield",
  },
  {
    key: "millMarginPerKg",
    labelKey: "c_margin",
    value: (c) => c.millMarginPerKg,
  },
  {
    key: "millSalePricePerKg",
    labelKey: "c_sale",
    value: (c) => c.millSalePricePerKg,
    style: "final",
  },
];

const rowClass: Record<string, string> = {
  subtotal: "border-t-[1.5px] border-t-stone-900 font-bold text-stone-900",
  final:
    "border-t-2 border-t-stone-900 font-bold text-[13.5px] text-indigo-700",
  neg: "text-emerald-700",
  yield: "font-bold text-amber-800",
};

const fieldClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-[13px] text-stone-900 placeholder:text-stone-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:bg-stone-100";
const labelClass =
  "mb-1 block text-[11px] font-bold uppercase tracking-wide text-stone-500";

type Phase = "idle" | "saving" | "pdf";

export default function Step5Results({
  inputs,
  costing,
  packRows,
  recommended,
  packMaterials,
  packSettings,
  onBack,
  onReset,
}: {
  inputs: CostInputs;
  costing: CostingResult;
  packRows: PackRow[];
  recommended: PackRow | undefined;
  packMaterials: Record<PackKey, number>;
  packSettings: PackSettings;
  onBack: () => void;
  onReset: () => void;
}) {
  const { t, lang } = useLang();

  // Same values give the same fingerprint, so the same report (see report-session.ts).
  const fingerprint = useMemo(
    () => JSON.stringify({ inputs, packMaterials, packSettings }),
    [inputs, packMaterials, packSettings],
  );

  const [issued, setIssued] = useState<IssuedReport | null>(
    () => getReportEntry(fingerprint).report ?? null,
  );
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const busy = phase !== "idle";

  const lossSum =
    inputs.cleaningLossPct +
    inputs.grindingLossPct +
    inputs.branRefractionPct +
    inputs.feedRefractionPct +
    inputs.processLossPct;

  const attaWidth = Math.max(0, Math.min(100, costing.yieldPct));
  const lossWidth = Math.max(0, 100 - costing.yieldPct);

  async function handleDownload() {
    setError(null);
    const entry = getReportEntry(fingerprint);
    let report = entry.report ?? null;

    // 1. Save the report on the server (skipped when it is already saved).
    if (!report) {
      setPhase("saving");
      let result;
      try {
        result = await generateReportAction({
          calculator: "atta-cost",
          input: { inputs, packMaterials, packSettings },
          locale: lang,
          title: title.trim() || undefined,
          note: note.trim() || undefined,
          idempotencyKey: entry.key,
        });
      } catch {
        setPhase("idle");
        setError(
          "Could not reach the server. Check your connection and try again.",
        );
        return;
      }
      if (!result.success) {
        setPhase("idle");
        setError(result.error);
        return;
      }
      report = { id: result.data.id, reportNo: result.data.reportNo };
      rememberIssuedReport(fingerprint, report);
      setIssued(report);
    }

    // 2. Build the PDF. A failure here never loses the saved report.
    setPhase("pdf");
    try {
      await generateCostingPdf(inputs, costing, packRows, recommended, {
        locale: lang,
        reportNo: report.reportNo,
      });
    } catch {
      setError(
        `Report ${report.reportNo} is saved, but the PDF could not be created. Please try the download again.`,
      );
    } finally {
      setPhase("idle");
    }
  }

  const downloadLabel =
    phase === "saving"
      ? "Saving report…"
      : phase === "pdf"
        ? "Preparing PDF…"
        : issued
          ? "⬇ Download PDF again"
          : error
            ? "Try again"
            : "⬇ Download Report";

  return (
    <div>
      <Card accent="indigo" title={t("yieldTitle")} subtitle={t("yieldSub")}>
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
          <div className="mb-2 flex justify-between text-[11px] font-bold uppercase tracking-wide text-stone-500">
            <span>{t("yieldTop")}</span>
            <span>{fmtNum(costing.yieldPct, 2)}%</span>
          </div>
          <div className="flex h-5 overflow-hidden rounded-full border border-stone-200 bg-white">
            <div
              className="h-full bg-gradient-to-r from-amber-800 to-amber-500 transition-all"
              style={{ width: `${attaWidth}%` }}
            />
            <div
              className="h-full bg-[repeating-linear-gradient(45deg,#e4c9c4,#e4c9c4_4px,#efdad6_4px,#efdad6_8px)] transition-all"
              style={{ width: `${lossWidth}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[11.5px] font-semibold">
            <span className="text-amber-800">● {t("yieldLegAtta")}</span>
            <span className="text-[#b4685e]">● {t("yieldLegLoss")}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between py-1.5 text-[13px]">
          <span className="text-stone-500">{t("yieldFormula")}</span>
          <span className="font-mono font-semibold text-stone-900">
            100 − {fmtNum(lossSum, 2)}% + {fmtNum(inputs.moistureGainPct, 2)}% ={" "}
            {fmtNum(costing.yieldPct, 2)}%
          </span>
        </div>
      </Card>

      <Card accent="indigo" title={t("costTitle")} subtitle={t("costSub")}>
        <table className="w-full border-collapse text-[12.5px]">
          <tbody>
            {COST_ROWS.map((row) => (
              <tr
                key={row.key}
                className={`border-b border-stone-100 ${rowClass[row.style ?? ""] ?? ""}`}
              >
                <td className="py-1.5 pr-2 text-stone-500 first:text-stone-500">
                  {t(row.labelKey)}
                </td>
                <td className="py-1.5 text-right font-mono">
                  {fmtINR(row.value(costing))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card accent="indigo" title={t("finalTitle")} subtitle={t("finalSub")}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b-2 border-stone-200 text-[10.5px] font-bold text-stone-500">
                <th className="py-1.5 pr-2 text-left">{t("ft_pack")}</th>
                <th className="py-1.5 text-right">{t("ft_material")}</th>
                <th className="py-1.5 text-right">{t("ft_before")}</th>
                <th className="py-1.5 text-right">{t("ft_gst")}</th>
                <th className="py-1.5 text-right">{t("ft_exfactory")}</th>
                <th className="py-1.5 text-right">{t("ft_mrp")}</th>
              </tr>
            </thead>
            <tbody>
              {packRows.map((p) => (
                <tr
                  key={p.key}
                  className={`border-b border-stone-100 ${
                    p.key === recommended?.key
                      ? "bg-gradient-to-r from-amber-50 to-indigo-50"
                      : ""
                  }`}
                >
                  <td
                    className={`py-1.5 pr-2 font-semibold ${
                      p.key === recommended?.key
                        ? "text-indigo-700"
                        : "text-stone-800"
                    }`}
                  >
                    {p.label}
                  </td>
                  <td className="py-1.5 text-right font-mono">
                    {fmtINR(p.material)}
                  </td>
                  <td className="py-1.5 text-right font-mono">
                    {fmtINR(p.costBeforeTax)}
                  </td>
                  <td className="py-1.5 text-right font-mono">
                    {fmtINR(p.gst)}
                  </td>
                  <td className="py-1.5 text-right font-mono">
                    {fmtINR(p.exFactory)}
                  </td>
                  <td className="py-1.5 text-right font-mono font-bold text-orange-600">
                    {fmtINR(p.marketPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 rounded-xl border border-stone-200 bg-gradient-to-br from-amber-50 to-indigo-50 p-5 text-center">
          <div className="font-mono text-[28px] font-extrabold text-indigo-700">
            {fmtINR(recommended?.marketPrice ?? 0)}
          </div>
          <div className="mt-1 text-[12px] font-semibold text-stone-500">
            {t("recLbl")}: {recommended?.label})
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
            <div className="font-mono text-[15px] font-bold text-stone-900">
              {fmtINR(costing.costAtMillGatePerKgAtta)}
            </div>
            <div className="mt-0.5 text-[10.5px] font-semibold text-stone-500">
              {t("millGateLbl")}
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
            <div className="font-mono text-[15px] font-bold text-stone-900">
              {fmtNum(inputs.millMarginPct, 1)}%
            </div>
            <div className="mt-0.5 text-[10.5px] font-semibold text-stone-500">
              {t("millMarginLbl")}
            </div>
          </div>
        </div>

        {/* ===== Save as report ===== */}
        <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-4 print:hidden">
          {issued ? (
            <div>
              <p className="text-[13px] font-semibold text-emerald-700">
                ✓ Saved as <span className="font-mono">{issued.reportNo}</span>
              </p>
              <p className="mt-1 text-[12px] text-stone-500">
                This report is stored in your account. Changing any value
                creates a new report.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              <div>
                <label htmlFor="report-title" className={labelClass}>
                  Report name (optional)
                </label>
                <input
                  id="report-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={REPORT_TITLE_MAX}
                  placeholder="e.g. Jaipur plant, Q3 estimate"
                  disabled={busy}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="report-note" className={labelClass}>
                  Note (optional)
                </label>
                <textarea
                  id="report-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={REPORT_NOTE_MAX}
                  rows={3}
                  disabled={busy}
                  className={fieldClass}
                />
                <p className="mt-1 text-right text-[11px] text-stone-400">
                  {note.length}/{REPORT_NOTE_MAX}
                </p>
              </div>
              <p className="text-[12px] text-stone-500">
                Downloading saves this calculation as a report with its own
                number in your account.
              </p>
            </div>
          )}
          {error && (
            <p
              role="alert"
              className="mt-3 text-[13px] font-medium text-red-600"
            >
              {error}
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Button onClick={onBack} disabled={busy}>
            {t("btnBackEdit")}
          </Button>
          <div className="flex gap-3">
            <Button onClick={onReset} disabled={busy}>
              {t("btnReset")}
            </Button>
            <Button variant="primary" onClick={handleDownload} disabled={busy}>
              {downloadLabel}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
