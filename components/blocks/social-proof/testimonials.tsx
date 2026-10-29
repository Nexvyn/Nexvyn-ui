'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { NameAvatar } from '@/components/blocks/shared/name-avatar'
import { cn } from '@/lib/utils'

export type Testimonial = { quote: string; name: string; role: string }

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We copied the dialog source into our repo and changed two tokens. It matched the rest of our product on the first try, in both themes.',
    name: 'Ruth Abara',
    role: 'Frontend lead, Quillfern',
  },
  {
    quote:
      'Keyboard support is the part I usually rebuild by hand. Arrow keys, Escape and focus return already worked, so I spent the week on our actual product.',
    name: 'Tomas Lindqvist',
    role: 'Design engineer, Pellmark',
  },
  {
    quote:
      'I am not a designer and our marketing site still looks calm. Dark mode came along for free because everything reads from tokens.',
    name: 'Amara Osei',
    role: 'Founder, Tindra',
  },
  {
    quote:
      'Reviews got shorter. It is plain React and Tailwind, so nobody had to learn a new library to read the diff.',
    name: 'Daniel Ferreira',
    role: 'Engineering manager, Mossline',
  },
  {
    quote:
      'The motion is quiet and it already respects reduced motion. Our accessibility audit came back with notes on our own code, not on these parts.',
    name: 'Lena Hoffmann',
    role: 'Product designer, Harrowgate Bikes',
  },
  {
    quote:
      'I needed a pricing section and a login by Friday. Two blocks, one afternoon, and the source is mine to change.',
    name: 'Sam Okoro',
    role: 'Solo developer, Ostrander Print',
  },
]

export const TestimonialsSection = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'> & { labelledBy: string }
>(({ labelledBy, className, ...props }, ref) => (
  <section
    ref={ref}
    aria-labelledby={labelledBy}
    className={cn('w-full bg-(--color-bg) py-16 md:py-24', className)}
    {...props}
  />
))
TestimonialsSection.displayName = 'TestimonialsSection'

export function TestimonialsContainer({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn('mx-auto w-full max-w-5xl px-6 sm:px-8', className)}>{children}</div>
}

export function TestimonialsHeader({
  id,
  title,
  description,
}: {
  id: string
  title: ReactNode
  description?: ReactNode
}) {
  return (
    <div className="flex max-w-md flex-col gap-3">
      <h2
        id={id}
        className="text-balance text-2xl font-normal tracking-tight text-(--color-fg) md:text-3xl"
      >
        {title}
      </h2>
      {description && (
        <p className="text-pretty text-sm text-(--color-muted) md:text-base">{description}</p>
      )}
    </div>
  )
}

export interface TestimonialCardProps extends ComponentPropsWithoutRef<'figure'> {
  testimonial: Testimonial
}

export const TestimonialCard = forwardRef<HTMLElement, TestimonialCardProps>(
  ({ testimonial, className, ...props }, ref) => (
    <figure
      ref={ref}
      className={cn('flex flex-col gap-6 rounded-md bg-(--color-surface) p-6', className)}
      {...props}
    >
      <blockquote className="text-pretty text-sm leading-relaxed text-(--color-fg) md:text-base">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <NameAvatar name={testimonial.name} />
        <span className="flex min-w-0 flex-col">
          <span className="text-sm text-(--color-fg)">{testimonial.name}</span>
          <span className="text-xs text-(--color-muted)">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  ),
)
TestimonialCard.displayName = 'TestimonialCard'

export const TestimonialsButton = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-md border border-(--color-border) px-5 text-sm text-(--color-fg) transition-[background-color,border-color,scale] duration-(--motion-dur-fast) ease hover:border-(--color-border-strong) hover:bg-(--color-fg)/5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none motion-reduce:active:scale-100',
        className,
      )}
      {...props}
    />
  ),
)
TestimonialsButton.displayName = 'TestimonialsButton'
