'use client'

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, LanguageSkillIcon } from '@hugeicons/core-free-icons'
import {
  FOOTER_SITEMAP,
  FOOTER_SOCIALS,
  FooterBrand,
  FooterLink,
  FooterSitemap,
  FooterSocialLinks,
  type FooterColumnItem,
  type FooterSocialItem,
} from '@/components/blocks/footer/footer'
import { useControlledState } from '@/lib/hooks/use-controlled-state'
import { cn } from '@/lib/utils'

export type FooterLanguageOption = { value: string; label: string }

const DEFAULT_LANGUAGES: FooterLanguageOption[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'ja', label: '日本語' },
  { value: 'es', label: 'Español' },
]

export interface FooterLanguageProps extends ComponentPropsWithoutRef<'footer'> {
  brand?: ReactNode
  columns?: FooterColumnItem[]
  socials?: FooterSocialItem[]
  languages?: FooterLanguageOption[]
  language?: string
  defaultLanguage?: string
  onLanguageChange?: (value: string) => void
  languageLabel?: string
  cookieLabel?: string
  cookieHref?: string
  copyright?: ReactNode
}

export const FooterLanguage = forwardRef<HTMLElement, FooterLanguageProps>(
  (
    {
      brand = <FooterBrand />,
      columns = FOOTER_SITEMAP,
      socials = FOOTER_SOCIALS,
      languages = DEFAULT_LANGUAGES,
      language,
      defaultLanguage = 'en',
      onLanguageChange,
      languageLabel = 'Language',
      cookieLabel = 'Cookie settings',
      cookieHref = '#',
      copyright = '© 2026 Nexvyn',
      className,
      ...props
    },
    ref,
  ) => {
    const selectId = useId()
    const [current, setCurrent] = useControlledState(language, defaultLanguage, onLanguageChange)

    return (
      <footer
        ref={ref}
        className={cn('w-full border-t border-(--color-border) bg-(--color-bg)', className)}
        {...props}
      >
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-12 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-2">
              {brand}
              <FooterSocialLinks items={socials} className="-ms-3" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={selectId} className="sr-only">
                {languageLabel}
              </label>
              <div className="relative">
                <HugeiconsIcon
                  icon={LanguageSkillIcon}
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-(--color-muted)"
                />
                <select
                  id={selectId}
                  value={current}
                  onChange={(event) => setCurrent(event.target.value)}
                  className="h-11 w-44 cursor-pointer appearance-none rounded-md border border-(--color-border) bg-transparent ps-9 pe-9 text-sm text-(--color-fg) transition-colors duration-(--motion-dur-fast) ease hover:border-(--color-border-strong) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none"
                >
                  {languages.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-(--color-muted)"
                />
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-1">
              {cookieLabel && (
                <FooterLink href={cookieHref} className="text-xs">
                  {cookieLabel}
                </FooterLink>
              )}
              {copyright && <p className="text-xs leading-5 text-(--color-muted)">{copyright}</p>}
            </div>
          </div>
          <FooterSitemap columns={columns} />
        </div>
      </footer>
    )
  },
)
FooterLanguage.displayName = 'FooterLanguage'
