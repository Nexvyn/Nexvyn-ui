'use client'

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
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

const REVEAL_STAGGER_MS = 60

export interface SocialProofTestimonialsProps extends Omit<
  ComponentPropsWithoutRef<'section'>,
  'title'
> {
  title?: ReactNode
  description?: ReactNode
  testimonials?: Testimonial[]
  initialCount?: number
  showMoreLabel?: string
  showLessLabel?: string
}

export const SocialProofTestimonials = forwardRef<HTMLElement, SocialProofTestimonialsProps>(
  (
    {
      title = 'What teams say',
      description = 'Notes from people shipping real products with Nexvyn UI.',
      testimonials = TESTIMONIALS,
      initialCount = 3,
      showMoreLabel = 'Show more',
      showLessLabel = 'Show less',
      ...props
    },
    ref,
  ) => {
    const headingId = useId()
    const listId = useId()
    const [expanded, setExpanded] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const collapsedByUser = useRef(false)
    const collapsible = testimonials.length > initialCount

    useEffect(() => {
      if (expanded || !collapsedByUser.current) return
      collapsedByUser.current = false
      buttonRef.current?.scrollIntoView({ block: 'nearest' })
    }, [expanded])

    const toggle = () => {
      collapsedByUser.current = expanded
      setExpanded((value) => !value)
    }

    return (
      <TestimonialsSection ref={ref} labelledBy={headingId} {...props}>
        <TestimonialsContainer>
          <TestimonialsHeader id={headingId} title={title} description={description} />
          <ul
            id={listId}
            className={cn(
              'mt-12 columns-1 gap-4 md:columns-2 lg:columns-3',
              collapsible &&
                !expanded &&
                'mask-[linear-gradient(to_bottom,black_60%,transparent)] md:mask-none',
            )}
          >
            {testimonials.map((testimonial, index) => {
              const extra = index >= initialCount
              const revealed = extra && expanded
              return (
                <li
                  key={`${testimonial.name}-${index}`}
                  className={cn(
                    'mb-4 break-inside-avoid',
                    extra && !expanded && 'hidden md:block',
                    revealed &&
                      'transition-[opacity,translate] duration-(--motion-dur-slow) ease-(--motion-ease-out) starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none',
                  )}
                  style={
                    revealed
                      ? { transitionDelay: `${(index - initialCount) * REVEAL_STAGGER_MS}ms` }
                      : undefined
                  }
                >
                  <TestimonialCard testimonial={testimonial} />
                </li>
              )
            })}
          </ul>
          {collapsible && (
            <TestimonialsButton
              ref={buttonRef}
              aria-expanded={expanded}
              aria-controls={listId}
              onClick={toggle}
              className="mt-2 w-full md:hidden"
            >
              {expanded ? showLessLabel : showMoreLabel}
            </TestimonialsButton>
          )}
        </TestimonialsContainer>
      </TestimonialsSection>
    )
  },
)
SocialProofTestimonials.displayName = 'SocialProofTestimonials'
