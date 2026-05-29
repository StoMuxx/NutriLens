 "use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getNutritionLevelLabel } from "@/lib/i18n";
import type { NutritionBalance, NutritionLevel } from "@/types/meal";

interface NutritionBalanceCardProps {
  balance: NutritionBalance;
}

const levelStyles: Record<NutritionLevel, string> = {
  High: "bg-citrus-100 text-citrus-500",
  Medium: "bg-leaf-100 text-leaf-700",
  Low: "bg-mint-50 text-teal-700"
};

const nutritionRows = ["carbs", "protein", "fat", "vegetables"] as const;

export function NutritionBalanceCard({
  balance
}: NutritionBalanceCardProps) {
  const { language, copy } = useLanguage();

  return (
    <section className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft">
      <p className="kicker">
        {copy.result.nutritionBalance}
      </p>
      <div className="mt-4 divide-y divide-leaf-100">
        {nutritionRows.map((key) => {
          const level = balance[key];

          return (
            <div
              className="flex items-center justify-between gap-4 py-3"
              key={key}
            >
              <span className="font-semibold text-slate-700">
                {copy.nutrition[key]}
              </span>
              <span
                className={`rounded-md px-3 py-1 text-sm font-bold ${levelStyles[level]}`}
              >
                {getNutritionLevelLabel(level, language)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
