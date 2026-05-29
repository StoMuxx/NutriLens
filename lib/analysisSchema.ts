import type {
  AnalysisQualityLevel,
  Language,
  MealAnalysis,
  NutritionLevel
} from "@/types/meal";

const nutritionLevels = ["High", "Medium", "Low"] as const;
const qualityLevels = ["High", "Medium", "Low"] as const;

const riskTagKeys = [
  "highSugar",
  "highFat",
  "lowVegetables",
  "friedFood",
  "largePortion",
  "possibleAddedSugar",
  "sauceSodium",
  "vegetablesCouldImprove",
  "lowProtein"
] as const;

export const mealAnalysisJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "foodItems",
    "estimatedCalories",
    "mealType",
    "healthScore",
    "nutritionBalance",
    "riskTagKeys",
    "riskTags",
    "personalizedAdvice",
    "nextMealSuggestion",
    "crossCulturalInsight",
    "disclaimer",
    "quality"
  ],
  properties: {
    foodItems: {
      type: "array",
      minItems: 1,
      maxItems: 8,
      items: { type: "string" }
    },
    estimatedCalories: {
      type: "string",
      description:
        "An approximate calorie range such as 650-780 kcal. Never claim precision."
    },
    mealType: {
      type: "string",
      description:
        "A concise campus meal type localized to the requested language."
    },
    healthScore: {
      type: "integer",
      minimum: 0,
      maximum: 100
    },
    nutritionBalance: {
      type: "object",
      additionalProperties: false,
      required: ["carbs", "protein", "fat", "vegetables"],
      properties: {
        carbs: { type: "string", enum: nutritionLevels },
        protein: { type: "string", enum: nutritionLevels },
        fat: { type: "string", enum: nutritionLevels },
        vegetables: { type: "string", enum: nutritionLevels }
      }
    },
    riskTagKeys: {
      type: "array",
      maxItems: 6,
      items: {
        type: "string",
        enum: riskTagKeys
      }
    },
    riskTags: {
      type: "array",
      maxItems: 6,
      items: { type: "string" },
      description:
        "Localized display labels for the main approximate nutrition risks."
    },
    personalizedAdvice: {
      type: "string",
      description:
        "Practical, non-medical advice based on the user goal and restrictions."
    },
    nextMealSuggestion: {
      type: "string",
      description: "A safe, moderate next-meal recommendation."
    },
    crossCulturalInsight: {
      type: "string",
      description:
        "A concise insight connected to Chinese, American, or mixed campus eating."
    },
    disclaimer: {
      type: "string",
      description:
        "A clear non-medical disclaimer for education/reference only."
    },
    quality: {
      type: "object",
      additionalProperties: false,
      required: ["clarity", "confidence", "safetyNote"],
      properties: {
        clarity: {
          type: "string",
          enum: qualityLevels,
          description: "Approximate image clarity level."
        },
        confidence: {
          type: "string",
          enum: qualityLevels,
          description:
            "Approximate recognition confidence level, not a guarantee."
        },
        safetyNote: {
          type: "string",
          description:
            "A localized note that this image-based analysis is estimated and not precise detection."
        }
      }
    }
  }
} as const;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function asStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length ? items : fallback;
}

function asNutritionLevel(value: unknown): NutritionLevel {
  return nutritionLevels.includes(value as NutritionLevel)
    ? (value as NutritionLevel)
    : "Medium";
}

function asQualityLevel(value: unknown): AnalysisQualityLevel {
  return qualityLevels.includes(value as AnalysisQualityLevel)
    ? (value as AnalysisQualityLevel)
    : "Medium";
}

function clampScore(value: unknown) {
  const score = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(score)) {
    return 60;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

function defaultDisclaimer(language: Language) {
  return language === "zh"
    ? "本结果由 AI 根据图片进行估算，仅用于健康饮食教育参考，不构成医疗建议。"
    : "This result is estimated by AI from the image and is for general wellness education only. It is not medical advice.";
}

function defaultSafetyNote(language: Language) {
  return language === "zh"
    ? "图片识别结果只是估算，用于健康饮食教育参考，不代表精准检测。"
    : "Image-based analysis is an estimate for wellness education, not precise detection.";
}

export function parseMealAnalysis(
  value: unknown,
  language: Language
): MealAnalysis {
  const data = asRecord(value);
  const balance = asRecord(data.nutritionBalance);
  const quality = asRecord(data.quality);
  const safeRiskKeys = asStringArray(data.riskTagKeys, []).filter((key) =>
    riskTagKeys.includes(key as (typeof riskTagKeys)[number])
  );

  return {
    foodItems: asStringArray(
      data.foodItems,
      language === "zh" ? ["未识别食物"] : ["Unclear food items"]
    ),
    estimatedCalories: asString(
      data.estimatedCalories,
      language === "zh" ? "无法估算" : "Unable to estimate"
    ),
    mealType: asString(
      data.mealType,
      language === "zh" ? "校园餐" : "Campus meal"
    ),
    healthScore: clampScore(data.healthScore),
    nutritionBalance: {
      carbs: asNutritionLevel(balance.carbs),
      protein: asNutritionLevel(balance.protein),
      fat: asNutritionLevel(balance.fat),
      vegetables: asNutritionLevel(balance.vegetables)
    },
    riskTagKeys: safeRiskKeys,
    riskTags: asStringArray(
      data.riskTags,
      language === "zh" ? ["需要进一步观察"] : ["Needs review"]
    ),
    personalizedAdvice: asString(
      data.personalizedAdvice,
      language === "zh"
        ? "建议结合个人目标，适度增加蔬菜和优质蛋白，并减少高糖饮料。"
        : "Consider adding vegetables and lean protein while reducing sweet drinks, based on your goal."
    ),
    nextMealSuggestion: asString(
      data.nextMealSuggestion,
      language === "zh"
        ? "下一餐建议选择更清淡的优质蛋白、蔬菜和适量主食。"
        : "For the next meal, choose lean protein, vegetables, and a moderate staple portion."
    ),
    crossCulturalInsight: asString(
      data.crossCulturalInsight,
      language === "zh"
        ? "校园饮食会受到价格、便利性和文化习惯影响，建议在熟悉的饮食结构中做小幅健康调整。"
        : "Campus meals are shaped by price, convenience, and culture, so small practical swaps are often the most sustainable."
    ),
    disclaimer: asString(data.disclaimer, defaultDisclaimer(language)),
    quality: {
      clarity: asQualityLevel(quality.clarity),
      confidence: asQualityLevel(quality.confidence),
      safetyNote: asString(quality.safetyNote, defaultSafetyNote(language))
    }
  };
}
