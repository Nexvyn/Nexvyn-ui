'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { TableAnatomy } from '@/components/diagrams/table-diagram'
import { TablePreview } from './table-preview'

export function TableDemo() {
  const [view] = usePreviewControl('table-view', 'preview')

  return view === 'anatomy' ? <TableAnatomy /> : <TablePreview />
}
