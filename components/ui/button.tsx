'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { animate, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { playClickSound, playHoverSound } from '@/lib/sound'

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
    'rounded-lg squircle-corners',
    'select-none',
    'transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-out)',
    'motion-reduce:transition-none motion-reduce:transform-none',
    'focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
    'focus-visible:outline-none',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        solid: 'bg-(--color-fg) text-(--color-bg) hover:bg-(--color-fg)/90',
        outline: 'border border-(--color-border) text-(--color-fg) hover:bg-(--color-surface)',
        ghost: 'text-(--color-fg) hover:bg-(--color-surface-2)',
        link: 'text-(--color-fg) underline-offset-4 hover:underline',
        destructive:
          'bg-(--color-error) text-(--color-bg) hover:bg-(--color-error)/90 focus-visible:ring-(--color-error)',
      },
      size: {
        sm: 'min-h-9 px-3 text-xs',
        md: 'min-h-11 px-4 text-sm',
        lg: 'min-h-12 px-5 text-base',
        'icon-sm': 'size-9 shrink-0 p-0',
        icon: 'size-11 shrink-0 p-0',
        'icon-lg': 'size-12 shrink-0 p-0',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  /** Accessible label announced while an action is in progress. */
  loadingLabel?: string
  /** Replaces the default progress glyph without changing loading behavior. */
  loadingIndicator?: React.ReactNode
  /** @deprecated Use `variant="destructive"`. */
  destructive?: boolean
  className?: string
}

function DefaultLoadingIndicator() {
  return (
    <svg
      className="size-4 animate-spin motion-reduce:animate-none"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-75"
      />
    </svg>
  )
}

function ButtonLoadingContent({
  children,
  indicator,
}: {
  children: React.ReactNode
  indicator?: React.ReactNode
}) {
  return (
    <span className="relative inline-flex min-w-0 items-center justify-center">
      <span className="invisible inline-flex items-center gap-2" aria-hidden="true">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center">
        {indicator ?? <DefaultLoadingIndicator />}
      </span>
    </span>
  )
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingLabel,
      loadingIndicator,
      destructive = false,
      disabled,
      type = 'button',
      tabIndex,
      onClick,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onPointerLeave,
      onMouseEnter,
      children,
      style,
      'aria-label': ariaLabel,
      ...props
    },
    forwardedRef,
  ) => {
    const internalRef = React.useRef<HTMLButtonElement | null>(null)
    const prefersReducedMotion = useReducedMotion()
    const isDisabled = disabled || loading
    const resolvedVariant =
      destructive && (variant === undefined || variant === 'solid') ? 'destructive' : variant
    const destructiveClasses = destructive
      ? variant === 'outline'
        ? 'border-(--color-error) text-(--color-error) hover:bg-(--color-error)/10 focus-visible:ring-(--color-error)'
        : variant === 'ghost'
          ? 'text-(--color-error) hover:bg-(--color-error)/10 focus-visible:ring-(--color-error)'
          : variant === 'link'
            ? 'text-(--color-error) focus-visible:ring-(--color-error)'
            : undefined
      : undefined

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        internalRef.current = node
        if (typeof forwardedRef === 'function') {
          forwardedRef(node)
        } else if (forwardedRef) {
          forwardedRef.current = node
        }
      },
      [forwardedRef],
    )

    const settle = React.useCallback(() => {
      if (prefersReducedMotion) return
      const element = internalRef.current
      if (!element) return
      animate(element, { transform: 'scale(1) translateY(0px)' }, { ...springs.settle })
    }, [prefersReducedMotion])

    const handlePointerDown = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        onPointerDown?.(event)
        if (event.defaultPrevented || isDisabled || prefersReducedMotion) return

        const element = internalRef.current
        if (!element) return
        animate(element, { transform: 'scale(0.97) translateY(1px)' }, { ...springs.press })
      },
      [onPointerDown, isDisabled, prefersReducedMotion],
    )

    const handlePointerUp = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        onPointerUp?.(event)
        settle()
      },
      [onPointerUp, settle],
    )

    const handlePointerCancel = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        onPointerCancel?.(event)
        settle()
      },
      [onPointerCancel, settle],
    )

    const handlePointerLeave = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        onPointerLeave?.(event)
        settle()
      },
      [onPointerLeave, settle],
    )

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          event.preventDefault()
          event.stopPropagation()
          return
        }
        playClickSound()
        onClick?.(event)
      },
      [onClick, isDisabled],
    )

    const handleMouseEnter = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!isDisabled) playHoverSound()
        onMouseEnter?.(event)
      },
      [onMouseEnter, isDisabled],
    )

    const loadingContent = (content: React.ReactNode) => (
      <ButtonLoadingContent indicator={loadingIndicator}>{content}</ButtonLoadingContent>
    )

    let renderedChildren: React.ReactNode = loading ? loadingContent(children) : children
    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{
        children?: React.ReactNode
      }>
      renderedChildren = React.cloneElement(
        child,
        undefined,
        loading ? loadingContent(child.props.children) : child.props.children,
      )
    }

    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={setRefs}
        type={asChild ? undefined : type}
        className={cn(
          buttonVariants({ variant: resolvedVariant, size }),
          destructiveClasses,
          className,
        )}
        disabled={asChild ? undefined : isDisabled}
        tabIndex={asChild && isDisabled ? -1 : tabIndex}
        aria-label={loading && loadingLabel ? loadingLabel : ariaLabel}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        data-loading={loading ? '' : undefined}
        data-disabled={isDisabled ? '' : undefined}
        data-variant={resolvedVariant ?? 'solid'}
        data-size={size ?? 'md'}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        onMouseEnter={handleMouseEnter}
        {...props}
        style={style}
      >
        {renderedChildren}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-6">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
