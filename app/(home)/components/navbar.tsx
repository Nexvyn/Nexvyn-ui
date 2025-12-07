"use client";

import Image from "next/image";
import { FlaskConical, Github, Play } from "lucide-react";
import { LightDarkMode } from "@/components/ui/light-dark-mode";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/command-palette";
import Link from "next/link";

export function Navbar() {
  return (
    <header
      className=" font-pixelify      w-full  p-2 flex items-center justify-between z-50   h-12     "
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <Link href={"/"} className=" flex items-center gap-2">
        <Image
          src="/logo/final-light.png"
          alt="Pixel Perfect Logo"
          width={32}
          height={32}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 dark:hidden block"
        />{" "}
        <Image
          src="/logo/final-dark.png"
          alt="Pixel Perfect Logo"
          width={32}
          height={32}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 hidden dark:block"
        />
        <span className=" text-xl ">Pixel Perfect</span>{" "}
      </Link>

      <div className="flex items-center gap-2">
        <div className="hidden sm:block gap-x-2">
          <CommandPalette />
        </div>

        <Link href={"https://github.com/Nexvyn/pro-pixel-perfect"}>
          <Button variant="ghost" aria-label="GitHub">
            <Github />
            11
          </Button>
        </Link>
        <Link href={"/playground"}>
          <Button variant={"ghost"} size={"icon"}>
            <FlaskConical />
          </Button>
        </Link>

        <LightDarkMode />
      </div>
    </header>
  );
}
