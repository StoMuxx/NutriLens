"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { PreferenceForm } from "@/components/PreferenceForm";
import {
  clearDefaultMealPreferences,
  defaultMealPreferences,
  getDefaultMealPreferences,
  getMealDraft,
  saveDefaultMealPreferences,
  saveMealDraft
} from "@/lib/storage";
import { normalizeMealPreferences } from "@/lib/preferences";
import type { MealDraft, MealPreferences } from "@/types/meal";

export default function PreferencesPage() {
  const router = useRouter();
  const { copy } = useLanguage();
  const [draft, setDraft] = useState<MealDraft | null>(null);
  const [initialPreferences, setInitialPreferences] =
    useState<MealPreferences>(defaultMealPreferences);
  const [usingSavedDefaults, setUsingSavedDefaults] = useState(false);

  useEffect(() => {
    const currentDraft = getMealDraft();
    const savedDefaults = getDefaultMealPreferences();
    const preferences =
      currentDraft?.preferences ?? savedDefaults ?? defaultMealPreferences;

    setDraft(currentDraft);
    setInitialPreferences(normalizeMealPreferences(preferences));
    setUsingSavedDefaults(Boolean(!currentDraft?.preferences && savedDefaults));
  }, []);

  function handleSubmit(preferences: MealPreferences) {
    const normalizedPreferences = normalizeMealPreferences(preferences);
    const nextDraft = {
      ...(draft ?? {}),
      preferences: normalizedPreferences
    };
    saveMealDraft(nextDraft);
    saveDefaultMealPreferences(normalizedPreferences);
    router.push("/result");
  }

  function handleResetDefaults() {
    clearDefaultMealPreferences();
    setInitialPreferences(defaultMealPreferences);
    setUsingSavedDefaults(false);

    if (draft) {
      const nextDraft = {
        ...draft,
        preferences: defaultMealPreferences
      };
      setDraft(nextDraft);
      saveMealDraft(nextDraft);
    }
  }

  const hasImage = Boolean(draft?.imageDataUrl);

  return (
    <>
      <PageHeader
        backHref="/upload"
        description={copy.preferences.description}
        eyebrow={copy.preferences.eyebrow}
        title={copy.preferences.title}
      />

      <div className="page-shell py-8">
        {!hasImage ? (
          <section className="mb-6 rounded-lg border border-citrus-100 bg-citrus-100/55 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  {copy.preferences.noPhotoTitle}
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {copy.preferences.noPhotoDescription}
                </p>
              </div>
              <Link
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-leaf-600 px-4 py-2 text-sm font-bold text-white hover:bg-leaf-700"
                href="/upload"
              >
                <Camera aria-hidden className="h-4 w-4" />
                {copy.common.uploadPhoto}
              </Link>
            </div>
          </section>
        ) : null}

        <PreferenceForm
          initialPreferences={initialPreferences}
          onSubmit={handleSubmit}
          onResetDefaults={handleResetDefaults}
          usingSavedDefaults={usingSavedDefaults}
        />
      </div>
    </>
  );
}
