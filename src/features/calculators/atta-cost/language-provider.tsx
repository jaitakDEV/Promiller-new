"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  type DictKey,
  type Lang,
} from "@/features/calculators/atta-cost/lib/i18n";

const STORAGE_KEY = "atta-costing-lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: DictKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // useEffect(() => {
  //   const saved = window.localStorage.getItem(STORAGE_KEY);
  //   if (saved === "en" || saved === "hi") setLangState(saved);
  // }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    return () => {
      document.documentElement.lang = "en";
    };
  }, []);

  const t = useCallback(
    (key: DictKey) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key,
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Access the current language, a setter, and the `t()` lookup function.
 * Must be called from a component rendered inside <LanguageProvider>.
 */
export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang() must be used inside <LanguageProvider>");
  }
  return ctx;
}
