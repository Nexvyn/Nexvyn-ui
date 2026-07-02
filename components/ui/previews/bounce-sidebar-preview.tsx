'use client'

import { useEffect, useRef, useState } from 'react'
import { BounceSidebar } from '@/components/ui/bounce-sidebar'

const librarySections = [
  {
    title: 'Philosophy',
    blocks: [
      {
        text: 'Philosophy is a core pillar of Nexvyn/UI, designed from the ground up to focus on visual clarity, premium micro-interactions, and developer experience. We believe that components should not only be accessible and functional but should also provide a tactile, high-fidelity user experience through organic physics-based animations that delight the user at first touch.',
      },
    ],
  },
  {
    title: 'Design System',
    blocks: [
      {
        text: 'Built on top of modern CSS custom properties and tailwind utility cascades, Nexvyn uses a highly curated, contrast-balanced color palette. Our theme variables adapt dynamically to light and dark modes with zero latency, providing consistent layout elevation, outline borders, and typography ratios across all viewports.',
      },
    ],
  },
  {
    title: 'Animations',
    blocks: [
      {
        text: 'Animations are computed using Framer Motion and spring physics so that motion transitions feel snappy, organic, and natural. By avoiding linear transitions and customizing spring coefficients (stiffness, damping, mass), we emulate real-world materials that stretch, compress, and slide smoothly to improve cognitive continuity.',
      },
    ],
  },
  {
    title: 'Performance',
    blocks: [
      {
        text: 'Performance is a core pillar of the library. We optimize transitions using hardware-accelerated CSS properties (like transforms and opacity) and boost selector specificity to avoid style recalculation delays. Components only re-render when state changes, maintaining fast initial load speeds.',
      },
    ],
  },
  {
    title: 'Accessibility',
    blocks: [
      {
        text: 'Accessibility is never an afterthought. Every component is built using semantic HTML elements, complete ARIA attribute specifications (roles, tablists, keyboard focus indicators), and conforms fully to WCAG 2.1 AA color contrast guidelines on both dark and light backgrounds.',
      },
    ],
  },
  {
    title: 'Developer Experience',
    blocks: [
      {
        text: 'Developer experience (DX) is at the heart of our engineering. With fully typed components, clean named exports, and intuitive React hooks, integrating Nexvyn/UI into any modern codebase is seamless. We eliminate boilerplate, provide helpful TypeScript interfaces, and ensure compilation is warning-free to accelerate your feature delivery.',
      },
    ],
  },
  {
    title: 'Customization',
    blocks: [
      {
        text: "While we offer a premium default aesthetic, customization is fully supported. By utilizing semantic CSS variables (--color-accent, --color-bg, and custom scoping variables), you can easily override themes, radius coordinates, and animation springs to match your brand's unique identity without touching the core source files.",
      },
    ],
  },
]

export function BounceSidebarPreview() {
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
    <div className="flex h-full w-full justify-center items-start pt-[4vh] p-6">
      <div className="flex flex-col md:flex-row gap-6 md:gap-4 text-left max-w-3xl items-stretch md:items-start w-full h-full max-h-[520px]">
        <aside className="w-full md:w-40 shrink-0 sticky top-0 h-fit pl-2">
          <p className="mb-3 pl-2 text-xs font-semibold font-sans uppercase tracking-wider text-foreground/45">
            Library Guide
          </p>
          <BounceSidebar
            items={librarySections.map((s) => s.title)}
            value={active}
            onChange={goTo}
            dotColor="var(--color-accent)"
          />
        </aside>

        <div
          ref={scrollRef}
          id="preview-scroll-viewport"
          className="min-h-0 flex-1 overflow-y-auto pr-4 h-full relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', marginLeft: '-1px' }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
            #preview-scroll-viewport::-webkit-scrollbar { display: none; }
          `,
            }}
          />
          <div className="max-w-xl mx-auto">
            {librarySections.map((section, index) => (
              <section
                key={section.title}
                ref={(el) => {
                  sectionRefs.current[index] = el
                }}
                className="mb-8 last:mb-0 min-h-[120px] flex flex-col justify-start"
              >
                <h2 className="border-b pb-1.5 tracking-tight text-lg font-semibold text-foreground border-(--color-border)">
                  {section.title}
                </h2>
                {section.blocks.map((block, blockIndex) => (
                  <p
                    key={blockIndex}
                    className="mt-2 font-sans text-sm leading-relaxed text-foreground/55"
                  >
                    {block.text}
                  </p>
                ))}
              </section>
            ))}
            <div className="h-[100px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
