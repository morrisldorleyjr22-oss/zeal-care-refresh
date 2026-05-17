import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { type Lang, langMeta } from "@/lib/i18n";
import { useLanguage } from "@/hooks/useLanguage";

const LANGS: Lang[] = ["en", "fr", "ar"];

export default function LanguageSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isDark = variant === "dark";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch language"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 transition-colors ${
          isDark
            ? "bg-white/10 text-white hover:bg-white/20 border border-white/15"
            : "bg-secondary text-navy hover:bg-primary/10 border border-secondary"
        }`}
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="uppercase tracking-wide">{lang}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl border border-secondary shadow-card-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {LANGS.map((l) => {
            const meta = langMeta[l];
            const active = l === lang;
            return (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors text-left ${
                  active
                    ? "bg-primary text-white"
                    : "text-navy hover:bg-secondary/60"
                }`}
              >
                <span className="text-base">{meta.flag}</span>
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
