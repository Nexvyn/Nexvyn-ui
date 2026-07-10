'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { PasswordInputBreakdown } from '@/components/diagrams/password-input-diagram'
import { PasswordInputPreview } from './password-input-preview'

export function PasswordInputDemo() {
  const [view] = usePreviewControl('password-input-view', 'preview')

  return view === 'anatomy' ? <PasswordInputBreakdown /> : <PasswordInputPreview />
}
