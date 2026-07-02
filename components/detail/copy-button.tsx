'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export type CopyButtonProps = {
  value: string
  label?: string
  idleIcon?: React.ReactNode
  className?: string
}

export function CopyButton({ value, label, idleIcon, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={label}
      className={cn(
        'detail-toolbar-btn detail-copy-btn shrink-0 rounded-md px-2 py-1 text-xs font-medium transition-colors',
        className,
      )}
      style={{
        color: 'var(--color-muted)',
      }}
    >
      {copied ? <Check className="size-5 text-(--color-success)" /> : (idleIcon ?? 'Copy')}
    </button>
  )
}
