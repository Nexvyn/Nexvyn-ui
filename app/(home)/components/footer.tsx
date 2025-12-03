"use client";
import Link from "next/link";
import { Github } from "lucide-react";
import { motion } from "motion/react";
import VoronoiBackground from "./voronoi-background";

const MotionLink = motion.create(Link);
export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 rounded-2xl  grain">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="font-pixelify absolute bottom-0 left-0 right-0 mx-auto translate-y-[5%] select-none text-center font-bold leading-none tracking-tighter text-white/20 text-[80px] lg:text-[140px]">
          pixel perfect
        </div>
      </div>
    </footer>
  );
}
