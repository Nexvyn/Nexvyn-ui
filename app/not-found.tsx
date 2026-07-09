'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/layout/button'

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
        <h1 className="text-8xl sm:text-9xl font-sans font-normal text-(--color-fg) mb-4 select-none tracking-tighter">
          404
        </h1>
        <p className="text-base text-(--color-fg) opacity-80 mb-8">This page has vanished.</p>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <Button
            asChild
            className="bg-(--color-accent) text-(--color-bg) hover:opacity-90 active:scale-[0.96] transition-[opacity,transform] duration-150 cursor-pointer text-xs group"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <Link
              href="/components"
              className="gap-0.5"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span>Explore Components</span>
              <span className="w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-[width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center overflow-hidden">
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
                  className="ml-0.5 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border border-(--color-border) text-(--color-fg) hover:bg-(--color-surface-2) active:scale-[0.96] transition-[background-color,transform] duration-150 cursor-pointer text-xs group"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <Link
              href="/"
              className="gap-0.5"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-[width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center overflow-hidden">
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
                  className="mr-0.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
              </span>
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
