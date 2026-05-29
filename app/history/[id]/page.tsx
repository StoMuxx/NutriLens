"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarDays, Camera } from "lucide-react";
import { AnalysisResultCard } from "@/components/AnalysisResultCard";
import { useLanguage } from "@/components/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import {
  dietaryGoalOptions,
  dietaryRestrictionOptions,
  foodCultureOptions,
  mealTimeOptions,
  optionLabel
} from "@/lib/constants";
import { getSavedMealById } from "@/lib/storage";
import type { AnalysisSource, SavedMealRecord } from "@/types/meal";

function formatDate(value: string, language: "zh" | "en") {
  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function getParamId(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function HistoryDetailPage() {
  const params = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [record, setRecord] = useState<SavedMealRecord | null | undefined>();
  const sourceLabels: Record<AnalysisSource, string> = {
    openai: language === "zh" ? "OpenAI 实时分析" : "OpenAI live analysis",
    qwen: language === "zh" ? "Qwen 实时分析" : "Qwen live analysis",
    mock: language === "zh" ? "Mock 演示数据" : "Mock demo data"
  };

  useEffect(() => {
    const id = getParamId(params.id);
    setRecord(id ? getSavedMealById(id) : null);
  }, [params.id]);

  if (record === undefined) {
    return (
      <>
        <PageHeader
          backHref="/history"
          description={
            language === "zh"
              ? "正在读取本机保存的餐食记录。"
              : "Loading the saved meal record from this device."
          }
          eyebrow={language === "zh" ? "历史详情" : "History Detail"}
          title={language === "zh" ? "正在加载" : "Loading"}
        />
      </>
    );
  }

  if (!record) {
    return (
      <>
        <PageHeader
          backHref="/history"
          description={
            language === "zh"
              ? "这条记录可能已被删除，或不在当前设备的 localStorage 中。"
              : "This record may have been deleted or is not saved on this device."
          }
          eyebrow={language === "zh" ? "未找到记录" : "Record Not Found"}
          title={language === "zh" ? "没有找到这条历史记录" : "Meal record not found"}
        />
        <div className="page-shell py-8">
          <section className="rounded-lg border border-dashed border-leaf-200 bg-white p-8 text-center shadow-soft">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-leaf-50 text-leaf-700">
              <Camera aria-hidden className="h-7 w-7" />
            </div>
            <p className="text-pretty mt-4 text-sm leading-7 text-slate-600">
              {language === "zh"
                ? "返回历史记录页查看当前仍保存的餐食分析。"
                : "Return to meal history to view records that are still saved."}
            </p>
            <Link
              className="focus-ring mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-600 px-5 py-3 text-base font-bold text-white hover:bg-leaf-700"
              href="/history"
            >
              <ArrowLeft aria-hidden className="h-5 w-5" />
              {language === "zh" ? "返回历史记录" : "Back to History"}
            </Link>
          </section>
        </div>
      </>
    );
  }

  const goal =
    dietaryGoalOptions.find((option) => option.id === record.preferences.goal) ??
    dietaryGoalOptions[0];
  const scenario =
    foodCultureOptions.find(
      (option) => option.id === record.preferences.scenario
    ) ?? foodCultureOptions[0];
  const mealTime =
    mealTimeOptions.find(
      (option) => option.id === (record.preferences.mealTime ?? "lunch")
    ) ?? mealTimeOptions[1];
  const restrictions = record.preferences.restrictions.length
    ? record.preferences.restrictions
    : ["none"];

  return (
    <>
      <PageHeader
        backHref="/history"
        description={
          language === "zh"
            ? "这是一条保存在当前设备上的完整餐食分析记录。"
            : "A complete saved meal analysis stored on this device."
        }
        eyebrow={language === "zh" ? "历史详情" : "History Detail"}
        title={language === "zh" ? "餐食分析详情" : "Meal Analysis Detail"}
      />

      <div className="page-shell space-y-6 py-8">
        <section className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft md:p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
            <CalendarDays aria-hidden className="h-4 w-4" />
            {formatDate(record.createdAt, language)}
            <span className="rounded-md bg-leaf-50 px-2 py-0.5 text-xs font-bold text-leaf-700">
              {sourceLabels[record.source ?? "mock"]}
            </span>
          </div>

          <dl className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-leaf-50 p-4">
              <dt className="text-xs font-bold uppercase text-slate-500">
                {language === "zh" ? "餐次" : "Meal Time"}
              </dt>
              <dd className="text-pretty mt-2 font-bold leading-6 text-slate-900">
                {optionLabel(mealTime, language)}
              </dd>
            </div>
            <div className="rounded-lg bg-leaf-50 p-4">
              <dt className="text-xs font-bold uppercase text-slate-500">
                {language === "zh" ? "饮食目标" : "Dietary Goal"}
              </dt>
              <dd className="text-pretty mt-2 font-bold leading-6 text-slate-900">
                {optionLabel(goal, language)}
              </dd>
            </div>
            <div className="rounded-lg bg-leaf-50 p-4">
              <dt className="text-xs font-bold uppercase text-slate-500">
                {language === "zh" ? "文化场景" : "Culture Scenario"}
              </dt>
              <dd className="text-pretty mt-2 font-bold leading-6 text-slate-900">
                {optionLabel(scenario, language)}
              </dd>
            </div>
            <div className="rounded-lg bg-leaf-50 p-4">
              <dt className="text-xs font-bold uppercase text-slate-500">
                {language === "zh" ? "饮食限制" : "Restrictions"}
              </dt>
              <dd className="text-pretty mt-2 font-bold leading-6 text-slate-900">
                {restrictions
                  .map((restriction) =>
                    optionLabel(
                      dietaryRestrictionOptions.find(
                        (option) => option.id === restriction
                      ) ?? dietaryRestrictionOptions[0],
                      language
                    )
                  )
                  .join(", ")}
              </dd>
            </div>
          </dl>
        </section>

        <AnalysisResultCard
          analysis={record.analysis}
          embedded
          imageSrc={record.imageDataUrl}
          readOnly
          source={record.source ?? "mock"}
        />
      </div>
    </>
  );
}
