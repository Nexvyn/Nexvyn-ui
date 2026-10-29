import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface NameAvatarProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
  name: string
  size?: number
}

const STRONG = 'fill-current text-(--color-fg)/70'
const MID = 'fill-current text-(--color-fg)/40'
const SOFT = 'fill-current text-(--color-fg)/20'

function hashName(value: string) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  hash ^= hash >>> 16
  hash = Math.imul(hash, 2246822507)
  hash ^= hash >>> 13
  hash = Math.imul(hash, 3266489909)
  hash ^= hash >>> 16
  return hash >>> 0
}

function shapes(seed: number): ReactNode {
  const nudge = (((seed >>> 16) % 3) - 1) * 2
  switch ((seed >>> 8) % 3) {
    case 0:
      return (
        <>
          <circle cx={13} cy={14} r={10} className={SOFT} />
          <circle cx={22 + nudge} cy={21} r={4.5} className={STRONG} />
        </>
      )
    case 1:
      return (
        <>
          <path d="M4 18 A12 12 0 0 0 28 18 Z" className={SOFT} />
          <circle cx={16 + nudge} cy={11} r={4} className={STRONG} />
        </>
      )
    default:
      return (
        <>
          <rect x={6} y={9} width={20} height={6} rx={3} className={SOFT} />
          <rect x={6} y={17} width={14 + nudge} height={6} rx={3} className={MID} />
          <circle cx={25} cy={20} r={3} className={STRONG} />
        </>
      )
  }
}

export const NameAvatar = forwardRef<HTMLSpanElement, NameAvatarProps>(
  ({ name, size = 32, className, style, ...props }, ref) => {
    const seed = hashName(name.trim().toLowerCase())
    const rotation = (seed & 7) * 45

    return (
      <span
        ref={ref}
        className={cn(
          'squircle relative inline-flex shrink-0 overflow-hidden bg-(--color-surface-2)',
          className,
        )}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 32 32"
          width={size}
          height={size}
          fill="currentColor"
          className="block"
        >
          <g transform={`rotate(${rotation} 16 16)`}>{shapes(seed)}</g>
        </svg>
      </span>
    )
  },
)
NameAvatar.displayName = 'NameAvatar'
