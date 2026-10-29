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
import { AppleIcon, GoogleIcon, ViewIcon, ViewOffSlashIcon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

export type LoginProvider = { id: string; label: string; icon: ReactNode }
export type LoginValues = { email: string; password: string }

export const LOGIN_PROVIDERS: LoginProvider[] = [
  {
    id: 'google',
    label: 'Google',
    icon: <HugeiconsIcon icon={GoogleIcon} size={18} strokeWidth={1.5} />,
  },
  {
    id: 'apple',
    label: 'Apple',
    icon: <HugeiconsIcon icon={AppleIcon} size={18} strokeWidth={1.5} />,
  },
]

const FIELD =
  'h-11 w-full rounded-md border border-(--color-border) bg-transparent px-3 text-sm text-(--color-fg) placeholder:text-(--color-muted) transition-colors duration-(--motion-dur-fast) ease hover:border-(--color-border-strong) focus-visible:border-(--color-border-strong) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) aria-invalid:border-(--color-destructive) motion-reduce:transition-none'

const OUTLINE_BUTTON =
  'flex h-11 w-full items-center justify-center gap-2 rounded-md border border-(--color-border) text-sm text-(--color-fg) transition-[background-color,border-color,scale] duration-(--motion-dur-fast) ease hover:border-(--color-border-strong) hover:bg-(--color-fg)/5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none motion-reduce:active:scale-100'

const TEXT_LINK =
  'rounded-md text-(--color-fg) underline decoration-(--color-fg)/30 underline-offset-4 transition-[text-decoration-color] duration-(--motion-dur-fast) ease hover:decoration-(--color-fg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none'

const SWAP =
  'absolute inset-0 flex items-center justify-center transition-[opacity,scale,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none'

function PasswordToggle({
  shown,
  onToggle,
  showLabel,
  hideLabel,
}: {
  shown: boolean
  onToggle: () => void
  showLabel: string
  hideLabel: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? hideLabel : showLabel}
      aria-pressed={shown}
      className="absolute end-0 top-0 flex size-11 items-center justify-center rounded-md text-(--color-muted) transition-colors duration-(--motion-dur-fast) ease hover:text-(--color-fg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none"
    >
      <span aria-hidden="true" className="relative size-[18px]">
        <span
          className={cn(
            SWAP,
            shown ? 'scale-90 opacity-0 blur-[2px]' : 'scale-100 opacity-100 blur-none',
          )}
        >
          <HugeiconsIcon icon={ViewIcon} size={18} strokeWidth={1.5} />
        </span>
        <span
          className={cn(
            SWAP,
            shown ? 'scale-100 opacity-100 blur-none' : 'scale-90 opacity-0 blur-[2px]',
          )}
        >
          <HugeiconsIcon icon={ViewOffSlashIcon} size={18} strokeWidth={1.5} />
        </span>
      </span>
    </button>
  )
}

export interface LoginFormProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title' | 'onSubmit'
> {
  title?: ReactNode
  description?: ReactNode
  mark?: ReactNode
  providers?: LoginProvider[]
  providerPlacement?: 'before' | 'after'
  providerLayout?: 'stack' | 'grid'
  dividerLabel?: string
  continueWithLabel?: string
  emailLabel?: string
  emailPlaceholder?: string
  passwordLabel?: string
  forgotLabel?: string
  forgotHref?: string
  showPasswordLabel?: string
  hidePasswordLabel?: string
  submitLabel?: string
  signupText?: ReactNode
  signupLabel?: string
  signupHref?: string
  error?: ReactNode
  onSubmit?: (values: LoginValues) => void
  onProvider?: (providerId: string) => void
}

export const LoginForm = forwardRef<HTMLDivElement, LoginFormProps>(
  (
    {
      title = 'Welcome back',
      description = 'Sign in to keep building with Nexvyn UI.',
      mark,
      providers = LOGIN_PROVIDERS,
      providerPlacement = 'before',
      providerLayout = 'stack',
      dividerLabel = 'or',
      continueWithLabel = 'Continue with',
      emailLabel = 'Email',
      emailPlaceholder = 'you@example.com',
      passwordLabel = 'Password',
      forgotLabel = 'Forgot password?',
      forgotHref = '#',
      showPasswordLabel = 'Show password',
      hidePasswordLabel = 'Hide password',
      submitLabel = 'Sign in',
      signupText = 'New to Nexvyn UI?',
      signupLabel = 'Create an account',
      signupHref = '#',
      error,
      onSubmit,
      onProvider,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId()
    const [shown, setShown] = useState(false)
    const errorId = `${id}-error`

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      onSubmit?.({
        email: String(data.get('email') ?? ''),
        password: String(data.get('password') ?? ''),
      })
    }

    const providerButtons = providers.length > 0 && (
      <div className={cn('grid gap-3', providerLayout === 'grid' && 'grid-cols-2')}>
        {providers.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => onProvider?.(provider.id)}
            className={OUTLINE_BUTTON}
          >
            <span aria-hidden="true" className="inline-flex">
              {provider.icon}
            </span>
            {providerLayout === 'stack' ? `${continueWithLabel} ${provider.label}` : provider.label}
          </button>
        ))}
      </div>
    )

    const divider = providers.length > 0 && (
      <div className="flex items-center gap-3 text-xs text-(--color-muted)" role="separator">
        <span aria-hidden="true" className="h-px flex-1 bg-(--color-border)" />
        {dividerLabel}
        <span aria-hidden="true" className="h-px flex-1 bg-(--color-border)" />
      </div>
    )

    return (
      <div ref={ref} className={cn('flex w-full max-w-sm flex-col gap-8', className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          {mark && <div className="mb-4">{mark}</div>}
          <h1 className="text-2xl font-normal tracking-tight text-(--color-fg) md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-(--color-muted) md:text-base">{description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate={false} className="flex flex-col gap-5">
          {providerPlacement === 'before' && providerButtons}
          {providerPlacement === 'before' && divider}

          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-email`} className="text-sm text-(--color-fg)">
              {emailLabel}
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
              placeholder={emailPlaceholder}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className={FIELD}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor={`${id}-password`} className="text-sm text-(--color-fg)">
                {passwordLabel}
              </label>
              {forgotLabel && (
                <a href={forgotHref} className={cn(TEXT_LINK, 'text-xs text-(--color-muted)')}>
                  {forgotLabel}
                </a>
              )}
            </div>
            <div className="relative">
              <input
                id={`${id}-password`}
                name="password"
                type={shown ? 'text' : 'password'}
                autoComplete="current-password"
                required
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                className={cn(FIELD, 'pe-11')}
              />
              <PasswordToggle
                shown={shown}
                onToggle={() => setShown((value) => !value)}
                showLabel={showPasswordLabel}
                hideLabel={hidePasswordLabel}
              />
            </div>
          </div>

          {error && (
            <p id={errorId} role="alert" className="text-sm text-(--color-destructive)">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-1 h-11 w-full rounded-md bg-(--color-fg) text-sm text-(--color-bg) transition-[background-color,scale] duration-(--motion-dur-fast) ease hover:bg-(--color-fg)/88 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            {submitLabel}
          </button>

          {providerPlacement === 'after' && divider}
          {providerPlacement === 'after' && providerButtons}
        </form>

        {signupLabel && (
          <p className="text-center text-sm text-(--color-muted)">
            {signupText}{' '}
            <a href={signupHref} className={TEXT_LINK}>
              {signupLabel}
            </a>
          </p>
        )}
      </div>
    )
  },
)
LoginForm.displayName = 'LoginForm'

export function LoginMark() {
  return (
    <span className="flex size-10 items-center justify-center rounded-md bg-(--color-fg) text-base text-(--color-bg)">
      N
    </span>
  )
}
