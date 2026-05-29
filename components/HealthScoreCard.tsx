"use client";

import { useLanguage } from "@/components/LanguageProvider";

interface HealthScoreCardProps {
  score: number;
}

export function HealthScoreCard({ score }: HealthScoreCardProps) {
  const { copy } = useLanguage();
  const normalizedScore = Math.min(100, Math.max(0, score));
  const scoreLabel =
    normalizedScore >= 80
      ? copy.result.strongBalance
      : normalizedScore >= 65
        ? copy.result.couldImprove
        : copy.result.needsAttention;
  const progressColor =
    normalizedScore >= 80
      ? "#16a34a"
      : normalizedScore >= 65
        ? "#f59e0b"
        : "#ef4444";
  const badgeClass =
    normalizedScore >= 80
      ? "border-leaf-200 bg-leaf-50 text-leaf-800"
      : normalizedScore >= 65
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-rose-200 bg-rose-50 text-rose-700";

  return (
    <section className="rounded-lg border border-leaf-100 bg-gradient-to-br from-white via-white to-leaf-50/70 p-5 shadow-soft md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="kicker">{copy.result.healthScore}</p>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-extrabold ${badgeClass}`}
        >
          {scoreLabel}
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <div
          aria-label={`Health score ${normalizedScore} out of 100`}
          className="grid h-36 w-36 shrink-0 place-items-center rounded-full p-2 shadow-[inset_0_0_0_1px_rgba(22,163,74,0.10)]"
          style={{
            background: `conic-gradient(${progressColor} ${
              normalizedScore * 3.6
            }deg, #e8f8ee 0deg)`
          }}
        >
          <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center shadow-inner">
            <div>
              <span className="block text-4xl font-bold leading-none text-slate-950">
                {normalizedScore}
              </span>
              <span className="mt-1 block text-sm font-semibold text-slate-500">
                / 100
              </span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-balance text-2xl font-bold leading-tight text-slate-950">
            {scoreLabel}
          </h2>
          <p className="text-pretty mt-3 max-w-md text-sm leading-7 text-slate-600">
            {copy.result.scoreDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
