"use client";

import Image from "next/image";
import { LightDarkMode } from "@/components/ui/light-dark-mode";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/command-palette";
import Link from "next/link";
import { GithubIcon } from "@/components/ui/github";
import { FlaskIcon } from "@/components/ui/flask";

export function Navbar() {
  return (
    <header
      className=" font-pixelify      w-full  sm:p-2 flex items-center justify-between z-50   h-12     "
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <Link href={"/"} className=" flex items-center gap-2">
        <div className="text-3xl font-pixelify flex items-center">
          <Image
            src="/logo/static/logo.svg"
            alt="Pixel Perfect Logo"
            width={50}
            height={50}
            className="w-12 sm:w-8 aspect-square dark:invert -mr-1"
          />
          <span className="hidden sm:inline">ixel Perfect</span>
        </div>
      </Link>

      <div className="hidden md:flex gap-1">
        <Button variant={"ghost"}>Docs</Button>
        <Button variant={"ghost"}>Components</Button>
        <Button variant={"ghost"}>Blocks</Button>
        <div className="hidden lg:block  ml-2">
          <CommandPalette />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link href={"https://github.com/Nexvyn/pro-pixel-perfect"}>
          <Button variant="ghost" aria-label="GitHub">
            <GithubIcon />
            {/* <StarsCount /> */}
            ??
          </Button>
        </Link>
        <Link href={"/playground"}>
          <Button variant={"ghost"} size={"icon"}>
            <FlaskIcon />
          </Button>
        </Link>

        <LightDarkMode />
      </div>
    </header>
  );
}
