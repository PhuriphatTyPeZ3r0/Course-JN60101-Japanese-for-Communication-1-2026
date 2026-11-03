// components/Header.tsx - Header with Neo-Brutalism Manga Design & Material Symbols
"use client";

import React from "react";
import { Icon } from "./Icon";
import { UserConfig, SeiyuuVoiceId, SEIYUU_ROSTER } from "@/lib/types";
import { playSeiyuuGreeting } from "@/lib/speech";

interface HeaderProps {
  currentMode: "MOCK" | "DRILL";
  onSelectMode: (mode: "MOCK" | "DRILL") => void;
  onOpenSettings: () => void;
  onOpenAuth?: () => void;
  userEmail?: string | null;
  userConfig?: UserConfig;
  onSelectCoach?: (voiceId: SeiyuuVoiceId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  onOpenSettings,
  onOpenAuth,
  userEmail,
  userConfig,
  onSelectCoach,
}) => {
  const currentVoiceId = userConfig?.seiyuuVoice || "saori_hayami";
  const activeCoach =
    SEIYUU_ROSTER.find((s) => s.id === currentVoiceId) || SEIYUU_ROSTER[1] || SEIYUU_ROSTER[0];

  const handleCycleCoach = () => {
    const order: SeiyuuVoiceId[] = ["saori_hayami", "kirito", "web_speech"];
    const currentIdx = order.indexOf(currentVoiceId);
    const nextVoice = order[(currentIdx + 1) % order.length];
    if (onSelectCoach) {
      onSelectCoach(nextVoice);
      playSeiyuuGreeting(nextVoice, userConfig?.speechRate || 0.9);
    }
  };

  return (
    <header className="bg-white border-b-2 border-slate-900 sticky top-0 z-30 shadow-[0_3px_0px_#0f172a]">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between">
        {/* Manga Branding */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-rose-600 border-2 border-slate-900 flex items-center justify-center text-white font-black text-sm sm:text-xl shadow-[2px_2px_0px_#0f172a] rotate-[-2deg]">
            話
          </div>
          <div>
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              <h1 className="text-xs sm:text-base font-black text-slate-900 tracking-tight leading-none">
                Hanase AI
              </h1>
              {/* Interactive Coach Switcher Badge */}
              <button
                type="button"
                onClick={handleCycleCoach}
                title="คลิกเพื่อสลับเสียงอาจารย์ AI (早見沙織 / キリト / 標準音声)"
                className="manga-badge bg-amber-400 hover:bg-amber-300 text-slate-900 text-[9px] sm:text-[10px] inline-flex items-center space-x-1 cursor-pointer transition active:scale-95 border border-slate-900 shadow-[1px_1px_0px_#0f172a]"
              >
                <Icon name={activeCoach.avatarIcon} className="text-xs text-slate-900" />
                <span className="font-extrabold">{activeCoach.characterNameJa}</span>
                <Icon name="sync" className="text-[10px] text-slate-700 opacity-60 ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mode Selector & Action Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Mode Switcher */}
          <div className="bg-slate-100 p-0.5 sm:p-1 rounded-2xl border-2 border-slate-900 flex items-center shadow-[2px_2px_0px_#0f172a]">
            <button
              onClick={() => onSelectMode("MOCK")}
              className={`flex items-center space-x-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-xl text-[10px] sm:text-xs font-black transition ${
                currentMode === "MOCK"
                  ? "bg-rose-500 text-white shadow-[1px_1px_0px_#0f172a]"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Icon name="timer" className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">จำลองสอบ (3 นาที)</span>
              <span className="sm:hidden">สอบจริง</span>
            </button>
            <button
              onClick={() => onSelectMode("DRILL")}
              className={`flex items-center space-x-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-xl text-[10px] sm:text-xs font-black transition ${
                currentMode === "DRILL"
                  ? "bg-amber-400 text-slate-900 shadow-[1px_1px_0px_#0f172a]"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Icon name="menu_book" className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">ฝึกซ้อมอิสระ</span>
              <span className="sm:hidden">ซ้อม</span>
            </button>
          </div>

          {/* User Auth Profile Button */}
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              title={userEmail ? `เข้าสู่ระบบในชื่อ: ${userEmail}` : "เข้าสู่ระบบด้วย Google"}
              className="manga-btn p-1 sm:p-1.5 bg-white rounded-xl text-slate-800 hover:bg-slate-50 flex items-center"
            >
              <Icon
                name="account_circle"
                className={`text-lg sm:text-xl ${userEmail ? "text-emerald-600" : "text-slate-600"}`}
                filled={Boolean(userEmail)}
              />
            </button>
          )}

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            title="ตั้งค่าผู้ใช้"
            className="manga-btn p-1 sm:p-1.5 bg-amber-400 text-slate-900 rounded-xl hover:bg-amber-300 flex items-center"
          >
            <Icon name="tune" className="text-lg sm:text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};
