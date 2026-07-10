'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { TableOfContentsBreakdown } from '@/components/diagrams/table-of-contents-diagram'
import { TableOfContentsPreview } from './table-of-contents-preview'

export function TableOfContentsDemo() {
  const [view] = usePreviewControl('table-of-contents-view', 'preview')

  return view === 'anatomy' ? <TableOfContentsBreakdown /> : <TableOfContentsPreview />
}
