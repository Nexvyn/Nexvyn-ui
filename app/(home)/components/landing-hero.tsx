"use client";

import Link from "next/link";
import { LayoutGroup, motion } from "motion/react";

import type { Component } from "@/lib/get-components";
import { HeroImages } from "./hero-images";
import TextRotate from "./text-rotate";
import VoronoiBackground from "./voronoi-background";
import { Button } from "@/components/ui/button";

const MotionLink = motion.create(Link);

export function LandingHero({ allComps }: { allComps: Component[] | null }) {
  return (
    <section className="w-full min-h-screen h-screen rounded-2xl overflow-hidden md:overflow-clip overscroll-none flex flex-col items-center justify-center relative px-4 sm:px-6 md:px-8">
      <VoronoiBackground />

      {allComps && <HeroImages allComps={allComps} />}

      <div className="flex flex-col justify-center items-center w-full max-w-[280px] sm:max-w-[350px] md:max-w-[550px] lg:max-w-[750px] xl:max-w-[850px] z-50 pointer-events-auto">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight tracking-tight font-bold"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span>Make your </span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                website{" "}
              </motion.span>

              <TextRotate
                texts={[
                  "pixel",
                  "fun",
                  "lovely",
                  "weird",
                  "pixel",
                  "dancing",
                  "sexy",
                  "fire",
                  "cool",
                  "go",
                  "fire",
                  "pop",
                  "rock",
                ]}
                mainClassName="overflow-hidden pr-2 sm:pr-3 dark:text-blue-500 py-0 pb-1 sm:pb-2 md:pb-3 lg:pb-4 rounded-xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center mt-2 sm:mt-3 md:mt-4 px-2 sm:px-4 leading-relaxed"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          with a growing library of ready-to-use react components &
          microinteractions. free & open source.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 items-center mt-8 sm:mt-10 md:mt-12 lg:mt-14 w-full sm:w-auto">
          <Link href="/docs" className="w-full sm:w-auto">
            <Button variant={"secondary"} size="default" className="w-full sm:w-auto text-xs sm:text-sm md:text-base">Browse Components</Button>
          </Link>
          <Link href={"https://github.com/Nexvyn/ui.git"} className="w-full sm:w-auto">
            <Button size="default" className="w-full sm:w-auto text-xs sm:text-sm md:text-base">Want Custom Components</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
