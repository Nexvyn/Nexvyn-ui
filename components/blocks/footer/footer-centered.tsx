'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import {
  FOOTER_SOCIALS,
  FooterBrand,
  FooterLink,
  FooterSocialLinks,
  type FooterLinkItem,
  type FooterSocialItem,
} from '@/components/blocks/footer/footer'
import { cn } from '@/lib/utils'

const DEFAULT_LINKS: FooterLinkItem[] = [
  { label: 'Components', href: '#' },
  { label: 'Blocks', href: '#' },
  { label: 'Illustrations', href: '#' },
  { label: 'MCP', href: '#' },
  { label: 'Changelog', href: '#' },
]

export interface FooterCenteredProps extends ComponentPropsWithoutRef<'footer'> {
  brand?: ReactNode
  links?: FooterLinkItem[]
  socials?: FooterSocialItem[]
  copyright?: ReactNode
  navLabel?: string
}

export const FooterCentered = forwardRef<HTMLElement, FooterCenteredProps>(
  (
    {
      brand = <FooterBrand />,
      links = DEFAULT_LINKS,
      socials = FOOTER_SOCIALS,
      copyright = '© 2026 Nexvyn',
      navLabel = 'Footer',
      className,
      ...props
    },
    ref,
  ) => (
    <footer
      ref={ref}
      className={cn('w-full border-t border-(--color-border) bg-(--color-bg)', className)}
      {...props}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-12 text-center sm:px-8">
        {brand}
        <nav aria-label={navLabel}>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>
        <FooterSocialLinks items={socials} className="-my-3" />
        {copyright && <p className="text-xs text-(--color-muted)">{copyright}</p>}
      </div>
    </footer>
  ),
)
FooterCentered.displayName = 'FooterCentered'
