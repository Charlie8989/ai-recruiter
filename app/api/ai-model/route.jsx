import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();

  const FINAL_PROMPT = QUESTION_PROMPT
    .replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);

  const MODELS = [
    "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    "qwen/qwen3-coder:free",
    "deepseek/deepseek-chat-v3.1:free",
    "google/gemma-3n-e2b-it:free",
  ];

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  let completion = null;
  let errorMessage = "";

  for (const model of MODELS) {
    try {
      completion = await openai.chat.completions.create({
        model,
        messages: [{ role: "user", content: FINAL_PROMPT }],
      });

      if (completion?.choices?.[0]?.message?.content) {
        break;
      }
    } catch (err) {
      errorMessage = err.message;
    }
  }

  if (completion?.choices?.[0]?.message?.content) {
    return NextResponse.json({
      content: completion.choices[0].message.content,
    });
  } else {
    return NextResponse.json(
      { error: `All models failed. Last error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
