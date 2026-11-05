"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Language, translations } from "@/data/translations";

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isChinese: boolean;
  isEnglish: boolean;
  t: (key: string, fallback?: string) => string;
}

const STORAGE_KEY = "portfolio-lang";

/**
 * Detects whether the user's browser language is Chinese.
 * If Chinese, returns 'zh'. Otherwise defaults to 'en'.
 */
export function getBrowserLanguage(): Language {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const navLanguages =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : navigator.language
      ? [navigator.language]
      : [];

  for (const lang of navLanguages) {
    if (!lang) continue;
    const lower = lang.toLowerCase();
    if (lower.startsWith("zh")) {
      return "zh";
    }
  }

  return "en";
}

/**
 * Determines initial language:
 * 1. Checks localStorage for explicit user choice
 * 2. If none, inspects browser languages (Chinese -> 'zh', others -> 'en')
 */
export function detectInitialLanguage(): Language {
  if (typeof localStorage !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "zh" || saved === "en") {
        return saved;
      }
    } catch {
      // localStorage unavailable (sandboxed / privacy mode)
    }
  }

  return getBrowserLanguage();
}

const LanguageContext = createContext<I18nContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSR always starts with 'en' to match server-rendered markup safely
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState<boolean>(false);

  // Initial detection & browser language listener
  useEffect(() => {
    setMounted(true);
    const initial = detectInitialLanguage();
    setLanguageState(initial);
    document.documentElement.lang = initial === "zh" ? "zh-CN" : "en";

    /**
     * Listener for browser / OS language setting changes.
     * If user switches browser language to Chinese, automatically updates to Chinese.
     * If switched to English or other, defaults to English.
     */
    const handleLanguageChange = () => {
      const detected = getBrowserLanguage();
      setLanguageState(detected);
      document.documentElement.lang = detected === "zh" ? "zh-CN" : "en";
      try {
        localStorage.setItem(STORAGE_KEY, detected);
      } catch {
        // ignore
      }
    };

    window.addEventListener("languagechange", handleLanguageChange);

    // Cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === STORAGE_KEY &&
        (e.newValue === "zh" || e.newValue === "en")
      ) {
        setLanguageState(e.newValue);
        document.documentElement.lang = e.newValue === "zh" ? "zh-CN" : "en";
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch {
        // ignore
      }
      document.documentElement.lang = newLang === "zh" ? "zh-CN" : "en";
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "zh" : "en");
  }, [language, setLanguage]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const keys = key.split(".");

      // Try current language
      let val: any = translations[language];
      for (const k of keys) {
        if (val && typeof val === "object" && k in val) {
          val = val[k];
        } else {
          val = undefined;
          break;
        }
      }
      if (typeof val === "string") return val;

      // Fallback to English (default)
      let fallbackVal: any = translations["en"];
      for (const k of keys) {
        if (fallbackVal && typeof fallbackVal === "object" && k in fallbackVal) {
          fallbackVal = fallbackVal[k];
        } else {
          fallbackVal = undefined;
          break;
        }
      }
      if (typeof fallbackVal === "string") return fallbackVal;

      return fallback ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isChinese: language === "zh",
        isEnglish: language === "en",
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): I18nContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en",
      setLanguage: () => {},
      toggleLanguage: () => {},
      isChinese: false,
      isEnglish: true,
      t: (key: string, fallback?: string) => fallback ?? key,
    };
  }
  return context;
}
