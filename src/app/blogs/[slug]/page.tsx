import React from "react";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import BlogPostClient from "./blog-post-client";
import { BLOGS_ZH } from "@/data/translations";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return {
    title: `${post.metadata.title} | Portfolio`,
    description: post.metadata.summary,
  };
}

const components = {
  h1: (props: any) => (
    <h1
      className="font-display text-2xl md:text-3xl leading-[1.15] mt-14 mb-6 text-foreground"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="font-display text-xl md:text-2xl leading-[1.2] mt-12 mb-4 text-foreground relative"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="font-display text-lg md:text-xl leading-[1.25] mt-8 mb-3 text-foreground"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="text-muted-foreground leading-[1.8] mb-7 text-[17px] font-sans"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="mb-7 text-muted-foreground space-y-3 text-[17px] leading-[1.8] font-sans"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="list-decimal mb-7 text-muted-foreground space-y-3 text-[17px] leading-[1.8] font-sans pl-5"
      {...props}
    />
  ),
  li: (props: any) => (
    <li
      className="pl-2 relative before:content-['–'] before:absolute before:-left-5 before:text-[hsl(20,100%,70%)] before:font-medium"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-2 border-[hsl(20,100%,70%)] pl-6 my-8 text-foreground/80 italic text-lg leading-relaxed font-sans"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="bg-muted/50 text-[hsl(20,100%,65%)] px-1.5 py-0.5 rounded text-[15px] font-mono"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-[hsl(222,84%,3%)] p-5 rounded-xl overflow-x-auto mb-8 border border-border/50 text-sm leading-relaxed"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="text-[hsl(20,100%,70%)] hover:text-[hsl(20,100%,80%)] underline decoration-[hsl(20,100%,70%)]/30 underline-offset-4 hover:decoration-[hsl(20,100%,70%)] transition-colors"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  ),
  strong: (props: any) => (
    <strong className="text-foreground font-semibold" {...props} />
  ),
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const zhPost = BLOGS_ZH[slug] ?? null;

  const enContent = <MDXRemote source={post.content} components={components} />;
  const zhContent = zhPost?.content ? (
    <MDXRemote source={zhPost.content} components={components} />
  ) : (
    enContent
  );

  return (
    <BlogPostClient
      slug={slug}
      post={{ ...post, slug }}
      zhPost={zhPost}
      enContent={enContent}
      zhContent={zhContent}
    />
  );
}
