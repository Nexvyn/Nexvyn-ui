'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { PasswordInputPreview } from './password-input-preview'

const PasswordInputBreakdown = dynamic(() =>
  import('@/components/diagrams/password-input-diagram').then((mod) => mod.PasswordInputBreakdown),
)

export function PasswordInputDemo() {
  const [view] = usePreviewControl('password-input-view', 'preview')

  return view === 'anatomy' ? <PasswordInputBreakdown /> : <PasswordInputPreview />
}
