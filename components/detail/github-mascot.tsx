'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useAnimate } from 'motion/react'

// TODO(nexvyn): Make the mascot animation feel more human-like — add natural

const starRest =
  'M44.3662 64.2642C50.49 53.2829 53.5495 47.7922 58.1267 47.7922C62.7038 47.7922 65.7633 53.2829 71.8872 64.2642L73.4725 67.1062C75.2125 70.2285 76.0825 71.7897 77.4358 72.8192C78.7892 73.8487 80.4808 74.2305 83.8642 74.9942L86.9382 75.6902C98.8282 78.3824 104.768 79.726 106.185 84.2742C107.596 88.8175 103.546 93.559 95.44 103.037L93.3423 105.488C91.0417 108.18 89.8865 109.528 89.3694 111.191C88.8522 112.859 89.0262 114.657 89.3742 118.248L89.6932 121.52C90.916 134.169 91.5298 140.491 87.8275 143.299C84.1252 146.107 78.5572 143.545 67.4308 138.422L64.5453 137.098C61.3843 135.638 59.8038 134.913 58.1267 134.913C56.4495 134.913 54.869 135.638 51.708 137.098L48.8273 138.422C37.6962 143.545 32.1282 146.107 28.4307 143.304C24.7235 140.491 25.3373 134.169 26.5602 121.52L26.8792 118.253C27.2272 114.657 27.4012 112.859 26.8792 111.196C26.3668 109.528 25.2117 108.18 22.911 105.493L20.8133 103.037C12.7078 93.5639 8.65751 88.8224 10.0688 84.2742C11.4802 79.726 17.43 78.3775 29.32 75.6902L32.394 74.9942C35.7725 74.2305 37.4593 73.8487 38.8175 72.8192C40.1757 71.7897 41.0408 70.2285 42.7808 67.1062L44.3662 64.2642Z'

const starWaveUp =
  'M44.3662 64.2642C50.4901 53.2829 53.5496 47.7922 58.1267 47.7922C62.7039 47.7922 65.7634 53.2829 71.8872 64.2642L73.4726 67.1062C75.2126 70.2285 76.0826 71.7897 77.4359 72.8192C78.7892 73.8487 80.4809 74.2305 83.8642 74.9942L86.9382 75.6902C98.8282 78.3824 107.2686 70.446 108.6846 74.9942C110.0956 79.5375 103.5456 93.559 95.4401 103.0372L93.3424 105.4877C91.0417 108.1799 89.8866 109.5284 89.3694 111.191C88.8522 112.8585 89.0262 114.6565 89.3742 118.2477L89.6932 121.5199C90.9161 134.1687 91.5299 140.4912 87.8276 143.2992C84.1252 146.1072 78.5572 143.5452 67.4309 138.4222L64.5454 137.0977C61.3844 135.638 59.8039 134.913 58.1267 134.913C56.4496 134.913 54.8691 135.638 51.7081 137.0977L48.8274 138.4222C37.6962 143.5452 32.1282 146.1072 28.4307 143.3042C24.7236 140.4912 25.3374 134.1687 26.5602 121.5199L26.8792 118.2525C27.2272 114.6565 27.4012 112.8585 26.8792 111.1959C26.3669 109.5284 25.2117 108.1799 22.9111 105.4925L20.8134 103.0372C12.7079 93.5639 8.6576 88.8224 10.0689 84.2742C11.4802 79.726 17.4301 78.3775 29.3201 75.6902L32.3941 74.9942C35.7726 74.2305 37.4594 73.8487 38.8176 72.8192C40.1757 71.7897 41.0409 70.2285 42.7809 67.1062L44.3662 64.2642Z'

const starWaveDown =
  'M44.3662 64.2642C50.4901 53.2829 53.5496 47.7922 58.1267 47.7922C62.7039 47.7922 65.7634 53.2829 71.8872 64.2642L73.4726 67.1062C75.2126 70.2285 76.0826 71.7897 77.4359 72.8192C78.7892 73.8487 80.4809 74.2305 83.8642 74.9942L86.9382 75.6902C98.8282 78.3824 106.2686 84.744 107.6846 89.2922C109.0956 93.8355 103.5456 93.559 95.4401 103.0372L93.3424 105.4877C91.0417 108.1799 89.8866 109.5284 89.3694 111.191C88.8522 112.8585 89.0262 114.6565 89.3742 118.2477L89.6932 121.5199C90.9161 134.1687 91.5299 140.4912 87.8276 143.2992C84.1252 146.1072 78.5572 143.5452 67.4309 138.4222L64.5454 137.0977C61.3844 135.638 59.8039 134.913 58.1267 134.913C56.4496 134.913 54.8691 135.638 51.7081 137.0977L48.8274 138.4222C37.6962 143.5452 32.1282 146.1072 28.4307 143.3042C24.7236 140.4912 25.3374 134.1687 26.5602 121.5199L26.8792 118.2525C27.2272 114.6565 27.4012 112.8585 26.8792 111.1959C26.3669 109.5284 25.2117 108.1799 22.9111 105.4925L20.8134 103.0372C12.7079 93.5639 8.6576 88.8224 10.0689 84.2742C11.4802 79.726 17.4301 78.3775 29.3201 75.6902L32.3941 74.9942C35.7726 74.2305 37.4594 73.8487 38.8176 72.8192C40.1757 71.7897 41.0409 70.2285 42.7809 67.1062L44.3662 64.2642Z'

const starSide =
  'M64,46C72,54 78,60 84,66C94,72 100,80 106,92C100,102 94,108 90,118C86,128 78,138 64,144C50,138 42,128 38,118C34,108 28,102 18,88C18,76 24,66 34,58C44,50 54,46 64,46Z'

export function GitHubMascot({
  isHovered: _isHovered = false,
  onLand,
  runFromRef,
}: {
  isHovered?: boolean
  onLand?: () => void
  runFromRef?: React.RefObject<HTMLElement | null>
}) {
  const gradientId = useId()
  const leftEyeRef = useRef<SVGGElement>(null)
  const rightEyeRef = useRef<SVGGElement>(null)
  const [scope, animate] = useAnimate()
  const [isBlinking, setIsBlinking] = useState(false)
  const isWalkingRef = useRef(false)

  const onLandRef = useRef(onLand)
  useEffect(() => {
    onLandRef.current = onLand
  })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let isPlaying = true
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms)
        timers.push(id)
      })

    const playSequence = async () => {
      const startEl = runFromRef?.current
      const selfEl = scope.current as HTMLElement | null
      let journeyed = false
      if (startEl && selfEl) {
        const startRect = startEl.getBoundingClientRect()
        const selfRect = selfEl.getBoundingClientRect()
        const sideGap = 8
        const dx =
          startRect.left - sideGap - selfRect.width / 2 - (selfRect.left + selfRect.width / 2)
        const dy = startRect.bottom - selfRect.bottom
        if (dx < -120) {
          journeyed = true
          await animate('.gh-traveler', { x: dx, y: dy }, { duration: 0 })
          await wait(3000)
          if (!isPlaying) return

          const walkSpeedMultiplier = 0.6
          const buttonRect = (selfEl.parentElement as HTMLElement | null)?.getBoundingClientRect()
          const besideGap = 2
          const walkEnd = buttonRect
            ? -(buttonRect.width / 2 + selfRect.width / 2 + besideGap)
            : -49
          const walkDist = Math.abs(walkEnd - dx)
          const walkDur = Math.min(3, Math.max(1.4, walkDist / 170)) / walkSpeedMultiplier
          const strideDur = 0.66 / walkSpeedMultiplier
          const strides = Math.max(2, Math.round(walkDur / strideDur))
          const stride = {
            y: [0, 2, -3, -1, 0, 2, -3, -1, 0],
            scaleY: [0.98, 0.95, 1.03, 1, 0.98, 0.95, 1.03, 1, 0.98],
            scaleX: [1.02, 1.05, 0.97, 1, 1.02, 1.05, 0.97, 1, 1.02],
          }
          const strideTimes = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]
          const strideOpts = { duration: strideDur, repeat: strides - 1 }
          isWalkingRef.current = true
          await Promise.all([
            animate('.gh-traveler', { x: walkEnd }, { duration: walkDur, ease: 'linear' }),
            animate('.gh-coin', stride, { ...strideOpts, times: strideTimes, ease: 'easeInOut' }),
            animate('.gh-front-view', { opacity: 0 }, { duration: 0.25, ease: 'easeOut' }),
            animate('.gh-side-view', { opacity: 1 }, { duration: 0.25, ease: 'easeOut' }),
            animate(
              '.gh-foot-l',
              { x: [-3, 0, 3, 0, -3], y: [0, -2.5, 0, 0, 0] },
              { ...strideOpts, times: [0, 0.25, 0.5, 0.75, 1], ease: 'easeInOut' },
            ),
            animate(
              '.gh-foot-r',
              { x: [3, 0, -3, 0, 3], y: [0, 0, 0, -2.5, 0] },
              { ...strideOpts, times: [0, 0.25, 0.5, 0.75, 1], ease: 'easeInOut' },
            ),
          ])
          await Promise.all([
            animate(
              '.gh-coin',
              { rotate: 0, scaleX: 1, scaleY: 1, y: 0 },
              { duration: 0.12, ease: 'easeOut' },
            ),
            animate('.gh-foot-l', { x: 0, y: 0 }, { duration: 0.12, ease: 'easeOut' }),
            animate('.gh-foot-r', { x: 0, y: 0 }, { duration: 0.12, ease: 'easeOut' }),
          ])
          if (!isPlaying) return

          await Promise.all([
            animate('.gh-traveler', { x: 0, y: 0 }, { duration: 0.38, ease: 'easeInOut' }),
            animate(
              '.gh-coin',
              { y: [0, -18, 2], scaleY: [1, 1.05, 0.9] },
              { duration: 0.38, times: [0, 0.55, 1], ease: 'easeOut' },
            ),
            animate('.gh-side-view', { opacity: 0 }, { duration: 0.3, ease: 'easeOut' }),
            animate('.gh-front-view', { opacity: 1 }, { duration: 0.3, ease: 'easeIn' }),
          ])
          onLandRef.current?.()
          await animate(
            '.gh-coin',
            { y: 0, scaleY: 1 },
            { type: 'spring', stiffness: 400, damping: 25 },
          )
          isWalkingRef.current = false
          if (!isPlaying) return
          await wait(600)
        }
      }
      if (!journeyed) await wait(1200)

      while (isPlaying) {
        setIsBlinking(true)
        await animate('.gh-coin', { y: 3, scaleY: 0.92 }, { duration: 0.15, ease: 'easeOut' })
        if (!isPlaying) return

        setIsBlinking(false)
        await animate('.gh-coin', { y: -8, scaleY: 1.04 }, { duration: 0.3, ease: 'easeOut' })
        if (!isPlaying) return

        setIsBlinking(true)
        await animate('.gh-coin', { y: 2, scaleY: 0.9 }, { duration: 0.2, ease: 'easeIn' })
        if (!isPlaying) return
        onLandRef.current?.()

        setIsBlinking(false)
        await animate(
          '.gh-coin',
          { y: 0, scaleY: 1 },
          { type: 'spring', stiffness: 400, damping: 25 },
        )
        if (!isPlaying) return

        await wait(150)
        if (!isPlaying) return

        const waveCurve = [0.32, 0.72, 0, 1] as const
        const waveDur = 0.18
        await animate('.gh-wave-path', { d: starWaveUp }, { duration: waveDur, ease: waveCurve })
        if (!isPlaying) return
        await animate('.gh-wave-path', { d: starWaveDown }, { duration: waveDur, ease: waveCurve })
        if (!isPlaying) return
        await animate('.gh-wave-path', { d: starWaveUp }, { duration: waveDur, ease: waveCurve })
        if (!isPlaying) return
        await animate('.gh-wave-path', { d: starWaveDown }, { duration: waveDur, ease: waveCurve })
        if (!isPlaying) return
        await animate('.gh-wave-path', { d: starRest }, { duration: waveDur, ease: waveCurve })
        if (!isPlaying) return

        await wait(2600)
      }
    }

    playSequence()

    return () => {
      isPlaying = false
      isWalkingRef.current = false
      timers.forEach(clearTimeout)
    }
  }, [animate])

  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 1000
      return setTimeout(() => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 150)
        blinkTimer.current = scheduleBlink()
      }, delay)
    }
    const blinkTimer = { current: scheduleBlink() as ReturnType<typeof setTimeout> }
    return () => clearTimeout(blinkTimer.current)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isWalkingRef.current) return
      const moveEye = (eye: SVGGElement | null, cx: number, cy: number) => {
        if (!eye) return
        const svg = eye.closest('svg')
        if (!svg) return
        const rect = svg.getBoundingClientRect()
        const eyeCenterX = rect.left + (cx / 120) * rect.width
        const eyeCenterY = rect.top + ((cy - 35) / 120) * rect.height
        const dx = e.clientX - eyeCenterX
        const dy = e.clientY - eyeCenterY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxMove = 2
        const moveX = dist > 0 ? (dx / dist) * Math.min(maxMove, dist * 0.05) : 0
        const moveY = dist > 0 ? (dy / dist) * Math.min(maxMove, dist * 0.05) : 0
        eye.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
      moveEye(leftEyeRef.current, 40, 92)
      moveEye(rightEyeRef.current, 76, 92)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={scope} className="absolute -top-8 left-1/2 -translate-x-1/2 z-0 pointer-events-none">
      <div className="gh-traveler">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 35 120 120"
          fill="none"
          className="gh-coin w-12 h-12"
          style={{ transformOrigin: '50% 90%' }}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="58.1267"
              y1="47.7922"
              x2="58.1267"
              y2="144.458"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--mascot-stop-1)" />
              <stop offset="0.35" stopColor="var(--mascot-stop-2)" />
              <stop offset="0.60" stopColor="var(--mascot-stop-3)" />
              <stop offset="0.80" stopColor="var(--mascot-stop-4)" />
              <stop offset="0.95" stopColor="var(--mascot-stop-5)" />
              <stop offset="1" stopColor="var(--mascot-stop-6)" />
            </linearGradient>
          </defs>
          <g className="gh-front-view" style={{ opacity: 1 }}>
            <path
              d={starRest}
              fill={`url(#${gradientId})`}
              style={{ mixBlendMode: 'darken' }}
              className="gh-wave-path"
            />
            <g transform="translate(116.2534 0) scale(-1 1)">
              <path
                d={starRest}
                fill={`url(#${gradientId})`}
                style={{ mixBlendMode: 'darken' }}
                className="gh-wave-path"
              />
            </g>
            <g
              ref={leftEyeRef}
              style={{
                transition: 'transform 0.1s ease-out',
                transformOrigin: '40px 92px',
                transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)',
              }}
            >
              <circle cx="40" cy="92" r="5" fill="var(--color-bg)" />
            </g>
            <g
              ref={rightEyeRef}
              style={{
                transition: 'transform 0.1s ease-out',
                transformOrigin: '76px 92px',
                transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)',
              }}
            >
              <circle cx="76" cy="92" r="5" fill="var(--color-bg)" />
            </g>
          </g>
          <g className="gh-side-view" style={{ opacity: 0 }}>
            <path d={starSide} fill={`url(#${gradientId})`} style={{ mixBlendMode: 'darken' }} />
            <g
              style={{
                transition: 'transform 0.1s ease-out',
                transformOrigin: '84px 84px',
                transform: isBlinking ? 'scaleY(0.1)' : 'scaleY(1)',
              }}
            >
              <circle cx="84" cy="84" r="5" fill="var(--color-bg)" />
            </g>
          </g>
          <ellipse
            className="gh-foot-l"
            cx="31"
            cy="144"
            rx="6"
            ry="3.2"
            fill="var(--mascot-stop-1)"
          />
          <ellipse
            className="gh-foot-r"
            cx="85.5"
            cy="144"
            rx="6"
            ry="3.2"
            fill="var(--mascot-stop-1)"
          />
        </svg>
      </div>
    </div>
  )
}
