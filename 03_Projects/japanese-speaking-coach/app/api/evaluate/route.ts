// app/api/evaluate/route.ts - Next.js App Router API Route for Exam Evaluation
import { NextRequest, NextResponse } from "next/server";
import { callGemini, ruleBasedEvaluation } from "@/lib/evaluator";
import { EvaluationPayload, EvaluationResult } from "@/lib/types";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body: EvaluationPayload = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || body.clientApiKey;

    let result: EvaluationResult;
    if (apiKey) {
      try {
        result = await callGemini(body, apiKey);
      } catch (err: unknown) {
        console.warn("Gemini evaluation error, using rule-based fallback:", err);
        result = ruleBasedEvaluation(body);
        result.warning = "ประเมินผลด้วยระบบตรวจมาตรฐาน PIM (Standard Rule-based Engine)";
      }
    } else {
      result = ruleBasedEvaluation(body);
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
