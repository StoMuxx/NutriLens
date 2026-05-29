"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { Language } from "@/types/meal";

const options: { language: Language; label: string }[] = [
  { language: "zh", label: "中文" },
  { language: "en", label: "EN" }
];

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      aria-label="Language switcher"
      className={`inline-flex items-center rounded-lg border border-leaf-200 bg-white p-1 shadow-sm ${
        compact ? "gap-0" : "gap-1"
      }`}
      role="group"
    >
      {!compact ? (
        <Languages aria-hidden className="ml-2 h-4 w-4 text-leaf-700" />
      ) : null}
      {options.map((option) => (
        <button
          aria-pressed={language === option.language}
          className={`focus-ring rounded-md px-2.5 py-1.5 text-xs font-bold transition ${
            language === option.language
              ? "bg-leaf-600 text-white"
              : "text-slate-600 hover:bg-leaf-50 hover:text-leaf-800"
          }`}
          key={option.language}
          onClick={() => setLanguage(option.language)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
