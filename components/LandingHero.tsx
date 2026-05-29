"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function LandingHero() {
  const { copy } = useLanguage();

  return (
    <section className="relative min-h-[calc(100svh-9rem)] overflow-hidden border-b border-leaf-100 bg-leaf-50 md:min-h-[calc(100svh-8rem)]">
      <Image
        alt="Balanced cross-cultural campus meal"
        className="object-cover brightness-[0.92] saturate-[0.92]"
        fill
        priority
        sizes="100vw"
        src="/images/hero-meal.png"
        style={{ objectPosition: "72% center" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.99) 0%, rgba(255,255,255,0.95) 38%, rgba(240,253,244,0.72) 59%, rgba(255,255,255,0.14) 100%)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/92 via-white/18 to-white/40" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white/78 via-white/36 to-transparent md:w-2/3" />

      <div className="page-shell relative z-10 flex min-h-[calc(100svh-9rem)] items-center py-14 md:min-h-[calc(100svh-8rem)]">
        <div className="max-w-[42rem]">
          <div className="inline-flex max-w-full items-center gap-2 rounded-lg border border-leaf-200 bg-white/88 px-3 py-2 text-sm font-bold leading-5 text-leaf-800 shadow-soft backdrop-blur">
            <Sparkles aria-hidden className="h-4 w-4" />
            <span className="text-pretty">{copy.hero.eyebrow}</span>
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-none text-slate-950 md:text-7xl">
            NutriLens
          </h1>
          <p className="text-balance mt-5 max-w-2xl text-xl font-bold leading-8 text-leaf-900 md:text-2xl md:leading-9">
            {copy.hero.subtitle}
          </p>
          <p className="text-pretty mt-4 max-w-[36rem] text-base leading-8 text-slate-700 md:text-lg">
            {copy.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-600 px-6 py-3 text-base font-bold text-white shadow-soft transition hover:bg-leaf-700"
              href="/upload"
            >
              {copy.hero.start}
              <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
            <Link
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-leaf-200 bg-white/90 px-6 py-3 text-base font-bold text-leaf-800 transition hover:bg-leaf-50"
              href="/result?demo=1"
            >
              <PlayCircle aria-hidden className="h-5 w-5" />
              {copy.hero.demo}
            </Link>
          </div>

          <p className="text-pretty mt-5 max-w-[34rem] rounded-lg border border-white/70 bg-white/78 p-3 text-sm leading-6 text-slate-700 backdrop-blur">
            {copy.hero.pwa}
          </p>
        </div>
      </div>
    </section>
  );
}
