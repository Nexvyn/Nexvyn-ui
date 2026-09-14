'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { DropdownMenuPreview } from './dropdown-menu-preview'

const DropdownMenuAnatomy = dynamic(() =>
  import('@/components/diagrams/dropdown-menu-diagram').then((mod) => mod.DropdownMenuAnatomy),
)

export function DropdownMenuDemo() {
  const [view] = usePreviewControl('dropdown-menu-view', 'preview')

  return view === 'anatomy' ? <DropdownMenuAnatomy /> : <DropdownMenuPreview />
}
