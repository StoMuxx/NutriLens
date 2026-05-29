import type {
  DietaryGoal,
  DietaryRestriction,
  FoodCultureScenario,
  MealPreferences,
  MealTime
} from "@/types/meal";

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

export const defaultMealPreferences: MealPreferences = {
  goal: "balanced",
  restrictions: ["none"],
  scenario: "chineseCampus",
  mealTime: "lunch"
};

function isOneOf<T extends string>(value: unknown, options: T[]): value is T {
  return typeof value === "string" && options.includes(value as T);
}

export function normalizeMealPreferences(
  value?: Partial<MealPreferences> | null
): MealPreferences {
  const restrictions = Array.isArray(value?.restrictions)
    ? value.restrictions.filter((item): item is DietaryRestriction =>
        isOneOf(item, dietaryRestrictions)
      )
    : defaultMealPreferences.restrictions;

  return {
    goal: isOneOf(value?.goal, dietaryGoals)
      ? value.goal
      : defaultMealPreferences.goal,
    restrictions: restrictions.length ? restrictions : ["none"],
    scenario: isOneOf(value?.scenario, foodCultureScenarios)
      ? value.scenario
      : defaultMealPreferences.scenario,
    mealTime: isOneOf(value?.mealTime, mealTimes)
      ? value.mealTime
      : defaultMealPreferences.mealTime,
    note:
      typeof value?.note === "string" && value.note.trim()
        ? value.note.trim()
        : undefined
  };
}
