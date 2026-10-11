// app/api/tts/route.ts - Fish Audio TTS API Route for Japanese Speaking Coach
import { NextRequest, NextResponse } from "next/server";

const FISH_AUDIO_API_URL = "https://api.fish.audio/v1/tts";
const DEFAULT_REFERENCE_ID = "dea86d7359194b668a34750b472ced71"; // Saori Hayami (早見沙織 - Mikito)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, speed = 0.9, referenceId = DEFAULT_REFERENCE_ID } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.FISH_AUDIO_API_KEY || process.env.FISH_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "FISH_AUDIO_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    const requestPayload = {
      text,
      reference_id: referenceId,
      format: "mp3",
      sample_rate: 44100,
      mp3_bitrate: 128,
      latency: "balanced",
      prosody: {
        speed: Number(speed) || 0.9,
        volume: 0,
      },
    };

    // Use s2.1-pro-free tier directly (Free Developer Tier - 0 Cost Guaranteed)
    const response = await fetch(FISH_AUDIO_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        model: "s2.1-pro-free",
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      return NextResponse.json(
        { error: `Fish Audio API error: ${response.status}`, details: errorDetail },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err: any) {
    console.error("Fish Audio TTS Route Handler error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
