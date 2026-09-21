// components/SettingsModal.tsx - Minimalist Manga User Config Modal with Top Seiyuu Roster & Hobby Manager
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "./Icon";
import { UserConfig, SeiyuuVoiceId, DEFAULT_USER_CONFIG } from "@/lib/types";
import { playSeiyuuGreeting } from "@/lib/speech";
import {
  HOBBY_DICTIONARY,
  HobbyItem,
  resolveHobby,
  loadCustomHobbies,
  saveCustomHobby,
  deleteCustomHobby,
  romajiToHiragana,
} from "@/lib/hobbies";

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

  // Hobby Management State
  const [customHobbies, setCustomHobbies] = useState<HobbyItem[]>([]);
  const [hobbySearch, setHobbySearch] = useState("");
  const [hobbyCategory, setHobbyCategory] = useState<string>("ALL");
  const [isAddingHobby, setIsAddingHobby] = useState(false);

  // New Custom Hobby Form
  const [newTh, setNewTh] = useState("");
  const [newRomaji, setNewRomaji] = useState("");
  const [newJa, setNewJa] = useState("");
  const [newIcon, setNewIcon] = useState("sports_esports");

  useEffect(() => {
    setFormConfig(config);
    if (isOpen) {
      setCustomHobbies(loadCustomHobbies());
    }
  }, [config, isOpen]);

  // Combine custom and built-in dictionary
  const allHobbies = useMemo(() => {
    return [...customHobbies, ...HOBBY_DICTIONARY];
  }, [customHobbies]);

  // Currently resolved hobby
  const activeHobby = useMemo(() => {
    return resolveHobby(formConfig.selectedHobby, customHobbies);
  }, [formConfig.selectedHobby, customHobbies]);

  // Filtered hobbies list
  const filteredHobbies = useMemo(() => {
    return allHobbies.filter((h) => {
      const matchCat =
        hobbyCategory === "ALL"
          ? true
          : hobbyCategory === "CUSTOM"
          ? Boolean(h.isCustom)
          : h.category === hobbyCategory;

      if (!matchCat) return false;

      if (!hobbySearch.trim()) return true;
      const q = hobbySearch.toLowerCase().trim();
      return (
        h.th.toLowerCase().includes(q) ||
        h.romaji.toLowerCase().includes(q) ||
        h.ja.toLowerCase().includes(q)
      );
    });
  }, [allHobbies, hobbyCategory, hobbySearch]);

  // Auto-fill Kana when user types Romaji
  const handleRomajiChange = (val: string) => {
    setNewRomaji(val);
    const converted = romajiToHiragana(val);
    if (converted) {
      setNewJa(converted);
    }
  };

  const handleSaveCustomHobby = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTh.trim() || !newRomaji.trim()) return;

    const id = `custom-${Date.now()}`;
    const jaFinal = newJa.trim() || romajiToHiragana(newRomaji) || newRomaji;
    const updated = saveCustomHobby({
      id,
      th: newTh.trim(),
      romaji: newRomaji.trim().toLowerCase(),
      ja: jaFinal,
      category: "CUSTOM",
      icon: newIcon || "sports_esports",
    });

    setCustomHobbies(updated);
    setFormConfig({ ...formConfig, selectedHobby: newRomaji.trim().toLowerCase() });
    setNewTh("");
    setNewRomaji("");
    setNewJa("");
    setIsAddingHobby(false);
  };

  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteCustomHobby(id);
    setCustomHobbies(updated);
    if (formConfig.selectedHobby.includes(id)) {
      setFormConfig({ ...formConfig, selectedHobby: "manga" });
    }
  };

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
      <div className="manga-box w-full max-sm:rounded-b-none max-sm:border-b-0 max-sm:max-h-[92vh] sm:max-w-lg p-4 sm:p-6 relative animate-in slide-in-from-bottom-6 sm:fade-in sm:zoom-in-95 duration-200 overflow-y-auto shadow-[0_-4px_0px_#0f172a] sm:shadow-[4px_4px_0px_#0f172a] my-0 sm:my-6">
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
              ตั้งค่าการสอบ & ข้อมูลส่วนตัว
            </h3>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-4">
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

          {/* 2. Enhanced Hobby Manager (Part 1: Shumi wa ...) */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-900 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-xs font-black text-slate-900">
                <Icon name="sports_esports" className="text-sm text-amber-500 mr-1" />
                งานอดิเรกของคุณ (Part 1: しゅみは ...)
              </label>
              <button
                type="button"
                onClick={() => setIsAddingHobby(!isAddingHobby)}
                className="manga-btn px-2 py-0.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-[10px] font-black text-slate-900 flex items-center space-x-0.5"
              >
                <Icon name={isAddingHobby ? "close" : "add"} className="text-xs" />
                <span>{isAddingHobby ? "ปิดหน้าเพิ่ม" : "เพิ่มงานอดิเรก"}</span>
              </button>
            </div>

            {/* Currently Selected Hobby Banner */}
            <div className="p-2.5 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center justify-between">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-100 border border-slate-900 flex items-center justify-center shrink-0">
                  <Icon name={activeHobby.icon || "sports_esports"} className="text-lg text-amber-600" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-black text-slate-900 truncate">
                      {activeHobby.th}
                    </span>
                    <span className="manga-badge bg-emerald-100 border-emerald-800 text-emerald-900 text-[9px]">
                      {activeHobby.ja}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-slate-500">
                    Shumi wa {activeHobby.romaji} desu
                  </p>
                </div>
              </div>
              <span className="manga-badge bg-rose-500 text-white text-[9px] shrink-0">
                กำลังใช้งาน
              </span>
            </div>

            {/* Add Custom Hobby Form */}
            {isAddingHobby && (
              <form
                onSubmit={handleSaveCustomHobby}
                className="p-3 bg-amber-50/80 border-2 border-dashed border-slate-900 rounded-xl space-y-2 animate-in fade-in duration-150"
              >
                <div className="flex items-center justify-between pb-1 border-b border-amber-200">
                  <span className="text-[11px] font-black text-slate-900 flex items-center space-x-1">
                    <Icon name="edit" className="text-xs text-amber-600" />
                    <span>เพิ่มงานอดิเรกใหม่ (Auto-Mapping)</span>
                  </span>
                  <span className="text-[9px] text-slate-500">บันทึกลงเบราว์เซอร์อัตโนมัติ</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                      ชื่อภาษาไทย:
                    </label>
                    <input
                      type="text"
                      required
                      value={newTh}
                      onChange={(e) => setNewTh(e.target.value)}
                      placeholder="เช่น ต่อกันดั้ม, วาดรูป"
                      className="w-full px-2 py-1 rounded-lg border border-slate-900 text-xs font-bold bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                      คำอ่าน Romaji:
                    </label>
                    <input
                      type="text"
                      required
                      value={newRomaji}
                      onChange={(e) => handleRomajiChange(e.target.value)}
                      placeholder="เช่น ganpura, anime"
                      className="w-full px-2 py-1 rounded-lg border border-slate-900 text-xs font-bold bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                      ภาษาญี่ปุ่น (Kana/Kanji):
                    </label>
                    <input
                      type="text"
                      value={newJa}
                      onChange={(e) => setNewJa(e.target.value)}
                      placeholder="เช่น ガンプラ, まんが"
                      className="w-full px-2 py-1 rounded-lg border border-slate-900 text-xs font-bold bg-white font-jp"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                      เลือกไอคอน:
                    </label>
                    <div className="flex items-center space-x-1">
                      {["sports_esports", "palette", "music_note", "fitness_center", "auto_stories", "star"].map((ic) => (
                        <button
                          key={ic}
                          type="button"
                          onClick={() => setNewIcon(ic)}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition ${
                            newIcon === ic
                              ? "bg-slate-900 text-amber-400 border-slate-900"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          <Icon name={ic} className="text-xs" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="manga-btn px-3 py-1 bg-slate-900 text-amber-400 rounded-lg text-xs font-black flex items-center space-x-1"
                  >
                    <Icon name="check" className="text-xs" />
                    <span>บันทึกและเลือกใช้งานทันที</span>
                  </button>
                </div>
              </form>
            )}

            {/* Search and Category Filter */}
            <div className="space-y-1.5 pt-1">
              <div className="relative">
                <Icon name="search" className="absolute left-2.5 top-2 text-sm text-slate-400" />
                <input
                  type="text"
                  value={hobbySearch}
                  onChange={(e) => setHobbySearch(e.target.value)}
                  placeholder="ค้นหางานอดิเรก (ไทย, Romaji, ญี่ปุ่น)..."
                  className="w-full pl-8 pr-7 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                {hobbySearch && (
                  <button
                    type="button"
                    onClick={() => setHobbySearch("")}
                    className="absolute right-2 top-2 text-xs text-slate-400 hover:text-slate-700 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center space-x-1 overflow-x-auto pb-1 text-[10px] font-bold">
                {[
                  { id: "ALL", label: "ทั้งหมด" },
                  { id: "ENTERTAINMENT", label: "สื่อบันเทิง" },
                  { id: "DIGITAL_GAMES", label: "เกม/ดิจิทัล" },
                  { id: "SPORTS", label: "กีฬา" },
                  { id: "FOOD_DRINK", label: "อาหาร" },
                  { id: "ARTS_CULTURE", label: "ศิลปะ" },
                  { id: "LIFESTYLE", label: "ไลฟ์สไตล์" },
                  { id: "CUSTOM", label: "กำหนดเอง" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setHobbyCategory(cat.id)}
                    className={`px-2 py-0.5 rounded-lg whitespace-nowrap border transition ${
                      hobbyCategory === cat.id
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Hobbies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {filteredHobbies.map((h) => {
                const isSelected =
                  formConfig.selectedHobby === h.romaji ||
                  formConfig.selectedHobby === h.id ||
                  formConfig.selectedHobby === h.ja;

                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() =>
                      setFormConfig({ ...formConfig, selectedHobby: h.romaji })
                    }
                    className={`p-2 rounded-xl text-left border-2 transition relative flex items-center justify-between ${
                      isSelected
                        ? "bg-amber-300 border-slate-900 shadow-[2px_2px_0px_#0f172a]"
                        : "bg-white border-slate-300 hover:border-slate-800 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <Icon name={h.icon || "sports_esports"} className="text-sm text-slate-700 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate">
                          {h.th}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono truncate">
                          {h.romaji} • <span className="font-jp">{h.ja}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0 ml-1">
                      {h.isCustom && (
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => handleDeleteCustom(h.id, e)}
                          title="ลบงานอดิเรกนี้"
                          className="w-5 h-5 rounded hover:bg-rose-100 text-rose-600 flex items-center justify-center text-[10px]"
                        >
                          <Icon name="delete" className="text-xs" />
                        </span>
                      )}
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-black">
                          ✓
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}

              {filteredHobbies.length === 0 && (
                <div className="col-span-full p-4 text-center text-slate-500 text-xs">
                  ไม่พบงานอดิเรกที่ตรงกับคำค้นหา
                </div>
              )}
            </div>
          </div>

          {/* 3. Dedicated Standard Voice (Default System Voice / 標準音声) */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-200">
              <label className="flex items-center text-xs font-black text-slate-900">
                <Icon name="record_voice_over" className="text-sm text-emerald-600 mr-1" />
                เสียงอาจารย์ผู้คุมสอบ (Voice Engine)
              </label>
              <span className="manga-badge bg-emerald-600 text-white text-[9px] flex items-center space-x-0.5">
                <Icon name="bolt" className="text-xs mr-0.5" />
                <span>0ms OFFLINE</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-900 flex items-center justify-center shrink-0">
                  <Icon name="smart_toy" className="text-xl text-emerald-900" />
                </div>
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

          {/* 6. Gemini AI Engine Configuration */}
          <div className="p-3 rounded-2xl bg-slate-50 border-2 border-slate-900 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-xs font-black text-slate-900">
                <Icon name="psychology" className="text-sm text-indigo-600 mr-1" />
                AI Sensei Evaluator (Gemini Flash Engine)
              </label>
              <span className="manga-badge bg-indigo-600 text-white text-[9px] flex items-center space-x-0.5">
                <Icon name="verified" className="text-[10px] mr-0.5" />
                <span>ONLINE AI</span>
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <input
                type="password"
                value={formConfig.geminiApiKey || ""}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, geminiApiKey: e.target.value })
                }
                placeholder="ใส่ Gemini API Key (AQ... หรือ AIza...)"
                className="flex-1 px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-mono font-bold bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={() =>
                  setFormConfig({
                    ...formConfig,
                    geminiApiKey: DEFAULT_USER_CONFIG.geminiApiKey || "",
                  })
                }
                className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 rounded-xl text-[10px] font-bold text-slate-800 shrink-0"
              >
                คืนค่าเริ่มต้น
              </button>
            </div>
            <p className="text-[10px] text-slate-500">
              *ระบบเชื่อมต่อกับ Gemini Flash Lite API ล่าสุดเพื่อตรวจประเมินคะแนนเชิงลึก
            </p>
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
