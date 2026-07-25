'use client'

import { ClipboardField } from '@/components/ui/clipboard-field'

export function ClipboardFieldPreview() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-8">
      <ClipboardField value="npx shadcn@latest add @nexvyn/badge" className="w-full max-w-md" />
      <ClipboardField
        value="npm i @blossom-carousel/vue"
        prompt=">"
        copiedLabel="Copied"
        className="w-full max-w-md"
      />
      <ClipboardField
        value="bunx shadcn@latest add @nexvyn/fader"
        hideIcon
        className="w-full max-w-sm"
      />
    </div>
  )
}
