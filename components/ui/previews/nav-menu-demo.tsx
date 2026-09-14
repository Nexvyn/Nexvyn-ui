'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { NavMenuPreview } from './nav-menu-preview'

const NavMenuAnatomy = dynamic(() =>
  import('@/components/diagrams/nav-menu-diagram').then((mod) => mod.NavMenuAnatomy),
)

export function NavMenuDemo() {
  const [view] = usePreviewControl('nav-menu-view', 'preview')

  return view === 'anatomy' ? <NavMenuAnatomy /> : <NavMenuPreview />
}
