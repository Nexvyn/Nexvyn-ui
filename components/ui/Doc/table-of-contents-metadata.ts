import type { ComponentItem } from '@/lib/components-registry'

export const tableOfContentsMetadata: ComponentItem = {
  id: 'table-of-contents',
  name: 'Table of Contents',
  collection: 'navigation',
  isNew: true,
  previewType: 'default',
  description:
    'A fixed bottom-left floating block that tracks scroll position, shows the active section via IntersectionObserver, and expands into a navigable section list.',
  registry: 'table-of-contents',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Scroll down to reveal the pill. Click to expand the section list. Click a section to smooth-scroll to it.',
  props: [
    {
      name: 'sections',
      type: 'TOCSection[]',
      description:
        'Array of section objects with `id`, `title`, and optional `level` (defaults to 2).',
      required: true,
    },
    {
      name: 'scrollOffset',
      type: 'number',
      description: 'Pixel offset from the top when scrolling to a section. Defaults to 120.',
    },
    {
      name: 'showAfterScroll',
      type: 'number',
      description: 'Scroll distance in pixels before the pill appears. Defaults to 300.',
    },
    {
      name: 'scrollContainer',
      type: 'RefObject<HTMLElement | null>',
      description:
        'Optional ref to a scrollable container. When provided, tracks that element instead of the window.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes merged onto the root element.',
    },
  ],
  usage: `import { useRef } from "react"
import { TableOfContents } from "@/components/ui/table-of-contents"

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "setup", title: "Setup", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
]

export function DocPage() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={scrollRef} className="overflow-y-auto">
      <TableOfContents sections={sections} scrollContainer={scrollRef} />
      {/* page content with matching section IDs */}
    </div>
  )
}`,
}
