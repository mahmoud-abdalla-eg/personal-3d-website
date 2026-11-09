"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScrollProgress from "@/components/ui/scroll-progress";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/i18n-context";
import type { BlogTranslation } from "@/data/translations";

interface BlogPostClientProps {
  slug: string;
  post: {
    slug: string;
    metadata: {
      title: string;
      publishedAt: string;
      summary: string;
      author?: string;
      tags?: string[];
    };
    content: string;
  };
  zhPost?: BlogTranslation | null;
  enContent: React.ReactNode;
  zhContent: React.ReactNode;
}

function estimateReadTime(content: string, isChinese = false): number {
  if (isChinese) {
    const chars = content.replace(/\s+/g, "").length;
    return Math.max(1, Math.ceil(chars / 350));
  }
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateStr: string, isChinese: boolean): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(isChinese ? "zh-CN" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostClient({
  slug: _slug,
  post,
  zhPost,
  enContent,
  zhContent,
}: BlogPostClientProps) {
  const { isChinese, t } = useLanguage();

  const title = isChinese && zhPost?.title ? zhPost.title : post.metadata.title;
  const tags = isChinese && zhPost?.tags ? zhPost.tags : (post.metadata.tags ?? []);
  const readTime = isChinese && zhPost?.content
    ? estimateReadTime(zhPost.content, true)
    : estimateReadTime(post.content, false);

  const formattedDate = formatDate(post.metadata.publishedAt, isChinese);

  return (
    <div className="min-h-screen relative font-sans">
      <ScrollProgress className="bg-gradient-to-r from-[hsl(20,100%,70%)] to-[hsl(30,100%,65%)]" />

      {/* Decorative background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[hsl(20,100%,70%)]/[0.03] blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-24 max-w-[720px]">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blogs"
            className="inline-flex items-center text-muted-foreground hover:text-[hsl(20,100%,70%)] transition-colors mb-12 group text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t("blogs.allPosts", "All posts")}
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          {/* Tags */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-[hsl(20,100%,70%)]/20 text-[hsl(20,100%,70%)] bg-[hsl(20,100%,70%)]/5 rounded-full px-3 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl md:text-4xl leading-[1.1] tracking-tight mb-8">
            {title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground pb-8 border-b border-border/50">
            {post.metadata.author && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[hsl(20,100%,70%)]/10 flex items-center justify-center">
                  <User className="w-3 h-3 text-[hsl(20,100%,70%)]" />
                </div>
                {post.metadata.author}
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              {formattedDate}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readTime} {t("blogs.minRead", "min read")}
            </div>
          </div>
        </motion.header>

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <article className="prose prose-invert max-w-none">
            {isChinese && zhContent ? zhContent : enContent}
          </article>
        </motion.div>

        {/* Footer divider & Back link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-20 pt-8 border-t border-border/50"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center text-muted-foreground hover:text-[hsl(20,100%,70%)] transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t("blogs.backAll", "Back to all posts")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
