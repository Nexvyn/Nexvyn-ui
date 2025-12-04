"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github } from "lucide-react";
import { LightDarkMode } from "@/components/ui/light-dark-mode";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/command-palette";

export function Navbar() {
  return (
    <header
      className=" font-pixelify      w-full  p-2 flex items-center justify-between z-50   h-12  "
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className=" flex items-center gap-2">
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
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size={"icon"} aria-label="Twitter">
          <FaXTwitter />
        </Button>
        <div className="hidden sm:block gap-x-2">
          <CommandPalette />
        </div>
        <Button variant="ghost" aria-label="GitHub">
          <Github />9
        </Button>
        <LightDarkMode />
      </div>

      <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2 "></span>
      <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2 "></span>
      <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
      <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </header>
  );
}
