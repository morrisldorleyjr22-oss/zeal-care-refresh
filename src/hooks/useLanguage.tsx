import { createContext, useContext, useEffect, useState } from "react";
import { type Lang, langMeta, translations } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations["en"];
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "zc-lang";

function getSaved(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "en" || v === "fr" || v === "ar") return v;
  } catch { /* ignore */ }
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getSaved);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  };

  // Sync <html lang> and dir for accessibility + RTL
  useEffect(() => {
    const meta = langMeta[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
    // Arabic font class for proper rendering
    if (lang === "ar") {
      document.documentElement.classList.add("lang-ar");
    } else {
      document.documentElement.classList.remove("lang-ar");
    }
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang], dir: langMeta[lang].dir }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
