"use client"

import React, { useEffect } from "react"
import Lenis from "lenis"

interface LenisProviderProps {
  children: React.ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3), 
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
