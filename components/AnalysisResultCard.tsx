import Link from "next/link";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Flame,
  Gauge,
  Globe2,
  Home,
  Lightbulb,
  Save,
  UtensilsCrossed
} from "lucide-react";
import { AnalysisQualityCard } from "@/components/AnalysisQualityCard";
import { Disclaimer } from "@/components/Disclaimer";
import { HealthScoreCard } from "@/components/HealthScoreCard";
import { useLanguage } from "@/components/LanguageProvider";
import { NutritionBalanceCard } from "@/components/NutritionBalanceCard";
import { RiskTagList } from "@/components/RiskTagList";
import { getRiskTagLabel } from "@/lib/i18n";
import type { AnalysisSource, MealAnalysis } from "@/types/meal";

interface AnalysisResultCardProps {
  analysis: MealAnalysis;
  imageSrc?: string;
  embedded?: boolean;
  onSave?: () => void;
  readOnly?: boolean;
  saved?: boolean;
  source?: AnalysisSource;
  warning?: string;
}

function previewText(text: string, language: "zh" | "en") {
  const limit = language === "zh" ? 58 : 96;

  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit).trim()}...`;
}

export function AnalysisResultCard({
  analysis,
  imageSrc,
  embedded = false,
  onSave,
  readOnly = false,
  saved,
  source = "mock",
  warning
}: AnalysisResultCardProps) {
  const { language, copy } = useLanguage();
  const sourceLabels: Record<AnalysisSource, Record<"zh" | "en", string>> = {
    openai: {
      zh: "OpenAI 实时分析",
      en: "OpenAI live analysis"
    },
    qwen: {
      zh: "Qwen 实时分析",
      en: "Qwen live analysis"
    },
    mock: {
      zh: "Mock 演示数据",
      en: "Mock demo data"
    }
  };
  const sourceLabel = sourceLabels[source][language];
  const riskTags = analysis.riskTagKeys?.length
    ? analysis.riskTagKeys.map((key) => getRiskTagLabel(key, language))
    : analysis.riskTags;
  const topRiskTags = riskTags.slice(0, 3);
  const scoreSummaryLabel =
    analysis.healthScore >= 80
      ? copy.result.strongBalance
      : analysis.healthScore >= 65
        ? copy.result.couldImprove
        : copy.result.needsAttention;
  const scoreBadgeTone =
    analysis.healthScore >= 80
      ? "border-leaf-200 bg-leaf-50 text-leaf-800"
      : analysis.healthScore >= 65
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-rose-200 bg-rose-50 text-rose-700";
  const fallbackText =
    language === "zh"
      ? "当前为演示模式：没有配置 API key、图片格式不适合实时分析，或 OpenAI / Qwen 请求暂时不可用。"
      : "Demo mode: no API key is configured, the image is not suitable for live analysis, or the OpenAI / Qwen request is temporarily unavailable.";
  const summaryCardClass =
    "rounded-lg border border-leaf-100 bg-white p-4 shadow-soft";

  return (
    <div className={embedded ? "space-y-6" : "page-shell space-y-6 py-8"}>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article
          className={`${summaryCardClass} bg-gradient-to-br from-leaf-50 via-white to-mint-50/80`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-leaf-800">
              <Gauge aria-hidden className="h-5 w-5" />
              <p className="text-xs font-extrabold uppercase">
                {language === "zh" ? "健康评分" : "Health Score"}
              </p>
            </div>
            <span
              className={`rounded-full border px-2 py-1 text-[11px] font-extrabold ${scoreBadgeTone}`}
            >
              {scoreSummaryLabel}
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-950">
            {analysis.healthScore}
            <span className="text-base font-bold text-slate-500"> / 100</span>
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {language === "zh" ? "AI 估算结果" : "AI estimate"}
          </p>
        </article>

        <article className={summaryCardClass}>
          <div className="flex items-center gap-2 text-leaf-700">
            <Flame aria-hidden className="h-5 w-5" />
            <p className="text-xs font-extrabold uppercase">
              {copy.result.estimatedCalories}
            </p>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-950">
            {analysis.estimatedCalories}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {language === "zh" ? "约估区间，非精准检测" : "Approximate range"}
          </p>
        </article>

        <article className={summaryCardClass}>
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle aria-hidden className="h-5 w-5" />
            <p className="text-xs font-extrabold uppercase">
              {language === "zh" ? "主要风险" : "Key Risks"}
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {topRiskTags.length ? (
              topRiskTags.map((tag) => (
                <span
                  className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-100"
                  key={tag}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-sm font-semibold text-slate-600">
                {language === "zh" ? "暂无明显标签" : "No key tags"}
              </span>
            )}
          </div>
        </article>

        <article
          className={`${summaryCardClass} border-mint-100 bg-gradient-to-br from-mint-50 via-white to-leaf-50`}
        >
          <div className="flex items-center gap-2 text-teal-700">
            <UtensilsCrossed aria-hidden className="h-5 w-5" />
            <p className="text-xs font-extrabold uppercase">
              {copy.result.nextMeal}
            </p>
          </div>
          <p className="text-pretty mt-3 text-sm font-semibold leading-6 text-slate-700">
            {previewText(analysis.nextMealSuggestion, language)}
          </p>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div className="rounded-lg border border-leaf-100 bg-white p-4 shadow-soft">
          {imageSrc ? (
            <img
              alt="Analyzed meal"
              className="h-72 w-full rounded-lg object-cover md:h-96"
              src={imageSrc}
            />
          ) : (
            <div className="grid h-72 place-items-center rounded-lg bg-leaf-50 text-center text-slate-500 md:h-96">
              {copy.common.noMealImage}
            </div>
          )}
        </div>

        <section className="flex rounded-lg border border-leaf-100 bg-white p-5 shadow-soft md:p-6">
          <div className="flex w-full flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="kicker">{copy.result.mealSummary}</p>
              <span
                className={
                  source !== "mock"
                    ? "rounded-md bg-leaf-100 px-3 py-1 text-xs font-bold text-leaf-700"
                    : "rounded-md bg-citrus-100 px-3 py-1 text-xs font-bold text-citrus-500"
                }
              >
                {sourceLabel}
              </span>
            </div>
            <h2 className="text-balance mt-4 text-3xl font-bold leading-tight text-slate-950">
              {copy.result.overview}
            </h2>
            {source === "mock" || warning ? (
              <p className="text-pretty mt-4 rounded-lg bg-citrus-100/70 px-3 py-2 text-sm leading-6 text-slate-700">
                {fallbackText}
              </p>
            ) : null}
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-leaf-50 p-4 sm:col-span-2">
                <dt className="text-xs font-bold uppercase text-slate-500">
                  {copy.result.recognizedFoods}
                </dt>
                <dd className="text-pretty mt-2 text-lg font-bold leading-7 text-slate-900">
                  {analysis.foodItems.join(", ")}
                </dd>
              </div>
              <div className="rounded-lg bg-white p-4 ring-1 ring-leaf-100">
                <dt className="text-xs font-bold uppercase text-slate-500">
                  {copy.result.estimatedCalories}
                </dt>
                <dd className="mt-2 text-lg font-bold text-slate-900">
                  {analysis.estimatedCalories}
                </dd>
              </div>
              <div className="rounded-lg bg-white p-4 ring-1 ring-leaf-100">
                <dt className="text-xs font-bold uppercase text-slate-500">
                  {copy.result.mealType}
                </dt>
                <dd className="text-pretty mt-2 text-lg font-bold leading-7 text-slate-900">
                  {analysis.mealType}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <HealthScoreCard score={analysis.healthScore} />
        <NutritionBalanceCard balance={analysis.nutritionBalance} />
        <AnalysisQualityCard quality={analysis.quality} />
      </div>

      <RiskTagList tags={analysis.riskTags} tagKeys={analysis.riskTagKeys} />

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <Lightbulb aria-hidden className="h-5 w-5 text-leaf-600" />
            <p className="kicker">{copy.result.personalizedAdvice}</p>
          </div>
          <p className="text-pretty mt-4 text-sm leading-7 text-slate-700">
            {analysis.personalizedAdvice}
          </p>
        </article>
        <article className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <UtensilsCrossed aria-hidden className="h-5 w-5 text-leaf-600" />
            <p className="kicker">{copy.result.nextMeal}</p>
          </div>
          <p className="text-pretty mt-4 text-sm leading-7 text-slate-700">
            {analysis.nextMealSuggestion}
          </p>
        </article>
        <article className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <Globe2 aria-hidden className="h-5 w-5 text-leaf-600" />
            <p className="kicker">{copy.result.crossCultural}</p>
          </div>
          <p className="text-pretty mt-4 text-sm leading-7 text-slate-700">
            {analysis.crossCulturalInsight}
          </p>
        </article>
      </section>

      <Disclaimer compact />

      {!readOnly ? (
        <div className="grid gap-3 md:grid-cols-3">
          <button
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-600 px-5 py-3 text-base font-bold text-white shadow-soft hover:bg-leaf-700 disabled:bg-leaf-400"
            disabled={saved}
            onClick={onSave}
            type="button"
          >
            {saved ? (
              <CheckCircle2 aria-hidden className="h-5 w-5" />
            ) : (
              <Save aria-hidden className="h-5 w-5" />
            )}
            {saved ? copy.common.saved : copy.result.save}
          </button>
          <Link
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-leaf-200 bg-white px-5 py-3 text-base font-bold text-leaf-800 hover:bg-leaf-50"
            href="/upload"
          >
            <Camera aria-hidden className="h-5 w-5" />
            {copy.result.analyzeAgain}
          </Link>
          <Link
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700 hover:bg-slate-50"
            href="/"
          >
            <Home aria-hidden className="h-5 w-5" />
            {copy.common.home}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
