"use client"

import dynamic from "next/dynamic"

// Dynamically import to avoid SSR issues with GSAP
const Parallax = dynamic(() => import("@/components/ui/our/common/parallax"), { ssr: false })

export default function ParallaxPlaygroundPage() {
  return <Parallax />
}
