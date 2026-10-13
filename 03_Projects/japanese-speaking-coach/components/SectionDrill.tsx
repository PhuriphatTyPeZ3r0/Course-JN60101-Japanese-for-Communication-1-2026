// components/SectionDrill.tsx - Mobile-First Neo-Brutalism Manga Section Drill (Finetuned UX/UI)
"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Icon } from "./Icon";
import { SvgImage } from "./SvgImage";
import {
  SELF_INTRODUCTION_CRITERIA,
  CHAPTER_DIALOGUES,
  VOCABULARY_LIST,
  IMAGE_QUESTIONS,
  EXAM_2_CATEGORIES,
  EXAM_2_QUESTIONS_POOL,
} from "@/lib/dataset";
import {
  speak,
  speakWithSeiyuuVoice,
  stopSpeech,
  createSpeechRecognition,
  isSpeechRecognitionSupported,
  ISpeechRecognition,
} from "@/lib/speech";
import {
  VocabItem,
  UserConfig,
  SEIYUU_ROSTER,
  SeiyuuProfile,
  ImageQuestion,
  ChapterDialogue,
  Exam2Category,
  Exam2Question,
} from "@/lib/types";
import { calculateConfidence } from "@/lib/phonetics";
import { resolveHobby } from "@/lib/hobbies";

interface SectionDrillProps {
  userConfig: UserConfig;
}

export const SectionDrill: React.FC<SectionDrillProps> = ({ userConfig }) => {
  const examiner: SeiyuuProfile =
    SEIYUU_ROSTER.find((s) => s.id === userConfig.seiyuuVoice) || SEIYUU_ROSTER[0];

  const [activePart, setActivePart] = useState<1 | 2 | 3 | 4>(1);

  // ================= Part 1 State =================
  const [selectedChapterP1, setSelectedChapterP1] = useState<number>(1);
  const [p1Step, setP1Step] = useState<number>(0);

  const currentDialogue: ChapterDialogue = useMemo(() => {
    return (
      CHAPTER_DIALOGUES.find((d) => d.chapter === selectedChapterP1) ||
      CHAPTER_DIALOGUES[0]
    );
  }, [selectedChapterP1]);

  const currentLine = currentDialogue.lines[p1Step] || currentDialogue.lines[0];

  // ================= Part 2 State =================
  const [chapterFilter, setChapterFilter] = useState<number | "ALL">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [vocabSearch, setVocabSearch] = useState<string>("");
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const [showVocabAnswer, setShowVocabAnswer] = useState<boolean>(false);
  const [vocabViewMode, setVocabViewMode] = useState<"CARD" | "LIST">("CARD");

  // Filtered Vocabularies
  const filteredVocabList = useMemo(() => {
    return VOCABULARY_LIST.filter((v) => {
      const matchChapter = chapterFilter === "ALL" || v.chapter === chapterFilter;
      const matchCategory = categoryFilter === "ALL" || v.category === categoryFilter;
      const q = vocabSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        v.th.toLowerCase().includes(q) ||
        v.ja.includes(q) ||
        v.romaji.toLowerCase().includes(q);
      return matchChapter && matchCategory && matchSearch;
    });
  }, [chapterFilter, categoryFilter, vocabSearch]);

  // Unique categories for the current chapter filter
  const availableCategories = useMemo(() => {
    const list =
      chapterFilter === "ALL"
        ? VOCABULARY_LIST
        : VOCABULARY_LIST.filter((v) => v.chapter === chapterFilter);
    const cats = Array.from(new Set(list.map((v) => v.category)));
    return ["ALL", ...cats];
  }, [chapterFilter]);

  // Reset index when filter changes
  useEffect(() => {
    setVocabIndex(0);
    setShowVocabAnswer(false);
  }, [chapterFilter, categoryFilter, vocabSearch]);

  // ================= Part 3 State =================
  const [imageChapterFilter, setImageChapterFilter] = useState<number | "ALL">("ALL");
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [showImageAnswer, setShowImageAnswer] = useState<boolean>(false);

  const filteredImageQuestions = useMemo(() => {
    if (imageChapterFilter === "ALL") return IMAGE_QUESTIONS;
    return IMAGE_QUESTIONS.filter((q) => q.chapter === imageChapterFilter);
  }, [imageChapterFilter]);

  const currentImageQ: ImageQuestion | undefined = filteredImageQuestions[imageIndex] || filteredImageQuestions[0];

  useEffect(() => {
    setImageIndex(0);
    setShowImageAnswer(false);
  }, [imageChapterFilter]);

  // ================= Part 4 State (Exam 2 Drill) =================
  const [exam2CategoryFilter, setExam2CategoryFilter] = useState<Exam2Category | "ALL">("ALL");
  const [exam2Index, setExam2Index] = useState<number>(0);
  const [showExam2Answer, setShowExam2Answer] = useState<boolean>(false);

  const filteredExam2Questions = useMemo(() => {
    if (exam2CategoryFilter === "ALL") return EXAM_2_QUESTIONS_POOL;
    return EXAM_2_QUESTIONS_POOL.filter((q) => q.category === exam2CategoryFilter);
  }, [exam2CategoryFilter]);

  const currentExam2DrillQ: Exam2Question | undefined =
    filteredExam2Questions[exam2Index] || filteredExam2Questions[0];

  useEffect(() => {
    setExam2Index(0);
    setShowExam2Answer(false);
  }, [exam2CategoryFilter]);

  const handleNextExam2Q = () => {
    if (filteredExam2Questions.length === 0) return;
    setExam2Index((prev) => (prev + 1) % filteredExam2Questions.length);
    setShowExam2Answer(false);
    setFeedback(null);
    setCurrentInput("");
  };

  const handlePrevExam2Q = () => {
    if (filteredExam2Questions.length === 0) return;
    setExam2Index((prev) => (prev - 1 + filteredExam2Questions.length) % filteredExam2Questions.length);
    setShowExam2Answer(false);
    setFeedback(null);
    setCurrentInput("");
  };

  const handleShuffleExam2Q = () => {
    if (filteredExam2Questions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredExam2Questions.length);
    setExam2Index(randomIndex);
    setShowExam2Answer(false);
    setFeedback(null);
    setCurrentInput("");
  };

  // ================= Speech & Input =================
  const [currentInput, setCurrentInput] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [speechStatus, setSpeechStatus] = useState<string>("");
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    return () => {
      stopSpeech();
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, []);

  const handleShuffleVocab = () => {
    if (filteredVocabList.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredVocabList.length);
    setVocabIndex(randomIndex);
    setShowVocabAnswer(false);
    setFeedback(null);
    setCurrentInput("");
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
        setSpeechStatus("กำลังฟังเสียง... พูดเป็นภาษาญี่ปุ่นได้เลย");
        setFeedback(null);
      },
      onResult: (transcript, isFinal) => {
        setCurrentInput(transcript);
        if (isFinal) {
          evaluateInput(transcript);
        }
      },
      onError: (err: string) => {
        console.warn("Speech recognition error:", err);
        setIsRecording(false);
        setSpeechStatus(`เกิดข้อผิดพลาด (${err}) แนะนำให้พิมพ์ตรวจคำตอบ`);
      },
      onEnd: () => {
        setIsRecording(false);
        setSpeechStatus("บันทึกเสียงเรียบร้อย");
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

  const getExpectedTargets = (): string[] => {
    if (activePart === 1 && currentLine) {
      let expectedJa = currentLine.ja;
      let expectedRomaji = currentLine.romaji;
      if (selectedChapterP1 === 1 && p1Step === 1) {
        const name = userConfig.studentNameJa && !userConfig.studentNameJa.includes("ชื่อ")
          ? userConfig.studentNameJa
          : "たなか";
        expectedJa = `わたしは ${name} です`;
        expectedRomaji = `Watashi wa ${name} desu`;
      } else if (selectedChapterP1 === 1 && p1Step === 3) {
        const resolvedHobby = resolveHobby(userConfig.selectedHobby);
        expectedJa = `しゅみは ${resolvedHobby.ja} です`;
        expectedRomaji = `Shumi wa ${resolvedHobby.romaji} desu`;
      }
      return [
        expectedJa,
        expectedRomaji,
        currentLine.key,
        currentLine.ja,
        currentLine.romaji,
        ...currentLine.expectedKeywords,
      ];
    } else if (activePart === 2 && filteredVocabList[vocabIndex]) {
      const current = filteredVocabList[vocabIndex];
      return [
        current.ja,
        current.romaji,
        ...(current.altJa ? [current.altJa] : []),
        ...(current.altRomaji || []),
      ];
    } else if (activePart === 3 && currentImageQ) {
      return [
        currentImageQ.expectedAnswerJa,
        currentImageQ.expectedAnswerRomaji,
        ...currentImageQ.keywords,
      ];
    } else if (activePart === 4 && currentExam2DrillQ) {
      return [
        currentExam2DrillQ.expectedAnswerJa,
        currentExam2DrillQ.expectedAnswerRomaji,
        ...currentExam2DrillQ.keywords,
      ];
    }
    return [];
  };

  const expectedTargets = getExpectedTargets();
  const confidence = currentInput.trim() ? calculateConfidence(currentInput, expectedTargets) : null;

  const evaluateInput = (text: string) => {
    const cleaned = text.trim();
    if (!cleaned) return;

    if (activePart === 1 && currentLine) {
      const targets = getExpectedTargets();
      const match = calculateConfidence(cleaned, targets);

      if (match.scorePercent >= 65 || match.isMatch) {
        setFeedback({
          isCorrect: true,
          message: `ถูกต้อง! (ความแม่นยำ ${match.scorePercent}%) โครงสร้างและการออกเสียงผ่านเกณฑ์`,
        });
      } else {
        setFeedback({
          isCorrect: false,
          message: `ยังไม่ตรง (ความแม่นยำ ${match.scorePercent}%): ให้พูดว่า "${currentLine.ja}" (${currentLine.romaji})`,
        });
      }
    } else if (activePart === 2 && filteredVocabList[vocabIndex]) {
      const current = filteredVocabList[vocabIndex];
      const targets = [
        current.ja,
        current.romaji,
        ...(current.altJa ? [current.altJa] : []),
        ...(current.altRomaji || []),
      ];
      const match = calculateConfidence(cleaned, targets);

      if (match.scorePercent >= 70 || match.isMatch) {
        setFeedback({
          isCorrect: true,
          message: `ถูกต้อง! (ความแม่นยำ ${match.scorePercent}%) ${current.ja} (${current.romaji})`,
        });
      } else {
        setFeedback({
          isCorrect: false,
          message: `ยังไม่ตรง (ความแม่นยำ ${match.scorePercent}%) เฉลยคือ: ${current.ja} (${current.romaji})`,
        });
      }
    } else if (activePart === 3 && currentImageQ) {
      const targets = [
        currentImageQ.expectedAnswerJa,
        currentImageQ.expectedAnswerRomaji,
        ...currentImageQ.keywords,
      ];
      const match = calculateConfidence(cleaned, targets);
      const hasKeywords =
        currentImageQ.keywords.some((k) => cleaned.toLowerCase().includes(k.toLowerCase())) ||
        match.scorePercent >= 65;

      if (hasKeywords) {
        setFeedback({
          isCorrect: true,
          message: `ตอบได้ดีมาก! (ความแม่นยำ ${match.scorePercent}%) ประโยคสมบูรณ์: ${currentImageQ.expectedAnswerJa}`,
        });
      } else {
        setFeedback({
          isCorrect: false,
          message: `ยังไม่สมบูรณ์ (ความแม่นยำ ${match.scorePercent}%) ควรถามตอบเต็มประโยค: "${currentImageQ.expectedAnswerJa}"`,
        });
      }
    } else if (activePart === 4 && currentExam2DrillQ) {
      const targets = [
        currentExam2DrillQ.expectedAnswerJa,
        currentExam2DrillQ.expectedAnswerRomaji,
        ...currentExam2DrillQ.keywords,
      ];
      const match = calculateConfidence(cleaned, targets);
      const hasKeywords =
        currentExam2DrillQ.keywords.some((k) => cleaned.toLowerCase().includes(k.toLowerCase())) ||
        match.scorePercent >= 65;

      if (hasKeywords) {
        setFeedback({
          isCorrect: true,
          message: `ตอบได้ดีมาก! (ความแม่นยำ ${match.scorePercent}%) ประโยคสมบูรณ์: "${currentExam2DrillQ.expectedAnswerJa}"`,
        });
      } else {
        setFeedback({
          isCorrect: false,
          message: `ยังไม่สมบูรณ์ (ความแม่นยำ ${match.scorePercent}%) รูปประโยคที่ถูกต้อง: "${currentExam2DrillQ.expectedAnswerJa}" (${currentExam2DrillQ.expectedAnswerRomaji})`,
        });
      }
    }
  };

  // Keyboard Shortcuts: Space to toggle mic, Enter to evaluate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      if (e.code === "Space" && !isInput) {
        e.preventDefault();
        toggleRecording();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentInput.trim()) {
          evaluateInput(currentInput);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRecording, currentInput, activePart, p1Step, vocabIndex, imageIndex, exam2Index]);

  return (
    <div className="space-y-3.5 pb-28 sm:pb-32 max-w-2xl mx-auto">
      {/* Sub-Header Navigation (Segmented 4 Tabs) */}
      <div className="manga-box-sm p-1 sm:p-1.5 bg-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-1 shadow-[2px_2px_0px_#0f172a]">
        <button
          onClick={() => {
            setActivePart(1);
            setFeedback(null);
            setCurrentInput("");
          }}
          className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-black transition flex items-center justify-center space-x-1 min-w-0 ${
            activePart === 1
              ? "bg-rose-500 text-white shadow-[1px_1px_0px_#0f172a]"
              : "text-slate-700 hover:text-slate-900"
          }`}
        >
          <Icon name="record_voice_over" className="text-sm sm:text-base shrink-0" />
          <span className="truncate">1. บทสนทนา</span>
        </button>

        <button
          onClick={() => {
            setActivePart(2);
            setFeedback(null);
            setCurrentInput("");
          }}
          className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-black transition flex items-center justify-center space-x-1 min-w-0 ${
            activePart === 2
              ? "bg-blue-500 text-white shadow-[1px_1px_0px_#0f172a]"
              : "text-slate-700 hover:text-slate-900"
          }`}
        >
          <Icon name="translate" className="text-sm sm:text-base shrink-0" />
          <span className="truncate">2. คำศัพท์</span>
        </button>

        <button
          onClick={() => {
            setActivePart(3);
            setFeedback(null);
            setCurrentInput("");
          }}
          className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-black transition flex items-center justify-center space-x-1 min-w-0 ${
            activePart === 3
              ? "bg-emerald-500 text-white shadow-[1px_1px_0px_#0f172a]"
              : "text-slate-700 hover:text-slate-900"
          }`}
        >
          <Icon name="image" className="text-sm sm:text-base shrink-0" />
          <span className="truncate">3. ภาพสถานการณ์</span>
        </button>

        <button
          onClick={() => {
            setActivePart(4);
            setFeedback(null);
            setCurrentInput("");
          }}
          className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-black transition flex items-center justify-center space-x-1 min-w-0 ${
            activePart === 4
              ? "bg-amber-400 text-slate-900 shadow-[1px_1px_0px_#0f172a]"
              : "text-slate-700 hover:text-slate-900"
          }`}
        >
          <Icon name="quiz" className="text-sm sm:text-base shrink-0" />
          <span className="truncate">4. ตะลุยโจทย์สอบ 2</span>
        </button>
      </div>

      {/* ================= PART 1 DRILL: INTERACTIVE CHAT TIMELINE ================= */}
      {activePart === 1 && (
        <div className="manga-box p-3.5 sm:p-5 space-y-3.5 text-center shadow-[3px_3px_0px_#0f172a]">
          {/* Chapter Selector (Scrollable Pill Chips) */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1 text-left">
            <span className="text-[11px] font-black text-slate-700 shrink-0">บทเรียน:</span>
            {CHAPTER_DIALOGUES.map((cd) => (
              <button
                key={cd.chapter}
                onClick={() => {
                  setSelectedChapterP1(cd.chapter);
                  setP1Step(0);
                  setFeedback(null);
                  setCurrentInput("");
                }}
                className={`py-1 px-2.5 rounded-xl text-xs font-black shrink-0 transition ${
                  selectedChapterP1 === cd.chapter
                    ? "bg-rose-500 text-white shadow-[1px_1px_0px_#0f172a]"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-slate-900"
                }`}
              >
                บทที่ {cd.chapter}
              </button>
            ))}
          </div>

          {/* Dialogue Header & Situation */}
          <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 text-left space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-black text-rose-900">
                {currentDialogue.titleTh} ({currentDialogue.titleJa})
              </h4>
              <span className="manga-badge bg-rose-500 text-white text-[10px]">
                {currentDialogue.lines.length} ประโยค
              </span>
            </div>
            <p className="text-[11px] text-rose-800 font-medium leading-relaxed flex items-center space-x-1">
              <Icon name="push_pin" className="text-xs text-rose-600 shrink-0" />
              <span>{currentDialogue.situationTh}</span>
            </p>
          </div>

          {/* Interactive Chat Timeline */}
          <div className="space-y-2.5 text-left max-h-[360px] overflow-y-auto pr-1">
            {currentDialogue.lines.map((line, idx) => {
              const isActive = p1Step === idx;
              const isStudent = line.speaker === "Student" || line.speaker === "B";

              let lineJa = line.ja;
              let lineRomaji = line.romaji;
              if (selectedChapterP1 === 1 && idx === 1) {
                const name = userConfig.studentNameJa && !userConfig.studentNameJa.includes("ชื่อ")
                  ? userConfig.studentNameJa
                  : "たなか";
                lineJa = `わたしは ${name} です`;
                lineRomaji = `Watashi wa ${name} desu`;
              } else if (selectedChapterP1 === 1 && idx === 3) {
                const resolvedHobby = resolveHobby(userConfig.selectedHobby);
                lineJa = `しゅみは ${resolvedHobby.ja} です`;
                lineRomaji = `Shumi wa ${resolvedHobby.romaji} desu`;
              }

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setP1Step(idx);
                    setFeedback(null);
                    setCurrentInput("");
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-white border-slate-900 shadow-[3px_3px_0px_#0f172a] ring-2 ring-rose-400"
                      : isStudent
                      ? "bg-sky-50/70 border-slate-300 hover:border-slate-800"
                      : "bg-slate-50 border-slate-300 hover:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
                          isStudent
                            ? "bg-sky-200 border-sky-900 text-sky-900"
                            : "bg-amber-200 border-amber-900 text-amber-900"
                        }`}
                      >
                        {line.speakerNameJa} ({line.speakerNameTh})
                      </span>
                      {isActive && (
                        <span className="manga-badge bg-rose-500 text-white text-[9px]">
                          กำลังซ้อมสเต็ปนี้
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {line.moraCount && (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-300 flex items-center space-x-1">
                          <Icon name="crisis_alert" className="text-xs shrink-0" />
                          <span>{line.moraCount} พยางค์ (≥5)</span>
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWithSeiyuuVoice(
                            lineJa,
                            userConfig.seiyuuVoice,
                            userConfig.speechRate,
                            "ja-JP"
                          );
                        }}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-400 flex items-center justify-center hover:bg-slate-100 text-rose-600"
                      >
                        <Icon name="volume_up" className="text-sm" />
                      </button>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg font-black text-slate-900 font-jp leading-snug">
                    {lineJa}
                  </p>

                  {userConfig.showRomaji && (
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {lineRomaji}
                    </p>
                  )}

                  {userConfig.showThaiHints && (
                    <p className="text-xs text-slate-600 mt-0.5">
                      ({selectedChapterP1 === 1 && idx === 3
                        ? `งานอดิเรกคือ ${resolveHobby(userConfig.selectedHobby).th}`
                        : line.th})
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-200">
            <button
              onClick={() => {
                setP1Step((prev) => Math.max(0, prev - 1));
                setFeedback(null);
                setCurrentInput("");
              }}
              disabled={p1Step === 0}
              className="manga-btn px-3 py-1.5 rounded-xl bg-white text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <Icon name="arrow_back" className="text-sm" />
              <span>ก่อนหน้า</span>
            </button>

            <div className="flex space-x-1">
              {currentDialogue.lines.map((_, s) => (
                <button
                  key={s}
                  onClick={() => {
                    setP1Step(s);
                    setFeedback(null);
                    setCurrentInput("");
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-black border-2 border-slate-900 transition ${
                    p1Step === s
                      ? "bg-rose-500 text-white shadow-[1px_1px_0px_#0f172a]"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {s + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setP1Step((prev) => Math.min(currentDialogue.lines.length - 1, prev + 1));
                setFeedback(null);
                setCurrentInput("");
              }}
              disabled={p1Step === currentDialogue.lines.length - 1}
              className="manga-btn px-3 py-1.5 rounded-xl bg-white text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <span>ถัดไป</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* ================= PART 2 DRILL: VOCABULARY DUAL VIEW ================= */}
      {activePart === 2 && (
        <div className="manga-box p-3.5 sm:p-5 space-y-3 text-center shadow-[3px_3px_0px_#0f172a]">
          {/* Chapter Chips (Horizontal Scrollable) */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-0.5 text-left">
            <span className="text-[11px] font-black text-slate-700 shrink-0">บท:</span>
            {(["ALL", 1, 2, 3, 4, 5, 6] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => {
                  setChapterFilter(ch);
                  setCategoryFilter("ALL");
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-black shrink-0 transition ${
                  chapterFilter === ch
                    ? "bg-slate-900 text-white shadow-[1px_1px_0px_#0f172a]"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-slate-900"
                }`}
              >
                {ch === "ALL" ? "ทุกบท (1-6)" : `บทที่ ${ch}`}
              </button>
            ))}
          </div>

          {/* Search, Category, & View Toggle Row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-left">
            {/* Search Input */}
            <div className="relative sm:col-span-6">
              <input
                type="text"
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                placeholder="ค้นหาคำศัพท์ ไทย / 日本語 / Romaji..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl border-2 border-slate-900 bg-white text-xs font-semibold focus:outline-none"
              />
              <Icon
                name="search"
                className="absolute left-2.5 top-2 text-sm text-slate-400"
              />
              {vocabSearch && (
                <button
                  onClick={() => setVocabSearch("")}
                  className="absolute right-2 top-2 text-xs font-bold text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Select */}
            <div className="sm:col-span-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border-2 border-slate-900 bg-white text-xs font-bold text-slate-800 focus:outline-none"
              >
                {availableCategories.map((c) => (
                  <option key={c} value={c}>
                    {c === "ALL" ? "ทุกหมวดหมู่ (All Categories)" : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode & Shuffle Button */}
            <div className="flex items-center space-x-1.5 sm:col-span-2 justify-end">
              <button
                onClick={() => setVocabViewMode(vocabViewMode === "CARD" ? "LIST" : "CARD")}
                title={vocabViewMode === "CARD" ? "สลับไปดูตารางรายการ" : "สลับไปโหมดการ์ดท่องจำ"}
                className="manga-btn p-1.5 rounded-xl bg-white text-slate-900 text-xs flex items-center"
              >
                <Icon name={vocabViewMode === "CARD" ? "list" : "view_carousel"} className="text-base" />
              </button>

              <button
                onClick={handleShuffleVocab}
                title="สุ่มคำศัพท์"
                className="manga-btn p-1.5 rounded-xl bg-amber-400 text-slate-900 text-xs flex items-center"
              >
                <Icon name="shuffle" className="text-base" />
              </button>
            </div>
          </div>

          {/* View 1: Flashcard Mode */}
          {vocabViewMode === "CARD" && (
            <>
              {filteredVocabList.length > 0 && filteredVocabList[vocabIndex] ? (
                <div className="p-4 sm:p-6 rounded-2xl bg-white border-2 border-slate-900 space-y-3 shadow-[2px_2px_0px_#0f172a]">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="manga-badge bg-blue-500 text-white text-[10px]">
                      บทที่ {filteredVocabList[vocabIndex].chapter} • {filteredVocabList[vocabIndex].category}
                    </span>
                    <span className="font-mono text-slate-600 font-bold">
                      {vocabIndex + 1} / {filteredVocabList.length}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 break-words py-1">
                    {filteredVocabList[vocabIndex].th}
                  </h3>

                  {showVocabAnswer ? (
                    <div className="space-y-1.5 pt-1 animate-in fade-in duration-150">
                      <p className="text-2xl sm:text-3xl font-black text-rose-600 font-jp">
                        {filteredVocabList[vocabIndex].ja}
                      </p>
                      {userConfig.showRomaji && (
                        <p className="text-xs font-mono text-slate-500">
                          {filteredVocabList[vocabIndex].romaji}
                        </p>
                      )}
                      <button
                        onClick={() =>
                          speakWithSeiyuuVoice(
                            filteredVocabList[vocabIndex].ja,
                            userConfig.seiyuuVoice,
                            userConfig.speechRate,
                            "ja-JP"
                          )
                        }
                        className="manga-btn mt-2 inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-slate-50 text-slate-900 text-xs border border-slate-300"
                      >
                        <Icon name="volume_up" className="text-sm text-rose-600" />
                        <span>ฟังเสียงอ่าน ({examiner.characterNameJa})</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowVocabAnswer(true)}
                      className="manga-btn inline-flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs"
                    >
                      <Icon name="visibility" className="text-sm" />
                      <span>แตะเพื่อดูเฉลยคำศัพท์</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="p-8 bg-slate-100 rounded-2xl border-2 border-slate-900 text-center text-slate-500 text-xs font-bold">
                  ไม่พบคำศัพท์ที่ตรงกับเงื่อนไขการค้นหา
                </div>
              )}

              {/* Vocab Nav */}
              {filteredVocabList.length > 0 && (
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      setVocabIndex((prev) => Math.max(0, prev - 1));
                      setShowVocabAnswer(false);
                      setFeedback(null);
                      setCurrentInput("");
                    }}
                    disabled={vocabIndex === 0}
                    className="manga-btn px-3 py-1.5 rounded-xl bg-white text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    <Icon name="arrow_back" className="text-sm" />
                    <span>ก่อนหน้า</span>
                  </button>

                  <button
                    onClick={() => setShowVocabAnswer(!showVocabAnswer)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    {showVocabAnswer ? "ซ่อนเฉลย" : "แสดงเฉลย"}
                  </button>

                  <button
                    onClick={() => {
                      setVocabIndex((prev) => Math.min(filteredVocabList.length - 1, prev + 1));
                      setShowVocabAnswer(false);
                      setFeedback(null);
                      setCurrentInput("");
                    }}
                    disabled={vocabIndex === filteredVocabList.length - 1}
                    className="manga-btn px-3 py-1.5 rounded-xl bg-white text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    <span>ถัดไป</span>
                    <Icon name="arrow_forward" className="text-sm" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* View 2: List / Grid Overview Mode */}
          {vocabViewMode === "LIST" && (
            <div className="max-h-[380px] overflow-y-auto pr-1 space-y-2 text-left">
              {filteredVocabList.map((v, idx) => (
                <div
                  key={v.id}
                  className="p-2.5 rounded-xl bg-white border border-slate-300 hover:border-slate-900 flex items-center justify-between gap-2 transition"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-slate-100 border border-slate-300 text-slate-700">
                        บท {v.chapter}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold truncate">
                        {v.category}
                      </span>
                    </div>
                    <p className="text-xs font-black text-slate-900 truncate mt-0.5">
                      {v.th}
                    </p>
                    <p className="text-sm font-black text-rose-600 font-jp truncate">
                      {v.ja} <span className="text-[10px] font-mono text-slate-400 font-normal">({v.romaji})</span>
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      speakWithSeiyuuVoice(
                        v.ja,
                        userConfig.seiyuuVoice,
                        userConfig.speechRate,
                        "ja-JP"
                      )
                    }
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-400 flex items-center justify-center text-rose-600 shrink-0"
                  >
                    <Icon name="volume_up" className="text-base" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= PART 3 DRILL: SITUATIONAL SVG Q&A ================= */}
      {activePart === 3 && currentImageQ && (
        <div className="manga-box p-3.5 sm:p-5 space-y-3.5 text-center shadow-[3px_3px_0px_#0f172a]">
          {/* Chapter Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-0.5 text-left">
            <span className="text-[11px] font-black text-slate-700 shrink-0">กรองบท:</span>
            {(["ALL", 1, 2, 3, 4, 5, 6] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setImageChapterFilter(ch)}
                className={`px-2.5 py-1 rounded-xl text-xs font-black shrink-0 transition ${
                  imageChapterFilter === ch
                    ? "bg-emerald-600 text-white shadow-[1px_1px_0px_#0f172a]"
                    : "bg-white text-slate-700 border border-slate-300 hover:border-slate-900"
                }`}
              >
                {ch === "ALL" ? "ทุกบท (1-6)" : `บทที่ ${ch}`}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="manga-badge bg-emerald-500 text-white text-[10px]">
              บทที่ {currentImageQ.chapter} • ภาพที่ {imageIndex + 1} / {filteredImageQuestions.length}
            </span>
            <span className="text-xs font-bold text-slate-700">
              {currentImageQ.title}
            </span>
          </div>

          {/* Manga Image Frame - 4:3 Aspect Ratio */}
          <div className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] aspect-[4/3] mx-auto rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] overflow-hidden bg-slate-100 flex items-center justify-center">
            <SvgImage
              svgContent={currentImageQ.imageSvg}
              imageUrl={currentImageQ.imageUrl}
              alt={currentImageQ.title}
              fit={currentImageQ.fit || "cover"}
              position={currentImageQ.position || "center"}
              className="w-full h-full"
            />
          </div>

          {/* Question Speech Bubble */}
          <div className="speech-bubble p-3.5 text-left bg-emerald-50/70 border-2 border-emerald-900">
            <div className="flex items-center justify-between mb-1 pb-1 border-b border-emerald-200">
              <div className="flex items-center space-x-1.5">
                <Icon name={examiner.avatarIcon} className="text-base text-emerald-800" />
                <span className="text-[11px] font-black text-slate-900">
                  อาจารย์ AI ({examiner.characterNameJa})
                </span>
              </div>
              <button
                onClick={() =>
                  speakWithSeiyuuVoice(
                    currentImageQ.questionJa,
                    userConfig.seiyuuVoice,
                    userConfig.speechRate,
                    "ja-JP"
                  )
                }
                className="inline-flex items-center space-x-1 text-xs text-rose-600 font-bold hover:underline"
              >
                <Icon name="volume_up" className="text-sm" />
                <span>ฟังเสียง</span>
              </button>
            </div>

            <h4 className="text-base font-extrabold text-slate-900 font-jp">
              {currentImageQ.questionJa}
            </h4>
            {userConfig.showRomaji && (
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                {currentImageQ.questionRomaji}
              </p>
            )}
            {userConfig.showThaiHints && (
              <p className="text-xs text-slate-600 mt-1">
                ({currentImageQ.questionTh})
              </p>
            )}

            <button
              onClick={() => setShowImageAnswer(!showImageAnswer)}
              className="manga-btn mt-2.5 px-3 py-1 bg-white text-[11px] rounded-xl flex items-center space-x-1"
            >
              <Icon name={showImageAnswer ? "visibility_off" : "visibility"} className="text-sm" />
              <span>{showImageAnswer ? "ซ่อนแนวคำตอบเต็ม" : "ดูแนวคำตอบประโยคเต็ม"}</span>
            </button>

            {showImageAnswer && (
              <div className="mt-2.5 p-3 bg-white border-2 border-slate-900 rounded-xl animate-in fade-in duration-150">
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  ประโยคสมบูรณ์ (Full Sentence):
                </p>
                <p className="text-sm font-black text-emerald-800 font-jp mt-0.5">
                  {currentImageQ.expectedAnswerJa}
                </p>
                {userConfig.showRomaji && (
                  <p className="text-xs font-mono text-slate-500">
                    {currentImageQ.expectedAnswerRomaji}
                  </p>
                )}
                <p className="text-[10px] text-slate-600 mt-1 font-medium flex items-center space-x-1">
                  <Icon name="lightbulb" className="text-xs text-amber-500 shrink-0" />
                  <span>{currentImageQ.note}</span>
                </p>
              </div>
            )}
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                setImageIndex((prev) => Math.max(0, prev - 1));
                setShowImageAnswer(false);
                setFeedback(null);
                setCurrentInput("");
              }}
              disabled={imageIndex === 0}
              className="manga-btn px-3 py-1.5 rounded-xl bg-white text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <Icon name="arrow_back" className="text-sm" />
              <span>ก่อนหน้า</span>
            </button>

            <button
              onClick={() => {
                setImageIndex((prev) => Math.min(filteredImageQuestions.length - 1, prev + 1));
                setShowImageAnswer(false);
                setFeedback(null);
                setCurrentInput("");
              }}
              disabled={imageIndex === filteredImageQuestions.length - 1}
              className="manga-btn px-3 py-1.5 rounded-xl bg-white text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <span>ถัดไป</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* ================= PART 4 DRILL: EXAM 2 SPECIFIC QUESTIONS (5 CATEGORIES) ================= */}
      {activePart === 4 && currentExam2DrillQ && (
        <div className="manga-box p-3.5 sm:p-5 space-y-3.5 text-center shadow-[3px_3px_0px_#0f172a]">
          {/* Header & Category Filter Buttons */}
          <div className="space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                <Icon name="quiz" className="text-sm text-amber-600" />
                <span>หมวดคำถามข้อสอบครั้งที่ 2 (5 รูปแบบตามประกาศ):</span>
              </span>
              <button
                onClick={handleShuffleExam2Q}
                className="text-[10px] font-black text-rose-600 hover:text-rose-700 inline-flex items-center space-x-0.5"
              >
                <Icon name="shuffle" className="text-xs" />
                <span>สุ่มคำถาม</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setExam2CategoryFilter("ALL")}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-black border border-slate-900 shrink-0 transition ${
                  exam2CategoryFilter === "ALL"
                    ? "bg-slate-900 text-white shadow-[1px_1px_0px_#0f172a]"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                ทั้งหมด ({EXAM_2_QUESTIONS_POOL.length})
              </button>
              {EXAM_2_CATEGORIES.map((cat) => {
                const isSelected = exam2CategoryFilter === cat.category;
                const catCount = EXAM_2_QUESTIONS_POOL.filter((q) => q.category === cat.category).length;
                const catIcon =
                  cat.category === "PLACE"
                    ? "location_on"
                    : cat.category === "TIME"
                    ? "schedule"
                    : cat.category === "PHONE"
                    ? "call"
                    : cat.category === "PRICE"
                    ? "payments"
                    : "storefront";

                return (
                  <button
                    key={cat.category}
                    onClick={() => setExam2CategoryFilter(cat.category)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black border border-slate-900 shrink-0 transition flex items-center space-x-1 ${
                      isSelected
                        ? "bg-amber-400 text-slate-900 shadow-[1px_1px_0px_#0f172a]"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon name={catIcon} className="text-xs" />
                    <span>{cat.titleTh.split(":")[0]} ({catCount})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card Header */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-1">
            <span className="manga-badge bg-sky-500 text-white text-[10px] flex items-center space-x-1">
              <Icon
                name={
                  currentExam2DrillQ.category === "PLACE"
                    ? "location_on"
                    : currentExam2DrillQ.category === "TIME"
                    ? "schedule"
                    : currentExam2DrillQ.category === "PHONE"
                    ? "call"
                    : currentExam2DrillQ.category === "PRICE"
                    ? "payments"
                    : "storefront"
                }
                className="text-xs"
              />
              <span>{currentExam2DrillQ.categoryTitleTh}</span>
            </span>
            <span className="text-xs font-bold text-slate-700">
              ข้อ {exam2Index + 1} / {filteredExam2Questions.length}
            </span>
          </div>

          {/* Visual Display Frame */}
          <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] aspect-[4/3] mx-auto rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] overflow-hidden bg-slate-100 flex items-center justify-center relative">
            <SvgImage
              svgContent={currentExam2DrillQ.imageSvg}
              alt={currentExam2DrillQ.categoryTitleTh}
              fit="contain"
              position="center"
              className="w-full h-full p-2"
            />
            {currentExam2DrillQ.displayValue && (
              <div className="absolute bottom-2 bg-slate-900/90 text-white text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-xl border border-slate-700 shadow-md">
                {currentExam2DrillQ.displayValue}
              </div>
            )}
          </div>

          {/* Examiner Question Bubble */}
          <div className="speech-bubble p-3.5 text-left bg-sky-50/70 border-2 border-sky-900">
            <div className="flex items-center justify-between mb-1 pb-1 border-b border-sky-200">
              <div className="flex items-center space-x-1.5">
                <Icon name={examiner.avatarIcon} className="text-base text-sky-800" />
                <span className="text-[11px] font-black text-slate-900">
                  อาจารย์ AI ({examiner.characterNameJa})
                </span>
              </div>
              <button
                onClick={() =>
                  speakWithSeiyuuVoice(
                    currentExam2DrillQ.questionJa,
                    userConfig.seiyuuVoice,
                    userConfig.speechRate,
                    "ja-JP"
                  )
                }
                className="inline-flex items-center space-x-1 text-xs text-rose-600 font-bold hover:underline"
              >
                <Icon name="volume_up" className="text-sm" />
                <span>ฟังเสียงคำถาม</span>
              </button>
            </div>

            <h4 className="text-base font-extrabold text-slate-900 font-jp">
              {currentExam2DrillQ.questionJa}
            </h4>
            {userConfig.showRomaji && (
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                {currentExam2DrillQ.questionRomaji}
              </p>
            )}

            {/* Official Rule Note from PDF */}
            <div className="mt-2 p-2 rounded-xl bg-amber-50 border border-amber-300 text-left flex items-start space-x-1.5 text-slate-800">
              <Icon name="info" className="text-sm text-amber-700 shrink-0 mt-0.5" />
              <div className="text-[11px] font-bold leading-snug">
                <span className="text-amber-900 font-black">เกณฑ์สอบจริง: </span>
                {currentExam2DrillQ.ruleNoteTh}
              </div>
            </div>

            {/* Toggle Answer Button */}
            <button
              onClick={() => setShowExam2Answer(!showExam2Answer)}
              className="manga-btn mt-2.5 px-3 py-1 bg-white text-[11px] rounded-xl flex items-center space-x-1"
            >
              <Icon name={showExam2Answer ? "visibility_off" : "visibility"} className="text-sm" />
              <span>{showExam2Answer ? "ซ่อนเฉลยแนวคำตอบ" : "ดูเฉลยแนวคำตอบตามเกณฑ์"}</span>
            </button>

            {/* Revealed Answer Box */}
            {showExam2Answer && (
              <div className="mt-2.5 p-3 bg-white border-2 border-slate-900 rounded-xl animate-in fade-in duration-150 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    คำตอบที่ถูกต้อง (Model Answer):
                  </span>
                  <button
                    onClick={() => speak(currentExam2DrillQ.expectedAnswerJa, userConfig.speechRate, "ja-JP")}
                    className="inline-flex items-center space-x-1 text-xs text-emerald-700 font-bold hover:underline"
                  >
                    <Icon name="volume_up" className="text-xs" />
                    <span>ฟังคำตอบเฉลย</span>
                  </button>
                </div>
                <p className="text-base font-black text-emerald-800 font-jp">
                  {currentExam2DrillQ.expectedAnswerJa}
                </p>
                {userConfig.showRomaji && (
                  <p className="text-xs font-mono text-slate-500 mt-0.5">
                    {currentExam2DrillQ.expectedAnswerRomaji}
                  </p>
                )}
                <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-1 items-center">
                  <span className="text-[10px] font-bold text-slate-500">คีย์เวิร์ดตรวจให้คะแนน:</span>
                  {currentExam2DrillQ.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono text-slate-700">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handlePrevExam2Q}
              disabled={exam2Index === 0}
              className="manga-btn px-3 py-1.5 rounded-xl bg-white text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <Icon name="arrow_back" className="text-sm" />
              <span>ก่อนหน้า</span>
            </button>

            <button
              onClick={handleShuffleExam2Q}
              className="manga-btn px-3 py-1.5 rounded-xl bg-slate-100 text-xs flex items-center space-x-1"
            >
              <Icon name="shuffle" className="text-xs text-slate-700" />
              <span>สุ่มข้อ</span>
            </button>

            <button
              onClick={handleNextExam2Q}
              disabled={exam2Index === filteredExam2Questions.length - 1}
              className="manga-btn px-3 py-1.5 rounded-xl bg-white text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <span>ถัดไป</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* Input Box for Speaking Practice */}
      <div className="manga-box p-3 sm:p-4 text-left shadow-[2px_2px_0px_#0f172a]">
        <div className="flex items-center justify-between mb-1">
          <label className="block text-[11px] font-bold text-slate-700">
            คำตอบของคุณ (กดปุ่มไมค์ด้านล่างเพื่อพูด หรือพิมพ์ตอบ):
          </label>
          {isInputFocused && (
            <button
              type="button"
              onClick={() => {
                setIsInputFocused(false);
                (document.activeElement as HTMLElement)?.blur();
              }}
              className="text-[10px] font-black text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-300 flex items-center space-x-0.5"
            >
              <span>✕ เสร็จสิ้น</span>
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
          placeholder="พูดคำตอบภาษาญี่ปุ่น หรือพิมพ์ที่นี่..."
          className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border-2 border-slate-900 text-xs font-semibold focus:outline-none focus:bg-white bg-slate-50 font-jp"
        />
        {speechStatus && (
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            {speechStatus}
          </p>
        )}

        {/* Real-time Confidence Meter (Mathematical Matching) */}
        {confidence && (
          <div className="mt-2.5 p-2.5 rounded-xl border-2 border-slate-900 bg-white shadow-[2px_2px_0px_#0f172a] animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs font-black mb-1.5">
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] uppercase font-mono text-slate-500">
                  Phonetic Match:
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-black flex items-center space-x-1 ${
                    confidence.rating === "EXCELLENT"
                      ? "bg-emerald-500 text-white"
                      : confidence.rating === "GOOD"
                      ? "bg-amber-400 text-slate-900"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  <Icon
                    name={
                      confidence.rating === "EXCELLENT"
                        ? "verified"
                        : confidence.rating === "GOOD"
                        ? "thumb_up"
                        : "error_outline"
                    }
                    className="text-xs"
                  />
                  <span>
                    {confidence.rating === "EXCELLENT"
                      ? "ยอดเยี่ยม (ตรงเป๊ะ)"
                      : confidence.rating === "GOOD"
                      ? "ผ่านเกณฑ์ (ฟังเข้าใจ)"
                      : "ยังไม่ตรงเกณฑ์"}
                  </span>
                </span>
              </div>
              <span className="font-mono font-black text-slate-900">
                {confidence.scorePercent}%
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-200 border border-slate-900 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  confidence.scorePercent >= 75
                    ? "bg-emerald-500"
                    : confidence.scorePercent >= 50
                    ? "bg-amber-400"
                    : "bg-rose-500"
                }`}
                style={{
                  width: `${Math.min(100, Math.max(5, confidence.scorePercent))}%`,
                }}
              />
            </div>

            {confidence.scorePercent < 75 && confidence.bestTarget && (
              <p className="text-[10px] text-slate-500 mt-1.5 font-medium truncate">
                เป้าหมาย: <span className="font-jp text-slate-900 font-bold">{confidence.bestTarget}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`manga-box-sm p-3 flex items-start space-x-2 text-left animate-in fade-in duration-150 ${
            feedback.isCorrect ? "bg-emerald-100" : "bg-rose-100"
          }`}
        >
          <Icon
            name={feedback.isCorrect ? "check_circle" : "cancel"}
            className={`text-xl shrink-0 mt-0.5 ${
              feedback.isCorrect ? "text-emerald-700" : "text-rose-700"
            }`}
            filled
          />
          <p className="text-xs font-bold text-slate-900 leading-tight">
            {feedback.message}
          </p>
        </div>
      )}

      {/* Compact Floating Bottom Action Bar */}
      <div className="manga-floating-bar fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-4 py-2 sm:py-2.5 pb-[max(0.75rem,calc(env(safe-area-inset-bottom)+0.5rem))]">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-2.5">
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
              {isRecording ? "กำลังฟัง... (แตะหยุด)" : "ซ้อมพูดคำตอบ"}
            </span>
          </button>

          <button
            onClick={() => evaluateInput(currentInput)}
            disabled={!currentInput.trim()}
            className="manga-btn px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs sm:text-sm font-black disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1 shrink-0 shadow-[2px_2px_0px_#0f172a]"
          >
            <Icon name="auto_awesome" className="text-sm sm:text-base" />
            <span>ตรวจ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
