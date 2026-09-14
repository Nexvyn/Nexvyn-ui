'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollIndicator } from '@/components/ui/scroll-indicator'

const docSections = [
  {
    title: 'Philosophy',
    text: 'Nexvyn UI focuses on clarity and restraint. Each component has one signature motion moment, the accent appears only on focus, selection, or that signature, and everything else stays neutral. The goal is interfaces that feel built with care rather than assembled from parts. Components are small, readable, and meant to be copied into your project and owned by you.',
  },
  {
    title: 'Design System',
    text: 'Colors come from a short list of semantic tokens: background, foreground, muted, border, surface, and a single accent. Every token has a light and a dark value, so components follow the theme without any component-level dark mode code. Radii use rounded-md, spacing sits on a 4px grid, and type uses a small set of sizes at regular weight.',
  },
  {
    title: 'Animations',
    text: 'Motion uses spring physics and a small set of duration and easing tokens. Elements entering or leaving use ease-out, elements already on screen use ease-in-out, and hovers use plain ease. Only transform, opacity, clip-path, and filter are animated, and every animation respects the reduced motion setting by turning itself off.',
  },
  {
    title: 'Performance',
    text: 'Components animate hardware-friendly properties, clean up every timer, listener, and observer on unmount, and avoid reading layout during render. The documentation site is prerendered as static pages, heavy views such as anatomy diagrams load only when opened, and each component installs as its own file so you ship only what you use.',
  },
  {
    title: 'Accessibility',
    text: 'Components use semantic elements, keyboard support, visible focus rings for keyboard users, and ARIA attributes where native semantics are not enough. Composite widgets use roving focus, overlays trap and restore focus, and touch targets aim for 44 by 44 pixels. Contrast is checked by hand in both themes.',
  },
  {
    title: 'Developer Experience',
    text: 'Everything is typed with TypeScript, props follow a consistent naming pattern, and components support both controlled and uncontrolled use. Styling merges through a cn helper, so your className always wins. Install any component with a single shadcn command, then read and change the source like your own code.',
  },
  {
    title: 'Customization',
    text: 'Override the design tokens to match your brand, pass className to adjust layout, and swap icons, since icons are accepted as React nodes. User-facing strings such as labels and placeholders are props with sensible defaults, so the components are easy to localize without editing their source.',
  },
]

export function ScrollIndicatorPreview() {
  const [active, setActive] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const isLocked = useRef(false)
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (index: number) => {
    const container = scrollRef.current
    const el = sectionRefs.current[index]
    if (!container || !el) return
    setActive(index)
    isLocked.current = true
    if (lockTimer.current) clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => {
      isLocked.current = false
    }, 800)
    const top =
      el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
    container.scrollTo({ top: Math.max(0, top - 16), behavior: 'smooth' })
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const onScroll = () => {
      if (isLocked.current) return

      const scrollTop = container.scrollTop

      if (scrollTop + container.clientHeight >= container.scrollHeight - 4) {
        setActive(sectionRefs.current.length - 1)
        return
      }

      let current = 0
      sectionRefs.current.forEach((el, index) => {
        if (el) {
          const elementOffset = el.offsetTop
          if (elementOffset <= scrollTop + 40) {
            current = index
          }
        }
      })
      setActive(current)
    }
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (lockTimer.current) clearTimeout(lockTimer.current)
    }
  }, [])

  return (
    <div className="flex flex-col h-full w-full">
      {/* Mobile disclaimer */}
      <div className="md:hidden shrink-0 bg-(--color-surface) border-b border-(--color-border) px-3 py-1.5 text-center">
        <p className="text-[10px] font-sans text-(--color-fg)/50">
          For best experience, open in browser on a wider screen
        </p>
      </div>

      {/* Mobile: horizontal dot nav at top */}
      <div className="md:hidden shrink-0 border-b border-(--color-border) px-3 py-2.5">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          {docSections.map((section, index) => (
            <button
              key={section.title}
              type="button"
              onClick={() => goTo(index)}
              className="flex items-center gap-1.5 shrink-0 bg-transparent border-0 p-0 cursor-pointer"
            >
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  active === index ? 'bg-(--color-accent)' : 'bg-foreground/25'
                }`}
              />
              <span
                className={`text-[10px] uppercase tracking-wider transition-colors ${
                  active === index ? 'text-(--color-accent)' : 'text-(--color-fg)/40'
                }`}
              >
                {section.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-0 md:gap-0 text-left w-full min-h-0 flex-1">
        <div
          ref={scrollRef}
          id="scroll-indicator-viewport"
          className="min-h-0 flex-1 overflow-y-auto pe-2 md:pe-8 pt-3 md:pt-6 pb-4 h-full relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', marginInlineStart: '-1px' }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
            #scroll-indicator-viewport::-webkit-scrollbar { display: none; }
          `,
            }}
          />
          <div className="max-w-xl mx-auto px-2 sm:px-4">
            {docSections.map((section, index) => (
              <section
                key={section.title}
                data-section-index={index}
                ref={(el) => {
                  sectionRefs.current[index] = el
                }}
                className="mb-6 md:mb-8 last:mb-0 min-h-20 md:min-h-30 flex flex-col justify-start"
              >
                <h2 className="border-b pb-1 md:pb-1.5 tracking-tight text-lg md:text-2xl text-(--color-fg) border-(--color-border)">
                  {section.title}
                </h2>
                <p className="mt-1 md:mt-2 font-sans text-sm md:text-base leading-relaxed text-(--color-fg)/55">
                  {section.text}
                </p>
              </section>
            ))}
            <div className="h-16 md:h-25" />
          </div>
        </div>

        {/* Desktop: vertical scroll indicator on right */}
        <aside className="hidden md:block w-8 shrink-0 h-full">
          <ScrollIndicator
            sections={docSections.map((s, i) => ({
              id: `section-${i}`,
              title: s.title,
              level: 2,
            }))}
            activeIndex={active}
            onIndexChange={goTo}
            scrollRef={scrollRef}
            className="h-full"
          />
        </aside>
      </div>
    </div>
  )
}
