"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check, RotateCcw, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  dietaryGoalOptions,
  dietaryRestrictionOptions,
  foodCultureOptions,
  mealTimeOptions,
  optionDescription,
  optionLabel
} from "@/lib/constants";
import { normalizeMealPreferences } from "@/lib/preferences";
import type {
  DietaryGoal,
  DietaryRestriction,
  FoodCultureScenario,
  MealPreferences,
  MealTime,
  SelectOption
} from "@/types/meal";

interface PreferenceFormProps {
  initialPreferences?: MealPreferences;
  onSubmit: (preferences: MealPreferences) => void;
  onResetDefaults: () => void;
  usingSavedDefaults?: boolean;
}

function OptionButton<T extends string>({
  option,
  selected,
  onClick,
  type = "button"
}: {
  option: SelectOption<T>;
  selected: boolean;
  onClick: () => void;
  type?: "button" | "submit";
}) {
  const { language } = useLanguage();

  return (
    <button
      className={`focus-ring min-h-24 rounded-lg border p-4 text-left transition ${
        selected
          ? "border-leaf-600 bg-leaf-50 shadow-soft"
          : "border-leaf-100 bg-white hover:border-leaf-300 hover:bg-leaf-50/60"
      }`}
      onClick={onClick}
      type={type}
    >
      <span className="flex items-start justify-between gap-3">
        <span>
          <span className="text-balance block text-base font-bold leading-snug text-slate-950">
            {optionLabel(option, language)}
          </span>
        </span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${
            selected ? "border-leaf-600 bg-leaf-600 text-white" : "border-slate-200"
          }`}
        >
          {selected ? <Check aria-hidden className="h-4 w-4" /> : null}
        </span>
      </span>
      <span className="text-pretty mt-3 block text-sm leading-6 text-slate-600">
        {optionDescription(option, language)}
      </span>
    </button>
  );
}

export function PreferenceForm({
  initialPreferences,
  onSubmit,
  onResetDefaults,
  usingSavedDefaults = false
}: PreferenceFormProps) {
  const { language, copy } = useLanguage();
  const normalizedInitial = normalizeMealPreferences(initialPreferences);
  const [goal, setGoal] = useState<DietaryGoal>(
    normalizedInitial.goal
  );
  const [restrictions, setRestrictions] = useState<DietaryRestriction[]>(
    normalizedInitial.restrictions
  );
  const [scenario, setScenario] = useState<FoodCultureScenario>(
    normalizedInitial.scenario
  );
  const [mealTime, setMealTime] = useState<MealTime>(
    normalizedInitial.mealTime
  );
  const [note, setNote] = useState(normalizedInitial.note ?? "");

  useEffect(() => {
    const next = normalizeMealPreferences(initialPreferences);
    setGoal(next.goal);
    setRestrictions(next.restrictions);
    setScenario(next.scenario);
    setMealTime(next.mealTime);
    setNote(next.note ?? "");
  }, [initialPreferences]);

  function toggleRestriction(restriction: DietaryRestriction) {
    if (restriction === "none") {
      setRestrictions(["none"]);
      return;
    }

    setRestrictions((current) => {
      const withoutNone = current.filter((item) => item !== "none");
      if (withoutNone.includes(restriction)) {
        const next = withoutNone.filter((item) => item !== restriction);
        return next.length ? next : ["none"];
      }
      return [...withoutNone, restriction];
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      goal,
      restrictions,
      scenario,
      mealTime,
      note: note.trim() || undefined
    });
  }

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      {usingSavedDefaults ? (
        <section className="rounded-lg border border-leaf-100 bg-leaf-50 p-4 text-sm font-semibold leading-6 text-leaf-800">
          {language === "zh"
            ? "已使用你保存的默认饮食偏好。"
            : "Using your saved default meal preferences."}
        </section>
      ) : null}

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles aria-hidden className="h-5 w-5 text-leaf-600" />
          <h2 className="text-balance text-xl font-bold leading-tight text-slate-950">
            {copy.preferences.goal}
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {dietaryGoalOptions.map((option) => (
            <OptionButton
              key={option.id}
              onClick={() => setGoal(option.id)}
              option={option}
              selected={goal === option.id}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-balance mb-4 text-xl font-bold leading-tight text-slate-950">
          {copy.preferences.restrictions}
        </h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {dietaryRestrictionOptions.map((option) => (
            <OptionButton
              key={option.id}
              onClick={() => toggleRestriction(option.id)}
              option={option}
              selected={restrictions.includes(option.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-balance mb-4 text-xl font-bold leading-tight text-slate-950">
          {copy.preferences.scenario}
        </h2>
        <div className="grid gap-3 lg:grid-cols-3">
          {foodCultureOptions.map((option) => (
            <OptionButton
              key={option.id}
              onClick={() => setScenario(option.id)}
              option={option}
              selected={scenario === option.id}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-balance mb-4 text-xl font-bold leading-tight text-slate-950">
          {language === "zh" ? "餐次" : "Meal Time"}
        </h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {mealTimeOptions.map((option) => (
            <OptionButton
              key={option.id}
              onClick={() => setMealTime(option.id)}
              option={option}
              selected={mealTime === option.id}
            />
          ))}
        </div>
      </section>

      <label className="block">
        <span className="text-balance text-lg font-bold leading-tight text-slate-950">
          {copy.preferences.noteTitle}
        </span>
        <textarea
          className="focus-ring mt-3 min-h-32 w-full resize-y rounded-lg border border-leaf-100 bg-white p-4 text-base text-slate-800 shadow-soft placeholder:text-slate-400"
          onChange={(event) => setNote(event.target.value)}
          placeholder={copy.preferences.notePlaceholder}
          value={note}
        />
      </label>

      <div className="flex flex-col gap-3 md:flex-row">
        <button
          className="focus-ring flex min-h-14 w-full items-center justify-center rounded-lg bg-leaf-600 px-6 py-4 text-lg font-bold text-white shadow-soft transition hover:bg-leaf-700 md:w-auto"
          type="submit"
        >
          {copy.preferences.analyze}
        </button>
        <button
          className="focus-ring inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg border border-leaf-200 bg-white px-6 py-4 text-base font-bold text-leaf-800 hover:bg-leaf-50 md:w-auto"
          onClick={onResetDefaults}
          type="button"
        >
          <RotateCcw aria-hidden className="h-5 w-5" />
          {language === "zh" ? "重置默认偏好" : "Reset Defaults"}
        </button>
      </div>
    </form>
  );
}
