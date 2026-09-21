'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { FooterBrand, FooterLink, type FooterLinkItem } from '@/components/blocks/footer/footer'
import { cn } from '@/lib/utils'

const DEFAULT_LINKS: FooterLinkItem[] = [
  { label: 'Components', href: '#' },
  { label: 'Blocks', href: '#' },
  { label: 'MCP', href: '#' },
  { label: 'Changelog', href: '#' },
]

export interface FooterSimpleProps extends ComponentPropsWithoutRef<'footer'> {
  brand?: ReactNode
  links?: FooterLinkItem[]
  copyright?: ReactNode
  navLabel?: string
}

export const FooterSimple = forwardRef<HTMLElement, FooterSimpleProps>(
  (
    {
      brand = <FooterBrand />,
      links = DEFAULT_LINKS,
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
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 sm:px-8 md:flex-row md:items-baseline md:justify-between md:gap-8">
        <div className="flex flex-col gap-1">
          {brand}
          {copyright && <p className="text-xs leading-5 text-(--color-muted)">{copyright}</p>}
        </div>
        <nav aria-label={navLabel}>
          <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  ),
)
FooterSimple.displayName = 'FooterSimple'
