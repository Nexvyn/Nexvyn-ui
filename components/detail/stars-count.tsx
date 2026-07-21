'use client'

import { useState, useEffect, useRef } from 'react'
import { useAnimate } from 'motion/react'
import NumberFlow from '@number-flow/react'

export function StarsCount() {
  const [stars, setStars] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [scope, animate] = useAnimate()
  const blinkTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/Nexvyn/Nexvyn-ui')
      .then((res) => res.json())
      .then((json) => {
        if (json && typeof json.stargazers_count === 'number') {
          setStars(json.stargazers_count)
        }
      })
      .catch(() => {})
  }, [])

  const starRest =
    'M44.3662 64.2642C50.49 53.2829 53.5495 47.7922 58.1267 47.7922C62.7038 47.7922 65.7633 53.2829 71.8872 64.2642L73.4725 67.1062C75.2125 70.2285 76.0825 71.7897 77.4358 72.8192C78.7892 73.8487 80.4808 74.2305 83.8642 74.9942L86.9382 75.6902C98.8282 78.3824 104.768 79.726 106.185 84.2742C107.596 88.8175 103.546 93.559 95.44 103.037L93.3423 105.488C91.0417 108.18 89.8865 109.528 89.3694 111.191C88.8522 112.859 89.0262 114.657 89.3742 118.248L89.6932 121.52C90.916 134.169 91.5298 140.491 87.8275 143.299C84.1252 146.107 78.5572 143.545 67.4308 138.422L64.5453 137.098C61.3843 135.638 59.8038 134.913 58.1267 134.913C56.4495 134.913 54.869 135.638 51.708 137.098L48.8273 138.422C37.6962 143.545 32.1282 146.107 28.4307 143.304C24.7235 140.491 25.3373 134.169 26.5602 121.52L26.8792 118.253C27.2272 114.657 27.4012 112.859 26.8792 111.196C26.3668 109.528 25.2117 108.18 22.911 105.493L20.8133 103.037C12.7078 93.5639 8.65751 88.8224 10.0688 84.2742C11.4802 79.726 17.43 78.3775 29.32 75.6902L32.394 74.9942C35.7725 74.2305 37.4593 73.8487 38.8175 72.8192C40.1757 71.7897 41.0408 70.2285 42.7808 67.1062L44.3662 64.2642Z'

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let isPlaying = true
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms)
        timers.push(id)
      })

    const playBounceSequence = async () => {
      await wait(1500)
      while (isPlaying) {
        await animate('.mascot-coin', { y: -8 }, { type: 'spring', stiffness: 500, damping: 20, mass: 0.6 })
        if (!isPlaying) return
        await animate('.mascot-coin', { y: 0 }, { type: 'spring', stiffness: 400, damping: 25 })
        if (!isPlaying) return
        const randomWait = Math.random() * 5000 + 3000
        await wait(randomWait)
      }
    }

    const playBlinkSequence = async () => {
      await wait(2000)
      while (isPlaying) {
        await animate('.mascot-eye', { scaleY: 0.1 }, { duration: 0.05 })
        if (!isPlaying) return
        await animate('.mascot-eye', { scaleY: 1 }, { duration: 0.05 })
        if (!isPlaying) return
        const randomWait = Math.random() * 4000 + 2000
        await wait(randomWait)
      }
    }

    playBounceSequence()
    playBlinkSequence()

    return () => {
      isPlaying = false
      timers.forEach(clearTimeout)
    }
  }, [animate])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (blinkTimeout.current) clearTimeout(blinkTimeout.current)
    animate('.mascot-eye', { scaleY: 0.1 }, { duration: 0.05 })
    blinkTimeout.current = setTimeout(() => {
      animate('.mascot-eye', { scaleY: 1 }, { duration: 0.05 })
    }, 150)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (blinkTimeout.current) clearTimeout(blinkTimeout.current)
    animate('.mascot-eye', { scaleY: 1 }, { duration: 0.05 })
  }

  return (
    <span
      ref={scope}
      className="inline-flex items-center gap-1.5 cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered ? 'translateY(-1px) scale(1.02)' : 'none',
      }}
    >
      <style>{`
        .mascot-coin { position: absolute; inset: 0; width: 100%; height: 100%; transform-style: preserve-3d; transform-origin: center calc(50% + 20px); }
        .mascot-face { position: absolute; inset: 0; width: 100%; height: 100%; backface-visibility: hidden; }
        .mascot-face-back { transform: rotateY(180deg) translateZ(1px); }
        .mascot-eye { transform-origin: center; transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) {
          .mascot-eye, .mascot-coin { animation: none !important; transform: none !important; }
        }
      `}</style>
      <span className="relative inline-block" style={{ width: 24, height: 24, perspective: '1000px' }}>
        <div className="mascot-coin">
          <svg aria-hidden="true" viewBox="0 35 120 120" fill="none" className="mascot-face">
            <path d={starRest} fill="currentColor" className="mascot-wave-path" />
            <circle cx="40" cy="92" r="5" fill="var(--color-bg)" className="mascot-eye" />
            <circle cx="76" cy="92" r="5" fill="var(--color-bg)" className="mascot-eye" />
          </svg>
          <svg aria-hidden="true" viewBox="0 35 120 120" fill="none" className="mascot-face mascot-face-back">
            <path d={starRest} fill="currentColor" />
          </svg>
        </div>
      </span>
      <NumberFlow
        value={stars}
        format={{ notation: 'compact', maximumFractionDigits: 1 }}
        className="tabular-nums text-sm"
        style={{ fontWeight: 500, letterSpacing: '-0.02em' }}
        transformTiming={{ duration: 600, easing: 'ease-out' }}
        spinTiming={{ duration: 500, easing: 'ease-out' }}
        opacityTiming={{ duration: 400, easing: 'ease-out' }}
      />
    </span>
  )
}