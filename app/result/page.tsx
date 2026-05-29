"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { AnalysisResultCard } from "@/components/AnalysisResultCard";
import { useLanguage } from "@/components/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import {
  createSavedMealRecord,
  getMealDraft,
  saveMealRecord
} from "@/lib/storage";
import type {
  AnalysisSource,
  AnalyzeMealResponse,
  MealAnalysis,
  MealDraft,
  MealPreferences
} from "@/types/meal";

const demoPreferences: MealPreferences = {
  goal: "weightLoss",
  restrictions: ["avoidHighSugar", "avoidFriedFood"],
  scenario: "chineseCampus",
  mealTime: "lunch"
};

const demoDraft: MealDraft = {
  imageDataUrl: "/images/hero-meal.png",
  imageName: "NutriLens demo meal",
  uploadedAt: new Date().toISOString(),
  preferences: demoPreferences
};

export default function ResultPage() {
  const { language, copy } = useLanguage();
  const [draft, setDraft] = useState<MealDraft | null>(null);
  const [analysis, setAnalysis] = useState<MealAnalysis | null>(null);
  const [source, setSource] = useState<AnalysisSource>("mock");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams(window.location.search);
    const isDemo = params.get("demo") === "1";
    const currentDraft = isDemo ? demoDraft : getMealDraft();
    setDraft(currentDraft);

    if (!currentDraft?.preferences) {
      setLoading(false);
      setError(copy.result.missingPreferences);
      return;
    }

    setError("");
    setAnalysis(null);
    setWarning("");
    setSource("mock");
    setLoading(true);
    const timer = window.setTimeout(() => {
      setSaved(false);
      void fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          imageDataUrl: currentDraft.imageDataUrl,
          preferences: currentDraft.preferences,
          language
        }),
        signal: controller.signal
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Analysis request failed: ${response.status}`);
          }

          return (await response.json()) as AnalyzeMealResponse;
        })
        .then((payload) => {
          setAnalysis(payload.analysis);
          setSource(payload.source);
          setWarning(payload.warning ?? "");
        })
        .catch((requestError: unknown) => {
          if (
            requestError instanceof DOMException &&
            requestError.name === "AbortError"
          ) {
            return;
          }

          setError(copy.result.error);
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        });
    }, 450);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [copy.result.error, copy.result.missingPreferences, language]);

  function handleSave() {
    if (!analysis || !draft?.preferences) {
      return;
    }

    const record = createSavedMealRecord(
      analysis,
      draft.preferences,
      draft,
      source
    );
    saveMealRecord(record);
    setSaved(true);
  }

  const loadingText =
    language === "zh"
      ? "正在连接实时 AI 视觉模型并生成结构化营养分析；如果当前没有配置可用 API key，系统会自动切换到演示模式。"
      : "Connecting to the live AI vision model and generating a structured nutrition analysis. If no usable API key is configured, NutriLens will use demo mode automatically.";

  if (loading) {
    return (
      <>
        <PageHeader
          backHref="/preferences"
          description={copy.result.loadingDescription}
          eyebrow={copy.result.eyebrow}
          title={copy.result.title}
        />
        <div className="page-shell py-8">
          <section className="grid min-h-80 place-items-center rounded-lg border border-leaf-100 bg-white p-8 text-center shadow-soft">
            <div>
              <Loader2
                aria-hidden
                className="mx-auto h-12 w-12 animate-spin text-leaf-600"
              />
              <h2 className="mt-5 text-2xl font-bold text-slate-950">
                {copy.result.loadingTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {loadingText}
              </p>
            </div>
          </section>
        </div>
      </>
    );
  }

  if (error || !analysis) {
    return (
      <>
        <PageHeader
          backHref="/upload"
          description={copy.result.needsInputDescription}
          eyebrow={copy.result.needsInputEyebrow}
          title={copy.result.needsInputTitle}
        />
        <div className="page-shell py-8">
          <section className="rounded-lg border border-citrus-100 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold text-slate-950">
              {error || "Unable to load the result."}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {copy.result.errorHelp}
            </p>
            <Link
              className="focus-ring mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-600 px-5 py-3 text-base font-bold text-white hover:bg-leaf-700"
              href="/upload"
            >
              <Camera aria-hidden className="h-5 w-5" />
              {copy.result.uploadMealPhoto}
            </Link>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        backHref="/preferences"
        description={copy.result.description}
        eyebrow={copy.result.eyebrow}
        title={copy.result.title}
      />
      <AnalysisResultCard
        analysis={analysis}
        imageSrc={draft?.imageDataUrl}
        onSave={handleSave}
        saved={saved}
        source={source}
        warning={warning}
      />
    </>
  );
}
