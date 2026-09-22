"use client";

import { CloudShader } from "@/components/ui/cloud-shader";

type Row = {
  capability: string;
  before: { label: string; desc: string };
  after: { label: string; desc: string };
};

const ROWS: Row[] = [
  {
    capability: "Technology",
    before: {
      label: "Outdated Technology",
      desc: "Stuck with traditional chakki systems from decades ago",
    },
    after: {
      label: "Cutting-Edge Technology",
      desc: "State-of-the-art WonderMill system with digital controls",
    },
  },
  {
    capability: "Power Usage",
    before: {
      label: "High Power Consumption",
      desc: "No visibility into energy waste — costs keep climbing",
    },
    after: {
      label: "30–40% Power Savings",
      desc: "Real-time optimization automatically reduces costs",
    },
  },
  {
    capability: "Output Quality",
    before: {
      label: "Inconsistent Quality",
      desc: "Manual operation leads to variable output and defects",
    },
    after: {
      label: "Consistent Quality",
      desc: "Automated system ensures reliable output every time",
    },
  },
  {
    capability: "Labor Needs",
    before: {
      label: "Labor Intensive",
      desc: "High skill requirement + constant stone maintenance",
    },
    after: {
      label: "Highly Automated",
      desc: "Reduced labor needs + automatic stone wear adjustment",
    },
  },
  {
    capability: "Data & Insights",
    before: {
      label: "No Data",
      desc: "Can't track performance or identify improvement areas",
    },
    after: {
      label: "Full Visibility",
      desc: "Real-time dashboard + trend analysis for smart decisions",
    },
  },
];

const BRAND_DEEP = "#2980B9";
const BRAND_LIGHT = "#6DD5FA";

function Cross({
  color = "#e11d48",
  size = 8,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" className="shrink-0">
      <path
        d="M1 1L9 9M9 1L1 9"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Check({
  color = "#fff",
  size = 8,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 11 9"
      className="shrink-0"
    >
      <path
        d="M1 4.5L4 7.5L10 1"
        stroke={color}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Differences() {
  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Cloud shader background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <CloudShader className="h-full w-full" />
      </div>
      {/* Readability wash so the shader stays subtle behind the crisp table */}
      <div className="absolute inset-0 -z-10 " />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-4 flex justify-center">
          <span className="rounded-full border border-[#fff]/25 bg-[#2980B9]/10 px-2.5 py-0.5 text-xs font-medium text-[#fff]">
            Why ProMiller
          </span>
        </div>
        <h2 className="mb-3 text-center text-[28px] font-bold text-[#fff] sm:text-[36px] md:text-[42px]">
          Your Flour Mill: Before &amp; After
        </h2>
        <p className="mb-12 text-center text-[17px] text-[#fff]">
          See the dramatic difference digital transformation brings
        </p>
        <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-[1px] shadow-[0_8px_32px_rgba(41,128,185,0.18)] backdrop-blur-2xl">
          <div className="overflow-hidden rounded-[15px] bg-white">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[180px] border-b border-slate-200 bg-slate-50 px-6 py-4 text-[13px] font-semibold uppercase tracking-wide text-slate-400">
                    Capability
                  </th>
                  <th className="border-b border-slate-200 bg-slate-50 px-6 py-4 text-[15px] font-semibold text-slate-500">
                    Manual Chakkis Today
                  </th>
                  <th className="border-b border-slate-200 bg-[#2980B9]/[0.06] px-6 py-4 text-[15px] font-semibold text-[#1c608c]">
                    Digital System Tomorrow
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.capability}
                    className={i % 2 === 1 ? "bg-slate-50/70" : "bg-white"}
                  >
                    <td className="border-t border-slate-100 px-6 py-5 text-[14px] font-semibold text-[#16324a]">
                      {row.capability}
                    </td>
                    <td className="border-t border-slate-100 px-6 py-5">
                      <div className="flex items-center gap-2 text-[13.5px] font-medium text-slate-600">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-50">
                          <Cross />
                        </span>
                        {row.before.label}
                      </div>
                      <div className="mt-1 pl-7 text-[12.5px] text-slate-400">
                        {row.before.desc}
                      </div>
                    </td>
                    <td className="border-t border-slate-100 bg-[#2980B9]/[0.04] px-6 py-5">
                      <div className="flex items-center gap-2 text-[13.5px] font-semibold text-[#1c608c]">
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded-full"
                          style={{ background: BRAND_DEEP }}
                        >
                          <Check />
                        </span>
                        {row.after.label}
                      </div>
                      <div className="mt-1 pl-7 text-[12.5px] text-slate-400">
                        {row.after.desc}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Differences;
