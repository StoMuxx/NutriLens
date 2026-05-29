"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BarChart3, Clock, Salad, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { getSavedMeals } from "@/lib/storage";
import { getRiskTagLabel } from "@/lib/i18n";
import { mealTimeOptions, optionLabel } from "@/lib/constants";
import type { MealTime, SavedMealRecord } from "@/types/meal";

interface MealTimeStat {
  averageScore: number;
  count: number;
  mealTime: MealTime;
}

const mockMealTimeStats: MealTimeStat[] = [
  { mealTime: "breakfast", count: 2, averageScore: 76 },
  { mealTime: "lunch", count: 4, averageScore: 72 },
  { mealTime: "dinner", count: 3, averageScore: 64 },
  { mealTime: "lateNight", count: 1, averageScore: 68 }
];

function mostCommonTags(records: SavedMealRecord[]) {
  const counts = new Map<string, number>();
  records.forEach((record) => {
    const tags = record.analysis.riskTagKeys?.length
      ? record.analysis.riskTagKeys
      : record.analysis.riskTags;

    tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tag]) => tag);
}

function getMealTimeStats(records: SavedMealRecord[]) {
  if (!records.length) {
    return mockMealTimeStats;
  }

  return mealTimeOptions.map((option) => {
    const matchingRecords = records.filter(
      (record) => (record.preferences.mealTime ?? "lunch") === option.id
    );
    const count = matchingRecords.length;
    const averageScore = count
      ? Math.round(
          matchingRecords.reduce(
            (sum, record) => sum + record.analysis.healthScore,
            0
          ) / count
        )
      : 0;

    return {
      averageScore,
      count,
      mealTime: option.id
    };
  });
}

function getActiveMealTimeStats(stats: MealTimeStat[]) {
  return stats.filter((stat) => stat.count > 0);
}

export default function ProfilePage() {
  const { language, copy } = useLanguage();
  const [records, setRecords] = useState<SavedMealRecord[]>([]);

  useEffect(() => {
    setRecords(getSavedMeals());
  }, []);

  const summary = useMemo(() => {
    if (!records.length) {
      const mealTimeStats = getMealTimeStats(records);
      const activeMealTimeStats = getActiveMealTimeStats(mealTimeStats);

      return {
        averageScore: 72,
        commonIssues: copy.profile.mockIssues,
        commonMealTime:
          [...activeMealTimeStats].sort((a, b) => b.count - a.count)[0] ??
          mealTimeStats[1],
        isMock: true,
        lowestMealTime:
          [...activeMealTimeStats].sort(
            (a, b) => a.averageScore - b.averageScore
          )[0] ??
          mealTimeStats[2],
        mealTimeStats
      };
    }

    const commonIssueKeys = mostCommonTags(records);
    const mealTimeStats = getMealTimeStats(records);
    const activeMealTimeStats = getActiveMealTimeStats(mealTimeStats);

    return {
      averageScore: Math.round(
        records.reduce((sum, record) => sum + record.analysis.healthScore, 0) /
          records.length
      ),
      commonMealTime:
        [...activeMealTimeStats].sort((a, b) => b.count - a.count)[0] ??
        mealTimeStats[1],
      commonIssues: commonIssueKeys.map((tag) => getRiskTagLabel(tag, language)),
      isMock: false,
      lowestMealTime:
        [...activeMealTimeStats].sort(
          (a, b) => a.averageScore - b.averageScore
        )[0] ??
        mealTimeStats[1],
      mealTimeStats
    };
  }, [copy.profile.mockIssues, language, records]);

  const commonMealTimeOption =
    mealTimeOptions.find((option) => option.id === summary.commonMealTime.mealTime) ??
    mealTimeOptions[1];
  const lowestMealTimeOption =
    mealTimeOptions.find((option) => option.id === summary.lowestMealTime.mealTime) ??
    mealTimeOptions[1];
  const maxMealTimeCount = Math.max(
    1,
    ...summary.mealTimeStats.map((stat) => stat.count)
  );

  return (
    <>
      <PageHeader
        description={copy.profile.description}
        eyebrow={copy.profile.eyebrow}
        title={copy.profile.title}
      />

      <div className="page-shell space-y-5 py-8">
        {summary.isMock ? (
          <section className="text-pretty rounded-lg border border-citrus-100 bg-citrus-100/55 p-4 text-sm leading-7 text-slate-700">
            {copy.profile.mockNotice}
          </section>
        ) : null}

        <section className="grid gap-5 md:grid-cols-3">
          <article className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-leaf-600 text-white">
              <BarChart3 aria-hidden className="h-6 w-6" />
            </div>
            <p className="kicker mt-5">
              {copy.profile.averageScore}
            </p>
            <p className="mt-2 text-5xl font-bold text-slate-950">
              {summary.averageScore}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">/ 100</p>
          </article>

          <article className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft md:col-span-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-mint-50 text-teal-700">
              <Sparkles aria-hidden className="h-6 w-6" />
            </div>
            <p className="kicker mt-5">
              {copy.profile.commonIssues}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {summary.commonIssues.map((issue) => (
                <span
                  className="rounded-md bg-leaf-50 px-3 py-2 text-sm font-bold text-leaf-800"
                  key={issue}
                >
                  {issue}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-lg border border-leaf-100 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-leaf-50 text-leaf-700">
                <Clock aria-hidden className="h-6 w-6" />
              </div>
              <p className="kicker mt-5">
                {language === "zh" ? "餐次洞察" : "Meal Time Insights"}
              </p>
              <h2 className="text-balance mt-2 text-2xl font-bold leading-tight text-slate-950">
                {language === "zh"
                  ? `最常分析：${optionLabel(commonMealTimeOption, language)}`
                  : `Most analyzed: ${optionLabel(commonMealTimeOption, language)}`}
              </h2>
              <p className="text-pretty mt-3 text-sm leading-7 text-slate-600">
                {summary.lowestMealTime.averageScore < 70
                  ? language === "zh"
                    ? `${optionLabel(lowestMealTimeOption, language)}记录的平均评分较低，可以关注油脂、含糖饮料和蔬菜比例。`
                    : `${optionLabel(lowestMealTimeOption, language)} has a lower average score. Watch oil, sweet drinks, and vegetable balance.`
                  : language === "zh"
                    ? "目前各餐次表现较稳定，可以继续保持优质蛋白和蔬菜比例。"
                    : "Your meal-time pattern looks steady. Keep reliable protein and vegetables in the mix."}
              </p>
            </div>

            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              {summary.mealTimeStats.map((stat) => {
                const option =
                  mealTimeOptions.find((item) => item.id === stat.mealTime) ??
                  mealTimeOptions[1];
                const width = `${Math.max(
                  8,
                  Math.round((stat.count / maxMealTimeCount) * 100)
                )}%`;

                return (
                  <article
                    className="rounded-lg border border-leaf-100 bg-leaf-50/70 p-4"
                    key={stat.mealTime}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-slate-950">
                        {optionLabel(option, language)}
                      </p>
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-leaf-700">
                        {stat.count} {language === "zh" ? "条" : "records"}
                      </span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white">
                      <div
                        className="h-2 rounded-full bg-leaf-600"
                        style={{ width }}
                      />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-600">
                      {language === "zh" ? "平均评分" : "Avg score"}{" "}
                      <span className="font-bold text-slate-950">
                        {stat.count ? stat.averageScore : "--"}
                      </span>
                      {stat.count ? " / 100" : ""}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-leaf-100 bg-white p-6 shadow-soft">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-leaf-50 text-leaf-700">
            <Salad aria-hidden className="h-6 w-6" />
          </div>
          <h2 className="text-balance mt-5 text-2xl font-bold leading-tight text-slate-950">
            {copy.profile.weeklySuggestion}
          </h2>
          <p className="text-pretty mt-3 max-w-3xl text-base leading-8 text-slate-700">
            {copy.profile.weeklyText}
          </p>
          <Link
            className="focus-ring mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-600 px-5 py-3 text-base font-bold text-white hover:bg-leaf-700"
            href="/upload"
          >
            {copy.profile.analyzeNew}
            <ArrowRight aria-hidden className="h-5 w-5" />
          </Link>
        </section>
      </div>
    </>
  );
}
