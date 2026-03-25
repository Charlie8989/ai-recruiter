import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTION_PROMPT
      .replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Interview App",
      },
    });

    let completion = null;

    try {
      completion = await openai.chat.completions.create({
        model: "openrouter/free",
        messages: [{ role: "user", content: FINAL_PROMPT }],
        timeout: 10000,
      });
    } catch (err) {
      console.error("OpenRouter error:", err?.response?.data || err.message);

      return NextResponse.json(
        { error: "AI service failed. Try again later." },
        { status: 500 }
      );
    }

    const content = completion?.choices?.[0]?.message?.content;

    if (content && content.trim().length > 0) {
      return NextResponse.json({ content });
    } else {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 500 }
      );
    }

  } catch (err) {
    console.error("Server error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}