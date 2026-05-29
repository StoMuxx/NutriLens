import { getRiskTagLabel } from "@/lib/i18n";
import type {
  DietaryGoal,
  DietaryRestriction,
  FoodCultureScenario,
  Language,
  MealAnalysis,
  MealPreferences,
  MealTime,
  NutritionBalance
} from "@/types/meal";

type Localized<T> = Record<Language, T>;

interface ScenarioTemplate {
  foodItems: Localized<string[]>;
  estimatedCalories: string;
  mealType: Localized<string>;
  baseScore: number;
  nutritionBalance: NutritionBalance;
  riskTagKeys: string[];
  crossCulturalInsight: Localized<string>;
  nextMealSuggestion: Localized<string>;
}

const scenarioTemplates: Record<FoodCultureScenario, ScenarioTemplate> = {
  chineseCampus: {
    foodItems: {
      zh: ["米饭", "炸鸡", "炒青菜", "奶茶"],
      en: ["Rice", "Fried chicken", "Stir-fried greens", "Milk tea"]
    },
    estimatedCalories: "700-850 kcal",
    mealType: {
      zh: "中国校园餐",
      en: "Chinese campus meal"
    },
    baseScore: 68,
    nutritionBalance: {
      carbs: "High",
      protein: "Medium",
      fat: "High",
      vegetables: "Low"
    },
    riskTagKeys: ["highSugar", "highFat", "lowVegetables", "friedFood"],
    crossCulturalInsight: {
      zh: "中国校园餐通常包含米饭、面条和较多调味菜品。更健康的方式是在保留熟悉饮食结构的同时，提高蔬菜和优质蛋白比例。",
      en: "Chinese campus meals often include rice, noodles, and flavorful dishes. A healthier adjustment is to keep the familiar structure while increasing vegetables and lean protein."
    },
    nextMealSuggestion: {
      zh: "下一餐建议选择较清淡的优质蛋白、绿叶蔬菜和适量主食，避免继续摄入含糖饮料和油炸食品。",
      en: "For the next meal, choose a lighter protein dish, leafy vegetables, and water or unsweetened tea instead of another sweet drink."
    }
  },
  americanCampus: {
    foodItems: {
      zh: ["汉堡", "薯条", "小份沙拉", "汽水"],
      en: ["Burger", "Fries", "Side salad", "Soda"]
    },
    estimatedCalories: "800-980 kcal",
    mealType: {
      zh: "美国校园餐",
      en: "American campus meal"
    },
    baseScore: 62,
    nutritionBalance: {
      carbs: "High",
      protein: "Medium",
      fat: "High",
      vegetables: "Low"
    },
    riskTagKeys: ["highSugar", "highFat", "lowVegetables", "largePortion"],
    crossCulturalInsight: {
      zh: "美国校园餐中汉堡、薯条和甜饮较常见，可能带来较高脂肪和糖分摄入。可以尝试用沙拉、水和烤鸡肉替代部分高油高糖食物。",
      en: "American campus meals may include burgers, fries, and sweet drinks, which can raise fat and sugar intake. Swapping part of the meal for salad, water, and grilled protein can improve balance."
    },
    nextMealSuggestion: {
      zh: "下一餐可以选择烤鸡、豆类或其他优质蛋白，搭配更多蔬菜和适量全谷物。",
      en: "Try a dinner with grilled chicken or beans, a larger vegetable side, and a moderate portion of whole grains."
    }
  },
  mixedInternational: {
    foodItems: {
      zh: ["米饭碗", "烤鸡肉", "蔬菜沙拉", "酸奶饮品"],
      en: ["Rice bowl", "Grilled chicken", "Vegetable slaw", "Yogurt drink"]
    },
    estimatedCalories: "620-780 kcal",
    mealType: {
      zh: "中美混合 / 国际化校园餐",
      en: "Mixed / international campus meal"
    },
    baseScore: 76,
    nutritionBalance: {
      carbs: "Medium",
      protein: "High",
      fat: "Medium",
      vegetables: "Medium"
    },
    riskTagKeys: [
      "possibleAddedSugar",
      "sauceSodium",
      "vegetablesCouldImprove"
    ],
    crossCulturalInsight: {
      zh: "国际化校园餐可以结合熟悉主食和多元风味。控制酱料份量并增加蔬菜，能让这类餐食更灵活也更均衡。",
      en: "Mixed campus meals can combine familiar grains with global flavors. Keeping sauce portions moderate and adding vegetables helps the meal stay flexible and balanced."
    },
    nextMealSuggestion: {
      zh: "下一餐保持简单：优质蛋白、彩色蔬菜和少量主食即可。",
      en: "Keep the next meal simple: lean protein, colorful vegetables, and a small serving of staple carbs."
    }
  }
};

const goalAdvice: Record<DietaryGoal, Localized<string>> = {
  balanced: {
    zh: "如果你的目标是健康均衡，可以保留熟悉的一餐结构，同时提高蔬菜比例、保证稳定蛋白质，并减少甜饮频率。",
    en: "For balanced eating, keep the plate structure familiar while aiming for more vegetables, steady protein, and fewer sweet drinks."
  },
  weightLoss: {
    zh: "如果你的目标是减脂，可以把含糖饮料换成无糖茶或水，精制主食减少约三分之一，并更多选择烤、蒸、煮的蛋白质。",
    en: "For weight loss, consider replacing sweet drinks with unsweetened tea or water, reducing refined carbs by about one third, and choosing grilled or steamed protein more often."
  },
  muscleGain: {
    zh: "如果你的目标是增肌，请保证足够蛋白质，并搭配适量主食。训练日可以增加一份优质蛋白，而不是单纯放大整体份量。",
    en: "For muscle gain, keep enough protein in the meal and pair it with moderate carbs. If training today, add a lean protein option instead of only increasing portion size."
  },
  lowSugar: {
    zh: "如果你的目标是控糖，最有效的调整通常是减少甜饮、甜点和偏甜酱料，同时保持正餐的饱腹感。",
    en: "For low sugar, the most useful change is to replace sweet drinks and dessert-style sauces with unsweetened options while keeping the meal satisfying."
  },
  lowSodium: {
    zh: "如果你的目标是低盐，可以优先选择少酱或酱料分开放，减少汤品和加工食品，用清淡主食与蔬菜平衡偏咸菜品。",
    en: "For low sodium, ask for sauces on the side when possible, reduce soup or processed items, and balance salty dishes with plain grains and vegetables."
  },
  vegetarian: {
    zh: "如果你选择素食，请留意豆腐、豆类、蛋类等蛋白来源，并在确认安全的前提下搭配坚果或健康脂肪。",
    en: "For vegetarian eating, look for plant proteins such as tofu, beans, eggs if acceptable, and nuts only when safe for you."
  }
};

const restrictionAdvice: Partial<Record<DietaryRestriction, Localized<string>>> =
  {
    lactoseIntolerance: {
      zh: "因为你选择了乳糖不耐，请特别留意奶茶、奶酪、奶油酱和酸奶类饮品。",
      en: "Because you selected lactose intolerance, check milk tea, cheese, cream sauces, and yogurt-based drinks before eating."
    },
    nutAllergy: {
      zh: "因为你选择了坚果过敏，请确认酱料、浇头以及共享厨房中的交叉接触风险。",
      en: "Because you selected nut allergy, confirm sauces and toppings carefully and ask about cross-contact in shared kitchens."
    },
    halal: {
      zh: "因为你选择了清真饮食，请确认肉类来源，以及烹饪台面或炸锅是否与非清真食物共用。",
      en: "Because you selected halal, confirm meat sourcing and whether cooking surfaces or fryers are shared with non-halal foods."
    },
    avoidHighSugar: {
      zh: "因为你希望避免高糖，含糖饮料通常是最优先减少或替换的部分。",
      en: "Because you want to avoid high sugar, sweet drinks are the first item to reduce or replace."
    },
    avoidFriedFood: {
      zh: "因为你希望避免油炸食品，可以优先选择烤、蒸、煮或少油快炒的替代菜品。",
      en: "Because you want to avoid fried food, choose grilled, steamed, boiled, or lightly stir-fried alternatives when available."
    }
  };

const mealTimeAdvice: Record<MealTime, Localized<string>> = {
  breakfast: {
    zh: "因为这是早餐，午餐建议补足优质蛋白和蔬菜，避免上午能量不足后在午餐摄入过多油炸或含糖饮料。",
    en: "Because this is breakfast, aim for a lunch with reliable protein and vegetables so you do not compensate later with fried food or sweet drinks."
  },
  lunch: {
    zh: "因为这是午餐，晚餐建议更清淡一些，选择优质蛋白、绿叶蔬菜和适量主食，避免连续摄入高糖饮料。",
    en: "Because this is lunch, choose a lighter dinner with lean protein, leafy vegetables, and moderate staple carbs while avoiding another sweet drink."
  },
  dinner: {
    zh: "因为这是晚餐，接下来可以避免高糖高油宵夜；如果确实需要加餐，优先选择小份水果、酸奶替代品或温水。",
    en: "Because this is dinner, avoid heavy late-night sugar or fried food. If you need a snack, keep it small and simple."
  },
  lateNight: {
    zh: "因为这是宵夜，明早建议选择清淡早餐，补充水分和蛋白质，避免继续用高糖饮料或油炸食品开启一天。",
    en: "Because this is a late-night snack, choose a lighter breakfast tomorrow with hydration and protein instead of starting the day with sweet drinks or fried food."
  }
};

const qualitySafetyNote: Localized<string> = {
  zh: "图片识别结果只是基于画面进行的营养估算，用于健康饮食教育参考，不代表精准检测。",
  en: "Image-based analysis is an approximate nutrition estimate for wellness education, not precise detection."
};

function clampScore(score: number) {
  return Math.min(100, Math.max(0, Math.round(score)));
}

function scoreAdjustment(goal: DietaryGoal, restrictions: DietaryRestriction[]) {
  let adjustment = 0;

  if (goal === "weightLoss" || goal === "lowSugar") {
    adjustment -= 2;
  }

  if (goal === "muscleGain") {
    adjustment += 2;
  }

  if (restrictions.includes("avoidHighSugar")) {
    adjustment -= 1;
  }

  if (restrictions.includes("avoidFriedFood")) {
    adjustment -= 1;
  }

  return adjustment;
}

export async function mockAnalyzeMeal(
  preferences: MealPreferences,
  language: Language = "zh"
): Promise<MealAnalysis> {
  const template = scenarioTemplates[preferences.scenario];
  const mealTime = preferences.mealTime ?? "lunch";
  const restrictionNotes = preferences.restrictions
    .filter((restriction) => restriction !== "none")
    .map((restriction) => restrictionAdvice[restriction]?.[language])
    .filter(Boolean);

  const noteAdvice = preferences.note
    ? language === "zh"
      ? `你补充的说明已作为参考："${preferences.note}"。`
      : `Your note was considered as context: "${preferences.note}".`
    : "";

  return {
    foodItems: template.foodItems[language],
    estimatedCalories: template.estimatedCalories,
    mealType: template.mealType[language],
    healthScore: clampScore(
      template.baseScore + scoreAdjustment(preferences.goal, preferences.restrictions)
    ),
    nutritionBalance: template.nutritionBalance,
    riskTagKeys: template.riskTagKeys,
    riskTags: template.riskTagKeys.map((key) => getRiskTagLabel(key, language)),
    personalizedAdvice: [
      goalAdvice[preferences.goal][language],
      ...restrictionNotes,
      noteAdvice
    ]
      .filter(Boolean)
      .join(" "),
    nextMealSuggestion: [
      template.nextMealSuggestion[language],
      mealTimeAdvice[mealTime][language]
    ].join(" "),
    crossCulturalInsight: template.crossCulturalInsight[language],
    disclaimer:
      language === "zh"
        ? "本结果由 AI 根据图片进行估算，仅用于健康饮食教育参考，不构成医疗建议。"
        : "This result is estimated by AI from the image and is for general wellness education only. It is not medical advice.",
    quality: {
      clarity: "Medium",
      confidence: "Medium",
      safetyNote: qualitySafetyNote[language]
    }
  };
}
