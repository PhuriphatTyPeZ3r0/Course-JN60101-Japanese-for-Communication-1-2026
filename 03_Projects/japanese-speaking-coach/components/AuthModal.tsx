// components/AuthModal.tsx - Google OAuth 2.0 & User Profile Modal
"use client";

import React, { useState } from "react";
import { Icon } from "./Icon";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
}) => {
  const [quickName, setQuickName] = useState("");
  const [quickEmail, setQuickEmail] = useState("");
  const [customClientId, setCustomClientId] = useState("");
  const [showConfig, setShowConfig] = useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("google_client_id") || "";
      setCustomClientId(saved);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const DEFAULT_CLIENT_ID =
    "374926105212-cm949tmbof3jl6gq8if8h9tiqi2riceh.apps.googleusercontent.com";

  // Real Google OAuth 2.0 Redirect
  const handleGoogleLogin = () => {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      customClientId.trim() ||
      (typeof window !== "undefined" ? localStorage.getItem("google_client_id") : null) ||
      DEFAULT_CLIENT_ID;

    if (customClientId.trim()) {
      localStorage.setItem("google_client_id", customClientId.trim());
    }

    // Canonicalize Redirect URI to exactly match Google Cloud Console
    let redirectUri = "https://jn60101-speaking-coach.pages.dev";
    if (typeof window !== "undefined") {
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        redirectUri = "http://localhost:3000";
      } else if (window.location.hostname.endsWith("jn60101-speaking-coach.pages.dev")) {
        redirectUri = "https://jn60101-speaking-coach.pages.dev";
      } else {
        redirectUri = window.location.origin.replace(/\/$/, "");
      }
    }

    const scope = encodeURIComponent("openid email profile");
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=token&scope=${scope}&prompt=select_account`;

    window.location.href = oauthUrl;
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail) return;
    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      email: quickEmail,
      name: quickName || quickEmail.split("@")[0],
    };
    onLogin(newUser);
    onClose();
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

        {/* Header */}
        <div className="flex items-center space-x-3 mb-5 pb-3 border-b-2 border-slate-900">
          <div className="w-10 h-10 rounded-2xl bg-sky-400 border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_#0f172a]">
            <Icon name="account_circle" className="text-2xl" />
          </div>
          <div>
            <span className="manga-badge bg-rose-500 text-white text-[10px]">
              ACCOUNT
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              เข้าสู่ระบบ
            </h3>
          </div>
        </div>

        {user ? (
          /* Logged In State */
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] text-center">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-slate-900 mx-auto mb-2 shadow-[2px_2px_0px_#0f172a]"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-emerald-400 border-2 border-slate-900 mx-auto flex items-center justify-center text-slate-900 text-2xl font-black mb-2 shadow-[2px_2px_0px_#0f172a]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <h4 className="font-extrabold text-slate-900 text-base">{user.name}</h4>
              <p className="text-xs text-slate-600 font-medium">{user.email}</p>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="manga-btn w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black flex items-center justify-center space-x-1.5"
            >
              <Icon name="logout" className="text-sm" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        ) : (
          /* Not Logged In State */
          <div className="space-y-4">
            {/* Google OAuth 2.0 Redirect Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="manga-btn w-full py-3 bg-white hover:bg-slate-50 text-slate-900 text-xs sm:text-sm font-black flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>เข้าสู่ระบบด้วย Google</span>
            </button>

            {/* Custom Google Client ID Setting Drawer */}
            {showConfig && (
              <div className="p-3 bg-amber-50 border-2 border-slate-900 rounded-2xl space-y-2 animate-in fade-in duration-150 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">
                    ตั้งค่า Google Client ID
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowConfig(false)}
                    className="text-[10px] text-slate-500 font-bold hover:underline"
                  >
                    ปิด
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 font-medium">
                  ใส่ Client ID ที่สร้างจาก Google Cloud Console เพื่อเปิดใช้งาน OAuth:
                </p>
                <input
                  type="text"
                  placeholder="เช่น xxxx.apps.googleusercontent.com"
                  value={customClientId}
                  onChange={(e) => setCustomClientId(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border-2 border-slate-900 rounded-xl focus:outline-none"
                />
                <div className="flex justify-end space-x-1.5 pt-1">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="manga-btn px-3 py-1 bg-amber-400 text-slate-900 text-xs font-black rounded-lg"
                  >
                    บันทึกและเชื่อมต่อ Google
                  </button>
                </div>
              </div>
            )}

            {!showConfig && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowConfig(true)}
                  className="text-[10px] text-slate-500 hover:text-slate-800 font-bold underline"
                >
                  ⚙️ ตั้งค่า Google Client ID ด้วยตนเอง
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-300"></div>
              <span className="flex-shrink mx-2 text-[10px] font-black text-slate-400 uppercase">
                หรือกรอกชื่อเพื่อเข้าใช้งานทันที
              </span>
              <div className="flex-grow border-t border-slate-300"></div>
            </div>

            {/* Quick manual profile form */}
            <form onSubmit={handleQuickSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="ชื่อของคุณ"
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold bg-white border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_#0f172a] focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="อีเมล (Gmail หรืออื่นๆ)"
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold bg-white border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_#0f172a] focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <button
                type="submit"
                className="manga-btn w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-black flex items-center justify-center space-x-1.5"
              >
                <Icon name="login" className="text-sm" />
                <span>เข้าใช้งาน</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
