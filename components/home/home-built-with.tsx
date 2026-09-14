'use client'

import Image from 'next/image'
import Link from 'next/link'

const CONTACT_HREF = 'https://x.com/Nexvyn'
const PROJECT_HREF = 'https://runeicons.com'

export function HomeBuiltWith() {
  return (
    <section
      aria-labelledby="home-built-with-heading"
      className="mx-auto mt-24 w-full max-w-5xl sm:mt-32"
    >
      <h2
        id="home-built-with-heading"
        className="mx-auto text-center text-balance font-light text-xl sm:text-2xl md:text-3xl tracking-tight text-(--color-fg)"
      >
        Built with Nexvyn UI
      </h2>
      <p className="mx-auto mt-3 max-w-prose text-center text-sm leading-7 text-(--color-muted)">
        Shipped something with Nexvyn UI?{' '}
        <Link
          href={CONTACT_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--color-accent) underline-offset-3 hover:underline"
        >
          DM me on X
        </Link>
        . I&apos;d love to feature it here.
      </p>

      <Link
        href={PROJECT_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto mt-8 block w-full max-w-130 rounded-2xl border border-(--panel-border) bg-(--color-surface) p-2 outline-none transition-[border-color,box-shadow] duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:border-(--panel-border-hover) hover:shadow-(--shadow-panel-ambient) focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:mt-10"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-(--panel-border)">
          <Image
            src="/images/rune-icons-showcase.jpg"
            alt="Rune Icons website built with Nexvyn UI"
            fill
            unoptimized
            sizes="(max-width: 520px) 100vw, 520px"
            className="object-cover brightness-(--media-brightness) transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-out) group-hover:scale-102 motion-reduce:transition-none motion-reduce:transform-none"
          />
        </div>
        <div className="flex items-center justify-between gap-4 px-2 pt-3 pb-1">
          <div className="min-w-0">
            <p className="text-sm text-(--color-fg)">Rune Icons</p>
            <p className="truncate text-cta text-(--color-muted)">
              Icon library site, built on Nexvyn primitives
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-cta text-(--color-muted) transition-colors duration-(--motion-dur-fast) ease-[ease] group-hover:text-(--color-fg) motion-reduce:transition-none">
            Visit
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-(--motion-dur-fast) ease-(--motion-ease-out) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none rtl:-scale-x-100"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        </div>
      </Link>
    </section>
  )
}
