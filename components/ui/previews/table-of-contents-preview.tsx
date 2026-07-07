'use client'

import { useRef } from 'react'
import { TableOfContents } from '@/components/ui/table-of-contents'

const sections = [
  {
    title: 'Introduction',
    blocks: [
      'Nexvyn/UI is a modern component library built with React, Tailwind CSS, and motion primitives. It provides production-ready, accessible, and fully typed UI components following a hybrid headless-plus-token architecture.',
      'Every component is designed to work in both light and dark modes, with full keyboard navigation, screen reader support, and responsive layouts. The library prioritizes developer experience with clean APIs and comprehensive TypeScript support.',
    ],
  },
  {
    title: 'Getting Started',
    blocks: [
      'Install components individually via the shadcn registry using a single command. Each component declares its own dependencies and is fully tree-shakeable, so you only ship the code you actually use.',
      'Components follow a consistent pattern: headless logic for behavior, composable styling via CSS variables, and full TypeScript inference. This makes them easy to customize and integrate into any project.',
    ],
  },
  {
    title: 'Features',
    blocks: [
      'The library includes spring-based animations, intersection observer patterns, portal-mounted overlays, and responsive design tokens. All motion respects prefers-reduced-motion for accessibility.',
      'Theme switching is instant with no flash. Every visual element uses semantic CSS variables that adapt to light and dark modes automatically. Customizer tokens allow per-component color overrides.',
    ],
  },
  {
    title: 'Usage Examples',
    blocks: [
      'Import any component directly and pass the required props. All components support both controlled and uncontrolled patterns, className merging via the cn utility, and ref forwarding.',
      'For navigation components, pass an array of items with labels and handle selection via callbacks. For overlay components, manage open state externally or let the component handle it internally.',
    ],
  },
  {
    title: 'API Reference',
    blocks: [
      'Each component exports a named function and a props interface prefixed with the component name. Props use enum variants via class-variance-authority instead of boolean flags.',
      'Event handlers follow the on[Event] naming convention. All interactive components forward refs and accept standard HTML attributes. Accessibility attributes are handled internally.',
    ],
  },
  {
    title: 'Configuration',
    blocks: [
      'Override default styles by passing className props. The cn utility merges your classes with internal ones, allowing you to customize any visual aspect without modifying the source.',
      'Design tokens are defined in globals.css and can be overridden at the root level. Each token has a semantic name that maps to the appropriate color in light and dark modes.',
    ],
  },
  {
    title: 'Theming',
    blocks: [
      'The theme system uses CSS custom properties scoped to the document root. Toggle between light and dark mode via the ThemeToggle component or the T keyboard shortcut.',
      'All components automatically respond to theme changes. No component-level dark mode conditionals are used, ensuring consistent and instant theme switching across the entire library.',
    ],
  },
  {
    title: 'FAQ',
    blocks: [
      'Components are free for personal and commercial use with no attribution required. They cannot be resold as a standalone product. All implementations are original, built from scratch.',
      'For questions or feedback, reach out via the feedback modal or email. The library is actively maintained with regular updates to fix bugs, improve accessibility, and add new components.',
    ],
  },
]

export function TableOfContentsPreview() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative h-full w-full">
      <div
        ref={scrollRef}
        id="toc-preview-viewport"
        className="min-h-0 flex-1 overflow-y-auto h-full relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `#toc-preview-viewport::-webkit-scrollbar { display: none; }`,
          }}
        />
        <div className="max-w-xl mx-auto py-4 md:py-6 px-3 sm:px-4">
          {sections.map((section) => (
            <div
              key={section.title}
              id={`toc-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="mb-6 md:mb-8 last:mb-0 min-h-20 md:min-h-30 flex flex-col justify-start"
            >
              <h2 className="border-b pb-1 md:pb-1.5 tracking-tight text-lg md:text-2xl text-(--color-fg) border-(--color-border)">
                {section.title}
              </h2>
              {section.blocks.map((text, i) => (
                <p
                  key={i}
                  className="mt-1 md:mt-2 font-sans text-sm md:text-base leading-relaxed text-(--color-muted)"
                >
                  {text}
                </p>
              ))}
            </div>
          ))}
          <div className="h-16 md:h-25" />
        </div>
      </div>
      <TableOfContents
        sections={sections.map((s) => ({
          id: `toc-${s.title.toLowerCase().replace(/\s+/g, '-')}`,
          title: s.title,
        }))}
        showAfterScroll={0}
        scrollContainer={scrollRef}
      />
    </div>
  )
}
