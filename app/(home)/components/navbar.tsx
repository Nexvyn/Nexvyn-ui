"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github } from "lucide-react";
import { LightDarkMode } from "@/components/ui/light-dark-mode";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/command-palette";

export function Navbar() {
  return (
    <motion.header
      className=" font-pixelify    fixed top-0 inset-x-2  px-2  py-1 flex items-center justify-between z-50   h-12 pt-4 "
      style={{
        transform: "translateZ(0)",
        transformStyle: "preserve-3d",
      }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link href="/" className=" flex items-center gap-2 dark:hidden flex">
        <Image
          src="/logo/final-light.png"
          alt="Pixel Perfect Logo"
          width={32}
          height={32}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
        />
        <span className="  font-semibold ">Pixel Perfect</span>
      </Link>
      <Link href="/" className=" flex items-center gap-2 dark:flex hidden">
        <Image
          src="/logo/final-dark.png"
          alt="Pixel Perfect Logo"
          width={32}
          height={32}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
        />
        <span className="  font-semibold text-2xl">Pixel Perfect</span>
      </Link>

      <div className="flex items-center">
        <div className="hidden sm:block gap-x-2">
          <CommandPalette />
        </div>
        <Button variant="ghost" size={"sm"} aria-label="Twitter">
          <FaXTwitter />
        </Button>
        <Button variant="ghost" size={"sm"} aria-label="GitHub">
          <Github />
          {/* <StarsCount /> */}
        </Button>
        <LightDarkMode />
      </div>
    </motion.header>
  );
}
