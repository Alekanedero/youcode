"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export type LogoItemProps = {
  src: string;
  alt: string;
  title?: string;
  text?: string;
  isActiveThemeWhite?: boolean;
  isActiveThemeBlack?: boolean;
  whitoutBorder?: boolean;
};

export const LogoItem = ({
  src,
  alt,
  title,
  text,
  isActiveThemeWhite = false,
  isActiveThemeBlack = false,
  whitoutBorder = false,
}: LogoItemProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Évite l'erreur d'hydratation en rendant un fallback avant le montage
  if (!mounted) {
    return <div className="w-16 h-16 bg-gray-300 rounded-lg" />;
  }
  return (
    <div className="flex flex-row items-center gap-4">
      <div
        className={cn(
          "w-16 h-16 border border-dashed border-gray-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:border-gray-200",
          resolvedTheme === "light"
            ? "border-gray-950 hover:border-gray-400"
            : "",
          whitoutBorder ? "border-none" : ""
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={40}
          height={40}
          className={cn(
            isActiveThemeBlack && resolvedTheme === "dark"
              ? "invert brightness-0"
              : "",
            isActiveThemeWhite && resolvedTheme === "light" ? "invert" : "",
            theme === "light" ? "hover:border-gray-800" : ""
          )}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-gray-400 text-sm">{text}</p>
      </div>
    </div>
  );
};
