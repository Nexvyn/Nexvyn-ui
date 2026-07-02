'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CopyInstallButton } from './copy-install-button'
import { Tooltip } from './tooltip'

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

const REGISTRY_URL = 'https://ui.nexvyn.dev'

const COMMANDS: Record<PackageManager, (reg: string) => string> = {
  npm: (reg) => `npx shadcn@latest add ${REGISTRY_URL}/r/${reg}.json`,
  pnpm: (reg) => `pnpm dlx shadcn@latest add ${REGISTRY_URL}/r/${reg}.json`,
  yarn: (reg) => `yarn dlx shadcn@latest add ${REGISTRY_URL}/r/${reg}.json`,
  bun: (reg) => `bunx shadcn@latest add ${REGISTRY_URL}/r/${reg}.json`,
}

const PM_LABELS: Record<PackageManager, string> = {
  npm: 'npm',
  pnpm: 'pnpm',
  yarn: 'yarn',
  bun: 'bun',
}

export function InstallCommandBox({ registry }: { registry?: string }) {
  const [pm, setPm] = useState<PackageManager>('npm')
  const [scrollDir, setScrollDir] = useState<1 | -1>(1)
  const [hovered, setHovered] = useState(false)
  const lastScrollTime = useRef(0)

  if (!registry) return null

  const command = COMMANDS[pm](registry)
  const pms: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun']

  const currentIndex = pms.indexOf(pm)
  const prevIndex = (currentIndex - 1 + pms.length) % pms.length
  const nextIndex = (currentIndex + 1) % pms.length

  const wheelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wheelRef.current
    if (!el) return

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastScrollTime.current < 250) return
      lastScrollTime.current = now

      const dir = e.deltaY > 0 ? 1 : -1
      setScrollDir(dir)

      setPm((currentPm) => {
        const idx = pms.indexOf(currentPm)
        let nextIdx = idx + dir
        if (nextIdx < 0) nextIdx = pms.length - 1
        if (nextIdx >= pms.length) nextIdx = 0
        return pms[nextIdx]
      })
    }

    el.addEventListener('wheel', handleWheelEvent, { passive: false })
    return () => el.removeEventListener('wheel', handleWheelEvent)
  }, [])

  const cyclePm = () => {
    setScrollDir(1)
    setPm((currentPm) => {
      const idx = pms.indexOf(currentPm)
      const nextIdx = (idx + 1) % pms.length
      return pms[nextIdx]
    })
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-between rounded-xl px-4 py-2 border-0 bg-(--color-surface-2) font-mono select-all w-full transition-[border-color,box-shadow] duration-200"
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div
          ref={wheelRef}
          onClick={cyclePm}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
              e.preventDefault()
              const dir = e.key === 'ArrowUp' ? -1 : 1
              setScrollDir(dir as 1 | -1)
              setPm((currentPm) => {
                const idx = pms.indexOf(currentPm)
                let nextIdx = idx + dir
                if (nextIdx < 0) nextIdx = pms.length - 1
                if (nextIdx >= pms.length) nextIdx = 0
                return pms[nextIdx]
              })
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Package manager selector"
          className="cursor-ns-resize select-none text-(--color-fg) relative h-8 w-11 flex items-center justify-center shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) rounded"
          style={{ perspective: '200px', transformStyle: 'preserve-3d' }}
          title="Scroll, click, or use arrow keys to switch package manager"
        >
          <AnimatePresence>
            {hovered && (
              <motion.button
                initial={{ opacity: 0, y: -4, rotateX: -70, scale: 0.7 }}
                animate={{ opacity: 0.6, y: -30, x: -4, rotateX: -40, scale: 0.9 }}
                exit={{ opacity: 0, y: -4, rotateX: -70, scale: 0.7 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setScrollDir(-1)
                  setPm(pms[prevIndex])
                }}
                className="absolute text-sm font-mono font-normal text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer whitespace-nowrap px-2 py-0.5 rounded"
                style={{ transformOrigin: 'bottom center' }}
              >
                {PM_LABELS[pms[prevIndex]]}
              </motion.button>
            )}
          </AnimatePresence>

          <div
            className="h-5 flex items-center justify-center relative w-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={pm}
                initial={{
                  y: scrollDir > 0 ? 14 : -14,
                  rotateX: scrollDir > 0 ? 40 : -40,
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{ y: 0, rotateX: 0, opacity: 1, scale: 1 }}
                exit={{
                  y: scrollDir > 0 ? -14 : 14,
                  rotateX: scrollDir > 0 ? -40 : 40,
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="absolute inset-0 flex items-center justify-center text-base font-mono font-normal text-(--color-accent)"
              >
                {PM_LABELS[pm]}
              </motion.span>
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {hovered && (
              <motion.button
                initial={{ opacity: 0, y: 4, rotateX: 70, scale: 0.7 }}
                animate={{ opacity: 0.6, y: 30, x: -4, rotateX: 40, scale: 0.9 }}
                exit={{ opacity: 0, y: 4, rotateX: 70, scale: 0.7 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setScrollDir(1)
                  setPm(pms[nextIndex])
                }}
                className="absolute text-sm font-mono font-normal text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer whitespace-nowrap px-2 py-0.5 rounded"
                style={{ transformOrigin: 'top center' }}
              >
                {PM_LABELS[pms[nextIndex]]}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div
          className="flex-1 overflow-hidden whitespace-nowrap pr-4 text-(--color-muted) select-all text-[14px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <span>
            {pm === 'npm' ? 'npx ' : ''}
            {pm === 'pnpm' ? 'pnpm dlx ' : ''}
            {pm === 'yarn' ? 'yarn dlx ' : ''}
            {pm === 'bun' ? 'bunx ' : ''}
            shadcn@latest add{' '}
          </span>
          <span className="text-(--color-accent) font-normal">
            {REGISTRY_URL}/r/{registry}.json
          </span>
        </div>
      </div>

      <Tooltip content="Copy install command" side="top">
        <CopyInstallButton value={command} />
      </Tooltip>
    </div>
  )
}
