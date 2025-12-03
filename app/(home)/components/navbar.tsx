"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { Github } from "lucide-react";
import { LightDarkMode } from "./light-dark-mode";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { StarsCount } from "./stars-count";

export function Navbar() {
  return (
    <motion.header
      className="w-full  md:rounded-xl   px-2  py-1 flex items-center justify-between z-50  backdrop-blur-lg "
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
        <span className="  font-semibold">Pixel Perfect</span>
      </Link>
      <Link href="/" className=" flex items-center gap-2 dark:flex hidden">
        <Image
          src="/logo/final-dark.png"
          alt="Pixel Perfect Logo"
          width={32}
          height={32}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
        />
        <span className="  font-semibold">Pixel Perfect</span>
      </Link>

      <div className="flex items-center">
        <Button variant="ghost" size={"sm"}>
          <FaXTwitter />
        </Button>
        <Button variant="ghost" size={"sm"}>
          <Github />
          {/* <StarsCount /> */}
        </Button>
        <LightDarkMode />
      </div>
    </motion.header>
  );
}
