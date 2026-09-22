// app/page.tsx - Main Dashboard Page for JN60101 Speaking Coach (Manga Mobile-First)
"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MockExam } from "@/components/MockExam";
import { SectionDrill } from "@/components/SectionDrill";
import { SettingsModal } from "@/components/SettingsModal";
import { AuthModal, UserProfile } from "@/components/AuthModal";
import { UserConfig, DEFAULT_USER_CONFIG } from "@/lib/types";

export default function HomePage() {
  const [currentMode, setCurrentMode] = useState<"MOCK" | "DRILL">("MOCK");
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [userConfig, setUserConfig] = useState<UserConfig>(DEFAULT_USER_CONFIG);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    // Load User Config from localStorage
    try {
      const savedConfig = localStorage.getItem("jn60101_user_config");
      if (savedConfig) {
        setUserConfig({ ...DEFAULT_USER_CONFIG, ...JSON.parse(savedConfig) });
      }
    } catch (e) {
      console.warn("Failed to load user config:", e);
    }

    // Load User Auth from localStorage
    try {
      const savedUser = localStorage.getItem("jn60101_user_auth");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.warn("Failed to load user auth:", e);
    }
    // Check for Google OAuth redirect access_token in URL hash
    if (typeof window !== "undefined" && window.location.hash.includes("access_token=")) {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        if (accessToken) {
          fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
            .then((res) => res.json())
            .then((profile: any) => {
              if (profile.email) {
                const loggedInUser: UserProfile = {
                  id: profile.sub || `google_${Date.now()}`,
                  email: profile.email,
                  name: profile.name || profile.given_name || profile.email.split("@")[0],
                  picture: profile.picture,
                };
                handleLogin(loggedInUser);
                window.history.replaceState(null, "", window.location.pathname);
              }
            })
            .catch((err) => console.warn("Google userinfo fetch failed:", err));
        }
      } catch (e) {
        console.warn("Error parsing OAuth token:", e);
      }
    }
  }, []);

  const handleSaveSettings = (newConfig: UserConfig) => {
    setUserConfig(newConfig);
    try {
      localStorage.setItem("jn60101_user_config", JSON.stringify(newConfig));
    } catch (e) {
      console.warn("Failed to save user config:", e);
    }
  };

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    try {
      localStorage.setItem("jn60101_user_auth", JSON.stringify(newUser));
      // Auto-populate student name in config if empty or default
      if (userConfig.studentNameJa === DEFAULT_USER_CONFIG.studentNameJa && newUser.name) {
        const updated = { ...userConfig, studentNameJa: newUser.name };
        setUserConfig(updated);
        localStorage.setItem("jn60101_user_config", JSON.stringify(updated));
      }
    } catch (e) {
      console.warn("Failed to save user auth:", e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem("jn60101_user_auth");
    } catch (e) {
      console.warn("Failed to remove user auth:", e);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50/40">
        <div className="w-10 h-10 rounded-2xl bg-rose-500 border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] animate-bounce flex items-center justify-center text-white font-black">
          話
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col justify-between bg-slate-50 manga-dots">
      {/* Top Navbar */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        userEmail={user?.email}
      />

      {/* Main Content Area (Responsive padding for all screen sizes + safe bottom space) */}
      <main className="max-w-4xl mx-auto px-2.5 sm:px-4 py-3 sm:py-5 w-full flex-grow pb-24 sm:pb-28">
        {currentMode === "MOCK" ? (
          <MockExam
            userConfig={userConfig}
            onGoToDrill={() => setCurrentMode("DRILL")}
          />
        ) : (
          <SectionDrill userConfig={userConfig} />
        )}
      </main>

      {/* Minimalist Manga Footer (Clean & No Fluff) */}
      <footer className="bg-white border-t-2 border-slate-900 py-3 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-3 flex items-center justify-between text-[11px] font-extrabold">
          <div className="flex items-center space-x-1.5">
            <span className="manga-badge bg-rose-600 text-white text-[10px]">
              話 Hanase AI
            </span>
            <span className="text-slate-800">Interactive Speaking Coach</span>
          </div>
          <span className="text-slate-400">© 2026 Hanase AI</span>
        </div>
      </footer>

      {/* Settings Modal (User Config) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={userConfig}
        onSave={handleSaveSettings}
      />

      {/* Auth Modal (Google & PIM Identity) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}

