// components/SvgImage.tsx - Safe SVG & External Image renderer component
"use client";

import React, { useState, useEffect } from "react";

interface SvgImageProps {
  svgContent?: string;
  svgString?: string;
  imageUrl?: string;
  imagePath?: string;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain" | "fill";
  position?: string;
}

export const SvgImage: React.FC<SvgImageProps> = ({
  svgContent,
  svgString,
  imageUrl,
  imagePath,
  alt = "Illustration",
  className = "w-full h-full",
  fit = "cover",
  position = "center",
}) => {
  const [imgError, setImgError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(imageUrl);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [imagePath]);

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

  // 1. If imagePath is provided and hasn't errored, render responsive manga-box <img>
  if (imagePath && !imgError) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={imagePath}
        alt={alt}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover rounded-xl border border-slate-900 shadow-[1px_1px_0px_#0f172a]"
        loading="lazy"
      />
    );
  }

  // 2. If legacy imageUrl is provided and has not errored, render img element
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

  // 3. Fallback to vector SVG content
  const content = svgContent || svgString || "";
  return (
    <div
      className={`w-full h-full flex items-center justify-center overflow-hidden bg-slate-50 p-2 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full [&>svg]:object-contain ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
