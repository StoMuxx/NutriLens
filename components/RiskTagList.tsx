 "use client";

import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getRiskTagLabel } from "@/lib/i18n";

interface RiskTagListProps {
  tags: string[];
  tagKeys?: string[];
}

export function RiskTagList({ tags, tagKeys }: RiskTagListProps) {
  const { language, copy } = useLanguage();
  const displayTags = tagKeys?.length
    ? tagKeys.map((key) => getRiskTagLabel(key, language))
    : tags;

  return (
    <section className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <AlertTriangle aria-hidden className="h-5 w-5 text-citrus-500" />
        <p className="kicker">
          {copy.result.riskTags}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {displayTags.map((tag) => (
          <span
            className="rounded-md bg-berry-100 px-3 py-2 text-sm font-bold text-berry-500"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
