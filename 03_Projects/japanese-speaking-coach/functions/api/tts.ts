// functions/api/tts.ts - Cloudflare Pages Function proxy for VOICEVOX & Fish Audio Anime Voices
export const onRequestGet = async (context: {
  request: Request;
  waitUntil: (promise: Promise<unknown>) => void;
  env: {
    FISH_AUDIO_API_KEY?: string;
  };
}): Promise<Response> => {
  try {
    const url = new URL(context.request.url);
    const rawText = url.searchParams.get("text");
    const speaker = url.searchParams.get("speaker") || "2";
    const provider = url.searchParams.get("provider") || "voicevox";
    const refId = url.searchParams.get("referenceId");
    const userFishKey = url.searchParams.get("fishKey");
    const fishKey = userFishKey || context.env?.FISH_AUDIO_API_KEY;

    if (!rawText) {
      return new Response(JSON.stringify({ error: "Missing text parameter" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 1. Sanitize text: remove Thai placeholders and characters to prevent Japanese TTS failure
    let sanitizedText = rawText
      .replace(/\[ชื่อ\]/g, "たなか")
      .replace(/\[งานอดิเรก\]/g, "まんが")
      .replace(/\[Name\]/gi, "たなか")
      .replace(/\[Hobby\]/gi, "まんが")
      .replace(/[\u0E00-\u0E7F]+/g, "")
      .trim();

    if (!sanitizedText) sanitizedText = "こんにちは";

    // 2. Check Cloudflare Edge Cache first
    const cache = (caches as any).default;
    const cacheKey = new Request(context.request.url, context.request);
    try {
      const cached = await cache.match(cacheKey);
      if (cached) {
        return cached;
      }
    } catch (_) {}

    // 3. Option A: Fish Audio SOTA Voice Cloning (if provider=fish_audio and key available)
    if (provider === "fish_audio" && fishKey) {
      try {
        const fishRes = await fetch("https://api.fish.audio/v1/tts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${fishKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: sanitizedText,
            reference_id: refId || "default",
            format: "mp3",
          }),
        });

        if (fishRes.ok) {
          const audioBytes = await fishRes.arrayBuffer();
          const response = new Response(audioBytes, {
            status: 200,
            headers: {
              "Content-Type": "audio/mpeg",
              "Cache-Control": "public, max-age=604800, s-maxage=2592000",
              "Access-Control-Allow-Origin": "*",
              "Accept-Ranges": "bytes",
            },
          });
          try {
            context.waitUntil(cache.put(cacheKey, response.clone()));
          } catch (_) {}
          return response;
        }
      } catch (_) {
        // Fallback to VOICEVOX on Fish Audio error
      }
    }

    // 4. Option B: VOICEVOX public synthesis endpoint with retry on 429
    const queryUrl = `https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(sanitizedText)}&speaker=${encodeURIComponent(speaker)}`;

    let synthRes = await fetch(queryUrl, {
      headers: { "User-Agent": "JN60101-Speaking-Coach/2.2" },
    });

    let data: any = null;
    if (synthRes.ok) {
      data = await synthRes.json();
    }

    // If rate-limited (429), wait 1.2s and retry once
    if (!synthRes.ok || (data && data.errorMessage === 429)) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      synthRes = await fetch(queryUrl, {
        headers: { "User-Agent": "JN60101-Speaking-Coach/2.2" },
      });
      if (synthRes.ok) {
        data = await synthRes.json();
      }
    }

    if (!data || !data.mp3DownloadUrl) {
      return new Response(
        JSON.stringify({
          error: "TTS Rate Limited or Unavailable",
          details: data ? data.errorMessage : synthRes.statusText,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 5. Poll audioStatusUrl until isAudioReady === true (max 6 attempts, 200ms interval = 1.2s max)
    if (data.audioStatusUrl) {
      for (let i = 0; i < 6; i++) {
        try {
          const statusRes = await fetch(data.audioStatusUrl);
          if (statusRes.ok) {
            const statusJson: any = await statusRes.json();
            if (statusJson.isAudioReady) break;
          }
        } catch (_) {}
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }

    // 6. Fetch the MP3 audio stream directly from the provider
    const mp3Res = await fetch(data.mp3DownloadUrl, {
      headers: { "User-Agent": "JN60101-Speaking-Coach/2.2" },
    });

    if (!mp3Res.ok) {
      const errBody = await mp3Res.text().catch(() => "");
      return new Response(
        JSON.stringify({
          error: "Failed to download generated MP3",
          status: mp3Res.status,
          statusText: mp3Res.statusText,
          url: data.mp3DownloadUrl,
          body: errBody,
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const audioBytes = await mp3Res.arrayBuffer();

    // 7. Build cacheable response
    const response = new Response(audioBytes, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=2592000, s-maxage=2592000, immutable",
        "Access-Control-Allow-Origin": "*",
        "Accept-Ranges": "bytes",
      },
    });

    // Save to Cloudflare Edge Cache
    try {
      context.waitUntil(cache.put(cacheKey, response.clone()));
    } catch (_) {}

    return response;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "TTS Generation Failed";
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};
