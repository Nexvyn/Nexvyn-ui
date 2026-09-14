'use client'

import { useEffect, useRef, useState } from 'react'
import { BounceSidebar } from '@/components/ui/bounce-sidebar'

const librarySections = [
  {
    title: 'Philosophy',
    blocks: [
      {
        text: 'Nexvyn/UI is a small set of components built around one idea: each one gets a single moment of motion, and everything else stays quiet. Layout, type and color do the structural work, so the one animated detail reads as intentional rather than busy. When a component needs more than that to feel finished, the design is usually wrong, not the animation.',
      },
      {
        text: 'Most components start from a pattern that already works well somewhere else. We rebuild it from scratch, strip what does not earn its place, and keep the API close to what you would expect from Radix or shadcn/ui. The goal is that nothing here surprises you on first read.',
      },
    ],
  },
  {
    title: 'Design System',
    blocks: [
      {
        text: 'Color comes from a short list of CSS variables: a background, two surfaces, a foreground, two muted text tones, borders, and one accent. The accent is reserved for focus, selection and the signature motion, which keeps it meaningful. Light and dark themes redefine the same variables, so components never branch on the theme.',
      },
      {
        text: 'Spacing sits on a 4px grid and radii come from one base value. Because every component reads the same tokens, retuning a theme is a matter of editing a few variables in one stylesheet rather than hunting through component files.',
      },
    ],
  },
  {
    title: 'Animations',
    blocks: [
      {
        text: 'Motion uses a handful of shared duration and easing tokens. Elements entering or leaving the screen ease out, elements already on screen ease in and out, and hover changes stay under 150ms. Only transform, opacity, clip-path and filter are animated, so the browser can keep the work off the main thread.',
      },
      {
        text: 'When the operating system asks for reduced motion, transitions are switched off in CSS and JavaScript-driven animation takes a static path. The component still communicates its state change; it just does it without movement.',
      },
    ],
  },
  {
    title: 'Performance',
    blocks: [
      {
        text: 'Components render only when their own state changes, and heavier pieces such as canvas renderers load lazily. Every timer, listener and animation frame is released on unmount, which matters on pages like this one where many components are mounted at once.',
      },
      {
        text: 'Each component ships as a single file with its own dependencies declared, so installing one does not pull in the rest. Shared helpers such as the class merger and the sound module are copied once and reused.',
      },
    ],
  },
  {
    title: 'Accessibility',
    blocks: [
      {
        text: 'Interactive parts use native elements where they exist and the matching ARIA roles where they do not. Composite widgets like tabs and menus use roving focus, so arrow keys move between items and Tab moves past the group. Overlays trap focus while open and return it to the trigger on close.',
      },
      {
        text: 'Touch targets are at least 44 pixels square, icon-only buttons carry an accessible label, and decorative icons are hidden from assistive technology. Focus rings show for keyboard users and stay out of the way for pointer clicks.',
      },
    ],
  },
  {
    title: 'Developer Experience',
    blocks: [
      {
        text: 'Every component is typed, forwards its ref, merges a className prop, and supports both controlled and uncontrolled state. Visual variants are enums rather than boolean flags, so autocomplete tells you what is available. User-facing strings are props with defaults, so you can localize them.',
      },
      {
        text: 'Installation goes through the shadcn registry: one command copies the source into your project, where it is yours to read and change. There is no runtime package to keep in sync.',
      },
    ],
  },
  {
    title: 'Customization',
    blocks: [
      {
        text: 'Override the theme by redefining the color, radius and motion variables in your own stylesheet. Because components reference the variables rather than literal values, the change applies everywhere at once, in both light and dark mode.',
      },
      {
        text: 'For one-off adjustments, pass a className. Classes you pass are merged after the internal ones, so your utilities win without needing important flags or deeper selectors.',
      },
    ],
  },
]

export function BounceSidebarPreview() {
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
    container.scrollTo({ top: top - 8, behavior: 'smooth' })
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
      <div className="md:hidden shrink-0 bg-(--color-surface) border-b border-(--color-border) px-3 py-1.5 text-center">
        <p className="text-[10px] font-sans text-(--color-fg)/50">
          For best experience, open in browser on a wider screen
        </p>
      </div>

      <div className="md:hidden shrink-0 border-b border-(--color-border) ps-4 pe-2 py-2">
        <p className="mb-1.5 text-[10px] font-sans uppercase tracking-wider text-(--color-fg)/45">
          Library Guide
        </p>
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {librarySections.map((section, index) => (
            <button
              key={section.title}
              type="button"
              onClick={() => goTo(index)}
              className={`shrink-0 px-2 py-1 rounded-md text-[11px] font-normal transition-colors ${
                active === index
                  ? 'bg-(--color-accent) text-(--color-bg)'
                  : 'text-(--color-fg)/55 hover:text-(--color-fg) hover:bg-(--color-surface)'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-0 md:gap-4 text-left w-full min-h-0 flex-1 max-w-4xl mx-auto">
        <aside className="hidden md:block w-40 shrink-0 h-full ps-4 pe-2">
          <p className="mb-3 ps-2 text-sm font-sans uppercase tracking-wider text-(--color-fg)/45">
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
          className="min-h-0 flex-1 overflow-y-auto pe-2 md:pe-4 h-full relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', marginInlineStart: '-1px' }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
            #preview-scroll-viewport::-webkit-scrollbar { display: none; }
          `,
            }}
          />
          <div className="max-w-xl mx-auto py-4 md:py-6 px-3 sm:px-4">
            {librarySections.map((section, index) => (
              <section
                key={section.title}
                ref={(el) => {
                  sectionRefs.current[index] = el
                }}
                className="mb-6 md:mb-8 last:mb-0 min-h-20 md:min-h-30 flex flex-col justify-start"
              >
                <h2 className="border-b pb-1 md:pb-1.5 tracking-tight text-lg md:text-2xl text-(--color-fg) border-(--color-border)">
                  {section.title}
                </h2>
                {section.blocks.map((block, blockIndex) => (
                  <p
                    key={blockIndex}
                    className="mt-1 md:mt-2 font-sans text-sm md:text-base leading-relaxed text-(--color-fg)/55"
                  >
                    {block.text}
                  </p>
                ))}
              </section>
            ))}
            <div className="h-16 md:h-25" />
          </div>
        </div>

        {/* Balancing spacer to center the scroll content relative to the parent card */}
        <div className="hidden md:block w-40 shrink-0 h-full ps-4 pe-2" />
      </div>
    </div>
  )
}
