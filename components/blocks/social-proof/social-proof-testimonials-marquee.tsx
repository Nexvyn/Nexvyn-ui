'use client'

import {
  forwardRef,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from 'react'
import {
  TESTIMONIALS,
  TestimonialCard,
  TestimonialsButton,
  TestimonialsContainer,
  TestimonialsHeader,
  TestimonialsSection,
  type Testimonial,
} from '@/components/blocks/social-proof/testimonials'
import { cn } from '@/lib/utils'

const MARQUEE_KEYFRAMES =
  '@keyframes nx-testimonials-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(calc(-50% * var(--marquee-dir,1)),0,0)}}'

const MIN_CARDS_PER_COPY = 6
const SECONDS_PER_CARD = 7

const TRACK = 'flex w-max rtl:[--marquee-dir:-1] motion-reduce:w-full motion-reduce:animate-none'
const FORWARD =
  'animate-[nx-testimonials-marquee_var(--marquee-duration)_linear_infinite_var(--marquee-state,running)]'
const BACKWARD =
  'animate-[nx-testimonials-marquee_var(--marquee-duration)_linear_infinite_reverse_var(--marquee-state,running)]'
const ITEM = 'flex shrink-0 motion-safe:w-72 sm:motion-safe:w-80'

function MarqueeRow({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) {
  const repeats = Math.max(1, Math.ceil(MIN_CARDS_PER_COPY / items.length))
  const copy = Array.from({ length: repeats }, () => items).flat()
  const duration = { '--marquee-duration': `${copy.length * SECONDS_PER_CARD}s` } as CSSProperties

  return (
    <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] hover:[--marquee-state:paused] focus-within:[--marquee-state:paused] motion-reduce:mx-auto motion-reduce:max-w-5xl motion-reduce:overflow-visible motion-reduce:px-6 motion-reduce:mask-none sm:motion-reduce:px-8">
      <div className={cn(TRACK, reverse ? BACKWARD : FORWARD)} style={duration}>
        <ul className="flex shrink-0 gap-4 pe-4 motion-reduce:grid motion-reduce:w-full motion-reduce:pe-0 md:motion-reduce:grid-cols-3">
          {copy.map((testimonial, index) => {
            const filler = index >= items.length
            return (
              <li
                key={`${testimonial.name}-${index}`}
                aria-hidden={filler || undefined}
                inert={filler || undefined}
                className={cn(ITEM, filler && 'motion-reduce:hidden')}
              >
                <TestimonialCard testimonial={testimonial} className="w-full" />
              </li>
            )
          })}
        </ul>
        <ul aria-hidden="true" inert className="flex shrink-0 gap-4 pe-4 motion-reduce:hidden">
          {copy.map((testimonial, index) => (
            <li key={`${testimonial.name}-${index}`} className={ITEM}>
              <TestimonialCard testimonial={testimonial} className="w-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export interface SocialProofTestimonialsMarqueeProps extends Omit<
  ComponentPropsWithoutRef<'section'>,
  'title'
> {
  title?: ReactNode
  description?: ReactNode
  testimonials?: Testimonial[]
  pauseLabel?: string
  playLabel?: string
}

export const SocialProofTestimonialsMarquee = forwardRef<
  HTMLElement,
  SocialProofTestimonialsMarqueeProps
>(
  (
    {
      title = 'In their words',
      description = 'Short notes from teams building with Nexvyn UI components and blocks.',
      testimonials = TESTIMONIALS,
      pauseLabel = 'Pause',
      playLabel = 'Play',
      ...props
    },
    ref,
  ) => {
    const headingId = useId()
    const rowsId = useId()
    const [paused, setPaused] = useState(false)
    const half = Math.ceil(testimonials.length / 2)
    const rows = [testimonials.slice(0, half), testimonials.slice(half)].filter(
      (row) => row.length > 0,
    )

    return (
      <TestimonialsSection ref={ref} labelledBy={headingId} {...props}>
        <style href="nx-testimonials-marquee" precedence="default">
          {MARQUEE_KEYFRAMES}
        </style>
        <TestimonialsContainer className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <TestimonialsHeader id={headingId} title={title} description={description} />
          <TestimonialsButton
            aria-controls={rowsId}
            onClick={() => setPaused((value) => !value)}
            className="self-start md:self-auto motion-reduce:hidden"
          >
            {paused ? playLabel : pauseLabel}
          </TestimonialsButton>
        </TestimonialsContainer>
        <div
          id={rowsId}
          className={cn('mt-12 flex flex-col gap-4', paused && '[--marquee-state:paused]')}
        >
          {rows.map((row, index) => (
            <MarqueeRow key={index} items={row} reverse={index % 2 === 1} />
          ))}
        </div>
      </TestimonialsSection>
    )
  },
)
SocialProofTestimonialsMarquee.displayName = 'SocialProofTestimonialsMarquee'
