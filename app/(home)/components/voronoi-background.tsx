"use client"

import { useEffect, useState } from "react"
import { GrainGradient } from "@paper-design/shaders-react"

const DEFAULT_COLORS = ["#e8f4ff", "#5a9fd4", "#1e3a5f"]

const VoronoiBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null
  }

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <GrainGradient
        width={dimensions.width}
        height={dimensions.height}
        colors={DEFAULT_COLORS}
        colorBack="#c5e3ff"
        softness={0.6}
        intensity={0.8}
        noise={0.7}
        shape="wave"
        speed={1.4}
      />
    </div>
  )
}

export default VoronoiBackground
