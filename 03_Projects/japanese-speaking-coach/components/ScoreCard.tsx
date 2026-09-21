// components/ScoreCard.tsx - Manga Scorecard & Evaluation Report
"use client";

import React from "react";
import { Icon } from "./Icon";
import { EvaluationResult } from "@/lib/types";

interface ScoreCardProps {
  result: EvaluationResult;
  onRetake: () => void;
  onGoToDrill: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  result,
  onRetake,
  onGoToDrill,
}) => {
  const isPass = result.totalScore >= 9;

  return (
    <div className="manga-box p-3.5 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
      {/* Header Result Banner */}
      <div className="text-center pb-6 border-b-2 border-slate-900 relative">
        {/* Pass / Try Again Stamp */}
        <div className="inline-block mb-3">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl mx-auto flex items-center justify-center border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] sm:shadow-[4px_4px_0px_#0f172a] transform -rotate-3 ${
              isPass
                ? "bg-emerald-400 text-slate-900"
                : "bg-amber-400 text-slate-900"
            }`}
          >
            <Icon
              name={isPass ? "emoji_events" : "sentiment_neutral"}
              className="text-3xl sm:text-4xl"
            />
          </div>
        </div>

        <div>
          <span
            className={`manga-badge text-[11px] sm:text-xs font-black uppercase tracking-wider mb-2 ${
              isPass
                ? "bg-emerald-400 text-slate-900"
                : "bg-rose-500 text-white"
            }`}
          >
            {isPass ? "合格! PASS (ผ่านเกณฑ์)" : "再挑戦! NEEDS PRACTICE (ฝึกเพิ่ม)"}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
          {result.totalScore}{" "}
          <span className="text-lg sm:text-2xl font-extrabold text-slate-500">
            / 15 คะแนน
          </span>
        </h2>

        {/* Comic speech bubble with overall feedback */}
        <div className="speech-bubble speech-bubble-top max-w-xl mx-auto mt-4 text-left p-3.5 sm:p-4">
          <div className="flex items-start space-x-2">
            <Icon name="record_voice_over" className="text-rose-600 text-xl flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed">
              {result.overallSummary}
            </p>
          </div>
        </div>

        {result.warning && (
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-900 bg-amber-200 border-2 border-slate-900 rounded-xl px-3 py-1.5 mt-3 shadow-[2px_2px_0px_#0f172a]">
            <Icon name="info" className="text-sm" />
            <span className="font-bold">{result.warning}</span>
          </div>
        )}
      </div>

      {/* Breakdown Cards (3 Parts) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 my-4 sm:my-6">
        {/* Part 1 */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="manga-badge bg-sky-300 text-slate-900 text-[10px] sm:text-[11px]">
                {result.part1Title || "ส่วนที่ 1: บทสนทนา"}
              </span>
              <span className="text-sm sm:text-base font-black text-slate-900">
                {result.part1Score} <span className="text-xs font-bold text-slate-500">/ 5</span>
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed mt-2">
              {result.part1Feedback}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center text-[10px] font-bold text-slate-400">
            <Icon name="badge" className="text-xs mr-1" />
            เกณฑ์ 5 ประโยคตามฟอร์ม
          </div>
        </div>

        {/* Part 2 */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="manga-badge bg-amber-300 text-slate-900 text-[10px] sm:text-[11px]">
                ส่วนที่ 2: คำศัพท์ 5 คำ
              </span>
              <span className="text-sm sm:text-base font-black text-slate-900">
                {result.part2Score} <span className="text-xs font-bold text-slate-500">/ 5</span>
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed mt-2">
              {result.part2Feedback}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center text-[10px] font-bold text-slate-400">
            <Icon name="menu_book" className="text-xs mr-1" />
            คำศัพท์ประจำชุดข้อสอบ
          </div>
        </div>

        {/* Part 3 */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="manga-badge bg-rose-400 text-white text-[10px] sm:text-[11px]">
                ส่วนที่ 3: ตอบจากภาพ
              </span>
              <span className="text-sm sm:text-base font-black text-slate-900">
                {result.part3Score} <span className="text-xs font-bold text-slate-500">/ 5</span>
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed mt-2">
              {result.part3Feedback}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center text-[10px] font-bold text-slate-400">
            <Icon name="image" className="text-xs mr-1" />
            ถาม-ตอบสถานการณ์และภาพ SVG
          </div>
        </div>
      </div>

      {/* Action Buttons (Mobile-first stack, row on desktop) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t-2 border-slate-900">
        <button
          onClick={onRetake}
          className="manga-btn w-full sm:w-auto px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white text-sm font-black flex items-center justify-center space-x-2"
        >
          <Icon name="replay" className="text-base" />
          <span>จำลองสอบใหม่อีกครั้ง</span>
        </button>

        <button
          onClick={onGoToDrill}
          className="manga-btn w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-black flex items-center justify-center space-x-2"
        >
          <Icon name="school" className="text-base" />
          <span>ไปที่โหมดฝึกซ้อมอิสระ</span>
        </button>
      </div>
    </div>
  );
};

