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
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={cn(
        "h-8 px-2.5 rounded-full border border-border/40 hover:border-border",
        "bg-background/40 hover:bg-secondary/60 backdrop-blur-sm",
        "flex items-center gap-1.5 font-mono text-xs transition-all duration-300",
        className
      )}
      aria-label={t("misc.langSwitchAria", "Switch language")}
      title={language === "en" ? "切换为中文" : "Switch to English"}
    >
      <Languages className="size-3.5 text-muted-foreground transition-transform duration-300 group-hover:rotate-12" />
      {showLabel && (
        <span className="flex items-center gap-1 select-none text-[11px] font-medium tracking-wide">
          <span
            className={cn(
              "transition-colors",
              language === "en"
                ? "text-foreground font-bold"
                : "text-muted-foreground/60 hover:text-muted-foreground"
            )}
          >
            EN
          </span>
          <span className="text-muted-foreground/30 text-[10px]">/</span>
          <span
            className={cn(
              "transition-colors",
              language === "zh"
                ? "text-foreground font-bold"
                : "text-muted-foreground/60 hover:text-muted-foreground"
            )}
          >
            中文
          </span>
        </span>
      )}
    </Button>
  );
}
