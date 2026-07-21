'use client'

import { useState, useEffect, useRef } from 'react'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import Link from 'next/link'
import { Button } from '@/components/layout/button'
import { GitHubMascot } from '@/components/detail/github-mascot'
import { usePathname } from 'next/navigation'
import { GithubIcon, type GithubIconHandle } from '@/components/layout/github-icon'
import { AnimatePresence, motion, useAnimate } from 'motion/react'

export function Header() {
  const pathname = usePathname()
  const isComponentsRoute = pathname === '/components'
  const [isGitHubHovered, setIsGitHubHovered] = useState(false)
  const iconRef = useRef<GithubIconHandle>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const [bounceScope, animateBounce] = useAnimate()

  const handleMascotLand = () => {
    const run = async () => {
      await animateBounce('.gh-btn', { y: 2, scaleY: 0.96 }, { duration: 0.1, ease: 'easeOut' })
      await animateBounce(
        '.gh-btn',
        { y: 0, scaleY: 1 },
        { type: 'spring', stiffness: 400, damping: 25 },
      )
    }
    void run()
  }

  useEffect(() => {
    if (isGitHubHovered) {
      iconRef.current?.startAnimation()
    } else {
      iconRef.current?.stopAnimation()
    }
  }, [isGitHubHovered])

  return (
    <header
      className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-12 pt-4 pb-2 md:pt-12 md:pb-4 flex items-center justify-between text-sm tracking-tight bg-transparent relative z-10"
      style={{ color: 'var(--color-muted)' }}
    >
      <div className="flex-1 pointer-events-auto">
        <Link
          ref={logoRef}
          href="/"
          className="text-xl sm:text-2xl no-underline outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) rounded-md inline-block relative z-20"
          style={{ fontFamily: 'var(--font-handwriting), cursive', color: 'var(--color-accent)' }}
        >
          Nexvyn/Ui (...)
        </Link>
      </div>
      <div className="flex-1 flex justify-end items-center gap-2">
        <div
          ref={bounceScope}
          className="relative w-fit"
          onMouseEnter={() => setIsGitHubHovered(true)}
          onMouseLeave={() => setIsGitHubHovered(false)}
        >
          {!isComponentsRoute && (
            <GitHubMascot
              isHovered={isGitHubHovered}
              onLand={handleMascotLand}
              runFromRef={logoRef}
            />
          )}
          <Button
            variant="ghost"
            size="sm"
            className="gh-btn gap-1.5 relative z-10 rounded-2xl squircle-corners bg-(--color-fg) text-(--color-bg) hover:bg-(--color-fg) hover:text-(--color-bg)"
            asChild
          >
            <a
              href="https://github.com/Nexvyn/Nexvyn-ui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  {!isGitHubHovered ? (
                    <motion.div
                      key="github"
                      initial={{ y: -15, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -15, opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 600, damping: 25 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <GithubIcon ref={iconRef} size={16} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="star"
                      initial={{ y: 15, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 15, opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 600, damping: 25 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg width="16" height="16" viewBox="0 0 128 128" aria-hidden="true">
                        <defs>
                          <linearGradient id="starAccentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" />
                            <stop offset="100%" stopColor="var(--color-accent)" />
                          </linearGradient>
                        </defs>

                        <path
                          fill="currentColor"
                          d="m126.2 49.7c-1.7-5.6-8.7-7.2-16.9-8.4l-15.2-1.8c-5.7-0.8-6.5-1.1-8.2-4.4-8.2-16.7-12.3-24.6-15-27.7-2.1-2.3-4.2-3.5-6.8-3.5s-4.9 1.1-7 3.1c-2.8 2.7-4.9 7.1-15 27.5-1.7 3.3-2.1 3.7-6.7 4.3l-15.3 1.9c-9.5 1.3-16.9 2.6-18.3 8.6-1.4 5.9 3.4 11.4 7.9 16.2 3.3 3.5 6.9 7.1 10.1 10.3l3.5 3.5c2.3 2.4 2.1 3.5 1.7 7.4l-0.3 2.1c-0.5 3.1-1 6.3-1.6 9.6-1.9 10.5-3.5 20.3 1.4 24.1 1.4 1 3.2 1.5 5.4 1.5 4.8 0 9-1.9 18.2-6.7l6.4-3.2c3.5-1.8 6.6-3.7 9.1-3.7h0.2c2.6 0 5 1.1 8.6 2.8l6.6 3.2c8.7 4.1 14.5 7.5 19.6 7.6 1.9 0 3.8-0.3 5-1.2 5-3.1 3.7-11 2.2-19.5l-2.2-13c-1.3-7.7-1.3-8.3 0.8-10.8 1.6-1.7 3.6-3.7 5.8-6 3.2-3.2 6.8-6.8 9.7-9.9 3.7-4 8-8.6 6.3-13.9z"
                        />

                        <path
                          fill="url(#starAccentGradient)"
                          d="m63.9 7c-4.3 0.2-6.5 4.4-8.6 8.1l-10.6 21.3c-1.8 3.5-3.7 4.3-6.4 4.9-13.9 2.4-31.3 2.4-33.9 8.4-2.1 5.3 4.8 11.8 7.8 15l11.7 11.9c3.7 3.7 4.6 5.2 3.9 10.5l-2.4 13.4c-1.9 10.5-2.6 17.3 0.5 19.6 4 2.8 9.9 0.4 17.5-3.4l12-6.2c3.2-1.6 5.6-3.2 8.5-3.2 3 0 5.4 0.9 8.7 2.5l12.1 5.9c5.8 2.7 10.2 5.3 14 5.3 4.2 0 5.4-2.6 5.2-7.9-0.1-2.3-2.1-14.1-3.5-22.6-1.3-7.9-1.4-9.4 2.3-13.4l11.8-11.8c3-3.2 10-9.5 9.9-13.9 0-7.4-21.2-7.8-33.3-9.8-4.1-0.7-6.1-1.7-8.1-5.6l-10.1-20.3c-2.1-3.6-4.5-8.7-9-8.7z"
                        />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span>GitHub</span>
            </a>
          </Button>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
