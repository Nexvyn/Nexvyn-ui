'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollIndicator } from '@/components/ui/scroll-indicator'

const docSections = [
  {
    title: 'Philosophy',
    text: 'Philosophy is a core pillar of Nexvyn/UI, designed from the ground up to focus on visual clarity, premium micro-interactions, and developer experience. We believe that components should not only be accessible and functional but should also provide a tactile, high-fidelity user experience through organic physics-based animations that delight the user at first touch. Every decision we make prioritizes the end user, ensuring that each interaction feels intentional and rewarding.',
  },
  {
    title: 'Design System',
    text: 'Built on top of modern CSS custom properties and tailwind utility cascades, Nexvyn uses a highly curated, contrast-balanced color palette. Our theme variables adapt dynamically to light and dark modes with zero latency, providing consistent layout elevation, outline borders, and typography ratios across all viewports. The design system is built to scale, supporting everything from small embeds to large dashboard interfaces.',
  },
  {
    title: 'Animations',
    text: 'Animations are computed using Framer Motion and spring physics so that motion transitions feel snappy, organic, and natural. By avoiding linear transitions and customizing spring coefficients (stiffness, damping, mass), we emulate real-world materials that stretch, compress, and slide smoothly to improve cognitive continuity. Motion is information, not decoration — every animation communicates state changes.',
  },
  {
    title: 'Performance',
    text: 'Performance is a core pillar of the library. We optimize transitions using hardware-accelerated CSS properties (like transforms and opacity) and boost selector specificity to avoid style recalculation delays. Components only re-render when state changes, maintaining fast initial load speeds. Lazy loading and code splitting are built in. Each component is tree-shakeable.',
  },
  {
    title: 'Accessibility',
    text: 'Accessibility is never an afterthought. Every component is built using semantic HTML elements, complete ARIA attribute specifications (roles, tablists, keyboard focus indicators), and conforms fully to WCAG 2.1 AA color contrast guidelines on both dark and light backgrounds. Screen reader testing is part of our CI pipeline. We support keyboard navigation and focus management.',
  },
  {
    title: 'Developer Experience',
    text: 'Developer experience (DX) is at the heart of our engineering. With fully typed components, clean named exports, and intuitive React hooks, integrating Nexvyn/UI into any modern codebase is seamless. We eliminate boilerplate, provide helpful TypeScript interfaces, and ensure compilation is warning-free. The shadcn registry integration means installing components is a single command.',
  },
  {
    title: 'Customization',
    text: 'While we offer a premium default aesthetic, customization is fully supported. By utilizing semantic CSS variables (--color-accent, --color-bg, and custom scoping variables), you can easily override themes, radius coordinates, and animation springs to match your brand identity without touching the core source files. Every token is overridable.',
  },
]

export function ScrollIndicatorPreview() {
  const [active, setActive] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const lockUntil = useRef(0)

  const goTo = (index: number) => {
    const container = scrollRef.current
    const el = sectionRefs.current[index]
    if (!container || !el) return
    setActive(index)
    lockUntil.current = Date.now() + 800
    const top =
      el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
    container.scrollTo({ top: top - 8, behavior: 'smooth' })
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return

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

  return (
    <div className="flex flex-col h-full w-full">
      {/* Mobile disclaimer */}
      <div className="md:hidden shrink-0 bg-(--color-surface) border-b border-(--color-border) px-3 py-1.5 text-center">
        <p className="text-[10px] font-sans text-foreground/50">
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
                  active === index ? 'text-(--color-accent)' : 'text-foreground/40'
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
                <h2 className="border-b pb-1 md:pb-1.5 tracking-tight text-lg md:text-2xl text-foreground border-(--color-border)">
                  {section.title}
                </h2>
                <p className="mt-1 md:mt-2 font-sans text-sm md:text-base leading-relaxed text-foreground/55">
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
