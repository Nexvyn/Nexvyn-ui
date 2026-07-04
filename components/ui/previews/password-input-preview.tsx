'use client'

import { PasswordInput } from '@/components/ui/password-input'

export function PasswordInputPreview() {
  return (
    <div className="flex items-center justify-center p-6">
      <PasswordInput placeholder="Enter your password" />
    </div>
  )
}
