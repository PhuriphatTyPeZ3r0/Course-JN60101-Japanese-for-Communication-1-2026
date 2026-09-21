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
 * Prefetch TTS audio (no-op since Web Speech API runs locally in 0ms)
 */
export async function prefetchSeiyuuAudio(
  _text: string,
  _seiyuuId: SeiyuuVoiceId = "web_speech",
  _rate: number = 0.9,
  _provider?: "web_speech",
  _fishAudioApiKey?: string
): Promise<void> {
  // Native Web Speech runs locally with 0ms latency
}

export async function speakWithSeiyuuVoice(
  text: string,
  _seiyuuId: SeiyuuVoiceId = "web_speech",
  rate: number = 0.9,
  lang: string = "ja-JP",
  _provider?: "web_speech",
  _fishAudioApiKey?: string
): Promise<void> {
  const cleanText = sanitizeJapaneseForTTS(text);
  speak(cleanText, rate, lang);
}

export async function playSeiyuuGreeting(
  _seiyuuId: SeiyuuVoiceId = "web_speech",
  rate: number = 0.9,
  _provider?: "web_speech",
  _fishAudioApiKey?: string
): Promise<void> {
  const seiyuu = SEIYUU_ROSTER[0];
  speak(seiyuu.greetingJa, rate, "ja-JP");
}

export async function playSeiyuuPraise(
  _seiyuuId: SeiyuuVoiceId = "web_speech",
  rate: number = 0.9,
  _provider?: "web_speech",
  _fishAudioApiKey?: string
): Promise<void> {
  const seiyuu = SEIYUU_ROSTER[0];
  speak(seiyuu.praiseJa, rate, "ja-JP");
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
