'use client'

import { InputCopy } from '@/components/ui/input-copy'

export function InputCopyPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <InputCopy label="API Key" value="sk-proj-a1b2c3d4e5f6" variant="button" />
      </div>
    </div>
  )
}
