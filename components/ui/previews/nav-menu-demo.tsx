'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { NavMenuAnatomy } from '@/components/diagrams/nav-menu-diagram'
import { NavMenuPreview } from './nav-menu-preview'

export function NavMenuDemo() {
  const [view] = usePreviewControl('nav-menu-view', 'preview')

  return view === 'anatomy' ? <NavMenuAnatomy /> : <NavMenuPreview />
}