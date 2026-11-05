"use client";

import React from "react";
import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/i18n-context";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function LanguageToggle({
  className,
  showLabel = true,
}: LanguageToggleProps) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={cn(
        "h-9 px-3.5 rounded-full border border-border/80 hover:border-border",
        "bg-card/70 hover:bg-card/95 backdrop-blur-md shadow-xs",
        "flex items-center gap-2 font-mono text-xs md:text-sm transition-all duration-300",
        "cursor-can-hover select-none",
        className
      )}
      aria-label={t("misc.langSwitchAria", "Switch language")}
      title={language === "en" ? "切换为中文 (Switch to Chinese)" : "Switch to English (切换为英文)"}
    >
      <Languages className="size-4 shrink-0 text-foreground/85 transition-transform duration-300 group-hover:rotate-12" />
      {showLabel && (
        <span className="flex items-center gap-1.5 select-none font-medium tracking-wide">
          <span
            className={cn(
              "px-1.5 py-0.5 rounded text-xs transition-all duration-200",
              language === "en"
                ? "bg-foreground/15 text-foreground font-bold shadow-xs ring-1 ring-border/40"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            EN
          </span>
          <span className="text-muted-foreground/40 text-xs font-sans">/</span>
          <span
            className={cn(
              "px-1.5 py-0.5 rounded text-xs transition-all duration-200",
              language === "zh"
                ? "bg-foreground/15 text-foreground font-bold shadow-xs ring-1 ring-border/40"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            中文
          </span>
        </span>
      )}
    </Button>
  );
}
