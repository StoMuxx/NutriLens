import type { Language, NutritionLevel } from "@/types/meal";

export const LANGUAGE_STORAGE_KEY = "nutrilens.language";

export const messages = {
  zh: {
    languageName: "中文",
    nav: {
      home: "首页",
      analyze: "分析",
      history: "历史",
      profile: "画像",
      openAnalysis: "开始分析"
    },
    brand: {
      subtitle: "AI 健康饮食分析"
    },
    common: {
      back: "返回",
      noMealImage: "暂无餐食图片",
      uploadPhoto: "上传图片",
      choosePhoto: "选择图片",
      replacePhoto: "更换图片",
      continue: "继续",
      saved: "已保存",
      home: "返回首页"
    },
    hero: {
      eyebrow: "AI 驱动的一餐健康洞察，帮助年轻人吃得更清楚。",
      subtitle: "拍照识别一餐营养结构，为中美青年提供个性化健康饮食建议。",
      description:
        "NutriLens 帮助大学生和年轻人通过饭菜照片了解一餐的营养结构、热量区间、潜在健康风险，并获得符合个人目标的饮食优化建议。",
      start: "开始分析",
      demo: "查看演示",
      pwa:
        "用手机打开本网站后，可以添加到主屏幕，像 App 一样使用。"
    },
    home: {
      whyTitle: "为什么 NutriLens 有意义？",
      whyDescription:
        "NutriLens 把 AI 视觉识别、营养教育和校园生活场景结合起来，帮助年轻人在有限预算、时间压力和跨文化饮食习惯中做出更清晰的选择。",
      innovationTitle: "创新价值",
      innovationDescription:
        "这个 demo 聚焦青年健康饮食教育，尤其适用于中国与美国校园饮食场景。未来可拓展到校园食堂合作、低碳饮食选择和减少食物浪费。"
    },
    disclaimer: {
      title: "安全提示",
      full:
        "NutriLens 提供的是基于 AI 的营养估算和健康饮食建议，仅用于一般健康教育参考，不构成医疗建议，也不能替代医生或专业营养师的指导。",
      result:
        "本结果由 AI 根据图片进行估算，仅用于健康饮食教育参考，不构成医疗建议。"
    },
    upload: {
      eyebrow: "第一步",
      title: "上传饭菜照片",
      description:
        "上传一张清晰的饭菜照片。NutriLens 将在比赛 demo 中使用模拟 AI 分析。",
      cardTitle: "上传你的饭菜照片",
      instruction:
        "请上传一张清晰的饭菜照片。NutriLens 将估算食物组成、热量区间、营养结构和潜在健康风险。",
      invalidFile: "请上传图片文件。",
      readError: "我们无法读取这张图片，请换一张清晰的饭菜照片。",
      noImageWarning: "请先上传一张清晰的饭菜照片。"
    },
    preferences: {
      eyebrow: "第二步",
      title: "饮食偏好",
      description:
        "选择饮食目标、饮食限制和校园饮食文化场景，让分析建议更贴近你的实际情况。",
      noPhotoTitle: "未检测到饭菜照片",
      noPhotoDescription:
        "你仍然可以查看表单，但为了完整演示流程，建议先上传饭菜照片。",
      goal: "饮食目标",
      restrictions: "饮食限制",
      scenario: "饮食文化场景",
      noteTitle: "补充说明你的饮食习惯或目标",
      notePlaceholder: "例如：我今晚篮球训练后想吃清淡一点。",
      analyze: "分析这顿饭"
    },
    result: {
      eyebrow: "第三步",
      title: "AI 营养分析",
      description:
        "以下是用于健康教育参考的 AI 估算结果，包含个性化建议和跨文化校园饮食提示。",
      loadingDescription: "NutriLens 正在为这餐生成健康饮食估算。",
      loadingTitle: "正在分析这顿饭...",
      loadingText: "正在生成模拟 AI 营养分析结果，请稍等。",
      needsInputEyebrow: "需要输入",
      needsInputTitle: "分析还没有准备好",
      needsInputDescription: "分析需要饭菜照片和饮食偏好选择。",
      missingPreferences:
        "没有找到饮食偏好。请先上传照片并选择你的饮食目标。",
      error:
        "NutriLens 暂时无法生成模拟分析结果，请重试。",
      errorHelp: "没关系，返回上传页重新开始即可，页面不会崩溃。",
      uploadMealPhoto: "上传饭菜照片",
      mealSummary: "餐食总结",
      overview: "一餐估算概览",
      recognizedFoods: "识别结果",
      estimatedCalories: "估算热量",
      mealType: "餐食类型",
      healthScore: "健康评分",
      strongBalance: "结构较均衡",
      couldImprove: "仍可优化",
      needsAttention: "需要留意",
      scoreDescription:
        "这是基于 AI 的健康饮食估算，适合用来比较饮食模式并做出下一步改进。",
      nutritionBalance: "营养结构",
      riskTags: "风险标签",
      personalizedAdvice: "个性化建议",
      nextMeal: "下一餐建议",
      crossCultural: "跨文化饮食提示",
      save: "保存到历史记录",
      analyzeAgain: "再分析一餐"
    },
    history: {
      eyebrow: "已保存餐食",
      title: "饮食历史记录",
      description:
        "历史记录使用本机 localStorage 保存，不需要后端，适合稳定的比赛演示。",
      emptyTitle: "还没有保存任何餐食记录。",
      emptyDescription: "开始你的第一次分析吧。",
      emptyAction: "开始第一次分析",
      score: "评分"
    },
    profile: {
      eyebrow: "个人饮食模式",
      title: "个人饮食画像",
      description:
        "根据本机保存的餐食记录生成轻量饮食画像。历史记录不足时，NutriLens 会显示演示基线。",
      mockNotice:
        "当前历史记录还不够，下面使用 mock 数据展示饮食画像效果。保存几次真实分析后，这里会根据本机历史记录自动更新。",
      averageScore: "平均健康评分",
      commonIssues: "最近常见问题",
      weeklySuggestion: "本周饮食建议",
      weeklyText:
        "建议你每天至少保证一餐包含优质蛋白和绿叶蔬菜，并减少含糖饮料的频率。",
      analyzeNew: "分析新的一餐",
      mockIssues: [
        "蔬菜摄入不足",
        "糖分偏高",
        "油脂偏高",
        "蛋白质不稳定"
      ]
    },
    nutrition: {
      carbs: "碳水",
      protein: "蛋白质",
      fat: "脂肪",
      vegetables: "蔬菜与膳食纤维",
      levels: {
        High: "高",
        Medium: "中",
        Low: "低"
      } satisfies Record<NutritionLevel, string>
    },
    riskTags: {
      highSugar: "高糖",
      highFat: "高脂肪",
      lowVegetables: "蔬菜不足",
      friedFood: "油炸食品偏多",
      largePortion: "份量偏大",
      possibleAddedSugar: "可能有添加糖",
      sauceSodium: "酱料钠含量偏高",
      vegetablesCouldImprove: "蔬菜比例可提升",
      lowProtein: "蛋白质不足"
    }
  },
  en: {
    languageName: "English",
    nav: {
      home: "Home",
      analyze: "Analyze",
      history: "History",
      profile: "Profile",
      openAnalysis: "Open analysis"
    },
    brand: {
      subtitle: "AI Healthy Meal Insights"
    },
    common: {
      back: "Back",
      noMealImage: "No meal image available",
      uploadPhoto: "Upload Photo",
      choosePhoto: "Choose Photo",
      replacePhoto: "Replace Photo",
      continue: "Continue",
      saved: "Saved",
      home: "Home"
    },
    hero: {
      eyebrow: "AI-powered meal insights for healthier youth eating.",
      subtitle:
        "Photo-based meal nutrition insight for Chinese and American youth.",
      description:
        "NutriLens helps college students and young adults understand estimated nutrition structure, calorie range, possible health risks, and goal-based meal suggestions from a food photo.",
      start: "Start Analysis",
      demo: "View Demo",
      pwa:
        "Open this website on your phone and add it to your home screen to use it like an app."
    },
    home: {
      whyTitle: "Why NutriLens Matters",
      whyDescription:
        "NutriLens connects AI visual understanding, nutrition education, and campus eating contexts so young people can make clearer choices under budget, time, and cultural constraints.",
      innovationTitle: "Innovation Value",
      innovationDescription:
        "This demo focuses on AI-assisted youth wellness education, especially for Chinese and American campus food contexts. It can later expand into cafeteria partnerships, lower-carbon meal choices, and food-waste reduction."
    },
    disclaimer: {
      title: "Safety Notice",
      full:
        "NutriLens provides AI-based nutrition estimates for general wellness education only. It is not medical advice and should not replace professional guidance from doctors or registered dietitians.",
      result:
        "This result is estimated by AI from the image and is for general wellness education only. It is not medical advice."
    },
    upload: {
      eyebrow: "Step 1",
      title: "Upload Meal Photo",
      description:
        "Upload a clear meal photo. NutriLens will use mock AI analysis for this competition demo.",
      cardTitle: "Upload your meal photo",
      instruction:
        "Upload a clear photo of your meal. NutriLens will estimate the food items, calorie range, nutrition balance, and possible health risks.",
      invalidFile: "Please upload an image file.",
      readError:
        "We could not read this image. Please try another clear meal photo.",
      noImageWarning: "Please upload a clear meal photo first."
    },
    preferences: {
      eyebrow: "Step 2",
      title: "Meal Preferences",
      description:
        "Choose a goal, restrictions, and the cultural campus meal context so the analysis can produce relevant wellness guidance.",
      noPhotoTitle: "No meal photo detected",
      noPhotoDescription:
        "You can still explore the form, but upload a meal photo first for the strongest demo flow.",
      goal: "Dietary Goal",
      restrictions: "Dietary Restrictions",
      scenario: "Food Culture Scenario",
      noteTitle: "Tell us more about your eating habit or goal.",
      notePlaceholder:
        "Example: I want a lighter dinner after basketball practice.",
      analyze: "Analyze Meal"
    },
    result: {
      eyebrow: "Step 3",
      title: "AI Nutrition Analysis",
      description:
        "Estimated AI result for general wellness education, with personalized and cross-cultural campus meal guidance.",
      loadingDescription:
        "NutriLens is preparing an estimated wellness analysis for this meal.",
      loadingTitle: "Analyzing this meal...",
      loadingText:
        "Generating a mock AI nutrition analysis result. Please wait.",
      needsInputEyebrow: "Needs input",
      needsInputTitle: "Analysis is not ready",
      needsInputDescription:
        "The analysis needs a meal photo and preference choices.",
      missingPreferences:
        "No meal preferences found. Please upload a photo and choose your eating goal first.",
      error:
        "NutriLens could not generate the mock analysis. Please try again.",
      errorHelp:
        "No worries. Return to the upload page and start again; the page will not crash.",
      uploadMealPhoto: "Upload Meal Photo",
      mealSummary: "Meal Summary",
      overview: "Estimated meal overview",
      recognizedFoods: "Recognized foods",
      estimatedCalories: "Estimated calories",
      mealType: "Meal type",
      healthScore: "Health Score",
      strongBalance: "Strong balance",
      couldImprove: "Could improve",
      needsAttention: "Needs attention",
      scoreDescription:
        "This is an AI-based wellness estimate, useful for comparing meal patterns and making practical next-step choices.",
      nutritionBalance: "Nutrition Balance",
      riskTags: "Risk Tags",
      personalizedAdvice: "Personalized Advice",
      nextMeal: "Next Meal Recommendation",
      crossCultural: "Cross-cultural Insight",
      save: "Save to History",
      analyzeAgain: "Analyze Again"
    },
    history: {
      eyebrow: "Saved Meals",
      title: "Meal History",
      description:
        "Saved meals stay on this device using localStorage for a stable competition demo without a backend.",
      emptyTitle: "No meals saved yet.",
      emptyDescription: "Start your first analysis.",
      emptyAction: "Start your first analysis",
      score: "Score"
    },
    profile: {
      eyebrow: "Personal Pattern",
      title: "Diet Profile",
      description:
        "A lightweight diet profile generated from saved local meal records. When there is not enough history, NutriLens shows a demo baseline.",
      mockNotice:
        "There is not enough history yet, so this section uses mock data to show the profile experience. Save a few real analyses and it will update from local records.",
      averageScore: "Average Health Score",
      commonIssues: "Recent Common Issues",
      weeklySuggestion: "Weekly Wellness Suggestion",
      weeklyText:
        "For general wellness, aim for at least one daily meal with reliable protein and leafy vegetables, and reduce the frequency of sweetened drinks.",
      analyzeNew: "Analyze a new meal",
      mockIssues: [
        "Low vegetables",
        "High sugar drinks",
        "High fat or fried food",
        "Protein balance varies"
      ]
    },
    nutrition: {
      carbs: "Carbs",
      protein: "Protein",
      fat: "Fat",
      vegetables: "Vegetables & Fiber",
      levels: {
        High: "High",
        Medium: "Medium",
        Low: "Low"
      } satisfies Record<NutritionLevel, string>
    },
    riskTags: {
      highSugar: "High sugar",
      highFat: "High fat",
      lowVegetables: "Low vegetables",
      friedFood: "Fried food",
      largePortion: "Large portion",
      possibleAddedSugar: "Possible added sugar",
      sauceSodium: "Sauce sodium",
      vegetablesCouldImprove: "Vegetables could improve",
      lowProtein: "Low protein"
    }
  }
} as const;

export type Messages = (typeof messages)["zh"];
export type RiskTagKey = keyof Messages["riskTags"];

export function getMessages(language: Language) {
  return messages[language];
}

export function getRiskTagLabel(key: string, language: Language) {
  const riskTags = messages[language].riskTags as Record<string, string>;
  return riskTags[key] ?? key;
}

export function getNutritionLevelLabel(
  level: NutritionLevel,
  language: Language
) {
  return messages[language].nutrition.levels[level];
}
