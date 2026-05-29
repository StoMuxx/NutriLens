"use client";

import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getNutritionLevelLabel } from "@/lib/i18n";
import type { AnalysisQuality, AnalysisQualityLevel } from "@/types/meal";

interface AnalysisQualityCardProps {
  quality?: AnalysisQuality;
}

function levelClass(level: AnalysisQualityLevel) {
  if (level === "High") {
    return "bg-leaf-100 text-leaf-800";
  }

  if (level === "Low") {
    return "bg-berry-100 text-berry-500";
  }

  return "bg-citrus-100 text-citrus-500";
}

export function AnalysisQualityCard({ quality }: AnalysisQualityCardProps) {
  const { language } = useLanguage();
  const fallbackNote =
    language === "zh"
      ? "图片识别结果只是估算，用于健康饮食教育参考，不代表精准检测。"
      : "Image-based analysis is an estimate for wellness education, not precise detection.";
  const clarity = quality?.clarity ?? "Medium";
  const confidence = quality?.confidence ?? "Medium";

  return (
    <section className="rounded-lg border border-leaf-100 bg-white p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <ShieldCheck aria-hidden className="h-5 w-5 text-leaf-600" />
        <p className="kicker">
          {language === "zh" ? "图片质量与可信度" : "Image Quality"}
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-leaf-50 p-3">
          <p className="text-xs font-bold uppercase text-slate-500">
            {language === "zh" ? "图片清晰度" : "Image Clarity"}
          </p>
          <span
            className={`mt-2 inline-flex rounded-md px-2 py-1 text-sm font-bold ${levelClass(
              clarity
            )}`}
          >
            {getNutritionLevelLabel(clarity, language)}
          </span>
        </div>
        <div className="rounded-lg bg-leaf-50 p-3">
          <p className="text-xs font-bold uppercase text-slate-500">
            {language === "zh"
              ? "识别置信度"
              : "Recognition Confidence"}
          </p>
          <span
            className={`mt-2 inline-flex rounded-md px-2 py-1 text-sm font-bold ${levelClass(
              confidence
            )}`}
          >
            {getNutritionLevelLabel(confidence, language)}
          </span>
        </div>
      </div>

      <p className="text-pretty mt-4 text-sm leading-7 text-slate-600">
        <span className="font-bold text-slate-800">
          {language === "zh" ? "安全提示：" : "Safety Note: "}
        </span>
        {quality?.safetyNote ?? fallbackNote}
      </p>
    </section>
  );
}
