import type {
  AnalysisSource,
  MealAnalysis,
  MealDraft,
  MealPreferences,
  SavedMealRecord
} from "@/types/meal";
import {
  defaultMealPreferences,
  normalizeMealPreferences
} from "@/lib/preferences";

const DRAFT_KEY = "nutrilens.mealDraft";
const HISTORY_KEY = "nutrilens.savedMeals";
const DEFAULT_PREFERENCES_KEY = "nutrilens.defaultPreferences";
const MAX_HISTORY_ITEMS = 20;

function hasBrowserStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getMealDraft(): MealDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  const draft = safeParse<MealDraft | null>(
    window.sessionStorage.getItem(DRAFT_KEY),
    null
  );

  if (!draft?.preferences) {
    return draft;
  }

  return {
    ...draft,
    preferences: normalizeMealPreferences(draft.preferences)
  };
}

export function saveMealDraft(draft: MealDraft) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    DRAFT_KEY,
    JSON.stringify(
      draft.preferences
        ? { ...draft, preferences: normalizeMealPreferences(draft.preferences) }
        : draft
    )
  );
}

export function clearMealDraft() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(DRAFT_KEY);
}

export function getDefaultMealPreferences(): MealPreferences | null {
  if (!hasBrowserStorage()) {
    return null;
  }

  const preferences = safeParse<Partial<MealPreferences> | null>(
    window.localStorage.getItem(DEFAULT_PREFERENCES_KEY),
    null
  );

  return preferences ? normalizeMealPreferences(preferences) : null;
}

export function saveDefaultMealPreferences(preferences: MealPreferences) {
  if (!hasBrowserStorage()) {
    return;
  }

  window.localStorage.setItem(
    DEFAULT_PREFERENCES_KEY,
    JSON.stringify(normalizeMealPreferences(preferences))
  );
}

export function clearDefaultMealPreferences() {
  if (!hasBrowserStorage()) {
    return;
  }

  window.localStorage.removeItem(DEFAULT_PREFERENCES_KEY);
}

export function getSavedMeals(): SavedMealRecord[] {
  if (!hasBrowserStorage()) {
    return [];
  }

  return safeParse<SavedMealRecord[]>(
    window.localStorage.getItem(HISTORY_KEY),
    []
  ).map((record) => ({
    ...record,
    preferences: normalizeMealPreferences(record.preferences)
  }));
}

export function getSavedMealById(id: string): SavedMealRecord | null {
  return getSavedMeals().find((record) => record.id === id) ?? null;
}

export function saveMealRecord(record: SavedMealRecord): SavedMealRecord[] {
  if (!hasBrowserStorage()) {
    return [];
  }

  const records = [record, ...getSavedMeals()].slice(0, MAX_HISTORY_ITEMS);

  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
    return records;
  } catch {
    const lighterRecord = { ...record, imageDataUrl: undefined };
    const lighterRecords = [lighterRecord, ...getSavedMeals()].slice(
      0,
      MAX_HISTORY_ITEMS
    );
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(lighterRecords));
    return lighterRecords;
  }
}

export function deleteSavedMealRecord(id: string): SavedMealRecord[] {
  if (!hasBrowserStorage()) {
    return [];
  }

  const records = getSavedMeals().filter((record) => record.id !== id);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
  return records;
}

export function clearSavedMeals() {
  if (!hasBrowserStorage()) {
    return;
  }

  window.localStorage.removeItem(HISTORY_KEY);
}

export function createSavedMealRecord(
  analysis: MealAnalysis,
  preferences: MealPreferences,
  draft: MealDraft,
  source: AnalysisSource = "mock"
): SavedMealRecord {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    imageDataUrl: draft.imageDataUrl,
    imageName: draft.imageName,
    preferences: normalizeMealPreferences(preferences),
    analysis,
    source
  };
}

export { defaultMealPreferences };
