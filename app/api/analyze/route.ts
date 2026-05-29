import { NextResponse } from "next/server";
import {
  analyzeMealWithLiveAI,
  getSelectedLiveAIProvider
} from "@/lib/openaiAnalysis";
import { mockAnalyzeMeal } from "@/lib/mockAnalysis";
import type {
  DietaryGoal,
  DietaryRestriction,
  FoodCultureScenario,
  Language,
  MealPreferences,
  MealTime
} from "@/types/meal";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_IMAGE_DATA_URL_LENGTH = 7_000_000;

const dietaryGoals: DietaryGoal[] = [
  "balanced",
  "weightLoss",
  "muscleGain",
  "lowSugar",
  "lowSodium",
  "vegetarian"
];

const dietaryRestrictions: DietaryRestriction[] = [
  "none",
  "lactoseIntolerance",
  "nutAllergy",
  "halal",
  "avoidHighSugar",
  "avoidFriedFood"
];

const foodCultureScenarios: FoodCultureScenario[] = [
  "chineseCampus",
  "americanCampus",
  "mixedInternational"
];

const mealTimes: MealTime[] = ["breakfast", "lunch", "dinner", "lateNight"];

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function isOneOf<T extends string>(value: unknown, options: T[]): value is T {
  return typeof value === "string" && options.includes(value as T);
}

function parseLanguage(value: unknown): Language {
  return value === "en" ? "en" : "zh";
}

function parsePreferences(value: unknown): MealPreferences | null {
  const data = asRecord(value);

  if (!isOneOf(data.goal, dietaryGoals)) {
    return null;
  }

  if (!isOneOf(data.scenario, foodCultureScenarios)) {
    return null;
  }

  const restrictions = Array.isArray(data.restrictions)
    ? data.restrictions.filter((item): item is DietaryRestriction =>
        isOneOf(item, dietaryRestrictions)
      )
    : [];

  return {
    goal: data.goal,
    scenario: data.scenario,
    mealTime: isOneOf(data.mealTime, mealTimes) ? data.mealTime : "lunch",
    restrictions: restrictions.length ? restrictions : ["none"],
    note:
      typeof data.note === "string" && data.note.trim()
        ? data.note.trim().slice(0, 500)
        : undefined
  };
}

function canSendToLiveAI(imageDataUrl: unknown): imageDataUrl is string {
  return (
    typeof imageDataUrl === "string" &&
    /^data:image\/(?:png|jpeg|jpg|webp);base64,/i.test(imageDataUrl) &&
    imageDataUrl.length <= MAX_IMAGE_DATA_URL_LENGTH
  );
}

async function mockResponse(
  preferences: MealPreferences,
  language: Language,
  warning?: string,
  warningDetail?: string
) {
  const analysis = await mockAnalyzeMeal(preferences, language);

  return NextResponse.json({
    analysis,
    source: "mock",
    warning,
    warningDetail
  });
}

function safeErrorDetail(error: unknown) {
  if (!error || typeof error !== "object") {
    return "Unknown provider error.";
  }

  const data = error as {
    code?: unknown;
    message?: unknown;
    status?: unknown;
    type?: unknown;
  };
  const parts = [
    typeof data.status === "number" ? `status=${data.status}` : "",
    typeof data.code === "string" ? `code=${data.code}` : "",
    typeof data.type === "string" ? `type=${data.type}` : "",
    typeof data.message === "string" ? data.message : ""
  ].filter(Boolean);

  return parts.join("; ").slice(0, 300);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const data = asRecord(body);
  const language = parseLanguage(data.language);
  const preferences = parsePreferences(data.preferences);

  if (!preferences) {
    return NextResponse.json(
      { error: "Missing or invalid meal preferences." },
      { status: 400 }
    );
  }

  if (!canSendToLiveAI(data.imageDataUrl)) {
    return mockResponse(preferences, language, "invalid-image-fallback");
  }

  const provider = getSelectedLiveAIProvider();

  try {
    const result = await analyzeMealWithLiveAI({
      imageDataUrl: data.imageDataUrl,
      preferences,
      language
    });

    if (!result) {
      return mockResponse(preferences, language, `missing-${provider}-api-key`);
    }

    return NextResponse.json({
      analysis: result.analysis,
      source: result.source
    });
  } catch (error) {
    console.error(`${provider} meal analysis failed:`, error);
    return mockResponse(
      preferences,
      language,
      `${provider}-fallback`,
      safeErrorDetail(error)
    );
  }
}
