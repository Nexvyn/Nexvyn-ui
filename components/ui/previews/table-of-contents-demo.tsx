'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { TableOfContentsPreview } from './table-of-contents-preview'

const TableOfContentsBreakdown = dynamic(() =>
  import('@/components/diagrams/table-of-contents-diagram').then(
    (mod) => mod.TableOfContentsBreakdown,
  ),
)

export function TableOfContentsDemo() {
  const [view] = usePreviewControl('table-of-contents-view', 'preview')

  return view === 'anatomy' ? <TableOfContentsBreakdown /> : <TableOfContentsPreview />
}
