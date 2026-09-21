'use client'

import {
  forwardRef,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type FormEvent,
  type ReactNode,
} from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import {
  FOOTER_LEGAL,
  FOOTER_SITEMAP,
  FooterBottomBar,
  FooterBrand,
  FooterSitemap,
  type FooterColumnItem,
  type FooterLinkItem,
} from '@/components/blocks/footer/footer'
import { cn } from '@/lib/utils'

export interface FooterNewsletterProps extends ComponentPropsWithoutRef<'footer'> {
  brand?: ReactNode
  tagline?: ReactNode
  columns?: FooterColumnItem[]
  legal?: FooterLinkItem[]
  copyright?: ReactNode
  formLabel?: string
  placeholder?: string
  submitLabel?: string
  successMessage?: string
  onSubscribe?: (email: string) => void
}

export const FooterNewsletter = forwardRef<HTMLElement, FooterNewsletterProps>(
  (
    {
      brand = <FooterBrand />,
      tagline = 'Components and blocks you copy into your project and own.',
      columns = FOOTER_SITEMAP,
      legal = FOOTER_LEGAL,
      copyright = '© 2026 Nexvyn',
      formLabel = 'Release notes by email',
      placeholder = 'you@example.com',
      submitLabel = 'Subscribe',
      successMessage = 'Thanks. The next release note is on its way.',
      onSubscribe,
      className,
      ...props
    },
    ref,
  ) => {
    const inputId = useId()
    const statusId = useId()
    const [sent, setSent] = useState(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const email = new FormData(event.currentTarget).get('email')
      if (typeof email !== 'string' || !email) return
      onSubscribe?.(email)
      setSent(true)
      event.currentTarget.reset()
    }

    return (
      <footer
        ref={ref}
        className={cn('w-full border-t border-(--color-border) bg-(--color-bg)', className)}
        {...props}
      >
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid gap-12 py-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="flex flex-col items-start gap-3">
              {brand}
              {tagline && (
                <p className="max-w-xs text-pretty text-sm text-(--color-muted)">{tagline}</p>
              )}
              <form onSubmit={handleSubmit} className="mt-4 flex w-full max-w-xs flex-col gap-2">
                <label htmlFor={inputId} className="text-sm text-(--color-fg)">
                  {formLabel}
                </label>
                <div className="flex gap-2">
                  <input
                    id={inputId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    spellCheck={false}
                    placeholder={placeholder}
                    aria-describedby={statusId}
                    onChange={() => sent && setSent(false)}
                    className="h-11 min-w-0 flex-1 rounded-md border border-(--color-border) bg-transparent px-3 text-sm text-(--color-fg) placeholder:text-(--color-muted) transition-colors duration-(--motion-dur-fast) ease hover:border-(--color-border-strong) focus-visible:border-(--color-border-strong) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) aria-invalid:border-(--color-destructive) motion-reduce:transition-none"
                  />
                  <button
                    type="submit"
                    aria-label={submitLabel}
                    className="group/submit flex size-11 shrink-0 items-center justify-center rounded-md bg-(--color-fg) text-(--color-bg) transition-[background-color,scale] duration-(--motion-dur-fast) ease hover:bg-(--color-fg)/88 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) motion-reduce:transition-none motion-reduce:active:scale-100"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex transition-[translate] duration-(--motion-dur-base) ease-(--motion-ease-in-out) rtl:-scale-x-100 motion-safe:group-hover/submit:translate-x-0.5 motion-safe:rtl:group-hover/submit:-translate-x-0.5 motion-reduce:transition-none"
                    >
                      <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={1.5} />
                    </span>
                  </button>
                </div>
                <p
                  id={statusId}
                  aria-live="polite"
                  className="min-h-5 text-xs text-(--color-muted)"
                >
                  {sent ? successMessage : ''}
                </p>
              </form>
            </div>
            <FooterSitemap columns={columns} />
          </div>
          <FooterBottomBar copyright={copyright} links={legal} />
        </div>
      </footer>
    )
  },
)
FooterNewsletter.displayName = 'FooterNewsletter'
