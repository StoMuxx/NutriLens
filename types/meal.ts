export type DietaryGoal =
  | "balanced"
  | "weightLoss"
  | "muscleGain"
  | "lowSugar"
  | "lowSodium"
  | "vegetarian";

export type DietaryRestriction =
  | "none"
  | "lactoseIntolerance"
  | "nutAllergy"
  | "halal"
  | "avoidHighSugar"
  | "avoidFriedFood";

export type FoodCultureScenario =
  | "chineseCampus"
  | "americanCampus"
  | "mixedInternational";

export type MealTime = "breakfast" | "lunch" | "dinner" | "lateNight";

export type Language = "zh" | "en";

export type NutritionLevel = "High" | "Medium" | "Low";

export type AnalysisQualityLevel = "High" | "Medium" | "Low";

export type AnalysisSource = "openai" | "qwen" | "mock";

export interface NutritionBalance {
  carbs: NutritionLevel;
  protein: NutritionLevel;
  fat: NutritionLevel;
  vegetables: NutritionLevel;
}

export interface AnalysisQuality {
  clarity: AnalysisQualityLevel;
  confidence: AnalysisQualityLevel;
  safetyNote: string;
}

export interface MealPreferences {
  goal: DietaryGoal;
  restrictions: DietaryRestriction[];
  scenario: FoodCultureScenario;
  mealTime: MealTime;
  note?: string;
}

export interface MealAnalysis {
  foodItems: string[];
  estimatedCalories: string;
  mealType: string;
  healthScore: number;
  nutritionBalance: NutritionBalance;
  riskTagKeys?: string[];
  riskTags: string[];
  personalizedAdvice: string;
  nextMealSuggestion: string;
  crossCulturalInsight: string;
  disclaimer: string;
  quality: AnalysisQuality;
}

export interface MealDraft {
  imageDataUrl?: string;
  imageName?: string;
  uploadedAt?: string;
  preferences?: MealPreferences;
}

export interface SavedMealRecord {
  id: string;
  createdAt: string;
  imageDataUrl?: string;
  imageName?: string;
  preferences: MealPreferences;
  analysis: MealAnalysis;
  source?: AnalysisSource;
}

export interface AnalyzeMealResponse {
  analysis: MealAnalysis;
  source: AnalysisSource;
  warning?: string;
}

export interface SelectOption<T extends string> {
  id: T;
  labelEn: string;
  labelZh: string;
  descriptionEn: string;
  descriptionZh: string;
}
