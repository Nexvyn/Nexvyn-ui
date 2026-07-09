'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { GooDropdownBreakdown } from '@/components/diagrams/goo-dropdown-diagram'
import { GooDropdownPreview } from './goo-dropdown-preview'

export function GooDropdownDemo() {
  const [view] = usePreviewControl('goo-dropdown-view', 'preview')

  return view === 'anatomy' ? <GooDropdownBreakdown /> : <GooDropdownPreview />
}
