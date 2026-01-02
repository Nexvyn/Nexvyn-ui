"use client"

import React, { useMemo, useState, useEffect } from "react"
import { useTheme } from "next-themes"

const FlowBackground: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const BAR_COUNT = 256

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000
    return x - Math.floor(x)
  }

  const bars = useMemo(() => {
    return Array.from({ length: BAR_COUNT }).map((_, i) => {
      const x = i / BAR_COUNT

      const peakPosition = 0.75
      const spread = 0.15

      const mainShape = Math.exp(-Math.pow(x - peakPosition, 2) / (2 * Math.pow(spread, 2)))

      let baseHeight = 0.05

      if (x < peakPosition) {
        baseHeight += (x / peakPosition) * 0.3
      } else {
        baseHeight += ((1 - x) / (1 - peakPosition)) * 0.3
      }

      const envelope = baseHeight * 0.3 + mainShape * 0.7

      const noise = seededRandom(i + 1)

      const sineNoise1 = Math.sin(i * 0.5) * 0.15 + 0.5
      const sineNoise2 = Math.sin(i * 1.2 + 3.14) * 0.1 + 0.5
      const combinedNoise = noise * 0.6 + sineNoise1 * 0.25 + sineNoise2 * 0.15

      let finalHeight = envelope * (0.35 + combinedNoise * 0.85)

      finalHeight = Math.max(0.02, Math.min(1.0, finalHeight))

      const opacity = 0.8 + finalHeight * 0.2
      let bloom = "none"
      if (finalHeight > 0.35) {
        const bloomOpacity = 0.2 + finalHeight * 0.4
        const bloomRadius = 4 + finalHeight * 16
        bloom = `0 0 ${bloomRadius}px rgba(255, 255, 255, ${bloomOpacity})`
      }

      return {
        height: Math.round(finalHeight * 10000) / 10000,
        opacity: Math.round(opacity * 10000) / 10000,
        bloom,
      }
    })
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  const bgColor = isDark ? "#050505" : "#fafafa"
  const barColor = isDark ? "200, 220, 255" : "60, 100, 200"
  const watermarkColor = isDark ? "text-white" : "text-black"
  const vignetteColor = isDark ? "#050505" : "#fafafa"

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex h-full w-full flex-col justify-end overflow-hidden select-none">
      <div className="relative z-10 flex h-[85%] w-full items-end gap-[1px] px-4 md:gap-[2px] md:px-12">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="w-full rounded-t-[1px]"
            style={{
              height: `${bar.height * 100}%`,
              opacity: bar.opacity,
              background: `linear-gradient(to top, 
                rgba(${barColor}, 0.9) 0%, 
                rgba(${barColor}, 0.6) 50%, 
                rgba(${barColor}, 0.2) 100%
              )`,
              boxShadow: bar.bloom,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 opacity-10">
        <div
          className="absolute inset-0 h-1/2"
          style={{
            background: `linear-gradient(to bottom, ${vignetteColor} 0%, transparent 100%)`,
          }}
        />

        <div
          style={{
            background: `linear-gradient(to right, ${vignetteColor} 0%, transparent 30%, transparent 70%, ${vignetteColor} 100%)`,
          }}
          className="absolute inset-0"
        />
      </div>

      <div
        className="absolute inset-0 z-30 mix-blend-overlay"
        style={{
          opacity: isDark ? 0.15 : 0.08,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  )
}

export default FlowBackground
