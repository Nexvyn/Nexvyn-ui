'use client'

import { useState } from 'react'
import { InputMessage } from '@/components/ui/input-message'

export function InputMessagePreview() {
  const [value, setValue] = useState('')

  return (
    <div className="flex h-full w-full items-center justify-center px-6 pt-6 pb-24 sm:px-8 sm:pt-8 sm:pb-28">
      <div className="w-full max-w-2xl">
        <InputMessage
          value={value}
          onValueChange={setValue}
          onSend={() => setValue('')}
          placeholder="Ask me anything…"
          minRows={2}
          maxRows={6}
        />
      </div>
    </div>
  )
}
