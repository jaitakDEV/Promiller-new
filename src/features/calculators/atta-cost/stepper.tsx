"use client";

import { useEffect, useRef } from "react";
import { useLang } from "./language-provider";
import type { DictKey } from "@/features/calculators/atta-cost/lib/i18n";

const STEP_KEYS: DictKey[] = ["step1", "step2", "step3", "step4", "step5"];

export default function Stepper({
  current,
  onChange,
}: {
  current: number;
  onChange: (n: number) => void;
}) {
  const { t } = useLang();

  const progress = ((current - 1) / (STEP_KEYS.length - 1)) * 100;

  const navRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const target = document.getElementById("calc-top") ?? navRef.current;
    if (!target) return;

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const extraBreathingRoom = 12;

    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      extraBreathingRoom;

    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  }, [current]);

  return (
    <nav
      ref={navRef}
      aria-label="Calculator steps"
      className="relative mb-8 mt-3 scroll-mt-4 px-1"
    >
      <div className="absolute left-[10%] right-[10%] top-[18px] h-[3px] rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-[#015436] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative flex items-start justify-between">
        {STEP_KEYS.map((key, i) => {
          const n = i + 1;
          const active = n === current;
          const done = n < current;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(n)}
              aria-current={active ? "step" : undefined}
              className="group flex flex-1 flex-col items-center gap-2 bg-transparent px-1 py-1 outline-none"
            >
              <span
                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 text-[13px] font-semibold transition-all duration-300 ${
                  active
                    ? "border-[#015436] bg-[#015436] text-white shadow-lg shadow-[#015436]/20 ring-4 ring-[#E7F1EC] scale-110"
                    : done
                      ? "border-[#015436] bg-[#015436] text-white shadow-md shadow-[#015436]/20"
                      : "border-stone-200 bg-white text-stone-400 group-hover:border-[#015436] group-hover:text-[#015436]"
                }`}
              >
                {done ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="h-4 w-4"
                  >
                    <path
                      d="M5 12l4 4L19 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  n
                )}
              </span>

              {/* Step Label */}
              <span
                className={`hidden max-w-[100px] text-center text-[11px] font-semibold leading-tight transition-colors sm:block ${
                  active
                    ? "text-[#015436]"
                    : done
                      ? "text-[#013f28]"
                      : "text-stone-400 group-hover:text-[#015436]"
                }`}
              >
                {t(key)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
