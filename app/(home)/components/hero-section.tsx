"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import LogoCloud from "@/components/logo-cloud";
import TextRotate from "@/components/ui/text-rotate";

export function HeroSection() {
  return (
    <section className="w-full h-[calc(100vh-72px)] border-dashed border  overflow-hidden  md:overflow-clip overscroll-none flex flex-col items-center justify-center relative px-4 sm:px-6 md:px-8  rounded-xl">
      <div className="flex flex-col justify-center items-center w-full max-w-[280px] sm:max-w-[350px] md:max-w-[550px] lg:max-w-[750px] xl:max-w-[850px] z-10 relative pointer-events-auto">
        <h1 className="text-3xl font-pixelify sm:text-4xl md:text-7xl   text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight tracking-tight font-medium">
          <span> Build Stunning </span>
          <span className="flex whitespace-pre">
            <span className="flex  transition-all   duration-200">
              Websites in{" "}
              <TextRotate
                texts={[
                  "minutes",
                  "seconds",
                  "instant",
                  "effortless",
                  "quickly",
                  "swiftly",
                  "easily",
                  "smarter",
                  "stylish",
                  "perfect",
                  "flawless",
                ]}
              />{" "}
            </span>
          </span>
        </h1>
        <p className="text-xs  sm:text-base md:text-md text-center mt-2 sm:mt-3 md:mt-4 px-2 sm:px-4 leading-relaxed">
          Build beautiful, responsive interfaces in minutes. A pixel-perfect
          <br />
          React component library for modern web apps.
        </p>

        <div className="flex  flex-row flex-wrap  justify-center   gap-3 sm:gap-4 items-center mt-10 w-full ">
          <Link href="/docs">
            <RainbowButton className=" rounded-md" size="default">
              Browse Components
            </RainbowButton>
          </Link>
          <Link href={"https://github.com/Nexvyn/pixel-perfect"}>
            <Button variant={"secondary"} size="default">
              Custom Components
            </Button>
          </Link>
        </div>
        <LogoCloud />
      </div>

      <div
        style={{ animationDuration: "30s" }} // <- overrides Tailwind's duration
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,var(--color-blue-600),var(--color-black)_100%)] animate-pulse"
      />
    </section>
  );
}
