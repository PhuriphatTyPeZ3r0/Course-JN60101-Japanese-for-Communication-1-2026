// components/MockExam.tsx - Mobile-First Neo-Brutalism Manga Multi-Exam Mock System
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { SvgImage } from "./SvgImage";
import { ScoreCard } from "./ScoreCard";
import {
  EXAM_PART1_SCRIPTS,
  VOCABULARY_LIST,
  IMAGE_QUESTIONS,
} from "@/lib/dataset";
import {
  speak,
  speakWithSeiyuuVoice,
  playSeiyuuGreeting,
  playSeiyuuPraise,
  stopSpeech,
  createSpeechRecognition,
  isSpeechRecognitionSupported,
  ISpeechRecognition,
} from "@/lib/speech";
import {
  VocabItem,
  ImageQuestion,
  Part2AnswerItem,
  Part3AnswerItem,
  EvaluationPayload,
  EvaluationResult,
  UserConfig,
  SEIYUU_ROSTER,
  SeiyuuProfile,
  ExamType,
  EXAM_DEFINITIONS,
  DialogueLine,
} from "@/lib/types";
import { ruleBasedEvaluation } from "@/lib/evaluator";

interface MockExamProps {
  userConfig: UserConfig;
  onGoToDrill: () => void;
}

export const MockExam: React.FC<MockExamProps> = ({
  userConfig,
  onGoToDrill,
}) => {
  const examiner: SeiyuuProfile =
    SEIYUU_ROSTER.find((s) => s.id === userConfig.seiyuuVoice) || SEIYUU_ROSTER[0];

  const [selectedExam, setSelectedExam] = useState<ExamType>("EXAM_1");
  const [status, setStatus] = useState<"IDLE" | "RUNNING" | "EVALUATING" | "FINISHED">("IDLE");

  // Timer: 180s (3 minutes)
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Progress
  const [currentPart, setCurrentPart] = useState<1 | 2 | 3>(1);
  const [stepIndex, setStepIndex] = useState<number>(0);

  // Selected Random Questions
  const [selectedVocab, setSelectedVocab] = useState<VocabItem[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageQuestion[]>([]);

  // Answers Collected
  const [part1Answers, setPart1Answers] = useState<string[]>([]);
  const [part2Answers, setPart2Answers] = useState<Part2AnswerItem[]>([]);
  const [part3Answers, setPart3Answers] = useState<Part3AnswerItem[]>([]);

  // Speech & Input
  const [currentInput, setCurrentInput] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [speechStatus, setSpeechStatus] = useState<string>("");
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  // Evaluation Result
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  const activeMeta = EXAM_DEFINITIONS[selectedExam];
  const activePart1Script = EXAM_PART1_SCRIPTS[selectedExam] || EXAM_PART1_SCRIPTS.EXAM_1;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeech();
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (status === "RUNNING") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, part1Answers, part2Answers, part3Answers, currentInput]);

  const playSfx = (type: "start" | "next" | "finish") => {
    if (!userConfig.enableSfx || typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "start") {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      } else if (type === "next") {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      } else if (type === "finish") {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      }

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      // AudioContext unavailable
    }
  };

  const startExam = () => {
    stopSpeech();
    playSfx("start");
    const meta = EXAM_DEFINITIONS[selectedExam];
    setTimeLeft(meta.timeLimitSeconds || 180);
    setCurrentPart(1);
    setStepIndex(0);
    setCurrentInput("");
    setSpeechStatus("");
    setEvaluationResult(null);

    // Filter vocab by chapters of selected exam
    const eligibleVocab = VOCABULARY_LIST.filter((v) => meta.chapters.includes(v.chapter));
    const shuffledVocab = [...eligibleVocab].sort(() => 0.5 - Math.random()).slice(0, 5);

    // Filter images by chapters of selected exam (top up if fewer than 5)
    let eligibleImages = IMAGE_QUESTIONS.filter((q) => meta.chapters.includes(q.chapter));
    if (eligibleImages.length < 5) {
      const remaining = IMAGE_QUESTIONS.filter((q) => !meta.chapters.includes(q.chapter));
      eligibleImages = [...eligibleImages, ...remaining];
    }
    const shuffledImages = [...eligibleImages].sort(() => 0.5 - Math.random()).slice(0, 5);

    setSelectedVocab(shuffledVocab);
    setSelectedImages(shuffledImages);

    setPart1Answers([]);
    setPart2Answers([]);
    setPart3Answers([]);

    setStatus("RUNNING");
    playSeiyuuGreeting("web_speech", userConfig.speechRate);
  };

  const toggleRecording = () => {
    if (!isSpeechRecognitionSupported()) {
      alert("เบราว์เซอร์นี้ไม่รองรับ Speech Recognition กรุณาพิมพ์คำตอบแทนครับ");
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    const recognition = createSpeechRecognition({
      onStart: () => {
        setIsRecording(true);
        setSpeechStatus("กำลังฟังเสียงภาษาญี่ปุ่น... พูดได้เลย!");
      },
      onResult: (transcript) => {
        setCurrentInput(transcript);
      },
      onError: (err: string) => {
        console.warn("Speech recognition error:", err);
        setIsRecording(false);
        setSpeechStatus(`เกิดข้อผิดพลาด (${err}) แนะนำให้พิมพ์คำตอบ`);
      },
      onEnd: () => {
        setIsRecording(false);
        setSpeechStatus("บันทึกเสียงเรียบร้อย หรือแก้ไขข้อความได้");
      },
    });

    if (recognition) {
      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch (e: unknown) {
        console.warn("Start error:", e);
      }
    }
  };

  const handleNextStep = () => {
    playSfx("next");
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    const answer = currentInput.trim();

    if (currentPart === 1) {
      const updatedP1 = [...part1Answers, answer];
      setPart1Answers(updatedP1);
      setCurrentInput("");
      setSpeechStatus("");

      if (stepIndex < 4) {
        setStepIndex(stepIndex + 1);
      } else {
        setCurrentPart(2);
        setStepIndex(0);
        promptVocab(selectedVocab[0]);
      }
    } else if (currentPart === 2) {
      const item = selectedVocab[stepIndex];
      const answerObj: Part2AnswerItem = {
        id: item.id,
        th: item.th,
        expectedJa: item.ja,
        expectedRomaji: item.romaji,
        altJa: item.altJa,
        altRomaji: item.altRomaji,
        userAnswer: answer,
      };
      const updatedP2 = [...part2Answers, answerObj];
      setPart2Answers(updatedP2);
      setCurrentInput("");
      setSpeechStatus("");

      if (stepIndex < 4) {
        const nextIdx = stepIndex + 1;
        setStepIndex(nextIdx);
        promptVocab(selectedVocab[nextIdx]);
      } else {
        setCurrentPart(3);
        setStepIndex(0);
        promptImageQuestion(selectedImages[0]);
      }
    } else if (currentPart === 3) {
      const q = selectedImages[stepIndex];
      const answerObj: Part3AnswerItem = {
        id: q.id,
        questionJa: q.questionJa,
        questionRomaji: q.questionRomaji,
        expectedJa: q.expectedAnswerJa,
        expectedRomaji: q.expectedAnswerRomaji,
        keywords: q.keywords,
        userAnswer: answer,
      };
      const updatedP3 = [...part3Answers, answerObj];
      setPart3Answers(updatedP3);
      setCurrentInput("");
      setSpeechStatus("");

      if (stepIndex < 4) {
        const nextIdx = stepIndex + 1;
        setStepIndex(nextIdx);
        promptImageQuestion(selectedImages[nextIdx]);
      } else {
        finishAndEvaluate(part1Answers, part2Answers, updatedP3);
      }
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    if (status !== "RUNNING") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      if (e.code === "Space" && !isInput) {
        e.preventDefault();
        toggleRecording();
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleNextStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, isRecording, currentInput, currentPart, stepIndex, part1Answers, part2Answers, part3Answers]);

  const promptVocab = (vocab: VocabItem) => {
    if (!vocab) return;
    speak(vocab.th, userConfig.speechRate, "th-TH");
  };

  const promptImageQuestion = (imgQ: ImageQuestion) => {
    if (!imgQ) return;
    speakWithSeiyuuVoice(
      imgQ.questionJa,
      "web_speech",
      userConfig.speechRate,
      "ja-JP"
    );
  };

  const handleTimeOut = () => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    finishAndEvaluate(part1Answers, part2Answers, part3Answers);
  };

  const finishAndEvaluate = async (
    p1: string[],
    p2: Part2AnswerItem[],
    p3: Part3AnswerItem[]
  ) => {
    setStatus("EVALUATING");
    stopSpeech();
    playSfx("finish");

    const payload: EvaluationPayload = {
      examType: selectedExam,
      part1Answers: p1,
      part2Answers: p2,
      part3Answers: p3,
      userConfig: userConfig,
    };

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result: EvaluationResult = await res.json();
      setEvaluationResult(result);
      setStatus("FINISHED");
      playSeiyuuPraise("web_speech", userConfig.speechRate);
    } catch (err: unknown) {
      console.warn("API Evaluation failed, using rule-based fallback:", err);
      const fallbackResult = ruleBasedEvaluation(payload);
      setEvaluationResult(fallbackResult);
      setStatus("FINISHED");
      playSeiyuuPraise("web_speech", userConfig.speechRate);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 1. IDLE State - Exam Selector & Overview
  if (status === "IDLE") {
    const examKeys: ExamType[] = ["EXAM_1", "EXAM_2", "EXAM_3", "FINAL"];

    return (
      <div className="manga-box p-4 sm:p-6 text-center max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-150 space-y-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center mx-auto shadow-[3px_3px_0px_#0f172a] rotate-[-3deg]">
          <Icon name="timer" className="text-2xl sm:text-3xl text-slate-900" />
        </div>

        <div>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            ระบบจำลองการสอบพูดภาษาญี่ปุ่น (JN60101)
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            ตามเกณฑ์มาตรฐานการสอบจริงของสถาบันการจัดการปัญญาภิวัฒน์ (PIM)
          </p>
        </div>

        {/* Exam Type Selector Cards */}
        <div className="text-left space-y-1.5">
          <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
            เลือกชุดข้อสอบที่ต้องการทดสอบ:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {examKeys.map((key) => {
              const item = EXAM_DEFINITIONS[key];
              const isSelected = selectedExam === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedExam(key)}
                  className={`p-2.5 sm:p-3 rounded-2xl border-2 border-slate-900 text-left transition-all relative ${
                    isSelected
                      ? "bg-amber-100 shadow-[3px_3px_0px_#0f172a] -translate-y-0.5"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md border border-slate-900 ${
                        isSelected
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.chapters.length === 6 ? "ทุกบท (1-6)" : `บทที่ ${item.chapters.join("-")}`}
                    </span>
                    <span className="text-[11px] font-black text-rose-600">
                      15 คะแนน
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                    {item.titleTh}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.subtitleTh}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Exam Meta Overview */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-900 text-left space-y-2">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                โครงสร้างชุดข้อสอบที่เลือก:
              </span>
              <h3 className="text-sm font-black text-slate-900">
                {activeMeta.titleTh} ({activeMeta.titleJa})
              </h3>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="manga-badge bg-rose-500 text-white text-[10px]">
                ⏱️ 3:00 นาที
              </span>
              <span className="manga-badge bg-amber-400 text-slate-900 text-[10px]">
                ⭐ 15 คะแนน
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-lg bg-rose-500 text-white font-black text-[10px] flex items-center justify-center border border-slate-900 shrink-0 mt-0.5">
                1
              </span>
              <div>
                <span className="font-bold text-slate-900">{activeMeta.part1TitleTh}:</span>{" "}
                <span className="text-slate-600">{activeMeta.part1InstructionsTh}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-lg bg-amber-400 text-slate-900 font-black text-[10px] flex items-center justify-center border border-slate-900 shrink-0 mt-0.5">
                2
              </span>
              <div>
                <span className="font-bold text-slate-900">คำศัพท์ (5 คะแนน):</span>{" "}
                <span className="text-slate-600">สุ่ม 5 คำศัพท์ แปลจากไทยเป็นญี่ปุ่น จากบทที่ {activeMeta.chapters.join(", ")}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-lg bg-emerald-400 text-slate-900 font-black text-[10px] flex items-center justify-center border border-slate-900 shrink-0 mt-0.5">
                3
              </span>
              <div>
                <span className="font-bold text-slate-900">ตอบจากภาพ SVG (5 คะแนน):</span>{" "}
                <span className="text-slate-600">สุ่ม 5 คำถามจากภาพสถานการณ์ ตอบเป็นประโยคสมบูรณ์</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={startExam}
          className="manga-btn w-full py-3 sm:py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-black flex items-center justify-center space-x-1.5 shadow-[3px_3px_0px_#0f172a]"
        >
          <Icon name="play_arrow" className="text-lg sm:text-xl" />
          <span>เริ่มจำลองสอบ {activeMeta.titleTh} (3 นาที)</span>
        </button>
      </div>
    );
  }

  // 2. Evaluating State
  if (status === "EVALUATING") {
    return (
      <div className="manga-box p-8 text-center max-w-lg mx-auto space-y-4 animate-pulse">
        <div className="w-16 h-16 rounded-3xl bg-blue-400 border-2 border-slate-900 flex items-center justify-center mx-auto shadow-[3px_3px_0px_#0f172a] animate-spin">
          <Icon name="psychology" className="text-3xl text-slate-900" />
        </div>
        <h3 className="text-xl font-black text-slate-900">
          อาจารย์ AI กำลังตรวจและประเมินผล...
        </h3>
        <p className="text-xs text-slate-600 font-medium">
          ระบบกำลังวิเคราะห์เสียงและเกณฑ์การออกเสียง ความสมบูรณ์ของประโยคตามมาตรฐาน PIM
        </p>
      </div>
    );
  }

  // 3. Finished State
  if (status === "FINISHED" && evaluationResult) {
    return (
      <div className="max-w-xl mx-auto">
        <ScoreCard
          result={evaluationResult}
          onRetake={startExam}
          onGoToDrill={onGoToDrill}
        />
      </div>
    );
  }

  // 4. RUNNING State
  const currentP1Line: DialogueLine = activePart1Script[stepIndex] || activePart1Script[0];
  const currentVocabItem = selectedVocab[stepIndex];
  const currentImgItem = selectedImages[stepIndex];

  return (
    <div className="space-y-3.5 max-w-xl mx-auto pb-36 sm:pb-40">
      {/* Top Status Bar: Exam Title & Timer */}
      <div className="manga-box-sm p-2.5 sm:p-3 bg-white flex items-center justify-between shadow-[2px_2px_0px_#0f172a]">
        <div className="flex items-center space-x-2">
          <span className="manga-badge bg-slate-900 text-white text-[10px]">
            {activeMeta.titleTh}
          </span>
          <span className="manga-badge bg-rose-500 text-white text-[10px]">
            ส่วนที่ {currentPart} / 3
          </span>
        </div>

        <div className="flex items-center space-x-1.5 font-mono font-black text-sm">
          <Icon
            name="timer"
            className={`text-base ${timeLeft <= 30 ? "text-rose-600 animate-bounce" : "text-slate-800"}`}
          />
          <span
            className={`px-2 py-0.5 rounded-lg border border-slate-900 ${
              timeLeft <= 30
                ? "bg-rose-500 text-white animate-pulse"
                : "bg-amber-300 text-slate-900"
            }`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center space-x-1.5 py-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full border border-slate-900 transition-all ${
              i === stepIndex
                ? "bg-rose-500 scale-125 shadow-[1px_1px_0px_#0f172a]"
                : i < stepIndex
                ? "bg-emerald-400"
                : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* ================= PART 1: DIALOGUE / PRESENTATION ================= */}
      {currentPart === 1 && currentP1Line && (
        <div className="manga-box p-4 sm:p-6 text-center space-y-3.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="manga-badge bg-rose-500 text-white text-[10px]">
              {activeMeta.part1TitleTh} • ข้อ {stepIndex + 1} / 5
            </span>
            <span className="text-slate-700 font-extrabold text-[11px]">
              {currentP1Line.th}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border-2 border-slate-900 space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-jp break-words">
              {selectedExam === "EXAM_1" && stepIndex === 1
                ? `わたしは ${userConfig.studentNameJa || "[ชื่อ]"} です`
                : selectedExam === "EXAM_1" && stepIndex === 3
                ? `しゅみは ${userConfig.selectedHobby || "[งานอดิเรก]"} です`
                : currentP1Line.ja}
            </h3>

            {userConfig.showRomaji && (
              <p className="text-xs text-slate-500 font-mono">
                {selectedExam === "EXAM_1" && stepIndex === 1
                  ? `Watashi wa ${userConfig.studentNameJa || "[Name]"} desu`
                  : selectedExam === "EXAM_1" && stepIndex === 3
                  ? `Shumi wa ${userConfig.selectedHobby || "[Hobby]"} desu`
                  : currentP1Line.romaji}
              </p>
            )}

            {userConfig.showThaiHints && (
              <p className="text-xs text-slate-600 font-medium">
                ({currentP1Line.th})
              </p>
            )}
          </div>
        </div>
      )}

      {/* ================= PART 2: VOCABULARY ================= */}
      {currentPart === 2 && currentVocabItem && (
        <div className="manga-box p-4 sm:p-6 text-center space-y-3.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="manga-badge bg-amber-400 text-slate-900 text-[10px]">
              ส่วนที่ 2: แปลคำศัพท์ • คำที่ {stepIndex + 1} / 5
            </span>
            <span className="text-[10px] text-slate-500 font-bold">
              หมวด: {currentVocabItem.category}
            </span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border-2 border-slate-900 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              จงพูดคำศัพท์ภาษาญี่ปุ่นของคำว่า:
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 break-words py-1">
              "{currentVocabItem.th}"
            </h3>
            <button
              onClick={() => promptVocab(currentVocabItem)}
              className="manga-btn inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-white text-slate-800 text-xs border border-slate-300"
            >
              <Icon name="volume_up" className="text-sm text-amber-600" />
              <span>ฟังคำแปลไทยอีกครั้ง</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= PART 3: SITUATIONAL SVG ================= */}
      {currentPart === 3 && currentImgItem && (
        <div className="manga-box p-4 sm:p-5 text-center space-y-3.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="manga-badge bg-emerald-500 text-white text-[10px]">
              ส่วนที่ 3: ตอบจากภาพ • ข้อที่ {stepIndex + 1} / 5
            </span>
            <span className="text-[11px] font-bold text-slate-700">
              {currentImgItem.title}
            </span>
          </div>

          {/* SVG Preview */}
          <div className="manga-box-sm overflow-hidden p-1.5 bg-white max-w-[120px] sm:max-w-[150px] mx-auto">
            <SvgImage
              svgContent={currentImgItem.imageSvg}
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto"
            />
          </div>

          {/* Examiner Bubble */}
          <div className="speech-bubble p-3 text-left bg-emerald-50/70 border-2 border-emerald-900">
            <div className="flex items-center justify-between mb-1 pb-1 border-b border-emerald-200">
              <div className="flex items-center space-x-1.5">
                <span className="text-base">{examiner.avatarIcon}</span>
                <span className="text-[11px] font-black text-slate-900">
                  อาจารย์ AI ({examiner.characterNameJa})
                </span>
              </div>
              <button
                onClick={() => promptImageQuestion(currentImgItem)}
                className="inline-flex items-center space-x-1 text-xs text-rose-600 font-bold hover:underline"
              >
                <Icon name="volume_up" className="text-sm" />
                <span>ฟังเสียง</span>
              </button>
            </div>

            <h4 className="text-base font-extrabold text-slate-900 font-jp">
              {currentImgItem.questionJa}
            </h4>
            {userConfig.showRomaji && (
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                {currentImgItem.questionRomaji}
              </p>
            )}
            {userConfig.showThaiHints && (
              <p className="text-xs text-slate-600 mt-0.5">
                ({currentImgItem.questionTh})
              </p>
            )}
          </div>
        </div>
      )}

      {/* Answer Input Box */}
      <div className="manga-box p-3 sm:p-4 text-left">
        <div className="flex items-center justify-between mb-1">
          <label className="block text-[11px] font-bold text-slate-700">
            คำตอบของคุณ (กดปุ่มไมค์ด้านล่างเพื่อพูด หรือพิมพ์):
          </label>
          {isInputFocused && (
            <button
              type="button"
              onClick={() => {
                setIsInputFocused(false);
                (document.activeElement as HTMLElement)?.blur();
              }}
              className="text-[10px] font-black text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-300"
            >
              ✕ เสร็จสิ้น
            </button>
          )}
        </div>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onFocus={(e) => {
            setIsInputFocused(true);
            e.target.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          onBlur={() => {
            setTimeout(() => setIsInputFocused(false), 150);
          }}
          placeholder="พูดคำตอบภาษาญี่ปุ่น หรือพิมพ์ตอบที่นี่..."
          className="w-full px-3 py-2 sm:py-2.5 rounded-xl border-2 border-slate-900 text-xs font-semibold focus:outline-none focus:bg-white bg-slate-50 font-jp"
        />
        {speechStatus && (
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            {speechStatus}
          </p>
        )}
      </div>

      {/* Mobile-First Sticky Bottom Action Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-slate-900 px-3 pt-2 pb-[max(0.75rem,calc(env(safe-area-inset-bottom)+0.5rem))] shadow-[0_-3px_0px_#0f172a] transition-all duration-200 ${
          isInputFocused ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-xl mx-auto flex flex-col gap-1.5">
          <div className="hidden sm:flex items-center justify-center space-x-2 text-[10px] font-mono text-slate-500">
            <span>⌨️ คีย์ลัด:</span>
            <kbd className="bg-slate-100 border border-slate-400 px-1.5 py-0.5 rounded text-slate-900 font-bold">Space</kbd>
            <span>พูดคำตอบ</span>
            <span>•</span>
            <kbd className="bg-slate-100 border border-slate-400 px-1.5 py-0.5 rounded text-slate-900 font-bold">Enter</kbd>
            <span>ส่งข้อนี้และไปข้อถัดไป</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={toggleRecording}
              className={`manga-btn flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-2xl flex items-center justify-center space-x-1.5 text-xs sm:text-sm text-white min-w-0 ${
                isRecording
                  ? "bg-red-600 manga-recording-pulse"
                  : "bg-rose-600 hover:bg-rose-500"
              }`}
            >
              <Icon
                name={isRecording ? "mic_off" : "mic"}
                className="text-xl sm:text-2xl shrink-0"
                filled
              />
              <span className="font-black tracking-tight truncate">
                {isRecording ? "กำลังฟัง... (แตะหยุด)" : "พูดคำตอบ"}
              </span>
            </button>

            <button
              onClick={handleNextStep}
              className="manga-btn px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs sm:text-sm font-black flex items-center space-x-1 shrink-0 shadow-[2px_2px_0px_#0f172a]"
            >
              <span>{currentPart === 3 && stepIndex === 4 ? "ส่งข้อสอบ" : "ข้อถัดไป"}</span>
              <Icon name="arrow_forward" className="text-sm sm:text-base" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
