// components/SettingsModal.tsx - Minimalist Manga User Config Modal with Top Seiyuu Roster
"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "./Icon";
import { UserConfig, SEIYUU_ROSTER, SeiyuuVoiceId } from "@/lib/types";
import { SELF_INTRODUCTION_CRITERIA } from "@/lib/dataset";
import { playSeiyuuGreeting } from "@/lib/speech";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: UserConfig;
  onSave: (config: UserConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formConfig, setFormConfig] = useState<UserConfig>(config);
  const [savedToast, setSavedToast] = useState(false);
  const [previewingId, setPreviewingId] = useState<string | null>(null);

  useEffect(() => {
    setFormConfig(config);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formConfig);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 500);
  };

  const handlePreviewVoice = async (id: SeiyuuVoiceId = "web_speech") => {
    setPreviewingId(id);
    await playSeiyuuGreeting(id, formConfig.speechRate);
    setPreviewingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/70 backdrop-blur-sm sm:p-4 overflow-y-auto">
      <div className="manga-box w-full max-sm:rounded-b-none max-sm:border-b-0 max-sm:max-h-[88vh] sm:max-w-md p-4 sm:p-6 relative animate-in slide-in-from-bottom-6 sm:fade-in sm:zoom-in-95 duration-200 overflow-y-auto shadow-[0_-4px_0px_#0f172a] sm:shadow-[4px_4px_0px_#0f172a] my-0 sm:my-6">
        {/* Mobile Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="manga-btn absolute top-3 right-3 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600"
        >
          <Icon name="close" className="text-lg" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b-2 border-slate-900">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_#0f172a]">
            <Icon name="tune" className="text-xl" />
          </div>
          <div>
            <span className="manga-badge bg-rose-500 text-white text-[10px]">
              CONFIG
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              ตั้งค่าการสอบ & อาจารย์ผู้คุมสอบ
            </h3>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-3.5">
          {/* 1. Student Name for Part 1 */}
          <div className="p-3 rounded-2xl bg-amber-50/60 border-2 border-slate-900">
            <div className="flex items-center justify-between mb-1.5">
              <label className="flex items-center text-xs font-black text-slate-900">
                <Icon name="badge" className="text-sm text-rose-600 mr-1" />
                ชื่อของคุณ (Part 1: แนะนำตัว)
              </label>
              <div className="flex space-x-1">
                <button
                  type="button"
                  onClick={() => setFormConfig({ ...formConfig, studentNameJa: "たなか" })}
                  className="px-1.5 py-0.5 rounded bg-amber-200 hover:bg-amber-300 text-[10px] font-bold text-slate-800 border border-slate-900"
                >
                  たなか
                </button>
                <button
                  type="button"
                  onClick={() => setFormConfig({ ...formConfig, studentNameJa: "がくせい" })}
                  className="px-1.5 py-0.5 rounded bg-amber-200 hover:bg-amber-300 text-[10px] font-bold text-slate-800 border border-slate-900"
                >
                  がくせい
                </button>
              </div>
            </div>
            <input
              type="text"
              value={formConfig.studentNameJa}
              onChange={(e) =>
                setFormConfig({ ...formConfig, studentNameJa: e.target.value })
              }
              placeholder="เช่น たなか (Tanaka) หรือ サックダー"
              className="w-full px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs sm:text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              *ใส่ชื่อเป็นภาษาญี่ปุ่น (ฮิระงะนะ/คะตะคะนะ) เพื่อให้อาจารย์ AI อ่านออกเสียงได้ถูกต้อง
            </p>
          </div>

          {/* 2. Selected Hobby */}
          <div className="p-3 rounded-2xl bg-slate-50 border-2 border-slate-900">
            <label className="flex items-center text-xs font-black text-slate-900 mb-1.5">
              <Icon name="sports_esports" className="text-sm text-amber-500 mr-1" />
              งานอดิเรก (Part 1)
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {SELF_INTRODUCTION_CRITERIA.sampleHobbies.map((h) => (
                <button
                  key={h.romaji}
                  type="button"
                  onClick={() =>
                    setFormConfig({ ...formConfig, selectedHobby: h.romaji })
                  }
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-black border-2 border-slate-900 flex items-center justify-between transition ${
                    formConfig.selectedHobby === h.romaji
                      ? "bg-amber-400 text-slate-900 shadow-[2px_2px_0px_#0f172a]"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{h.th}</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {h.romaji}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Dedicated Standard Voice (Default System Voice / 標準音声) */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-200">
              <label className="flex items-center text-xs font-black text-slate-900">
                <Icon name="record_voice_over" className="text-sm text-emerald-600 mr-1" />
                เสียงอาจารย์ผู้คุมสอบ (Voice Engine)
              </label>
              <span className="manga-badge bg-emerald-600 text-white text-[9px]">
                ⚡ 0ms OFFLINE
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className="text-2xl shrink-0">📱</span>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-black text-slate-900">
                      標準音声
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">
                      (Default System Voice)
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-medium leading-tight mt-0.5">
                    เสียงมาตรฐานระบบอุปกรณ์ เสถียร 100% ตอบสนองทันที ไม่ดีเลย์
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handlePreviewVoice("web_speech")}
                className="manga-btn shrink-0 ml-2 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-black flex items-center space-x-1 border-2 border-slate-900 shadow-[1px_1px_0px_#0f172a]"
              >
                <Icon name="volume_up" className="text-sm text-rose-600" />
                <span>{previewingId ? "กำลังเล่น..." : "ทดสอบเสียง"}</span>
              </button>
            </div>
          </div>

          {/* 4. Display Toggles (Romaji & Hints) */}
          <div className="space-y-2 p-3 rounded-2xl bg-slate-50 border-2 border-slate-900">
            {/* Romaji Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800">
                แสดงคำอ่าน Romaji
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormConfig({
                    ...formConfig,
                    showRomaji: !formConfig.showRomaji,
                  })
                }
                className={`w-11 h-6 rounded-full border-2 border-slate-900 transition flex items-center p-0.5 ${
                  formConfig.showRomaji
                    ? "bg-emerald-400 justify-end"
                    : "bg-slate-200 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-900" />
              </button>
            </div>

            {/* Thai Hints Toggle */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-2">
              <span className="text-xs font-black text-slate-800">
                แสดงคำแปลภาษาไทย
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormConfig({
                    ...formConfig,
                    showThaiHints: !formConfig.showThaiHints,
                  })
                }
                className={`w-11 h-6 rounded-full border-2 border-slate-900 transition flex items-center p-0.5 ${
                  formConfig.showThaiHints
                    ? "bg-emerald-400 justify-end"
                    : "bg-slate-200 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-900" />
              </button>
            </div>
          </div>

          {/* 5. Speech Speed & SFX */}
          <div className="grid grid-cols-2 gap-2">
            {/* Speed */}
            <div className="p-2.5 rounded-2xl bg-slate-50 border-2 border-slate-900">
              <label className="text-[11px] font-black text-slate-900 mb-1.5 block">
                ความเร็วเสียง ({formConfig.speechRate}x)
              </label>
              <div className="flex space-x-1">
                {[0.7, 0.9, 1.1].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() =>
                      setFormConfig({ ...formConfig, speechRate: rate })
                    }
                    className={`flex-1 py-1 text-[10px] font-black rounded-lg border-2 border-slate-900 transition ${
                      formConfig.speechRate === rate
                        ? "bg-rose-500 text-white shadow-[1px_1px_0px_#0f172a]"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* SFX Toggle */}
            <div className="p-2.5 rounded-2xl bg-slate-50 border-2 border-slate-900 flex flex-col justify-between">
              <span className="text-[11px] font-black text-slate-900">
                Anime SFX
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormConfig({
                    ...formConfig,
                    enableSfx: !formConfig.enableSfx,
                  })
                }
                className={`w-11 h-6 rounded-full border-2 border-slate-900 transition flex items-center p-0.5 self-end ${
                  formConfig.enableSfx
                    ? "bg-emerald-400 justify-end"
                    : "bg-slate-200 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-900" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 pt-3 border-t-2 border-slate-900 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="manga-btn px-3 py-1.5 text-xs text-slate-700 bg-white rounded-xl"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            className="manga-btn px-4 py-1.5 text-xs text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center space-x-1"
          >
            <Icon name={savedToast ? "check" : "save"} className="text-sm" />
            <span>{savedToast ? "บันทึกแล้ว!" : "บันทึก"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
