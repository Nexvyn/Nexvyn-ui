'use client'

import { useState } from 'react'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import Link from 'next/link'
import { Button } from '@/components/layout/button'
import { GitHubMascot } from '@/components/detail/github-mascot'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isComponentsRoute = pathname === '/components'
  const [isGitHubHovered, setIsGitHubHovered] = useState(false)

  return (
    <header
      className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-12 pt-4 pb-2 md:pt-12 md:pb-4 flex items-center justify-between text-sm tracking-tight bg-transparent relative z-10"
      style={{ color: 'var(--color-muted)' }}
    >
      <div className="flex-1 pointer-events-auto">
        <Link
          href="/"
          className="text-xl sm:text-2xl no-underline outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) rounded-md inline-block"
          style={{ fontFamily: 'var(--font-handwriting), cursive', color: 'var(--color-accent)' }}
        >
          Nexvyn/Ui (...)
        </Link>
      </div>
      <div className="hidden md:flex flex-1 justify-center">
        <span className="font-medium" style={{ color: 'var(--color-fg)' }}>
          Welcome
        </span>
      </div>
      <div className="flex-1 flex justify-end items-center gap-2">
        <div
          className="relative"
          onMouseEnter={() => setIsGitHubHovered(true)}
          onMouseLeave={() => setIsGitHubHovered(false)}
        >
          {!isComponentsRoute && <GitHubMascot isHovered={isGitHubHovered} />}
          <Button variant="ghost" size="sm" className="gap-1.5 relative z-10" asChild>
            <a
              href="https://github.com/Nexvyn/Nexvyn-ui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              {isComponentsRoute ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 128 128"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="m126.2 49.7c-1.7-5.6-8.7-7.2-16.9-8.4l-15.2-1.8c-5.7-0.8-6.5-1.1-8.2-4.4-8.2-16.7-12.3-24.6-15-27.7-2.1-2.3-4.2-3.5-6.8-3.5s-4.9 1.1-7 3.1c-2.8 2.7-4.9 7.1-15 27.5-1.7 3.3-2.1 3.7-6.7 4.3l-15.3 1.9c-9.5 1.3-16.9 2.6-18.3 8.6-1.4 5.9 3.4 11.4 7.9 16.2 3.3 3.5 6.9 7.1 10.1 10.3l3.5 3.5c2.3 2.4 2.1 3.5 1.7 7.4l-0.3 2.1c-0.5 3.1-1 6.3-1.6 9.6-1.9 10.5-3.5 20.3 1.4 24.1 1.4 1 3.2 1.5 5.4 1.5 4.8 0 9-1.9 18.2-6.7l6.4-3.2c3.5-1.8 6.6-3.7 9.1-3.7h0.2c2.6 0 5 1.1 8.6 2.8l6.6 3.2c8.7 4.1 14.5 7.5 19.6 7.6 1.9 0 3.8-0.3 5-1.2 5-3.1 3.7-11 2.2-19.5l-2.2-13c-1.3-7.7-1.3-8.3 0.8-10.8 1.6-1.7 3.6-3.7 5.8-6 3.2-3.2 6.8-6.8 9.7-9.9 3.7-4 8-8.6 6.3-13.9z" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.195 22 16.44 22 12.017 22 6.484 17.522 2 12 2Z" />
                </svg>
              )}
              <span>GitHub</span>
            </a>
          </Button>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
