"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeDoodle from "./resume-doodle";
import { config } from "@/data/config";
import { useLanguage } from "@/contexts/i18n-context";
import LanguageToggle from "@/components/language-toggle";

export default function ResumeView() {
  const { isChinese, t } = useLanguage();
  const resumePdfPath = isChinese ? config.resume.zhPdf : config.resume.enPdf;
  const resumeDownloadName = isChinese
    ? "CV - Mahmoud Abdalla 中文简历.pdf"
    : "CV - Mahmoud Abdalla.pdf";

  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Hide the global nav on mobile, only while this page is mounted */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@media (max-width: 767px){ header { display: none !important; } }",
        }}
      />

      {/* Top bar with back link + language toggle + download */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("resume.back", "Back to portfolio")}
        </Link>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a href={resumePdfPath} download={resumeDownloadName}>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {t("resume.download", "Download PDF")}
            </Button>
          </a>
        </div>
      </div>

      {/* PDF embed */}
      <div className="mx-auto flex w-full max-w-4xl flex-1 items-start justify-center p-6 md:p-12">
        <motion.div
          key={resumePdfPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="aspect-[210/297] w-full overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <ResumeDoodle
            src={`${resumePdfPath}#toolbar=0&navpanes=0&view=FitH`}
            title={`${config.author} — ${isChinese ? "中文简历" : "Résumé"}`}
          />
        </motion.div>
      </div>
    </div>
  );
}
