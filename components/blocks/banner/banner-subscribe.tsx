'use client'

import {
  forwardRef,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type FormEvent,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

export interface BannerSubscribeProps extends Omit<
  ComponentPropsWithoutRef<'section'>,
  'title' | 'children' | 'onSubmit'
> {
  title?: ReactNode
  description?: ReactNode
  successMessage?: ReactNode
  emailLabel?: string
  placeholder?: string
  submitLabel?: string
  invalidMessage?: string
  onSubscribe?: (email: string) => void | Promise<void>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const layerBase =
  'col-start-1 row-start-1 transition-[opacity,transform,filter] duration-(--motion-dur-base) ease-(--motion-ease-out) motion-reduce:transition-none motion-reduce:transform-none motion-reduce:filter-none'

export const BannerSubscribe = forwardRef<HTMLElement, BannerSubscribeProps>(
  (
    {
      className,
      title = 'Get product updates',
      description = 'New components and blocks, once a month. No spam.',
      successMessage = 'Thanks for subscribing. Check your inbox to confirm.',
      emailLabel = 'Email address',
      placeholder = 'you@example.com',
      submitLabel = 'Subscribe',
      invalidMessage = 'Enter a valid email address.',
      onSubscribe,
      'aria-label': ariaLabel = 'Subscribe to updates',
      ...props
    },
    ref,
  ) => {
    const id = useId()
    const errorId = `${id}-error`
    const [email, setEmail] = useState('')
    const [invalid, setInvalid] = useState(false)
    const [done, setDone] = useState(false)
    const [pending, setPending] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!EMAIL_PATTERN.test(email.trim())) {
        setInvalid(true)
        return
      }
      setInvalid(false)
      setPending(true)
      try {
        await onSubscribe?.(email.trim())
        setDone(true)
      } finally {
        setPending(false)
      }
    }

    return (
      <section
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          'w-full rounded-md border border-(--color-border) bg-(--color-surface) p-4 text-(--color-fg) sm:p-5',
          className,
        )}
        {...props}
      >
        <div className="grid">
          <form
            noValidate
            onSubmit={handleSubmit}
            inert={done}
            className={cn(
              layerBase,
              'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
              done && 'pointer-events-none translate-y-1 opacity-0 blur-[2px]',
            )}
          >
            <div className="min-w-0">
              <p className="text-base">{title}</p>
              <p className="mt-1 text-sm text-pretty text-(--color-muted)">{description}</p>
            </div>
            <div className="w-full md:max-w-sm">
              <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor={id} className="sr-only">
                  {emailLabel}
                </label>
                <input
                  id={id}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  placeholder={placeholder}
                  aria-invalid={invalid || undefined}
                  aria-describedby={invalid ? errorId : undefined}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (invalid) setInvalid(false)
                  }}
                  className="min-h-11 w-full min-w-0 rounded-md border border-(--color-border) bg-(--color-bg) px-3 text-sm text-(--color-fg) placeholder:text-(--color-muted) transition-colors duration-(--motion-dur-fast) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) aria-invalid:border-(--color-destructive) motion-reduce:transition-none sm:min-h-10"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-md bg-(--color-fg) px-4 text-sm text-(--color-bg) transition-[opacity,scale] duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:opacity-90 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none sm:min-h-10"
                >
                  {submitLabel}
                </button>
              </div>
              <p
                id={errorId}
                role="alert"
                className="mt-2 min-h-5 text-xs text-(--color-destructive)"
              >
                {invalid ? invalidMessage : null}
              </p>
            </div>
          </form>
          <div
            role="status"
            aria-hidden={!done}
            className={cn(
              layerBase,
              'flex items-center text-sm',
              !done && 'pointer-events-none -translate-y-1 opacity-0 blur-[2px]',
            )}
          >
            {done ? successMessage : null}
          </div>
        </div>
      </section>
    )
  },
)
BannerSubscribe.displayName = 'BannerSubscribe'
