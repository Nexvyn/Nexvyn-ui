"use client"

import Link from "next/link"

import type { Component } from "@/lib/get-components"
import Floating, { FloatingElement } from "@/components/ui/our/common/floating"
import HoverVideo from "@/components/ui/our/common/hover-video"

interface HeroImage {
  url: string
  depth: number
  className: string
  imageClassName: string
  rotation?: string
}

export function HeroImages({ allComps }: { allComps: Component[] }) {
  if (!Array.isArray(allComps)) {
    console.error("allComps is not an array:", allComps)
    return null
  }

  const images: HeroImage[] = [
    {
      url: "https://i.pinimg.com/1200x/a6/8f/13/a68f138e01f6be7416de55871eeb5c61.jpg",
      depth: 0.5,
      className: "top-[15%] left-[2%] md:top-[25%] md:left-[5%]",
      imageClassName: "w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 aspect-square",
      rotation: "-rotate-[3deg]",
    },
    {
      url: "https://i.pinimg.com/originals/83/4c/f3/834cf38ce6a44974aad1d522f2194025.gif",
      depth: 1,
      className: "top-[0%] left-[8%] md:top-[6%] md:left-[11%]",
      imageClassName: "w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48",
    },
    {
      url: "https://i.pinimg.com/originals/f8/ba/9b/f8ba9b7f92fa91361e251c72e213c11a.gif",
      depth: 4,
      className: "top-[90%] left-[6%] md:top-[80%] md:left-[8%]",
      imageClassName: "w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64",
      rotation: "-rotate-[4deg]",
    },
    {
      url: "https://i.pinimg.com/originals/08/4e/b0/084eb05bf64dda23389de7de410583da.gif",
      depth: 2,
      className: "top-[0%] left-[87%] md:top-[2%] md:left-[83%]",
      imageClassName: "w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56",
      rotation: "rotate-[6deg]",
    },
    {
      url: "https://i.pinimg.com/originals/6f/1b/f1/6f1bf1e312e5f9ab4d8b66b1b7249326.gif",
      depth: 1,
      className: "top-[78%] left-[83%] md:top-[68%] md:left-[83%]",
      imageClassName: "w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80",
      rotation: "rotate-[19deg]",
    },
  ]

  return (
    <Floating sensitivity={-0.5} className="pointer-events-none z-[2] h-full">
      {images.map((image, index) => (
        <FloatingElement key={index} depth={image.depth} className={image.className}>
          <Link
            href={image.url}
            className={`focus-visible:ring-primary-blue inline-block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              image.rotation || ""
            }`}
          >
            <HoverVideo
              thumbnail={image.url}
              videoSrc={image.url}
              className={`${image.imageClassName} cursor-pointer rounded-xl object-cover shadow-2xl transition-transform duration-200 hover:scale-105`}
              delay={0.8}
            />
          </Link>
        </FloatingElement>
      ))}
    </Floating>
  )
}
