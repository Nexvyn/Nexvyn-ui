"use client";

import Link from "next/link";
import { LayoutGroup, motion } from "motion/react";
import type { Component } from "@/lib/get-components";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const MotionLink = motion.create(Link);

const VoronoiBackground = dynamic(() => import("./voronoi-background"), {
  loading: () => <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800" />,
  ssr: false, 
});

export function HeroSection({ allComps }: { allComps: Component[] | null }) {
  return (
    <section className="w-full grain h-[calc(100vh-64px)] mt-12 rounded-2xl overflow-hidden font-pixelify md:overflow-clip overscroll-none flex flex-col items-center justify-center relative px-4 sm:px-6 md:px-8">
      
      <VoronoiBackground className="absolute inset-0 w-full h-full z-0" />

      <div className="flex flex-col justify-center items-center w-full max-w-[280px] sm:max-w-[350px] md:max-w-[550px] lg:max-w-[750px] xl:max-w-[850px] z-10 relative pointer-events-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight tracking-tight font-bold">
          <span> Build Stunning </span>
          <LayoutGroup>
            <span className="flex whitespace-pre">
              <span className="flex whitespace-pre">
                Websites in <span className="dark:text-blue-500">minutes</span>
              </span>
            </span>
          </LayoutGroup>
        </h1>
        <p className="text-xs text-muted-foreground sm:text-base md:text-lg lg:text-xl xl:text-xl text-center mt-2 sm:mt-3 md:mt-4 px-2 sm:px-4 leading-relaxed">
          Build beautiful, responsive interfaces in minutes. A pixel-perfect
          <br />
          React component library for modern web apps.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 items-center mt-8 sm:mt-10 md:mt-12 lg:mt-14 w-full sm:w-auto">
          <Link href="/docs" className="w-full sm:w-auto">
            <Button size="default">Browse Components</Button>
          </Link>
          <Link
            href={"https://github.com/Nexvyn/"}
            className="w-full sm:w-auto"
          >
            <Button variant={"secondary"} size="default">
              Want Custom Components
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
