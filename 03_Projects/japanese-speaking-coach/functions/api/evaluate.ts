// functions/api/evaluate.ts - Cloudflare Pages Function with Security by Design
// Features: Rate Limiting, Turnstile Bot Protection, Payload Validation, D1 Logging, Multi-Model Gemini AI
import { callGemini, ruleBasedEvaluation } from "../../lib/evaluator";
import { EvaluationPayload, EvaluationResult } from "../../lib/types";

interface Env {
  GEMINI_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  DB?: {
    prepare: (query: string) => {
      bind: (...args: unknown[]) => {
        run: () => Promise<unknown>;
      };
    };
  };
}

// In-Memory Rate Limiting per Edge Isolate
// Max 6 evaluations per 60 seconds per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 6;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}

// Payload sanitization and security check
function validatePayload(body: any): string | null {
  if (!body || typeof body !== "object") {
    return "Invalid request body.";
  }
  if (!Array.isArray(body.part1Answers) || !Array.isArray(body.part2Answers) || !Array.isArray(body.part3Answers)) {
    return "Malformed answers structure.";
  }
  // Check maximum input lengths to prevent token exhaustion / prompt injection
  for (const ans of body.part1Answers) {
    if (typeof ans === "string" && ans.length > 500) {
      return "Answer exceeds maximum length.";
    }
  }
  return null;
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    const clientIp =
      context.request.headers.get("cf-connecting-ip") ||
      context.request.headers.get("x-forwarded-for") ||
      "unknown";

    // 1. Rate Limiting Check
    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded (สูงสุด 6 ครั้ง/นาที) กรุณารอสักครู่ก่อนส่งประเมินใหม่",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }

    const body: EvaluationPayload & { turnstileToken?: string; userId?: string } =
      await context.request.json();

    // 2. Payload Validation
    const validationError = validatePayload(body);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Optional Turnstile Bot Verification (Security by Design)
    if (context.env.TURNSTILE_SECRET_KEY && body.turnstileToken) {
      try {
        const formData = new FormData();
        formData.append("secret", context.env.TURNSTILE_SECRET_KEY);
        formData.append("response", body.turnstileToken);
        formData.append("remoteip", clientIp);

        const turnstileRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            body: formData,
          }
        );
        const turnstileData: any = await turnstileRes.json();
        if (!turnstileData.success) {
          return new Response(
            JSON.stringify({ error: "Turnstile verification failed. Bot detected." }),
            {
              status: 403,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      } catch (err) {
        console.warn("Turnstile validation error:", err);
      }
    }

    // 4. API Key Resolution (Server Secret Priority)
    const apiKey = context.env.GEMINI_API_KEY || body.clientApiKey;

    let result: EvaluationResult;
    if (apiKey) {
      try {
        result = await callGemini(body, apiKey);
      } catch (err: unknown) {
        console.error("Gemini API call failed, falling back to rule-based:", err);
        result = ruleBasedEvaluation(body);
        result.warning = "ประมวลผลด้วยระบบประเมินภายใน (AI Server ไม่สามารถติดต่อได้ชั่วคราว)";
      }
    } else {
      result = ruleBasedEvaluation(body);
    }

    // 5. Cloudflare D1 Logging (if DB binding is present)
    if (context.env.DB) {
      try {
        const examId = `exam_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        await context.env.DB.prepare(
          `INSERT INTO exam_history (id, user_id, total_score, part1_score, part2_score, part3_score, feedback_json)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        )
          .bind(
            examId,
            body.userId || null,
            result.totalScore,
            result.part1Score,
            result.part2Score,
            result.part3Score,
            JSON.stringify(result)
          )
          .run();
      } catch (dbErr) {
        console.warn("Failed to log to Cloudflare D1:", dbErr);
      }
    }

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
