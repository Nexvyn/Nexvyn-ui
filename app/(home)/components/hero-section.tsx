"use client";

import Link from "next/link";
import { LayoutGroup, motion } from "motion/react";
import type { Component } from "@/lib/get-components";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const MotionLink = motion.create(Link);

const VoronoiBackground = dynamic(
  () => import("@/components/ui/voronoi-background"),
  {
    loading: () => (
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800" />
    ),
    ssr: false,
  }
);

export function HeroSection({ allComps }: { allComps: Component[] | null }) {
  return (
    <section className="w-full grain h-[calc(100vh-64px)]  overflow-hidden font-pixelify md:overflow-clip overscroll-none flex flex-col items-center justify-center relative px-4 sm:px-6 md:px-8 ">
      <VoronoiBackground className="absolute inset-0 w-full h-full z-0  mask-b-from-50%" />

      <div className="flex flex-col justify-center items-center w-full max-w-[280px] sm:max-w-[350px] md:max-w-[550px] lg:max-w-[750px] xl:max-w-[850px] z-10 relative pointer-events-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight tracking-tight font-bold">
          <span> Build Stunning </span>
          <LayoutGroup>
            <span className="flex whitespace-pre">
              <span className="flex whitespace-pre">Websites in minutes</span>
            </span>
          </LayoutGroup>
        </h1>
        <p className="text-xs  sm:text-base md:text-lg lg:text-xl xl:text-xl text-center mt-2 sm:mt-3 md:mt-4 px-2 sm:px-4 leading-relaxed">
          Build beautiful, responsive interfaces in minutes. A pixel-perfect
          <br />
          React component library for modern web apps.
        </p>

        <div className="flex  flex-row flex-wrap  justify-center   gap-3 sm:gap-4 items-center mt-10 w-full ">
          <Link href="/docs">
            <Button size="default">Browse Components</Button>
          </Link>
          <Link href={"https://github.com/Nexvyn/pixel-perfect"}>
            <Button variant={"secondary"} size="default">
              Custom Components
            </Button>
          </Link>
        </div>
      </div>

      <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2  "></span>
      <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2 "></span>
      <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
      <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </section>
  );
}
