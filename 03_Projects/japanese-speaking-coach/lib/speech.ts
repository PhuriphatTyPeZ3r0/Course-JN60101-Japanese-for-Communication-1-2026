// lib/speech.ts - Helper functions for Web Speech API (STT & TTS) with strict TypeScript types

export interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message?: string;
}

export interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

export interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

export interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

import {
  AnimeVoiceId,
  ANIME_VOICE_OPTIONS,
  SeiyuuVoiceId,
  SEIYUU_ROSTER,
  SeiyuuProfile,
} from "./types";

let currentAudio: HTMLAudioElement | null = null;
const audioCache = new Map<string, Blob>();

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window;
}

export function speak(text: string, rate: number = 0.9, lang: string = "ja-JP"): void {
  if (!isSpeechSynthesisSupported()) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;

  const voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find((v) => v.lang.includes("ja") || v.lang.includes("JP"));
  if (jaVoice) {
    utterance.voice = jaVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export async function speakWithAnimeVoice(
  text: string,
  _voiceId: AnimeVoiceId = "web_speech",
  rate: number = 0.9,
  lang: string = "ja-JP"
): Promise<void> {
  const cleanText = sanitizeJapaneseForTTS(text);
  speak(cleanText, rate, lang);
}

export function sanitizeJapaneseForTTS(text: string): string {
  let cleaned = text;
  cleaned = cleaned.replace(/\[ชื่อ\]/g, "たなか");
  cleaned = cleaned.replace(/\[งานอดิเรก\]/g, "まんが");
  cleaned = cleaned.replace(/\[Name\]/gi, "たなか");
  cleaned = cleaned.replace(/\[Hobby\]/gi, "まんが");
  cleaned = cleaned.replace(/[\u0E00-\u0E7F]+/g, "");
  return cleaned.trim() || "こんにちは";
}

/**
 * Prefetch TTS audio for smoother playback
 */
export async function prefetchSeiyuuAudio(
  text: string,
  seiyuuId: SeiyuuVoiceId = "web_speech",
  rate: number = 0.9,
  _provider?: "web_speech" | "fish_audio",
  _fishAudioApiKey?: string
): Promise<void> {
  const seiyuu = SEIYUU_ROSTER.find((s) => s.id === seiyuuId);
  if (!seiyuu?.fishAudioReferenceId) return;

  const cleanText = sanitizeJapaneseForTTS(text);
  const cacheKey = `${seiyuu.fishAudioReferenceId}_${cleanText}_${rate}`;
  if (audioCache.has(cacheKey)) return;

  try {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: cleanText,
        speed: rate,
        referenceId: seiyuu.fishAudioReferenceId,
      }),
    });
    if (res.ok) {
      const blob = await res.blob();
      audioCache.set(cacheKey, blob);
    }
  } catch (_) {}
}

export async function speakWithSeiyuuVoice(
  text: string,
  seiyuuId: SeiyuuVoiceId = "web_speech",
  rate: number = 0.9,
  lang: string = "ja-JP",
  _provider?: "web_speech" | "fish_audio",
  _fishAudioApiKey?: string
): Promise<void> {
  const cleanText = sanitizeJapaneseForTTS(text);
  const seiyuu = SEIYUU_ROSTER.find((s) => s.id === seiyuuId);

  // If using Fish Audio voice model
  if (seiyuu?.fishAudioReferenceId) {
    try {
      stopSpeech();
      const cacheKey = `${seiyuu.fishAudioReferenceId}_${cleanText}_${rate}`;
      let audioBlob = audioCache.get(cacheKey);

      if (!audioBlob) {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: cleanText,
            speed: rate,
            referenceId: seiyuu.fishAudioReferenceId,
          }),
        });

        if (res.ok) {
          audioBlob = await res.blob();
          audioCache.set(cacheKey, audioBlob);
        } else {
          console.warn("Fish Audio TTS API returned error, falling back to Web Speech:", await res.text());
        }
      }

      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        currentAudio = audio;
        audio.onended = () => {
          if (currentAudio === audio) currentAudio = null;
        };
        await audio.play();
        return;
      }
    } catch (err) {
      console.warn("Failed to play Fish Audio, falling back to Web Speech:", err);
    }
  }

  // Fallback to local native Web Speech API
  speak(cleanText, rate, lang);
}

export async function playSeiyuuGreeting(
  seiyuuId: SeiyuuVoiceId = "web_speech",
  rate: number = 0.9,
  provider?: "web_speech" | "fish_audio",
  fishAudioApiKey?: string
): Promise<void> {
  const seiyuu = SEIYUU_ROSTER.find((s) => s.id === seiyuuId) || SEIYUU_ROSTER[0];
  await speakWithSeiyuuVoice(seiyuu.greetingJa, seiyuuId, rate, "ja-JP", provider, fishAudioApiKey);
}

export async function playSeiyuuPraise(
  seiyuuId: SeiyuuVoiceId = "web_speech",
  rate: number = 0.9,
  provider?: "web_speech" | "fish_audio",
  fishAudioApiKey?: string
): Promise<void> {
  const seiyuu = SEIYUU_ROSTER.find((s) => s.id === seiyuuId) || SEIYUU_ROSTER[0];
  await speakWithSeiyuuVoice(seiyuu.praiseJa, seiyuuId, rate, "ja-JP", provider, fishAudioApiKey);
}

export function stopSpeech(): void {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (_) {}
    currentAudio = null;
  }
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

export interface SpeechRecognitionHandlers {
  onStart?: () => void;
  onResult: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export function createSpeechRecognition(handlers: SpeechRecognitionHandlers): ISpeechRecognition | null {
  if (!isSpeechRecognitionSupported()) return null;

  const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionConstructor) return null;

  const recognition = new SpeechRecognitionConstructor();
  recognition.lang = "ja-JP";
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    handlers.onStart?.();
  };

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let transcript = "";
    let isFinal = false;
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        isFinal = true;
      }
    }
    handlers.onResult(transcript, isFinal);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    handlers.onError?.(event.error);
  };

  recognition.onend = () => {
    handlers.onEnd?.();
  };

  return recognition;
}
