'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen w-full font-sans flex flex-col relative"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-fg)',
      }}
    >
      <div className="absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      <main className="flex-1 w-full flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto z-10 pt-20">
        <h1 className="text-8xl sm:text-9xl font-sans font-normal text-[var(--color-fg)] mb-4 select-none tracking-tighter">
          404
        </h1>
        <p className="text-base text-[var(--color-fg)] opacity-80 mb-8">This page has vanished.</p>
        <div className="flex items-center gap-4">
          <Link
            href="/components"
            className="inline-flex items-center h-10 px-5 rounded-md bg-(--color-accent) text-(--color-bg) text-xs font-medium hover:opacity-90 active:scale-[0.96] transition-[opacity,transform] duration-150 cursor-pointer"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            Explore Components
          </Link>
          <Link
            href="/"
            className="inline-flex items-center h-10 px-5 rounded-md border border-(--color-border) text-(--color-fg) text-xs font-medium hover:bg-(--color-surface-2) active:scale-[0.96] transition-[background-color,transform] duration-150 cursor-pointer"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
