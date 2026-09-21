'use client'

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export interface CtaProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}

export const Cta = forwardRef<HTMLElement, CtaProps>(
  ({ title, description, actions, className, ...props }, ref) => {
    const headingId = useId()

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn(
          'w-full rounded-md border border-(--color-border) bg-(--color-bg)',
          className,
        )}
        {...props}
      >
        <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center md:py-20">
          <h2
            id={headingId}
            className="text-balance text-2xl font-normal tracking-tight text-(--color-fg) md:text-3xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-pretty text-sm text-(--color-muted) md:text-base">
              {description}
            </p>
          )}
          {actions && (
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              {actions}
            </div>
          )}
        </div>
      </section>
    )
  },
)
Cta.displayName = 'Cta'

export const ctaActionVariants = cva(
  'group/cta-action inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm transition-[background-color,border-color,scale] duration-(--motion-dur-fast) ease active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) motion-reduce:transition-none motion-reduce:active:scale-100',
  {
    variants: {
      variant: {
        primary: 'bg-(--color-fg) text-(--color-bg) hover:bg-(--color-fg)/88',
        secondary:
          'border border-(--color-border) text-(--color-fg) hover:border-(--color-border-strong) hover:bg-(--color-fg)/5',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

export interface CtaActionProps
  extends ComponentPropsWithoutRef<'a'>, VariantProps<typeof ctaActionVariants> {
  asChild?: boolean
}

export const CtaAction = forwardRef<HTMLAnchorElement, CtaActionProps>(
  ({ asChild, variant, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'

    return <Comp ref={ref} className={cn(ctaActionVariants({ variant }), className)} {...props} />
  },
)
CtaAction.displayName = 'CtaAction'

export function CtaActionIcon({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex transition-[translate] duration-(--motion-dur-base) ease-(--motion-ease-in-out) rtl:-scale-x-100 motion-safe:group-hover/cta-action:translate-x-1 motion-safe:group-focus-visible/cta-action:translate-x-1 motion-safe:rtl:group-hover/cta-action:-translate-x-1 motion-safe:rtl:group-focus-visible/cta-action:-translate-x-1 motion-reduce:transition-none"
    >
      {children}
    </span>
  )
}
