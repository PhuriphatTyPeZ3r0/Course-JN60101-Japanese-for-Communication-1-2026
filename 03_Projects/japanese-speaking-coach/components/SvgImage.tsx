// components/SvgImage.tsx - Safe SVG & External Image renderer component
"use client";

import React, { useState } from "react";

interface SvgImageProps {
  svgContent?: string;
  imageUrl?: string;
  alt?: string;
  className?: string;
}

export const SvgImage: React.FC<SvgImageProps> = ({
  svgContent,
  imageUrl,
  alt = "Illustration",
  className = "w-48 h-48 mx-auto",
}) => {
  const [hasError, setHasError] = useState(false);

  // If image URL is provided and has not errored, render img element
  if (imageUrl && !hasError) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white p-2 ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-contain rounded-xl"
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback to SVG content
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white p-2 ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent || "" }}
    />
  );
};
