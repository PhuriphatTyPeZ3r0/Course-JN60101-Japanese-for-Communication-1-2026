// components/ScreenSizeIndicator.tsx - Interactive Screen Sizing Debugger & Responsive Indicator
"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "./Icon";

export const ScreenSizeIndicator: React.FC = () => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted) return null;

  const { width, height } = dimensions;

  // Determine Tailwind Breakpoint & Device Icon
  let breakpoint = "XS (<640px)";
  let badgeColor = "bg-rose-500 text-white";
  let deviceType = "Mobile";
  let deviceIcon = "smartphone";

  if (width < 360) {
    breakpoint = "XS (≤360px)";
    badgeColor = "bg-red-600 text-white animate-pulse";
    deviceType = "Compact / SE";
    deviceIcon = "smartphone";
  } else if (width < 390) {
    breakpoint = "XS (360-389px)";
    badgeColor = "bg-rose-500 text-white";
    deviceType = "Standard Mobile";
    deviceIcon = "smartphone";
  } else if (width < 640) {
    breakpoint = "XS (390-639px)";
    badgeColor = "bg-orange-500 text-white";
    deviceType = "Large Mobile";
    deviceIcon = "smartphone";
  } else if (width < 768) {
    breakpoint = "SM (≥640px)";
    badgeColor = "bg-amber-400 text-slate-900";
    deviceType = "Phablet / Mini";
    deviceIcon = "tablet_mac";
  } else if (width < 1024) {
    breakpoint = "MD (≥768px)";
    badgeColor = "bg-emerald-500 text-white";
    deviceType = "Tablet / iPad";
    deviceIcon = "tablet_mac";
  } else if (width < 1280) {
    breakpoint = "LG (≥1024px)";
    badgeColor = "bg-sky-500 text-white";
    deviceType = "Laptop";
    deviceIcon = "laptop";
  } else {
    breakpoint = "XL (≥1280px)";
    badgeColor = "bg-indigo-600 text-white";
    deviceType = "Desktop";
    deviceIcon = "desktop_windows";
  }

  return (
    <aside
      aria-label="Screen Sizing Indicator"
      className="fixed top-2 left-2 z-50 select-none font-mono text-xs"
    >
      {isExpanded ? (
        <div className="manga-box-sm bg-white/95 backdrop-blur-md p-2 border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center space-x-2 animate-in fade-in zoom-in-95 duration-150">
          {/* Breakpoint Badge */}
          <span className={`px-1.5 py-0.5 rounded-lg text-[10px] font-black ${badgeColor}`}>
            {breakpoint}
          </span>

          {/* Sizing Info */}
          <div className="text-[11px] font-extrabold text-slate-800 flex items-center space-x-1">
            <span>{width}×{height}</span>
            <span className="text-slate-400 text-[9px]">px</span>
          </div>

          {/* Device Category */}
          <span className="text-[10px] font-bold text-slate-600 hidden sm:inline-flex items-center space-x-1">
            <Icon name={deviceIcon} className="text-xs" />
            <span>{deviceType}</span>
          </span>

          {/* Collapse Button */}
          <button
            onClick={() => setIsExpanded(false)}
            title="ย่อแถบวัดขนาด"
            className="w-5 h-5 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-900 flex items-center justify-center text-slate-700 text-[10px] font-black ml-1"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          title={`แตะเพื่อดูขนาดหน้าจอ (${width}×${height}px)`}
          className="manga-btn px-2 py-1 bg-slate-900 text-amber-400 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] text-[10px] font-black flex items-center space-x-1"
        >
          <Icon name="straighten" className="text-xs text-amber-400" />
          <span>{width}px</span>
        </button>
      )}
    </aside>
  );
};
