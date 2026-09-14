'use client'
import { useRef, type MouseEvent } from 'react'
import { motion, useReducedMotion, type PanInfo } from 'motion/react'
import { cn } from '@/lib/utils'
import { usePageWave } from './page-wave'

const MINTLIFY_HREF = 'https://mintlify.com'
const SPONSOR_HREF = 'https://x.com/Nexvyn'

function MintlifyLogo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 19 19"
        fill="none"
        className="size-8 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M18.367 7.28888V1.59755C18.367 0.986819 17.8715 0.5 17.2699 0.5H11.5812C10.6877 0.5 9.80295 0.677018 8.98017 1.01336C8.15738 1.35856 7.40539 1.85424 6.77724 2.49152L6.733 2.53578C5.90137 3.37664 5.30862 4.42108 5.00781 5.57174C5.54749 5.43012 6.10483 5.35931 6.6622 5.35046C8.14852 5.33276 9.60831 5.81073 10.7938 6.7047C11.8643 7.50131 12.6783 8.59885 13.1206 9.86458C13.5807 11.148 13.6337 12.5465 13.2887 13.8653C14.43 13.5644 15.4828 12.9714 16.3233 12.1393L16.367 12.0951C16.9957 11.4667 17.4999 10.7143 17.845 9.89114C18.19 9.06797 18.3581 8.18285 18.3581 7.28888H18.367Z"
          className="fill-(--brand-mintlify)"
        />
        <path
          d="M4.83793 7.193C4.84674 5.44706 5.54303 3.77167 6.76814 2.51953L2.03511 7.25472C2.01749 7.27236 1.99985 7.28117 1.98222 7.29881C0.827615 8.44513 0.131342 9.97945 0.0167623 11.6019C-0.0890033 13.1186 0.307609 14.6176 1.15373 15.8698C1.23444 15.9892 1.45343 16.0285 1.57682 15.9139L4.47656 13.0216C5.38438 12.1134 5.66643 10.7642 5.23455 9.55618C4.96132 8.80666 4.82912 8.00424 4.83793 7.193Z"
          className="fill-(--brand-mintlify-deep)"
        />
        <path
          d="M16.341 12.0938C15.4332 12.9844 14.2962 13.6016 13.0623 13.875C11.8195 14.1483 10.5327 14.0689 9.33405 13.6457C9.33405 13.6457 9.32522 13.6457 9.31641 13.6457C8.10892 13.2136 6.76042 13.4958 5.8526 14.3952L2.95282 17.2875C2.82943 17.4109 2.84706 17.6137 2.99689 17.7107C4.24845 18.5484 5.74683 18.954 7.26281 18.8482C8.88455 18.7336 10.4093 18.037 11.5639 16.8818L11.608 16.8378L16.341 12.1026V12.0938Z"
          className="fill-(--brand-mintlify-deep)"
        />
      </svg>
      <span className="text-2xl font-normal tracking-tight text-(--color-fg)">Mintlify</span>
    </div>
  )
}

const cardClass =
  'group relative flex min-h-38 flex-col items-center justify-center rounded-2xl border border-(--panel-border) bg-(--color-surface) p-6 outline-none transition-[border-color,transform] duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:border-(--panel-border-hover) active:scale-97 motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function HomeSponsors() {
  const { splash } = usePageWave()
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const draggedRef = useRef(false)
  const wallSplashFiredRef = useRef(false)

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    const dist = Math.hypot(info.offset.x, info.offset.y)
    const speed = Math.hypot(info.velocity.x, info.velocity.y)
    if (dist > 90 || speed > 550) {
      splash(info.point.x, info.point.y, 0.9)
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20)
    }
  }

  const handleWallHit = (event: { currentTarget: EventTarget | null }, info: PanInfo) => {
    if (wallSplashFiredRef.current) return
    const section = sectionRef.current
    const card = event.currentTarget as HTMLElement | null
    if (!section || !card) return
    const wall = section.getBoundingClientRect()
    const box = card.getBoundingClientRect()
    const margin = 6
    const hitWall =
      box.left <= wall.left + margin ||
      box.right >= wall.right - margin ||
      box.top <= wall.top + margin ||
      box.bottom >= wall.bottom - margin
    if (!hitWall) return
    wallSplashFiredRef.current = true
    splash(info.point.x, info.point.y, 1)
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20)
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!draggedRef.current) return
    event.preventDefault()
    draggedRef.current = false
  }

  const dragProps = {
    drag: !reduceMotion,
    dragConstraints: sectionRef,
    dragElastic: 0.18,
    dragSnapToOrigin: true,
    draggable: false,
    onPointerDown: () => {
      draggedRef.current = false
    },
    onDragStart: () => {
      draggedRef.current = true
      wallSplashFiredRef.current = false
    },
    onDrag: handleWallHit,
    onDragEnd: handleDragEnd,
    onClick: handleClick,
  } as const

  const dragCursor = !reduceMotion && 'cursor-grab active:cursor-grabbing'

  return (
    <section
      aria-labelledby="home-sponsors-heading"
      ref={sectionRef}
      className="relative mt-24 overflow-visible sm:mt-32"
    >
      <h2
        id="home-sponsors-heading"
        className="mx-auto text-center text-balance font-light text-xl tracking-tight text-(--color-fg) sm:text-2xl md:text-3xl"
      >
        Sponsors
      </h2>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2">
        <motion.a
          {...dragProps}
          href={MINTLIFY_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mintlify, sponsor of Nexvyn UI"
          className={cn(cardClass, 'overflow-hidden', dragCursor)}
        >
          <MintlifyLogo />
        </motion.a>

        <motion.a
          {...dragProps}
          href={SPONSOR_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(cardClass, 'gap-1', dragCursor)}
        >
          <span className="text-sm font-normal tracking-tight text-(--color-fg)">
            Become a sponsor
          </span>
          <span className="text-cta text-(--color-muted) transition-colors duration-(--motion-dur-fast) ease-[ease] group-hover:text-(--color-fg) motion-reduce:transition-none">
            DM @Nexvyn on X
          </span>
        </motion.a>
      </div>
    </section>
  )
}
