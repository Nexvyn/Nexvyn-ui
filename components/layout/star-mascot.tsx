'use client'

import { useEffect, useId } from 'react'
import { useAnimate } from 'motion/react'

export function StarMascot({ className }: { className?: string }) {
  const gradientId = useId()
  const gradientIdBack = `${gradientId}-back`
  const [scope, animate] = useAnimate()

  const starRest =
    'M44.3662 64.2642C50.49 53.2829 53.5495 47.7922 58.1267 47.7922C62.7038 47.7922 65.7633 53.2829 71.8872 64.2642L73.4725 67.1062C75.2125 70.2285 76.0825 71.7897 77.4358 72.8192C78.7892 73.8487 80.4808 74.2305 83.8642 74.9942L86.9382 75.6902C98.8282 78.3824 104.768 79.726 106.185 84.2742C107.596 88.8175 103.546 93.559 95.44 103.037L93.3423 105.488C91.0417 108.18 89.8865 109.528 89.3694 111.191C88.8522 112.859 89.0262 114.657 89.3742 118.248L89.6932 121.52C90.916 134.169 91.5298 140.491 87.8275 143.299C84.1252 146.107 78.5572 143.545 67.4308 138.422L64.5453 137.098C61.3843 135.638 59.8038 134.913 58.1267 134.913C56.4495 134.913 54.869 135.638 51.708 137.098L48.8273 138.422C37.6962 143.545 32.1282 146.107 28.4307 143.304C24.7235 140.491 25.3373 134.169 26.5602 121.52L26.8792 118.253C27.2272 114.657 27.4012 112.859 26.8792 111.196C26.3668 109.528 25.2117 108.18 22.911 105.493L20.8133 103.037C12.7078 93.5639 8.65751 88.8224 10.0688 84.2742C11.4802 79.726 17.43 78.3775 29.32 75.6902L32.394 74.9942C35.7725 74.2305 37.4593 73.8487 38.8175 72.8192C40.1757 71.7897 41.0408 70.2285 42.7808 67.1062L44.3662 64.2642Z'

  const starWaveUp =
    'M44.3662 64.2642C50.4901 53.2829 53.5496 47.7922 58.1267 47.7922C62.7039 47.7922 65.7634 53.2829 71.8872 64.2642L73.4726 67.1062C75.2126 70.2285 76.0826 71.7897 77.4359 72.8192C78.7892 73.8487 80.4809 74.2305 83.8642 74.9942L86.9382 75.6902C98.8282 78.3824 107.2686 70.446 108.6846 74.9942C110.0956 79.5375 103.5456 93.559 95.4401 103.0372L93.3424 105.4877C91.0417 108.1799 89.8866 109.5284 89.3694 111.191C88.8522 112.8585 89.0262 114.6565 89.3742 118.2477L89.6932 121.5199C90.9161 134.1687 91.5299 140.4912 87.8276 143.2992C84.1252 146.1072 78.5572 143.5452 67.4309 138.4222L64.5454 137.0977C61.3844 135.638 59.8039 134.913 58.1267 134.913C56.4496 134.913 54.8691 135.638 51.7081 137.0977L48.8274 138.4222C37.6962 143.5452 32.1282 146.1072 28.4307 143.3042C24.7236 140.4912 25.3374 134.1687 26.5602 121.5199L26.8792 118.2525C27.2272 114.6565 27.4012 112.8585 26.8792 111.1959C26.3669 109.5284 25.2117 108.1799 22.9111 105.4925L20.8134 103.0372C12.7079 93.5639 8.6576 88.8224 10.0689 84.2742C11.4802 79.726 17.4301 78.3775 29.3201 75.6902L32.3941 74.9942C35.7726 74.2305 37.4594 73.8487 38.8176 72.8192C40.1757 71.7897 41.0409 70.2285 42.7809 67.1062L44.3662 64.2642Z'

  const starWaveDown =
    'M44.3662 64.2642C50.4901 53.2829 53.5496 47.7922 58.1267 47.7922C62.7039 47.7922 65.7634 53.2829 71.8872 64.2642L73.4726 67.1062C75.2126 70.2285 76.0826 71.7897 77.4359 72.8192C78.7892 73.8487 80.4809 74.2305 83.8642 74.9942L86.9382 75.6902C98.8282 78.3824 106.2686 84.744 107.6846 89.2922C109.0956 93.8355 103.5456 93.559 95.4401 103.0372L93.3424 105.4877C91.0417 108.1799 89.8866 109.5284 89.3694 111.191C88.8522 112.8585 89.0262 114.6565 89.3742 118.2477L89.6932 121.5199C90.9161 134.1687 91.5299 140.4912 87.8276 143.2992C84.1252 146.1072 78.5572 143.5452 67.4309 138.4222L64.5454 137.0977C61.3844 135.638 59.8039 134.913 58.1267 134.913C56.4496 134.913 54.8691 135.638 51.7081 137.0977L48.8274 138.4222C37.6962 143.5452 32.1282 146.1072 28.4307 143.3042C24.7236 140.4912 25.3374 134.1687 26.5602 121.5199L26.8792 118.2525C27.2272 114.6565 27.4012 112.8585 26.8792 111.1959C26.3669 109.5284 25.2117 108.1799 22.9111 105.4925L20.8134 103.0372C12.7079 93.5639 8.6576 88.8224 10.0689 84.2742C11.4802 79.726 17.4301 78.3775 29.3201 75.6902L32.3941 74.9942C35.7726 74.2305 37.4594 73.8487 38.8176 72.8192C40.1757 71.7897 41.0409 70.2285 42.7809 67.1062L44.3662 64.2642Z'

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let isPlaying = true
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms)
        timers.push(id)
      })

    const playJumpSequence = async () => {
      await wait(600)

      while (isPlaying) {
        await Promise.all([
          animate('.mascot-coin', { y: 10, scaleY: 0.8 }, { duration: 0.15, ease: 'easeOut' }),
          animate(
            '.mascot-platform',
            { scale: 1.2, opacity: 0.15, x: '-50%' },
            { duration: 0.15, ease: 'easeOut' },
          ),
          animate('.mascot-eye', { scaleY: 0.1 }, { duration: 0.1 }),
        ])
        if (!isPlaying) return

        animate('.mascot-eye', { scaleY: 1 }, { duration: 0.1 })
        await Promise.all([
          animate(
            '.mascot-coin',
            { y: -50, scaleY: 1.05, rotateY: -180 },
            { duration: 0.35, ease: 'easeOut' },
          ),
          animate(
            '.mascot-platform',
            { scale: 0.4, opacity: 0.02, x: '-50%' },
            { duration: 0.35, ease: 'easeOut' },
          ),
        ])
        if (!isPlaying) return

        await Promise.all([
          animate(
            '.mascot-coin',
            { y: 15, scaleY: 0.75, rotateY: -360 },
            { duration: 0.25, ease: 'easeIn' },
          ),
          animate(
            '.mascot-platform',
            { scale: 1.3, opacity: 0.18, x: '-50%' },
            { duration: 0.25, ease: 'easeIn' },
          ),
          animate('.mascot-eye', { scaleY: 0.1 }, { duration: 0.05 }),
        ])
        if (!isPlaying) return

        animate('.mascot-coin', { rotateY: 0 }, { duration: 0 })

        animate('.mascot-eye', { scaleY: 1 }, { type: 'spring', stiffness: 400, damping: 25 })
        animate(
          '.mascot-platform',
          { scale: 1, opacity: 0.1, x: '-50%' },
          { type: 'spring', stiffness: 400, damping: 25 },
        )
        await animate(
          '.mascot-coin',
          { y: 0, scaleY: 1 },
          { type: 'spring', stiffness: 400, damping: 25 },
        )
        if (!isPlaying) return

        await wait(150)
        if (!isPlaying) return

        const waveCurve = [0.32, 0.72, 0, 1] as const
        const waveDur = 0.18

        await animate(
          '.mascot-wave-path',
          { d: starWaveUp },
          { duration: waveDur, ease: waveCurve },
        )
        if (!isPlaying) return
        await animate(
          '.mascot-wave-path',
          { d: starWaveDown },
          { duration: waveDur, ease: waveCurve },
        )
        if (!isPlaying) return
        await animate(
          '.mascot-wave-path',
          { d: starWaveUp },
          { duration: waveDur, ease: waveCurve },
        )
        if (!isPlaying) return
        await animate(
          '.mascot-wave-path',
          { d: starWaveDown },
          { duration: waveDur, ease: waveCurve },
        )
        if (!isPlaying) return
        await animate('.mascot-wave-path', { d: starRest }, { duration: waveDur, ease: waveCurve })
        if (!isPlaying) return

        await wait(2000)
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

    playJumpSequence()
    playBlinkSequence()

    return () => {
      isPlaying = false
      timers.forEach(clearTimeout)
    }
  }, [animate])

  return (
    <div ref={scope} className={`star-mascot-container ${className || ''}`}>
      <style>{`
        .star-mascot-container {
          position: relative;
          display: block;
          perspective: 1000px;
          animation: star-mascot-appear var(--motion-dur-slow, 320ms) var(--motion-ease-out, cubic-bezier(0.22, 1, 0.36, 1)) both;
        }

        .mascot-platform {
          position: absolute;
          bottom: 10%;
          left: 50%;
          width: 50%;
          height: 10px;
          background: var(--color-fg);
          opacity: 0.1;
          border-radius: 50%;
          transform: translateX(-50%);
        }

        .mascot-coin {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transform-origin: center calc(50% + 20px);
        }

        .mascot-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }

        .mascot-face-back {
          transform: rotateY(180deg) translateZ(1px);
        }

        @keyframes star-mascot-appear {
          0% { opacity: 0; transform: scale(0.9) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .mascot-eye {
          transform-origin: center;
          transform-box: fill-box;
        }

        @media (prefers-reduced-motion: reduce) {
          .mascot-eye, .mascot-coin, .star-mascot-container, .mascot-platform {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="mascot-platform" />

      <div className="mascot-coin">
        <svg
          aria-hidden="true"
          viewBox="0 35 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mascot-face"
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
              <stop offset="0.97" stopColor="var(--mascot-stop-6)" />
              <stop offset="1" stopColor="var(--mascot-stop-6)" />
            </linearGradient>
          </defs>
          <path
            d={starRest}
            fill={`url(#${gradientId})`}
            style={{ mixBlendMode: 'darken' }}
            className="mascot-wave-path"
          />
          <circle cx="40" cy="92" r="5" fill="var(--color-bg)" className="mascot-eye" />
          <circle cx="76" cy="92" r="5" fill="var(--color-bg)" className="mascot-eye" />
        </svg>

        <svg
          aria-hidden="true"
          viewBox="0 35 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mascot-face mascot-face-back"
        >
          <defs>
            <linearGradient
              id={gradientIdBack}
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
              <stop offset="0.97" stopColor="var(--mascot-stop-6)" />
              <stop offset="1" stopColor="var(--mascot-stop-6)" />
            </linearGradient>
          </defs>
          <path d={starRest} fill={`url(#${gradientIdBack})`} style={{ mixBlendMode: 'darken' }} />
        </svg>
      </div>
    </div>
  )
}
