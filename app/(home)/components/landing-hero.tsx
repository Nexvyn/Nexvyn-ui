"use client";

import Link from "next/link";
import { LayoutGroup, motion } from "motion/react";

import type { Component } from "@/lib/get-components";
import { HeroImages } from "./hero-images";
import TextRotate from "./text-rotate";
import VoronoiBackground from "./voronoi-background";
import { Button } from "@/components";

const MotionLink = motion.create(Link);

export function LandingHero({ allComps }: { allComps: Component[] | null }) {
  return (
    <section className="w-full h-screen  rounded-2xl overflow-hidden md:overflow-clip overscroll-none flex flex-col items-center justify-center relative">
      <VoronoiBackground />

      {allComps && <HeroImages allComps={allComps} />}

      <div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight"
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
                  "pixel 2",
                  "dancing",
                  "sexy",
                  "cool",
                  "go",
                  "fire",
                  "pop",
                  "rock",
                ]}
                mainClassName="overflow-hidden pr-3  dark:text-blue-500 py-0 pb-2 md:pb-4 rounded-xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overused-grotesk  "
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          with a growing library of ready-to-use react components &
          microinteractions. free & open source.
        </motion.p>

        <div className="flex flex-row justify-center space-x-4 items-center  mt-14 text-xs">
          <Link href="/docs">
            <Button variant={"secondary"}>Browse Components</Button>
          </Link>
          <Link href={"https://github.com/Nexvyn/ui.git"}>
            <Button>Want Custom Components</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
