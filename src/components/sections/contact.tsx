"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { useLanguage } from "@/contexts/i18n-context";
import { useToast } from "@/components/ui/use-toast";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const ContactSection = () => {
  const { t, isChinese } = useLanguage();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(config.email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = config.email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast({
        title: isChinese ? "已复制到剪贴板！" : "Copied to clipboard!",
        description: config.email,
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: isChinese ? "复制失败" : "Failed to copy",
        description: config.email,
        variant: "destructive",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
    }
  };

  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto ">
      <SectionHeader
        id="contact"
        className="relative mb-14"
        title={
          isChinese ? (
            <>
              携手合作 <br />
              共创精彩
            </>
          ) : (
            <>
              LET&apos;S WORK <br />
              TOGETHER
            </>
          )
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 z-[9999] mx-4">
        <Card className="min-w-7xl bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl mt-10 md:mt-20">
          <CardHeader>
            <CardTitle className="text-4xl">{t("contact.formTitle", "Contact Form")}</CardTitle>
            <CardDescription className="leading-relaxed">
              <span className="inline-block">
                {t("contact.formDescPre", "Please contact me directly at ")}
              </span>{" "}
              <button
                type="button"
                onClick={handleCopy}
                title={copied ? (isChinese ? "已复制！" : "Copied!") : (isChinese ? "点击复制邮箱" : "Click to copy email")}
                aria-label={isChinese ? "点击复制邮箱" : "Click to copy email"}
                className="group relative inline-flex items-center gap-1.5 text-foreground hover:text-primary font-medium cursor-can-hover rounded-md transition-colors underline underline-offset-4 break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{config.email}</span>
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-500 shrink-0 inline-block" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0 inline-block opacity-75 group-hover:opacity-100 transition-opacity" />
                )}
              </button>{" "}
              <span className="inline-block">
                {t("contact.formDescPost", " or drop your info here.")}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
