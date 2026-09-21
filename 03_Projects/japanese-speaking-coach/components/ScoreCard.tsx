// components/ScoreCard.tsx - Manga Scorecard & Finetuned Evaluation Report
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
  const progressPercent = Math.min(100, Math.max(0, Math.round((result.totalScore / 15) * 100)));

  return (
    <div className="manga-box p-3.5 sm:p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200 shadow-[4px_4px_0px_#0f172a]">
      {/* Header Result Banner */}
      <div className="text-center pb-5 border-b-2 border-slate-900 relative">
        {/* Pass / Try Again Stamp */}
        <div className="inline-block mb-2">
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
            className={`manga-badge text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 ${
              isPass
                ? "bg-emerald-400 text-slate-900"
                : "bg-rose-500 text-white"
            }`}
          >
            {isPass ? "合格! PASS (ผ่านเกณฑ์ PIM)" : "再挑戦! NEEDS IMPROVEMENT (ฝึกเพิ่มเติม)"}
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
          {result.totalScore}{" "}
          <span className="text-lg sm:text-2xl font-extrabold text-slate-500">
            / 15 คะแนน
          </span>
        </h2>

        {/* Visual Score Progress Bar with Passing Threshold at 9 pts (60%) */}
        <div className="max-w-md mx-auto mt-3 px-1 sm:px-2">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold text-slate-500 mb-1">
            <span>0 PTS</span>
            <span className="text-rose-600 font-extrabold">เกณฑ์ผ่าน: 9 PTS (60%)</span>
            <span>15 PTS</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200 border-2 border-slate-900 overflow-hidden relative">
            {/* Passing Target Line */}
            <div className="absolute top-0 bottom-0 left-[60%] w-0.5 bg-slate-900 z-10" />
            <div
              className={`h-full transition-all duration-500 ${
                isPass ? "bg-emerald-500" : "bg-amber-400"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Comic speech bubble with overall feedback */}
        <div className="speech-bubble speech-bubble-top max-w-xl mx-auto mt-4 text-left p-3.5 sm:p-4 bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
          <div className="flex items-start space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-100 border border-slate-900 flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="record_voice_over" className="text-rose-600 text-lg" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                ความคิดเห็นจากอาจารย์ผู้คุมสอบ (Sensei Feedback):
              </p>
              <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed mt-0.5">
                {result.overallSummary}
              </p>
            </div>
          </div>
        </div>
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
              <span
                className={`text-xs sm:text-sm font-black px-2 py-0.5 rounded-lg border border-slate-900 ${
                  result.part1Score >= 4.5
                    ? "bg-emerald-300 text-slate-900"
                    : result.part1Score >= 3
                    ? "bg-amber-300 text-slate-900"
                    : "bg-rose-200 text-rose-900"
                }`}
              >
                {result.part1Score} / 5
              </span>
            </div>

            {/* Mini Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-slate-100 border border-slate-300 overflow-hidden mb-2">
              <div
                className="h-full bg-sky-500 rounded-full"
                style={{ width: `${(result.part1Score / 5) * 100}%` }}
              />
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed mt-1">
              {result.part1Feedback}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center text-[10px] font-bold text-slate-500">
            <Icon name="badge" className="text-xs mr-1 text-slate-500 shrink-0" />
            <span>เกณฑ์ 5 ประโยคตามฟอร์ม</span>
          </div>
        </div>

        {/* Part 2 */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="manga-badge bg-amber-300 text-slate-900 text-[10px] sm:text-[11px]">
                ส่วนที่ 2: คำศัพท์ 5 คำ
              </span>
              <span
                className={`text-xs sm:text-sm font-black px-2 py-0.5 rounded-lg border border-slate-900 ${
                  result.part2Score >= 4.5
                    ? "bg-emerald-300 text-slate-900"
                    : result.part2Score >= 3
                    ? "bg-amber-300 text-slate-900"
                    : "bg-rose-200 text-rose-900"
                }`}
              >
                {result.part2Score} / 5
              </span>
            </div>

            {/* Mini Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-slate-100 border border-slate-300 overflow-hidden mb-2">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${(result.part2Score / 5) * 100}%` }}
              />
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed mt-1">
              {result.part2Feedback}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center text-[10px] font-bold text-slate-500">
            <Icon name="menu_book" className="text-xs mr-1 text-slate-500 shrink-0" />
            <span>คำศัพท์ประจำชุดข้อสอบ</span>
          </div>
        </div>

        {/* Part 3 */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="manga-badge bg-rose-400 text-white text-[10px] sm:text-[11px]">
                ส่วนที่ 3: ตอบจากภาพ
              </span>
              <span
                className={`text-xs sm:text-sm font-black px-2 py-0.5 rounded-lg border border-slate-900 ${
                  result.part3Score >= 4.5
                    ? "bg-emerald-300 text-slate-900"
                    : result.part3Score >= 3
                    ? "bg-amber-300 text-slate-900"
                    : "bg-rose-200 text-rose-900"
                }`}
              >
                {result.part3Score} / 5
              </span>
            </div>

            {/* Mini Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-slate-100 border border-slate-300 overflow-hidden mb-2">
              <div
                className="h-full bg-rose-500 rounded-full"
                style={{ width: `${(result.part3Score / 5) * 100}%` }}
              />
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed mt-1">
              {result.part3Feedback}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center text-[10px] font-bold text-slate-500">
            <Icon name="image" className="text-xs mr-1 text-slate-500 shrink-0" />
            <span>ถาม-ตอบสถานการณ์และภาพประกอบ</span>
          </div>
        </div>
      </div>

      {/* Action Buttons (Mobile-first stack, row on desktop) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t-2 border-slate-900">
        <button
          onClick={onRetake}
          className="manga-btn w-full sm:w-auto px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white text-sm font-black flex items-center justify-center space-x-2 shadow-[3px_3px_0px_#0f172a]"
        >
          <Icon name="replay" className="text-base shrink-0" />
          <span>จำลองสอบใหม่อีกครั้ง</span>
        </button>

        <button
          onClick={onGoToDrill}
          className="manga-btn w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-black flex items-center justify-center space-x-2 shadow-[3px_3px_0px_#0f172a]"
        >
          <Icon name="school" className="text-base shrink-0" />
          <span>ไปที่โหมดฝึกซ้อมอิสระ</span>
        </button>
      </div>
    </div>
  );
};
