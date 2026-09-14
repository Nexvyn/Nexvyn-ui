'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { GooDropdownPreview } from './goo-dropdown-preview'

const GooDropdownBreakdown = dynamic(() =>
  import('@/components/diagrams/goo-dropdown-diagram').then((mod) => mod.GooDropdownBreakdown),
)

export function GooDropdownDemo() {
  const [view] = usePreviewControl('goo-dropdown-view', 'preview')

  return view === 'anatomy' ? <GooDropdownBreakdown /> : <GooDropdownPreview />
}
