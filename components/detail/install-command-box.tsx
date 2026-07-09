'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CopyInstallButton } from './copy-install-button'
import { Tooltip } from './tooltip'
import { cn } from '@/lib/utils'

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
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!registry) return null

  const command = COMMANDS[pm](registry)
  const pms: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun']

  return (
    <div className="relative flex items-center justify-between rounded-xl px-4 py-2 border-0 bg-(--color-surface-2) font-mono select-all w-full transition-[border-color,box-shadow] duration-200">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div ref={dropdownRef} className="relative shrink-0 flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 cursor-pointer select-none text-(--color-fg) hover:text-(--color-accent) text-[11px] sm:text-[14px] font-mono font-normal leading-none outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) rounded px-1.5 py-0 transition-colors"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label="Select package manager"
          >
            <span>{PM_LABELS[pm]}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
            </svg>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{ bottom: 'calc(100% + 16px)', left: '-6px' }}
                className="absolute w-18 bg-(--color-surface-2) border-0 rounded-[12px] shadow-xl p-1 z-50 flex flex-col font-mono text-sm"
                role="listbox"
              >
                {pms.map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={pm === option}
                    onClick={() => {
                      setPm(option)
                      setIsOpen(false)
                    }}
                    className={cn(
                      'w-full text-left px-2 py-1 text-[11px] sm:text-[14px] transition-colors cursor-pointer rounded-[6px] hover:bg-black/[0.06] dark:hover:bg-white/[0.06]',
                      pm === option
                        ? 'text-(--color-fg) font-semibold'
                        : 'text-(--color-muted) hover:text-(--color-fg)',
                    )}
                  >
                    {PM_LABELS[option]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="flex-1 overflow-x-auto whitespace-nowrap pr-4 text-(--color-muted) select-all text-[11px] sm:text-[14px] flex items-center leading-none"
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
