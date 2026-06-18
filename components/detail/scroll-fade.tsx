import { cn } from '@/lib/utils'

type ScrollFadeProps = {
  side: 'top' | 'bottom'
  background?: string
  className?: string
}

export function ScrollFade({
  side,
  background = 'var(--color-surface)',
  className,
}: ScrollFadeProps) {
  const gradient =
    side === 'top'
      ? `linear-gradient(to bottom, ${background} 25%, transparent)`
      : `linear-gradient(to top, ${background} 25%, transparent)`

  return (
    <div
      aria-hidden
      data-side={side}
      className={cn(
        'pointer-events-none absolute inset-x-0 h-[8.5rem] w-full',
        side === 'top' ? 'top-0' : 'bottom-0',
        className,
      )}
      style={{
        background: gradient,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        maskImage:
          side === 'top'
            ? 'linear-gradient(to bottom, black 40%, transparent)'
            : 'linear-gradient(to top, black 40%, transparent)',
        WebkitMaskImage:
          side === 'top'
            ? 'linear-gradient(to bottom, black 40%, transparent)'
            : 'linear-gradient(to top, black 40%, transparent)',
      }}
    />
  )
}
