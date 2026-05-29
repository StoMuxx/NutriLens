import type {
  DietaryGoal,
  DietaryRestriction,
  FoodCultureScenario,
  Language,
  MealTime,
  SelectOption
} from "@/types/meal";

export const APP_NAME = "NutriLens";

export const dietaryGoalOptions: SelectOption<DietaryGoal>[] = [
  {
    id: "balanced",
    labelEn: "Balanced Eating",
    labelZh: "健康均衡",
    descriptionEn:
      "Keep meals diverse, steady, and suitable for daily campus life.",
    descriptionZh: "保持饮食多样、稳定，适合日常校园生活。"
  },
  {
    id: "weightLoss",
    labelEn: "Weight Loss",
    labelZh: "减脂",
    descriptionEn:
      "Prefer lighter cooking, smaller portions, and fewer sweet drinks.",
    descriptionZh: "优先选择清淡烹饪、适量份量，并减少含糖饮料。"
  },
  {
    id: "muscleGain",
    labelEn: "Muscle Gain",
    labelZh: "增肌",
    descriptionEn:
      "Look for stable protein, smart carbs, and post-workout recovery.",
    descriptionZh: "关注稳定蛋白质、合理碳水和运动后的恢复补给。"
  },
  {
    id: "lowSugar",
    labelEn: "Low Sugar",
    labelZh: "控糖",
    descriptionEn: "Reduce sugary drinks, desserts, and fast refined carbs.",
    descriptionZh: "减少含糖饮料、甜点和吸收较快的精制碳水。"
  },
  {
    id: "lowSodium",
    labelEn: "Low Sodium",
    labelZh: "低盐",
    descriptionEn: "Watch sauces, soups, processed food, and salty seasonings.",
    descriptionZh: "留意酱料、汤品、加工食品和较咸调味。"
  },
  {
    id: "vegetarian",
    labelEn: "Vegetarian",
    labelZh: "素食",
    descriptionEn:
      "Balance plant protein, grains, vegetables, and healthy fats.",
    descriptionZh: "平衡植物蛋白、谷物、蔬菜和健康脂肪。"
  }
];

export const dietaryRestrictionOptions: SelectOption<DietaryRestriction>[] = [
  {
    id: "none",
    labelEn: "No Restrictions",
    labelZh: "无特殊限制",
    descriptionEn: "Use general wellness guidance for this meal.",
    descriptionZh: "使用通用健康饮食建议分析这餐。"
  },
  {
    id: "lactoseIntolerance",
    labelEn: "Lactose Intolerance",
    labelZh: "乳糖不耐",
    descriptionEn:
      "Flag milk tea, cream sauces, cheese, and dairy-heavy choices.",
    descriptionZh: "提醒留意奶茶、奶油酱、奶酪和乳制品较多的选择。"
  },
  {
    id: "nutAllergy",
    labelEn: "Nut Allergy",
    labelZh: "坚果过敏",
    descriptionEn:
      "Remind users to confirm sauces, toppings, and cross-contact.",
    descriptionZh: "提醒确认酱料、配料以及厨房交叉接触风险。"
  },
  {
    id: "halal",
    labelEn: "Halal",
    labelZh: "清真饮食",
    descriptionEn: "Suggest checking meat source and cooking separation.",
    descriptionZh: "建议确认肉类来源和烹饪器具是否分开。"
  },
  {
    id: "avoidHighSugar",
    labelEn: "Avoid High Sugar",
    labelZh: "避免高糖",
    descriptionEn: "Pay attention to sweet drinks, desserts, and sauces.",
    descriptionZh: "重点留意甜饮、甜点和偏甜酱料。"
  },
  {
    id: "avoidFriedFood",
    labelEn: "Avoid Fried Food",
    labelZh: "避免油炸食品",
    descriptionEn:
      "Prefer grilled, steamed, boiled, or lightly stir-fried options.",
    descriptionZh: "优先选择烤、蒸、煮或少油快炒的食物。"
  }
];

export const foodCultureOptions: SelectOption<FoodCultureScenario>[] = [
  {
    id: "chineseCampus",
    labelEn: "Chinese Campus Meal",
    labelZh: "中国校园饮食",
    descriptionEn:
      "Rice, noodles, cafeteria dishes, milk tea, and canteen choices.",
    descriptionZh: "米饭、面条、食堂菜品、奶茶和校园食堂选择。"
  },
  {
    id: "americanCampus",
    labelEn: "American Campus Meal",
    labelZh: "美国校园饮食",
    descriptionEn:
      "Burgers, fries, salad bars, sandwiches, soda, and dining halls.",
    descriptionZh: "汉堡、薯条、沙拉吧、三明治、汽水和校园餐厅。"
  },
  {
    id: "mixedInternational",
    labelEn: "Mixed / International Meal",
    labelZh: "中美混合 / 国际化饮食",
    descriptionEn:
      "Cross-cultural plates, bowls, fusion meals, and global campus food.",
    descriptionZh: "跨文化餐盘、盖饭、融合餐和国际化校园饮食。"
  }
];

export const mealTimeOptions: SelectOption<MealTime>[] = [
  {
    id: "breakfast",
    labelEn: "Breakfast",
    labelZh: "早餐",
    descriptionEn: "Focus on steady energy, protein, and a lighter start.",
    descriptionZh: "关注上午精力、优质蛋白和清爽开场。"
  },
  {
    id: "lunch",
    labelEn: "Lunch",
    labelZh: "午餐",
    descriptionEn: "Balance afternoon energy with enough protein and vegetables.",
    descriptionZh: "平衡下午学习状态，保证蛋白质和蔬菜。"
  },
  {
    id: "dinner",
    labelEn: "Dinner",
    labelZh: "晚餐",
    descriptionEn: "Keep the meal satisfying but avoid heavy sugar or oil late.",
    descriptionZh: "保持饱腹感，同时避免太晚摄入高糖高油。"
  },
  {
    id: "lateNight",
    labelEn: "Late-night Snack",
    labelZh: "宵夜",
    descriptionEn: "Prefer small portions and avoid sugary or fried choices.",
    descriptionZh: "优先小份量，避免高糖饮料和油炸食品。"
  }
];

export const featureCards = [
  {
    titleZh: "拍照识别饭菜营养",
    titleEn: "Photo-based meal insight",
    descriptionZh:
      "上传饭菜照片，获得用于健康教育参考的一餐营养结构估算。",
    descriptionEn:
      "Upload a meal photo and receive an estimated nutrition structure for general wellness education."
  },
  {
    titleZh: "个性化饮食目标建议",
    titleEn: "Personalized goal guidance",
    descriptionZh:
      "根据健康均衡、减脂、增肌、控糖、低盐或素食等目标生成建议。",
    descriptionEn:
      "Connect advice to goals such as balanced eating, weight loss, muscle gain, low sugar, low sodium, or vegetarian."
  },
  {
    titleZh: "中美校园饮食场景分析",
    titleEn: "Cross-cultural campus context",
    descriptionZh:
      "结合中国和美国校园常见饮食模式，给出尊重文化习惯的实用建议。",
    descriptionEn:
      "Compare common Chinese and American campus meal patterns with practical, respectful suggestions."
  }
];

export const innovationBullets = {
  zh: [
    "年轻人经常缺少简单工具来理解一餐的营养结构。",
    "校园饮食选择受到价格、便利、文化习惯和时间压力影响。",
    "NutriLens 用 AI 图像分析降低营养教育门槛。",
    "系统支持中美校园饮食场景，体现跨文化健康生活。",
    "未来可以拓展到食物浪费减少、低碳饮食、校园食堂合作等方向。"
  ],
  en: [
    "Young people often lack simple tools to understand the nutrition structure of a meal.",
    "Campus food choices are shaped by price, convenience, culture, and time pressure.",
    "NutriLens uses AI image analysis to lower the barrier to nutrition education.",
    "The system supports Chinese and American campus meal contexts for cross-cultural wellness.",
    "Future directions include food-waste reduction, low-carbon eating, and cafeteria partnerships."
  ]
} satisfies Record<Language, string[]>;

export const navLinks = [
  { href: "/", key: "home", labelEn: "Home", labelZh: "首页" },
  { href: "/upload", key: "analyze", labelEn: "Analyze", labelZh: "分析" },
  { href: "/history", key: "history", labelEn: "History", labelZh: "历史" },
  { href: "/profile", key: "profile", labelEn: "Profile", labelZh: "画像" }
] as const;

export function optionLabel<T extends string>(
  option: SelectOption<T>,
  language: Language
) {
  return language === "zh" ? option.labelZh : option.labelEn;
}

export function optionDescription<T extends string>(
  option: SelectOption<T>,
  language: Language
) {
  return language === "zh" ? option.descriptionZh : option.descriptionEn;
}
