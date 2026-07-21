'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { DropdownMenuAnatomy } from '@/components/diagrams/dropdown-menu-diagram'
import { DropdownMenuPreview } from './dropdown-menu-preview'

export function DropdownMenuDemo() {
  const [view] = usePreviewControl('dropdown-menu-view', 'preview')

  return view === 'anatomy' ? <DropdownMenuAnatomy /> : <DropdownMenuPreview />
}
