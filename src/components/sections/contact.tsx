"use client";
import React from "react";
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

const ContactSection = () => {
  const { t, isChinese } = useLanguage();

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
            <CardDescription>
              {t("contact.formDescPre", "Please contact me directly at ")}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="text-gray-200 cursor-can-hover rounded-lg"
              >
                {config.email.replace(/@/g, "(at)")}
              </a>
              {t("contact.formDescPost", " or drop your info here.")}
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
