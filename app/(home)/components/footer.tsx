"use client";

import { BoxyBorder } from "@/components/ui/boxy-border";
import { Button } from "@/components/ui/button";
import { Github, Heart } from "lucide-react";
import { FaDiscord, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="grain p-3 sm:p-4 overflow-hidden relative">
      <div className="font-pixelify absolute bottom-0 left-0 right-0 mx-auto translate-y-[5%] select-none text-center font-bold leading-none tracking-tighter text-muted text-[40px] sm:text-[60px] md:text-[80px] lg:text-[120px] xl:text-[140px]">
        pixel perfect
      </div>

      <div className="flex flex-col sm:flex-row w-full justify-between gap-4 sm:gap-6">
        <div className="text-xs sm:text-sm max-w-xs sm:max-w-sm">
          Build beautiful, responsive interfaces in minutes.{" "}
          <span className="hidden sm:inline">
            <br />
          </span>
          A pixel-perfect React component library for modern web apps.
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="size-8 sm:size-9">
            <Github className="size-4" />
          </Button>
          <Button variant="outline" size="icon" className="size-8 sm:size-9">
            <FaXTwitter className="size-4" />
          </Button>
          <Button variant="outline" size="icon" className="size-8 sm:size-9">
            <FaLinkedinIn className="size-4" />
          </Button>
          <Button variant="outline" size="icon" className="size-8 sm:size-9">
            <FaDiscord className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center sm:justify-end mt-12 sm:mt-16 md:mt-20">
        <span className="mt-2 flex flex-wrap items-center justify-center gap-1 text-xs sm:text-sm text-muted-foreground">
          Made with <Heart className="text-red-500" size={12} /> by{" "}
          <span className="group relative">
            <span className="cursor-pointer hover:text-accent-foreground transition-colors">
              Aman(Nexvyn)
            </span>
            <div className="w-10 sm:w-12 object-cover absolute bottom-3 -rotate-6 opacity-0 group-hover:opacity-100 duration-150 transition-all hidden sm:block">
              <img
                src="https://res.cloudinary.com/dz12pywzs/image/upload/v1762336185/Gemini_Generated_Image_qxos2hqxos2hqxos_rlosmn.png"
                alt="Aman"
              />
              <BoxyBorder />
            </div>
          </span>
          &amp;
          <span className="group relative">
            <div className="w-10 sm:w-12 object-cover absolute bottom-5 rotate-12 opacity-0 group-hover:opacity-100 duration-150 transition-all hidden sm:block">
              <img
                src="https://res.cloudinary.com/dz12pywzs/image/upload/v1762336185/Gemini_Generated_Image_qxos2hqxos2hqxos_rlosmn.png"
                alt="Vansh"
              />
              <BoxyBorder />
            </div>
            <span className="cursor-pointer hover:text-accent-foreground transition-colors">
              Vansh Nagar
            </span>
          </span>
        </span>
      </div>

      <BoxyBorder />
    </footer>
  );
}
