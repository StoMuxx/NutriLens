import OpenAI from "openai";
import { mealAnalysisJsonSchema, parseMealAnalysis } from "@/lib/analysisSchema";
import type {
  AnalysisSource,
  Language,
  MealAnalysis,
  MealPreferences
} from "@/types/meal";

const DEFAULT_OPENAI_MODEL = "gpt-5.4-mini";
const DEFAULT_QWEN_MODEL = "qwen3-vl-plus";
const FALLBACK_QWEN_VISION_MODEL = "qwen3-vl-plus";
const DEFAULT_QWEN_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";

type LiveAIProvider = Exclude<AnalysisSource, "mock">;

interface LiveAnalysisResult {
  analysis: MealAnalysis;
  source: LiveAIProvider;
}

function selectedProvider(): LiveAIProvider {
  const provider = process.env.AI_PROVIDER?.trim().toLowerCase();

  if (provider === "qwen") {
    return "qwen";
  }

  if (provider === "openai") {
    return "openai";
  }

  return process.env.DASHSCOPE_API_KEY || process.env.QWEN_API_KEY
    ? "qwen"
    : "openai";
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
}

function getQwenClient() {
  const apiKey = process.env.DASHSCOPE_API_KEY ?? process.env.QWEN_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new OpenAI({
    apiKey,
    baseURL: process.env.QWEN_BASE_URL ?? DEFAULT_QWEN_BASE_URL
  });
}

function buildPrompt(preferences: MealPreferences, language: Language) {
  const outputLanguage =
    language === "zh" ? "Simplified Chinese" : "English";

  return [
    `Analyze this meal photo for NutriLens in ${outputLanguage}.`,
    "",
    "User context:",
    JSON.stringify(preferences, null, 2),
    "",
    "NutriLens is a general wellness education demo for college students and Chinese/American campus eating contexts.",
    "Use the image as visual evidence, but be honest about uncertainty.",
    "Estimate approximate food composition, a calorie range, nutrition balance, possible risk tags, and practical next-meal guidance.",
    "Use mealTime to tailor nextMealSuggestion: breakfast should guide lunch, lunch should guide dinner, dinner should guide the next morning or a light late snack, and lateNight should guide recovery and tomorrow's breakfast.",
    "Return quality.clarity and quality.confidence as High, Medium, or Low. The safety note must clearly say that this is an estimate, not precise detection.",
    "Do not claim precise calorie detection.",
    "Do not diagnose disease, prescribe treatment, encourage extreme dieting, or replace medical/professional nutrition guidance.",
    "For allergies, lactose intolerance, halal, and other restrictions, advise the user to verify ingredients or ask food-service staff instead of guaranteeing safety.",
    "Use riskTagKeys only from this list when relevant: highSugar, highFat, lowVegetables, friedFood, largePortion, possibleAddedSugar, sauceSodium, vegetablesCouldImprove, lowProtein.",
    "Keep advice specific, moderate, practical, and safe for young adults."
  ].join("\n");
}

function buildQwenPrompt(preferences: MealPreferences, language: Language) {
  return [
    buildPrompt(preferences, language),
    "",
    "Return ONLY one valid JSON object. Do not wrap the JSON in markdown.",
    "The response must be JSON and must match this JSON Schema as closely as possible:",
    JSON.stringify(mealAnalysisJsonSchema)
  ].join("\n");
}

function parseStructuredOutput(output: string, language: Language) {
  try {
    return parseMealAnalysis(JSON.parse(output), language);
  } catch {
    const jsonMatch = output.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("The model did not return a valid JSON object.");
    }

    return parseMealAnalysis(JSON.parse(jsonMatch[0]), language);
  }
}

async function analyzeMealWithOpenAI({
  imageDataUrl,
  preferences,
  language
}: {
  imageDataUrl: string;
  preferences: MealPreferences;
  language: Language;
}): Promise<MealAnalysis | null> {
  const client = getOpenAIClient();

  if (!client) {
    return null;
  }

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? DEFAULT_OPENAI_MODEL,
    store: false,
    max_output_tokens: 1400,
    instructions:
      "You are NutriLens, a cautious AI nutrition education assistant. Return only valid JSON matching the provided schema.",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: buildPrompt(preferences, language)
          },
          {
            type: "input_image",
            image_url: imageDataUrl,
            detail: "low"
          }
        ]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "meal_analysis",
        strict: true,
        schema: mealAnalysisJsonSchema
      }
    }
  });

  const output = response.output_text;

  if (!output) {
    throw new Error("OpenAI returned an empty meal analysis response.");
  }

  return parseStructuredOutput(output, language);
}

async function analyzeMealWithQwen({
  imageDataUrl,
  preferences,
  language
}: {
  imageDataUrl: string;
  preferences: MealPreferences;
  language: Language;
}): Promise<MealAnalysis | null> {
  const client = getQwenClient();

  if (!client) {
    return null;
  }

  const primaryModel = process.env.QWEN_MODEL ?? DEFAULT_QWEN_MODEL;
  const fallbackModel =
    process.env.QWEN_VISION_MODEL ?? FALLBACK_QWEN_VISION_MODEL;

  const runQwenAnalysis = async (model: string) => {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are NutriLens, a cautious AI nutrition education assistant. Return only valid JSON."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: buildQwenPrompt(preferences, language)
            },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl
              }
            }
          ]
        }
      ],
      max_tokens: 1400,
      response_format: {
        type: "json_object"
      }
    });

    const output = completion.choices[0]?.message?.content;

    if (!output) {
      throw new Error("Qwen returned an empty meal analysis response.");
    }

    return parseStructuredOutput(output, language);
  };

  try {
    return await runQwenAnalysis(primaryModel);
  } catch (error) {
    if (primaryModel === fallbackModel) {
      throw error;
    }

    console.warn(
      `Qwen model ${primaryModel} failed for image analysis. Retrying with ${fallbackModel}.`,
      error
    );

    return runQwenAnalysis(fallbackModel);
  }
}

export function getSelectedLiveAIProvider(): LiveAIProvider {
  return selectedProvider();
}

export async function analyzeMealWithLiveAI({
  imageDataUrl,
  preferences,
  language
}: {
  imageDataUrl: string;
  preferences: MealPreferences;
  language: Language;
}): Promise<LiveAnalysisResult | null> {
  const provider = selectedProvider();
  const analysis =
    provider === "qwen"
      ? await analyzeMealWithQwen({ imageDataUrl, preferences, language })
      : await analyzeMealWithOpenAI({ imageDataUrl, preferences, language });

  if (!analysis) {
    return null;
  }

  return {
    analysis,
    source: provider
  };
}
