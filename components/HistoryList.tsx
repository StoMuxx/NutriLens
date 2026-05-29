"use client";

import Link from "next/link";
import { CalendarDays, Camera, Eye, Trash2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  foodCultureOptions,
  mealTimeOptions,
  optionLabel
} from "@/lib/constants";
import { getRiskTagLabel } from "@/lib/i18n";
import type { AnalysisSource, SavedMealRecord } from "@/types/meal";

interface HistoryListProps {
  records: SavedMealRecord[];
  onDelete?: (id: string) => void;
}

function formatDate(value: string, language: "zh" | "en") {
  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function HistoryList({ onDelete, records }: HistoryListProps) {
  const { language, copy } = useLanguage();
  const sourceLabels: Record<AnalysisSource, string> = {
    openai: language === "zh" ? "OpenAI 实时分析" : "OpenAI",
    qwen: language === "zh" ? "Qwen 实时分析" : "Qwen",
    mock: language === "zh" ? "演示数据" : "Demo"
  };

  function handleDelete(record: SavedMealRecord) {
    const confirmed = window.confirm(
      language === "zh"
        ? "确定删除这条历史记录吗？此操作不会影响其他记录。"
        : "Delete this meal record? Other records will not be affected."
    );

    if (confirmed) {
      onDelete?.(record.id);
    }
  }

  if (!records.length) {
    return (
      <section className="rounded-lg border border-dashed border-leaf-200 bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-leaf-50 text-leaf-700">
          <Camera aria-hidden className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-950">
          {copy.history.emptyTitle}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {copy.history.emptyDescription}
        </p>
        <Link
          className="focus-ring mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-leaf-600 px-5 py-3 text-base font-bold text-white hover:bg-leaf-700"
          href="/upload"
        >
          {copy.history.emptyAction}
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {records.map((record) => (
        <article
          className="rounded-lg border border-leaf-100 bg-white p-4 shadow-soft transition hover:border-leaf-200"
          key={record.id}
        >
          <div className="flex gap-4">
            {record.imageDataUrl ? (
              <img
                alt={record.imageName ?? "Saved meal"}
                className="h-24 w-24 shrink-0 rounded-lg object-cover"
                src={record.imageDataUrl}
              />
            ) : (
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-lg bg-leaf-50 text-leaf-700">
                <Camera aria-hidden className="h-7 w-7" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
                  <CalendarDays aria-hidden className="h-4 w-4" />
                  {formatDate(record.createdAt, language)}
                  <span className="rounded-md bg-leaf-50 px-2 py-0.5 text-xs font-bold text-leaf-700">
                    {sourceLabels[record.source ?? "mock"]}
                  </span>
                </div>
                <button
                  aria-label={language === "zh" ? "删除记录" : "Delete record"}
                  className="focus-ring -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-berry-100 bg-white text-berry-500 hover:bg-berry-100"
                  onClick={() => handleDelete(record)}
                  title={language === "zh" ? "删除" : "Delete"}
                  type="button"
                >
                  <Trash2 aria-hidden className="h-4 w-4" />
                </button>
              </div>

              <h2 className="text-balance mt-2 text-lg font-bold leading-snug text-slate-950">
                {optionLabel(
                  foodCultureOptions.find(
                    (option) => option.id === record.preferences.scenario
                  ) ?? foodCultureOptions[0],
                  language
                )}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {optionLabel(
                  mealTimeOptions.find(
                    (option) =>
                      option.id === (record.preferences.mealTime ?? "lunch")
                  ) ?? mealTimeOptions[1],
                  language
                )}{" "}
                | {record.analysis.estimatedCalories} | {copy.history.score}{" "}
                {record.analysis.healthScore}/100
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {(record.analysis.riskTagKeys?.length
                  ? record.analysis.riskTagKeys
                      .map((key) => getRiskTagLabel(key, language))
                      .slice(0, 3)
                  : record.analysis.riskTags.slice(0, 3)
                ).map((tag) => (
                  <span
                    className="rounded-md bg-citrus-100 px-2 py-1 text-xs font-bold text-citrus-500"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                className="focus-ring mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-leaf-200 bg-white px-3 py-2 text-sm font-bold text-leaf-800 hover:bg-leaf-50"
                href={`/history/${record.id}`}
              >
                <Eye aria-hidden className="h-4 w-4" />
                {language === "zh" ? "查看详情" : "View Details"}
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
