'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { BarsThemePreview } from './bars-theme-preview'

const BarsThemeAnatomy = dynamic(() =>
  import('@/components/diagrams/bars-theme-diagram').then((mod) => mod.BarsThemeAnatomy),
)

export function BarsThemeDemo() {
  const [view] = usePreviewControl('bars-theme-view', 'preview')

  return view === 'anatomy' ? <BarsThemeAnatomy /> : <BarsThemePreview />
}
