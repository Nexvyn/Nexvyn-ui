"use client"

import dynamic from "next/dynamic"

const Parallax = dynamic(() => import("@/components/ui/our/common/parallax"), {
  ssr: false,
  loading: () => <div className="flex h-screen w-full items-center justify-center">Loading...</div>,
})

export function ParallaxWrapper() {
  return <Parallax />
}
