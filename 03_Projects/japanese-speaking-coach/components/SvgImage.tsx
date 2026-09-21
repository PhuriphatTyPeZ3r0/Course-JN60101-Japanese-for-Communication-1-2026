// components/SvgImage.tsx - Safe SVG image renderer component
"use client";

import React from "react";

interface SvgImageProps {
  svgContent: string;
  className?: string;
}

export const SvgImage: React.FC<SvgImageProps> = ({ svgContent, className = "w-48 h-48 mx-auto" }) => {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white p-2 ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
