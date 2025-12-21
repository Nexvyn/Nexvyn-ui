"use client"

import dynamic from "next/dynamic"

const CardStackAnimate = dynamic(() => import("@/components/ui/our/common/cards"), {
  ssr: false,
  loading: () => <div className="flex h-screen w-full items-center justify-center">Loading...</div>,
})

export function CardStackAnimateWrapper() {
  return <CardStackAnimate />
}
