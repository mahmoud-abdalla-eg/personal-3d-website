"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AppOverlays from "@/components/app-overlays";
import React, { Suspense } from "react";

function FrameContent({
  children,
  githubStars,
}: {
  children: React.ReactNode;
  githubStars?: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isBare =
    (pathname?.startsWith("/components") ||
      searchParams.get("bare") === "true") ??
    false;

  if (isBare) {
    return (
      <>
        <style>{`
          .scroll-indicator,
          div[class*="ScrollDownIcon"],
          div[class*="translate-x-[-50%]"],
          div.absolute.bottom-10 {
            display: none !important;
          }
        `}</style>
        {children}
      </>
    );
  }

  return (
    <>
      <Header githubStars={githubStars} />
      {children}
      <Footer />
      <AppOverlays />
    </>
  );
}

export default function SiteFrame({
  children,
  githubStars,
}: {
  children: React.ReactNode;
  githubStars?: React.ReactNode;
}) {
  return (
    <Suspense fallback={<>{children}</>}>
      <FrameContent githubStars={githubStars}>{children}</FrameContent>
    </Suspense>
  );
}
