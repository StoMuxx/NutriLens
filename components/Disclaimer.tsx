"use client";

import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

interface DisclaimerProps {
  compact?: boolean;
}

export function Disclaimer({ compact = false }: DisclaimerProps) {
  const { copy } = useLanguage();

  return (
    <section
      className={`rounded-lg border border-citrus-100 bg-citrus-100/50 ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className="flex gap-3">
        <ShieldCheck
          aria-hidden
          className="mt-0.5 h-5 w-5 shrink-0 text-citrus-500"
        />
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-900">
            {copy.disclaimer.title}
          </p>
          <p className="text-pretty text-sm leading-7 text-slate-700">
            {compact ? copy.disclaimer.result : copy.disclaimer.full}
          </p>
          {!compact ? (
            <p className="text-pretty text-sm leading-7 text-slate-700">
              {copy.disclaimer.result}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
