'use client'

import { cn } from '@/lib/utils'

type CodeBlockProps = {
  children: string
  variant?: 'usage' | 'install'
  className?: string
}

export function CodeBlock({ children, variant = 'usage', className }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        'detail-code-block overflow-x-auto font-mono leading-relaxed',
        variant === 'install' ? 'detail-code-install text-xs' : 'detail-code-usage text-[13px]',
        className,
      )}
    >
      <code>{children}</code>
    </pre>
  )
}
