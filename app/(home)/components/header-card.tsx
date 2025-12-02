"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";
import { ModeToggle } from "./light-dark-mode";
import { Button } from "@/components";

const MotionLink = motion.create(Link);

export function HeaderCard() {
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
      <Link href="/" className=" flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Pixel Perfect Logo"
          width={32}
          height={32}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
        />
        <span className="  font-semibold">Pixel Perfect</span>
      </Link>

      <nav className="flex items-center">
        <Button variant="ghost" size="icon">
          <Twitter />
        </Button>
        <Button variant="ghost" size={"sm"}>
          <Github />
          1.1k
        </Button>
        <ModeToggle />
      </nav>
    </motion.header>
  );
}
