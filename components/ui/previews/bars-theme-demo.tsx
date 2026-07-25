'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { BarsThemeAnatomy } from '@/components/diagrams/bars-theme-diagram'
import { BarsThemePreview } from './bars-theme-preview'

export function BarsThemeDemo() {
  const [view] = usePreviewControl('bars-theme-view', 'preview')

  return view === 'anatomy' ? <BarsThemeAnatomy /> : <BarsThemePreview />
}
