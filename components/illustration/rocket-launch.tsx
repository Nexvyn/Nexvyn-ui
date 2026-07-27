'use client'

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from 'react'
import { cn } from '@/lib/utils'

export type RocketLaunchPhase = 'idle' | 'igniting' | 'flying'

export type RocketLaunchHandle = {
  launch: () => void
  reset: () => void
}

const IGNITION_DELAY_MS = 1400

export type RocketLaunchIllustrationProps = Readonly<
  Omit<ComponentPropsWithoutRef<'div'>, 'onLaunch' | 'onReset'> & {
    launchLabel?: string
    resetLabel?: string
    onLaunch?: () => void
    onReset?: () => void
    onPhaseChange?: (phase: RocketLaunchPhase) => void
    showControls?: boolean
  }
>

function EngineFlame({
  path,
  hotPath,
  flameGradId,
  hotGradId,
  turbId,
  speed,
}: Readonly<{
  path: string
  hotPath: string
  flameGradId: string
  hotGradId: string
  turbId: string
  speed: 'a' | 'b' | 'c' | 'd'
}>) {
  return (
    <g filter={`url(#${turbId})`}>
      <path
        className={cn('rocket-flame-body', `rocket-flame-body-${speed}`)}
        fill={`url(#${flameGradId})`}
        d={path}
      />
      <path
        className={cn('rocket-flame-hot', `rocket-flame-hot-${speed}`)}
        fill={`url(#${hotGradId})`}
        d={hotPath}
      />
    </g>
  )
}

export const RocketLaunchIllustration = forwardRef<
  RocketLaunchHandle,
  RocketLaunchIllustrationProps
>(function RocketLaunchIllustration(
  {
    className,
    launchLabel = 'Launch',
    resetLabel = 'Reset',
    onLaunch,
    onReset,
    onPhaseChange,
    showControls = true,
    ...props
  },
  ref,
) {
  const [phase, setPhaseState] = useState<RocketLaunchPhase>('idle')
  const ignitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const uid = useId()
  const flameGradId = `rocket-flame-grad-${uid}`
  const hotGradId = `rocket-hot-grad-${uid}`
  const turbId = `rocket-turb-${uid}`
  const scope = `rocket-launch-${uid}`

  const setPhase = (next: RocketLaunchPhase) => {
    setPhaseState(next)
    onPhaseChange?.(next)
  }

  useEffect(() => {
    return () => {
      if (ignitionTimer.current) clearTimeout(ignitionTimer.current)
    }
  }, [])

  const handleLaunch = () => {
    if (phase !== 'idle') return
    setPhase('igniting')
    ignitionTimer.current = setTimeout(() => {
      setPhase('flying')
      onLaunch?.()
    }, IGNITION_DELAY_MS)
  }

  const handleReset = () => {
    if (ignitionTimer.current) {
      clearTimeout(ignitionTimer.current)
      ignitionTimer.current = null
    }
    setPhase('idle')
    onReset?.()
  }

  useImperativeHandle(ref, () => ({ launch: handleLaunch, reset: handleReset }))

  return (
    <div
      data-slot="rocket-launch-illustration"
      data-scope={scope}
      data-phase={phase}
      className={cn('rocket-launch-scene relative isolate h-104 w-full max-w-sm', className)}
      {...props}
    >
      <style>{`
        [data-scope="${scope}"] {
          --rocket-line: #07207a;
          --rocket-window-glass: #c1eaf7;
        }

        [data-scope="${scope}"][data-phase='flying'] {
          overflow: hidden;
        }

        [data-scope="${scope}"] .rocket-launch-container {
          position: absolute;
          left: 50%;
          bottom: 4.75rem;
          transform: translateX(-50%);
        }
        [data-scope="${scope}"][data-phase='flying'] .rocket-launch-container {
          animation: rocket-liftoff 6.5s cubic-bezier(0.42, 0, 0.6, 1) forwards;
        }
        [data-scope="${scope}"][data-phase='flying'] .rocket-launch-svg {
          animation: rocket-vibrate 0.06s linear infinite;
        }

        [data-scope="${scope}"] .rocket-flame-body {
          filter: drop-shadow(0 0 14px rgba(255, 110, 0, 0.9)) drop-shadow(0 0 5px rgba(255, 230, 100, 0.75));
          transform-origin: center top;
          transform-box: fill-box;
          animation: rocket-flicker-main 0.16s ease-in-out infinite alternate;
        }
        [data-scope="${scope}"] .rocket-flame-hot {
          transform-origin: center top;
          transform-box: fill-box;
          animation: rocket-flicker-hot 0.09s ease-in-out infinite alternate;
        }
        [data-scope="${scope}"] .rocket-flame-body-a { animation-duration: 0.13s; }
        [data-scope="${scope}"] .rocket-flame-body-b { animation-duration: 0.17s; }
        [data-scope="${scope}"] .rocket-flame-body-c { animation-duration: 0.19s; }
        [data-scope="${scope}"] .rocket-flame-body-d { animation-duration: 0.15s; }
        [data-scope="${scope}"] .rocket-flame-hot-a { animation-duration: 0.08s; }
        [data-scope="${scope}"] .rocket-flame-hot-b { animation-duration: 0.1s; }
        [data-scope="${scope}"] .rocket-flame-hot-c { animation-duration: 0.11s; }
        [data-scope="${scope}"] .rocket-flame-hot-d { animation-duration: 0.09s; }

        @keyframes rocket-vibrate {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(1.5px) rotate(0.2deg); }
          75% { transform: translateX(-1.5px) rotate(-0.2deg); }
        }
        @keyframes rocket-flicker-main {
          0% { transform: scaleY(0.93) scaleX(1.04); opacity: 0.95; }
          100% { transform: scaleY(1.07) scaleX(0.97); opacity: 1; }
        }
        @keyframes rocket-flicker-hot {
          0% { transform: scaleY(0.82) scaleX(1.12) translateY(0); opacity: 0.6; }
          100% { transform: scaleY(1.15) scaleX(0.9) translateY(-1.5px); opacity: 0.95; }
        }
        @keyframes rocket-liftoff {
          0% { transform: translateX(-50%) translateY(0); }
          10% { transform: translateX(-50%) translateY(4px); }
          22% { transform: translateX(-50%) translateY(-40px); }
          50% { transform: translateX(-50%) translateY(-300px); }
          100% { transform: translateX(-50%) translateY(-1300px); }
        }

        [data-scope="${scope}"] .rocket-exhaust {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        [data-scope="${scope}"] .rocket-exhaust * {
          animation-play-state: paused;
        }
        [data-scope="${scope}"][data-phase='igniting'] .rocket-exhaust,
        [data-scope="${scope}"][data-phase='flying'] .rocket-exhaust {
          opacity: 1;
        }
        [data-scope="${scope}"][data-phase='igniting'] .rocket-exhaust *,
        [data-scope="${scope}"][data-phase='flying'] .rocket-exhaust * {
          animation-play-state: running;
        }

        [data-scope="${scope}"] .rocket-controls {
          position: absolute;
          left: 1.5rem;
          bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        @media (prefers-reduced-motion: reduce) {
          [data-scope="${scope}"] .rocket-launch-container,
          [data-scope="${scope}"] .rocket-launch-svg,
          [data-scope="${scope}"] .rocket-flame-body,
          [data-scope="${scope}"] .rocket-flame-hot {
            animation: none !important;
          }
          [data-scope="${scope}"][data-phase='flying'] .rocket-launch-container {
            opacity: 0;
            transition: opacity 0.5s ease;
          }
        }
      `}</style>

      <div className="rocket-launch-container">
        <svg
          className="rocket-launch-svg h-auto w-42.5 overflow-visible sm:w-52.5"
          viewBox="-30 -8 146 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={flameGradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="12%" stopColor="#FFF7C2" />
              <stop offset="32%" stopColor="#FFE03B" />
              <stop offset="55%" stopColor="#FFB300" />
              <stop offset="78%" stopColor="#FF6A00" />
              <stop offset="100%" stopColor="#E53400" />
            </linearGradient>
            <linearGradient id={hotGradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="45%" stopColor="#FFF59D" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFD54F" stopOpacity="0" />
            </linearGradient>
            <filter id={turbId} x="-30%" y="-15%" width="160%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.018 0.05"
                numOctaves={2}
                seed={4}
                result="noise"
              >
                <animate
                  attributeName="seed"
                  values="2;6;3;2"
                  dur="0.7s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.1"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>

          <g className="rocket-exhaust">
            <EngineFlame
              path="M15.6 161 Q 11.6 162 10.3 167 Q 9.1 173 10.5 181 Q 12.1 193 15.6 207 Q 19.1 193 20.7 181 Q 22.1 173 20.9 167 Q 19.6 162 15.6 161 Z"
              hotPath="M15.6 165 Q 13.6 167 13.1 173 Q 12.7 181 15.6 193 Q 18.5 181 18.1 173 Q 17.6 167 15.6 165 Z"
              flameGradId={flameGradId}
              hotGradId={hotGradId}
              turbId={turbId}
              speed="a"
            />
            <EngineFlame
              path="M32.4 161 Q 28.4 162 27.1 167 Q 25.9 173 27.3 181 Q 28.9 193 32.4 207 Q 35.9 193 37.5 181 Q 38.9 173 37.7 167 Q 36.4 162 32.4 161 Z"
              hotPath="M32.4 165 Q 30.4 167 29.9 173 Q 29.5 181 32.4 193 Q 35.3 181 34.9 173 Q 34.4 167 32.4 165 Z"
              flameGradId={flameGradId}
              hotGradId={hotGradId}
              turbId={turbId}
              speed="b"
            />
            <EngineFlame
              path="M53 161 Q 49 162 47.7 167 Q 46.5 173 47.9 181 Q 49.5 193 53 207 Q 56.5 193 58.1 181 Q 59.5 173 58.3 167 Q 57 162 53 161 Z"
              hotPath="M53 165 Q 51 167 50.5 173 Q 50.1 181 53 193 Q 55.9 181 55.5 173 Q 55 167 53 165 Z"
              flameGradId={flameGradId}
              hotGradId={hotGradId}
              turbId={turbId}
              speed="c"
            />
            <EngineFlame
              path="M69.7 161 Q 65.7 162 64.4 167 Q 63.2 173 64.6 181 Q 66.2 193 69.7 207 Q 73.2 193 74.8 181 Q 76.2 173 75 167 Q 73.7 162 69.7 161 Z"
              hotPath="M69.7 165 Q 67.7 167 67.2 173 Q 66.8 181 69.7 193 Q 72.6 181 72.2 173 Q 71.7 167 69.7 165 Z"
              flameGradId={flameGradId}
              hotGradId={hotGradId}
              turbId={turbId}
              speed="d"
            />
          </g>

          <g stroke="var(--rocket-line)" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path
              strokeWidth="0.68"
              d="M10.3516 126.117L10.2515 48.718C10.2515 42.818 14.5515 35.518 16.5515 34.818C17.5515 34.418 18.3515 35.418 18.9515 36.118C20.4515 38.018 23.2515 43.018 23.5515 46.118L23.6515 49.118V107.617"
            />
            <path
              strokeWidth="0.68"
              d="M62.2515 108.518L62.4515 41.2176C62.2515 24.6176 54.2515 9.11759 44.5515 1.01759C43.7515 0.31759 42.7515 0.11759 42.1515 0.61759C36.2515 4.71759 23.2515 19.9176 23.4515 41.9176V46.0176"
            />
            <path
              strokeWidth="0.68"
              d="M62.3515 108.816L62.2515 48.7165C62.2515 42.7165 65.9515 35.8165 67.7515 35.0165C69.5515 34.2165 69.8515 35.4165 70.6515 36.3165C72.0515 38.0165 74.8515 43.0165 75.0515 47.3165V127.117"
            />
            <path
              strokeWidth="0.4"
              d="M10.8516 44.6172C13.5516 47.1172 20.1516 47.3172 23.1516 44.6172"
            />
            <path
              strokeWidth="0.4"
              d="M10.3516 47.7168C13.0516 50.6168 20.8516 50.8168 23.6516 47.7168"
            />
            <path
              strokeWidth="0.4"
              d="M10.3516 62.0176C13.0516 65.5176 22.2516 65.4176 23.5516 62.0176"
            />
            <path
              strokeWidth="0.4"
              d="M10.3516 91.5176C12.2516 94.6176 21.5516 95.0176 23.5516 91.5176"
            />
            <path
              strokeWidth="0.4"
              d="M10.3516 114.617C11.5516 116.517 15.4516 117.817 18.3516 117.117"
            />
            <path
              strokeWidth="0.4"
              d="M63.0518 44.5176C65.5518 46.7176 71.5518 47.3176 74.7518 44.6176"
            />
            <path
              strokeWidth="0.4"
              d="M62.4517 47.5176C64.6517 50.2176 72.7517 50.8176 75.0517 47.7176"
            />
            <path
              strokeWidth="0.4"
              d="M62.3516 62.0176C65.4516 65.4176 74.4516 65.3176 75.0516 62.0176"
            />
            <path
              strokeWidth="0.4"
              d="M62.4517 91.5176C64.9517 94.6176 73.5517 95.0176 75.0517 91.5176"
            />
            <path
              strokeWidth="0.4"
              d="M66.5518 116.817C70.6518 117.317 73.8518 116.617 75.0518 114.717"
            />
            <path
              strokeWidth="0.68"
              d="M27.3517 91.1176C25.4517 108.018 20.4517 117.118 9.55172 127.018C3.05172 133.318 0.251724 135.818 0.351724 144.718C0.251724 146.218 0.751725 146.118 3.05172 146.518L26.9517 150.018L27.8517 150.218L37.0517 152.418L40.6517 152.518H44.6517L49.0517 152.418L58.6517 150.518L83.6517 146.518C85.5517 146.118 85.3517 146.218 85.3517 144.718C85.3517 137.518 82.5517 134.318 77.0517 129.018C69.7517 122.018 61.3517 112.618 58.8517 98.1176C56.8517 87.0176 57.2517 82.7176 53.2517 70.0176C49.2517 57.3176 46.2517 53.5176 42.7517 53.5176C37.2517 53.5176 31.7517 66.7176 29.2517 78.7176L27.3517 91.1176Z"
            />
            <path
              strokeWidth="0.68"
              d="M29.1517 135.717C26.9517 137.717 26.9517 141.817 26.9517 148.717C26.9517 150.517 28.3517 151.017 31.0517 151.517C33.5517 152.117 36.6517 152.517 40.6517 152.517"
            />
            <path
              strokeWidth="0.68"
              d="M56.9516 135.518C59.0516 137.718 59.0516 141.318 59.0516 148.718C59.0516 151.018 52.0516 152.518 44.8516 152.518"
            />
            <path strokeWidth="0.4" d="M0.351562 142.617L26.8516 144.617" />
            <path strokeWidth="0.4" d="M59.3516 144.617L85.3516 142.617" />
            <path
              strokeWidth="0.68"
              d="M29.3516 151.518C27.8516 151.718 27.8516 154.218 26.9516 157.618C26.3516 160.118 37.7516 160.618 37.9516 158.118L36.9516 152.718"
            />
            <path
              strokeWidth="0.4"
              strokeLinecap="butt"
              d="M27.8516 156.018C29.7516 157.218 35.4516 157.818 37.9516 156.118"
            />
            <path
              strokeWidth="0.68"
              d="M48.3515 152.618L47.2515 157.718C47.2515 160.018 57.7515 160.518 58.7515 158.118L58.4515 156.718L57.4515 151.518L57.3516 151.117"
            />
            <path
              strokeWidth="0.4"
              strokeLinecap="butt"
              d="M47.8516 156.018C49.7516 157.518 55.7516 157.718 58.2516 156.018"
            />
            <path
              strokeWidth="0.68"
              d="M9.45132 143.617V147.717L8.95132 155.117C8.45132 157.717 8.05133 159.017 8.25133 159.517C9.35133 162.217 21.7513 163.217 22.9513 159.517L21.9513 155.017L21.5513 149.617"
            />
            <path
              strokeWidth="0.4"
              strokeLinecap="butt"
              d="M9.45166 149.518C11.0517 152.118 19.8517 153.218 21.7517 150.718"
            />
            <path
              strokeWidth="0.4"
              strokeLinecap="butt"
              d="M9.05176 155.117C11.2518 157.517 19.8518 158.017 21.9518 155.117"
            />
            <path
              strokeWidth="0.4"
              strokeLinecap="butt"
              d="M8.55176 157.518C10.2518 160.518 20.2518 161.118 22.5518 157.718"
            />
            <path
              strokeWidth="0.68"
              d="M63.8516 150.117L63.5516 155.017L62.5516 158.717C62.2516 162.017 76.2516 163.217 76.7516 159.317L75.8516 154.717L75.3516 147.117V143.617"
            />
            <path
              strokeWidth="0.4"
              strokeLinecap="butt"
              d="M63.7515 151.117C65.8515 153.617 73.5515 153.617 75.5515 151.117"
            />
            <path
              strokeWidth="0.4"
              strokeLinecap="butt"
              d="M63.5518 155.018C65.7518 157.118 73.7518 157.818 75.8518 155.018"
            />
            <path
              strokeWidth="0.4"
              strokeLinecap="butt"
              d="M63.0518 157.117C64.8518 160.117 73.8518 160.717 76.3518 157.717"
            />
            <path strokeWidth="0.4" d="M23.7515 150.018V153.118L27.9515 153.018" />
            <path strokeWidth="0.4" d="M40.6515 155.018H37.3515L37.2515 152.518" />
            <path strokeWidth="0.4" d="M44.6514 155.018H47.8514L48.2514 152.518" />
            <path strokeWidth="0.4" d="M57.8516 153.117L61.9516 153.017V150.117" />
            <path
              strokeWidth="0.68"
              d="M42.7516 128.516C42.0516 128.516 40.8516 134.116 40.8516 145.616C40.8516 152.716 41.4516 165.216 42.7516 165.116C43.4516 165.216 43.5516 164.116 44.0516 160.516C44.8516 155.516 45.0516 140.016 44.0516 133.116C43.5516 130.216 43.3516 128.316 42.7516 128.516Z"
            />
            <path
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              d="M29.2515 17.5172C32.2515 20.7172 44.4515 24.6172 56.5515 17.1172"
            />
            <path
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              d="M25.2515 29.5164C28.3515 32.7164 40.7515 37.5164 54.4515 33.1164C57.9515 32.0164 59.3515 30.7164 61.0515 29.3164"
            />
            <path
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              d="M24.4517 45.6176C28.3517 47.7176 39.3517 52.2176 56.7517 47.6176C58.4517 47.1176 59.9517 46.3176 62.3517 45.0176"
            />
            <path
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              d="M24.0518 61.8164C29.4518 64.3164 36.4518 67.5164 42.3518 67.2164C46.8518 67.2164 53.4518 65.8164 61.9518 62.1164"
            />
            <path
              strokeWidth="0.4"
              d="M36.2515 60.2168C39.0515 61.8168 45.8515 62.2168 49.0515 60.2168"
            />
            <path
              strokeWidth="0.68"
              d="M31.8516 91.3182L32.1516 86.9182C32.8516 78.9182 37.7516 71.3182 42.8516 71.1182C48.0516 71.0182 53.7516 78.1182 54.3516 87.5182V91.1182"
            />
            <path
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              d="M29.4517 86.5176C31.9517 89.5176 39.8517 90.6176 43.3517 90.6176C48.8517 90.5176 53.8517 89.6176 56.4517 86.5176"
            />
            <path
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              d="M28.9517 102.217C33.0517 104.617 38.8517 105.617 43.3517 105.517C47.7517 105.517 51.9517 104.817 56.3517 102.617"
            />
            <path
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              d="M29.0518 120.117C32.5518 122.117 38.8518 123.617 43.3518 123.517C48.0518 123.517 52.9518 122.617 56.9518 120.517"
            />
            <path strokeWidth="0.2" strokeDasharray="1 1.5" d="M42.5518 84.0176V127.018" />
            <path
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              d="M29.2515 134.717C29.5515 135.017 33.9515 137.217 40.5515 137.717"
            />
            <path
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              d="M56.9516 134.617C52.9516 136.717 46.8516 137.717 45.3516 137.717"
            />
            <path strokeWidth="0.2" strokeDasharray="1 1.5" d="M32.1514 90.3184V150.318" />
            <path strokeWidth="0.2" strokeDasharray="1 1.5" d="M54.3516 91.1155L54.0518 151.217" />
            <path
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              d="M44.9517 1.61719C48.2517 5.51719 52.4517 14.0172 56.8517 32.1172C58.0517 39.1172 58.2517 61.8172 57.9517 76.0172"
            />
            <path
              strokeWidth="0.4"
              d="M20.2515 140.617H15.7515C14.8515 140.617 14.2515 140.117 14.2515 139.217V137.317C14.2515 136.617 14.7515 136.117 15.4515 136.117H19.6515C20.5515 136.017 21.5515 136.317 21.4515 138.017V139.417C21.4515 140.217 20.9515 140.617 20.2515 140.617Z"
            />
            <path
              strokeWidth="0.4"
              d="M69.3518 140.617H65.4518C64.7518 140.617 64.0518 140.217 64.0518 139.517V137.117C64.0518 136.517 64.5518 136.117 65.2518 136.117H69.3518C70.3518 136.117 70.8518 136.317 70.8518 137.517V139.317C70.8518 140.317 70.3518 140.617 69.3518 140.617Z"
            />
            <path strokeWidth="0.4" d="M9.45166 147.717L19.7517 149.117L19.5517 144.217" />
            <path strokeWidth="0.4" d="M65.8515 144.217L65.7515 149.117L75.5515 147.717" />
            <path strokeWidth="0.68" d="M29.0517 80.3164L28.9517 135.716" />
            <path strokeWidth="0.68" d="M55.8516 80.1172L56.9518 135.518" />
          </g>

          <path
            d="M38.8516 83.6176C37.8516 83.7176 36.9516 83.2176 37.0516 81.7176C36.9516 78.5176 39.5516 75.6176 42.5516 75.5176C45.5516 75.5176 48.0516 78.3176 48.2516 81.5176C48.2516 83.6176 47.4516 83.6176 45.7516 83.5176C43.4516 83.2176 41.2516 83.3176 38.8516 83.6176Z"
            fill="var(--rocket-window-glass)"
            stroke="var(--rocket-line)"
            strokeWidth="0.68"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M45.0518 77.2168C43.9518 77.2168 43.4518 79.2168 45.0518 79.5168C46.5518 79.5168 46.5518 77.2168 45.0518 77.2168Z"
            fill="white"
          />
        </svg>
      </div>

      {showControls && (
        <div className="rocket-controls">
          <button
            type="button"
            onClick={handleLaunch}
            disabled={phase !== 'idle'}
            className="rocket-launch-btn min-h-11 rounded-lg bg-(--color-fg) px-7 py-2.5 text-sm font-medium text-(--color-bg) transition-[opacity,background-color] duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:bg-(--color-fg)/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)"
          >
            {launchLabel}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={phase === 'idle'}
            className="rocket-reset-btn min-h-11 rounded-lg bg-(--color-fg) px-7 py-2.5 text-sm font-medium text-(--color-bg) transition-[opacity,background-color] duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:bg-(--color-fg)/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)"
          >
            {resetLabel}
          </button>
        </div>
      )}
    </div>
  )
})

RocketLaunchIllustration.displayName = 'RocketLaunchIllustration'
