"use client";

import { Model3D } from "@/components/ui/3dmodel";
import { Button } from "@/components/ui/button";
import { Github, Heart } from "lucide-react";
import Image from "next/image";
import { FaDiscord, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className=" grain p-4   overflow-hidden">
      {" "}
      <div className="   font-pixelify   text-[170px] flex justify-center dark:text-[#2b2b2b] text-[#e8e9f0] text-shadow-blue-700  text-nowrap  absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2">
        PIXEL PERFECT
      </div>
      <div className=" flex gap-2">
        <Button variant={"outline"} size={"icon"}>
          <Github />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <FaXTwitter />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <FaLinkedinIn />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <FaDiscord />
        </Button>
      </div>
      <div className="mt-2 text-sm">
        Build beautiful, responsive interfaces in minutes. <br /> A
        pixel-perfect React component library for modern web apps.
      </div>{" "}
      <div className=" flex justify-end mt-20">
        <span className=" mt-2 flex items-center gap-1 text-sm  text-muted-foreground">
          Made with <Heart className="" size={13} /> by{" "}
          <span className="group">
            <span className=" cursor-pointer group-hover:text-accent-foreground ">
              Aman(Nexvyn){" "}
            </span>
            <div className=" w-12 object-cover  absolute  bottom-3 -rotate-6  opacity-0 group-hover:opacity-100 duration-150 transition-all ">
              <img
                src="https://res.cloudinary.com/dz12pywzs/image/upload/v1762336185/Gemini_Generated_Image_qxos2hqxos2hqxos_rlosmn.png"
                alt=""
              />{" "}
              <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
              <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
              <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
              <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
            </div>{" "}
          </span>{" "}
          &{" "}
          <span className=" group ">
            {" "}
            <div className=" w-12 object-cover  absolute  bottom-5 rotate-12  opacity-0 group-hover:opacity-100 duration-150 transition-all ">
              <img
                src="https://res.cloudinary.com/dz12pywzs/image/upload/v1762336185/Gemini_Generated_Image_qxos2hqxos2hqxos_rlosmn.png"
                alt=""
              />{" "}
              <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
              <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
              <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
              <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
            </div>
            <span className=" cursor-pointer group-hover:text-accent-foreground ">
              Vansh Nagar{" "}
            </span>
          </span>
        </span>
      </div>
      <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2 "></span>
      <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2 "></span>
      <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
      <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </footer>
  );
}
