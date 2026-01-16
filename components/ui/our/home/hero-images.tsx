"use client"

import Link from "next/link"

import type { Component } from "@/lib/get-components"
import Floating, { FloatingElement } from "@/components/ui/our/common/floating"
import HoverVideo from "@/components/ui/our/common/hover-video"

interface HeroImage {
  thumbnail: string
  videoSrc?: string
  depth: number
  className: string
  imageClassName: string
  rotation?: string
  href?: string
  isStatic?: boolean
}

export function HeroImages({ allComps }: { allComps: Component[] }) {
  if (!Array.isArray(allComps)) {
    console.error("allComps is not an array:", allComps)
    return null
  }

  const images: HeroImage[] = [
    // Top-left small - Mascot (static image, theme toggle)
    {
      thumbnail: "/mascots/mascot-white.png",
      depth: 0.5,
      className: "top-[15%] left-[2%] md:top-[25%] md:left-[5%]",
      imageClassName: "w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24",
      rotation: "-rotate-[3deg]",
      href: "/",
      isStatic: true,
    },
    // Top-left large - Text animations
    {
      thumbnail: "/hero-image/Morphing Text.png",
      videoSrc: "https://res.cloudinary.com/dkljoxezr/video/upload/v1768529367/Untitled_video_-_Made_with_Clipchamp_2_zjweba.mp4",
      depth: 1,
      className: "top-[0%] left-[8%] md:top-[6%] md:left-[11%]",
      imageClassName: "w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48",
      href: "/docs/components/morphing-text",
    },
    // Bottom-left - Mouse Follower (dark) - theme toggle wise
    {
      thumbnail: "/hero-image/Mouse Follower.png",
      videoSrc: "https://res.cloudinary.com/dkljoxezr/video/upload/v1768529374/Dark_kvqk2q.mp4",
      depth: 4,
      className: "top-[90%] left-[6%] md:top-[80%] md:left-[8%]",
      imageClassName: "w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64",
      rotation: "-rotate-[4deg]",
      href: "/docs/components/mouse-follower",
    },
    // Top-right - Table of Contents
    {
      thumbnail: "/hero-image/Table of Contents.png",
      videoSrc: "https://res.cloudinary.com/dkljoxezr/video/upload/v1768529376/cursorful-video-1768526921277_jznmfr.mp4",
      depth: 2,
      className: "top-[0%] left-[87%] md:top-[2%] md:left-[83%]",
      imageClassName: "w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56",
      rotation: "rotate-[6deg]",
      href: "/docs/components/table-of-contents",
    },
    // Bottom-right - Cards animation
    {
      thumbnail: "/hero-image/scroll-triggered card stack.png",
      videoSrc: "https://res.cloudinary.com/dkljoxezr/video/upload/v1768529375/Untitled_video_-_Made_with_Clipchamp_1_paqscz.mp4",
      depth: 1,
      className: "top-[78%] left-[83%] md:top-[68%] md:left-[83%]",
      imageClassName: "w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80",
      rotation: "rotate-[19deg]",
      href: "/docs/components/cards",
    },
  ]

  return (
    <Floating sensitivity={-0.5} className="pointer-events-none z-[2] h-full">
      {images.map((image, index) => (
        <FloatingElement key={index} depth={image.depth} className={image.className}>
          <Link
            href={image.href || "#"}
            className={`focus-visible:ring-primary-blue pointer-events-auto inline-block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${image.rotation || ""
              }`}
          >
            {image.isStatic ? (
              <img
                src={image.thumbnail}
                alt="Nexvyn UI Mascot"
                className={`${image.imageClassName} cursor-pointer rounded-xl object-cover shadow-2xl transition-transform duration-200 hover:scale-105`}
              />
            ) : (
              <HoverVideo
                thumbnail={image.thumbnail}
                videoSrc={image.videoSrc || image.thumbnail}
                className={`${image.imageClassName} cursor-pointer rounded-xl object-cover shadow-2xl transition-transform duration-200 hover:scale-105`}
                delay={0.8}
              />
            )}
          </Link>
        </FloatingElement>
      ))}
    </Floating>
  )
}
