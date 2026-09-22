// components/SvgImage.tsx - Safe SVG & External Image renderer component
"use client";

import React, { useState, useEffect } from "react";

interface SvgImageProps {
  svgContent?: string;
  imageUrl?: string;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain" | "fill";
  position?: string;
}

export const SvgImage: React.FC<SvgImageProps> = ({
  svgContent,
  imageUrl,
  alt = "Illustration",
  className = "w-full h-full",
  fit = "cover",
  position = "center",
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(imageUrl);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(imageUrl);
    setHasError(false);
  }, [imageUrl]);

  const handleError = () => {
    // Self-healing: if Wikia image with revision params failed, try stripping query params
    if (currentSrc && currentSrc.includes("static.wikia.nocookie.net") && currentSrc.includes("/revision/latest")) {
      const cleanUrl = currentSrc.replace(/\/revision\/latest.*$/, "");
      if (cleanUrl !== currentSrc) {
        setCurrentSrc(cleanUrl);
        return;
      }
    }
    setHasError(true);
  };

  // If image URL is provided and has not errored, render img element
  if (currentSrc && !hasError) {
    const objectFitClass =
      fit === "contain" ? "object-contain" : fit === "fill" ? "object-fill" : "object-cover";
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-100 ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentSrc}
          alt={alt}
          onError={handleError}
          className={`w-full h-full ${objectFitClass}`}
          style={{ objectPosition: position }}
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback to SVG content
  return (
    <div
      className={`w-full h-full flex items-center justify-center overflow-hidden bg-slate-50 p-2 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full [&>svg]:object-contain ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent || "" }}
    />
  );
};
