"use client"

import dynamic from "next/dynamic"

// Dynamically import to avoid SSR issues with GSAP
const CardStackAnimate = dynamic(
  () => import("@/components/ui/our/common/cards").then((mod) => mod.default),
  { ssr: false }
)

export default function CardsPlaygroundPage() {
  return <CardStackAnimate />
}
