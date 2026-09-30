"use client";

import { useLang } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex rounded-full border border-stone-200 bg-white p-1 shadow-sm">
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
          lang === "en"
            ? "bg-[#015436] text-white"
            : "text-[#fcb82e] hover:text-[#015436]"
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLang("hi")}
        aria-pressed={lang === "hi"}
        className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
          lang === "hi"
            ? "bg-[#015436] text-white"
            : "text-[#fcb82e] hover:text-[#015436]"
        }`}
      >
        हिंदी
      </button>
    </div>
  );
}
