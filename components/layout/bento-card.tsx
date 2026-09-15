import { cn } from '@/lib/utils'

export function BentoTag({
  children,
  tone = 'muted',
  className,
}: {
  children: React.ReactNode
  tone?: 'muted' | 'solid'
  className?: string
}) {
  return (
    <span
      className={cn(
        'squircle-corners inline-flex h-6 w-fit items-center rounded-md px-2 text-xs font-normal',
        tone === 'solid'
          ? 'bg-(--color-fg) text-(--color-bg)'
          : 'bg-(--color-surface-2) text-(--color-muted)',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function BentoCard({
  tag,
  tagTone,
  className,
  children,
  ...props
}: {
  tag?: string
  tagTone?: 'muted' | 'solid'
  className?: string
  children: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'>) {
  return (
    <section
      {...props}
      className={cn(
        'squircle-corners relative flex min-w-0 flex-col gap-4 overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-bg) p-4 sm:p-5 short:gap-3 short:p-4',
        className,
      )}
    >
      {tag && (
        <BentoTag tone={tagTone} className="relative z-1">
          {tag}
        </BentoTag>
      )}
      {children}
    </section>
  )
}
