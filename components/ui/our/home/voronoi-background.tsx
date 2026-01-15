"use client"
import { useEffect, useState, useMemo, useCallback, memo, lazy, Suspense } from "react"

const LIGHT_MODE_COLORS = ["#e8f4ff", "#5a9fd4", "#1e3a5f"]
const DARK_MODE_COLORS = ["#1a1a2e", "#5a9fd4", "#1e3a5f"]
const LIGHT_BACK = "#c5e3ff"
const DARK_BACK = "#0a0a0a"

const GrainGradient = lazy(() =>
  import("@paper-design/shaders-react").then((module) => ({
    default: module.GrainGradient,
  }))
)

function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

interface VoronoiBackgroundProps {
  className?: string
  resizeDelay?: number
  enableOnMobile?: boolean 
  lazyLoad?: boolean 
}

const VoronoiBackground = memo(
  ({
    className = "",
    resizeDelay = 200,
    enableOnMobile = true,
    lazyLoad = true,
  }: VoronoiBackgroundProps) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [shouldRender, setShouldRender] = useState(!lazyLoad)
    const [isLowPowerMode, setIsLowPowerMode] = useState(false)

    const isMobile = useMemo(() => {
      if (typeof window === "undefined") return false
      return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768
      )
    }, [])

    const colors = useMemo(() => (isDarkMode ? DARK_MODE_COLORS : LIGHT_MODE_COLORS), [isDarkMode])

    const colorBack = useMemo(() => (isDarkMode ? DARK_BACK : LIGHT_BACK), [isDarkMode])

    const quality = useMemo(() => {
      if (!isMobile) {
        return { softness: 0.6, intensity: 0.3, noise: 0.2, speed: 1.4 }
      }
      return { softness: 0.5, intensity: 0.2, noise: 0.15, speed: 1.0 }
    }, [isMobile])

    const handleResize = useCallback(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, [])

    const optimizedResize = useMemo(
      () => throttle(handleResize, resizeDelay),
      [handleResize, resizeDelay]
    )

    const updateDarkMode = useCallback(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"))
    }, [])

    useEffect(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      setIsLowPowerMode(prefersReducedMotion)

      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      setIsDarkMode(document.documentElement.classList.contains("dark"))
      setIsMounted(true)

      if (lazyLoad) {
        const timer = setTimeout(() => {
          if ("requestIdleCallback" in window) {
            requestIdleCallback(() => setShouldRender(true), { timeout: 2000 })
          } else {
            setTimeout(() => setShouldRender(true), 100)
          }
        }, 100)
        return () => clearTimeout(timer)
      }
    }, [lazyLoad])

    useEffect(() => {
      if (!isMounted) return

      let resizeObserver: ResizeObserver | null = null
      let rafId: number | null = null

      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => {
          if (rafId) cancelAnimationFrame(rafId)
          rafId = requestAnimationFrame(optimizedResize)
        })
        resizeObserver.observe(document.body)
      } else {
        window.addEventListener("resize", optimizedResize, { passive: true })
      }

      const darkModeObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.attributeName === "class") {
            updateDarkMode()
            break
          }
        }
      })

      darkModeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })

      return () => {
        if (resizeObserver) resizeObserver.disconnect()
        else window.removeEventListener("resize", optimizedResize)
        if (rafId) cancelAnimationFrame(rafId)
        darkModeObserver.disconnect()
      }
    }, [isMounted, optimizedResize, updateDarkMode])

    if (!enableOnMobile && isMobile) {
      return (
        <div
          className={`pointer-events-none ${className}`}
          aria-hidden="true"
          style={{
            background: colorBack,
            opacity: 0.3,
          }}
        />
      )
    }

    if (isLowPowerMode) {
      return (
        <div
          className={`pointer-events-none ${className}`}
          aria-hidden="true"
          style={{
            background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
            opacity: 0.5,
          }}
        />
      )
    }

    if (!isMounted || !shouldRender || dimensions.width === 0) {
      return (
        <div
          className={`pointer-events-none ${className}`}
          aria-hidden="true"
          style={{ opacity: 0 }}
        />
      )
    }

    return (
      <div
        className={`pointer-events-none ${className}`}
        aria-hidden="true"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
          contain: "layout style paint",
        }}
      >
        <Suspense
          fallback={
            <div
              style={{
                background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
                width: "100%",
                height: "100%",
                opacity: 0.5,
              }}
            />
          }
        >
          <GrainGradient
            width={dimensions.width}
            height={dimensions.height}
            colors={colors}
            colorBack={colorBack}
            softness={quality.softness}
            intensity={quality.intensity}
            noise={quality.noise}
            shape="wave"
            speed={quality.speed}
          />
        </Suspense>
      </div>
    )
  }
)

VoronoiBackground.displayName = "VoronoiBackground"

export default VoronoiBackground
