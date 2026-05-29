"use client";

import {
  Brain,
  Camera,
  Globe2,
  Leaf,
  Lightbulb,
  School,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { FeatureCard } from "@/components/FeatureCard";
import { LandingHero } from "@/components/LandingHero";
import { useLanguage } from "@/components/LanguageProvider";
import { featureCards, innovationBullets } from "@/lib/constants";

const featureIcons = [Camera, Brain, Globe2];

const valueStats = [
  {
    detailEn: "Chinese, American, and mixed campus meal contexts.",
    detailZh: "中国、美国与国际化混合校园餐。",
    labelEn: "campus meal scenarios",
    labelZh: "个校园饮食场景",
    value: "3"
  },
  {
    detailEn: "Balanced eating, weight loss, muscle gain, and more.",
    detailZh: "覆盖均衡、减脂、增肌、控糖等目标。",
    labelEn: "dietary goals",
    labelZh: "类饮食目标",
    value: "6"
  },
  {
    detailEn: "History stays on this device for a stable demo.",
    detailZh: "历史记录保存在本机，演示稳定轻量。",
    labelEn: "privacy demo",
    labelZh: "隐私演示",
    value: "Local-first"
  },
  {
    detailEn: "Add to home screen and open like an app.",
    detailZh: "可添加到手机主屏幕，像 App 一样打开。",
    labelEn: "mobile app feel",
    labelZh: "移动端体验",
    value: "PWA-ready"
  }
];

const valueIcons = [Globe2, Brain, ShieldCheck, Smartphone];

export default function HomePage() {
  const { language, copy } = useLanguage();

  return (
    <>
      <LandingHero />

      <section className="page-shell py-12 md:py-16">
        <div className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <School aria-hidden className="h-5 w-5 text-leaf-600" />
            <p className="kicker bg-white px-3 py-1 shadow-sm">
              {language === "zh" ? "比赛展示亮点" : "Competition Value"}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {valueStats.map((stat, index) => {
              const Icon = valueIcons[index];

              return (
                <article
                  className="rounded-lg border border-leaf-100 bg-white p-4 shadow-soft"
                  key={stat.value}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-2xl font-bold leading-tight text-slate-950">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm font-extrabold text-leaf-700">
                        {language === "zh" ? stat.labelZh : stat.labelEn}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-leaf-50 text-leaf-700">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="text-pretty mt-3 text-xs font-semibold leading-5 text-slate-500">
                    {language === "zh" ? stat.detailZh : stat.detailEn}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mb-7 max-w-2xl">
          <p className="kicker bg-white px-3 py-1 shadow-sm">
            {language === "zh" ? "核心能力" : "Core Capabilities"}
          </p>
          <h2 className="text-balance mt-3 text-2xl font-bold leading-tight text-slate-950 md:text-3xl">
            {language === "zh"
              ? "从一张饭菜照片开始，完成可演示的健康饮食决策流程。"
              : "A complete meal decision flow from one food photo."}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((feature, index) => (
            <FeatureCard
              description={
                language === "zh" ? feature.descriptionZh : feature.descriptionEn
              }
              icon={featureIcons[index]}
              key={feature.titleEn}
              title={language === "zh" ? feature.titleZh : feature.titleEn}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-leaf-100 bg-white py-12 md:py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-leaf-600 text-white shadow-soft">
              <Lightbulb aria-hidden className="h-6 w-6" />
            </div>
            <h2 className="text-balance mt-5 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
              {copy.home.whyTitle}
            </h2>
            <p className="text-pretty mt-4 text-base leading-8 text-slate-600">
              {copy.home.whyDescription}
            </p>
          </div>

          <div className="grid gap-3">
            {innovationBullets[language].map((item) => (
              <div
                className="flex gap-3 rounded-lg border border-leaf-100 bg-leaf-50/70 p-4"
                key={item}
              >
                <Leaf aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                <p className="text-pretty text-sm leading-6 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-12 md:py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-lg border border-leaf-100 bg-white p-6 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-mint-50 text-teal-700">
              <School aria-hidden className="h-6 w-6" />
            </div>
            <h2 className="text-balance mt-5 text-2xl font-bold leading-tight text-slate-950">
              {copy.home.innovationTitle}
            </h2>
            <p className="text-pretty mt-3 text-sm leading-7 text-slate-600">
              {copy.home.innovationDescription}
            </p>
          </article>
          <Disclaimer />
        </div>
      </section>
    </>
  );
}
