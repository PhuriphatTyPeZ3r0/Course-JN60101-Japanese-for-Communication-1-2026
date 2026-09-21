// components/Icon.tsx - Google Material Symbols Icon Component
"use client";

import React from "react";

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  filled = false,
}) => {
  return (
    <span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center leading-none ${className}`}
      style={{
        fontVariationSettings: filled
          ? "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24"
          : "'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24",
      }}
    >
      {name}
    </span>
  );
};
