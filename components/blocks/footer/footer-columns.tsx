'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import {
  FOOTER_SOCIALS,
  FooterBrand,
  FooterColumn,
  FooterLink,
  FooterSocialLinks,
  type FooterColumnItem,
  type FooterLinkItem,
  type FooterSocialItem,
} from '@/components/blocks/footer/footer'
import { cn } from '@/lib/utils'

const DEFAULT_COLUMNS: FooterColumnItem[] = [
  {
    title: 'Library',
    links: [
      { label: 'Components', href: '#' },
      { label: 'Blocks', href: '#' },
      { label: 'Illustrations', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'MCP setup', href: '#' },
      { label: 'Design language', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'GitHub', href: '#' },
      { label: 'License', href: '#' },
      { label: 'Feedback', href: '#' },
    ],
  },
]

const DEFAULT_LEGAL: FooterLinkItem[] = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
]

export interface FooterColumnsProps extends ComponentPropsWithoutRef<'footer'> {
  brand?: ReactNode
  description?: ReactNode
  columns?: FooterColumnItem[]
  socials?: FooterSocialItem[]
  legal?: FooterLinkItem[]
  copyright?: ReactNode
  legalLabel?: string
}

export const FooterColumns = forwardRef<HTMLElement, FooterColumnsProps>(
  (
    {
      brand = <FooterBrand />,
      description = 'Accessible, typed components and blocks you copy into your project and own.',
      columns = DEFAULT_COLUMNS,
      socials = FOOTER_SOCIALS,
      legal = DEFAULT_LEGAL,
      copyright = '© 2026 Nexvyn',
      legalLabel = 'Legal',
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
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:grid-cols-3 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="col-span-2 flex flex-col items-start gap-3 sm:col-span-3 md:col-span-1">
            {brand}
            {description && <p className="max-w-xs text-sm text-(--color-muted)">{description}</p>}
            <FooterSocialLinks items={socials} className="-ms-3 -mb-3" />
          </div>
          {columns.map((column) => (
            <FooterColumn key={column.title} {...column} />
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-(--color-border) py-6 sm:flex-row sm:items-center sm:justify-between">
          {copyright && <p className="text-xs text-(--color-muted)">{copyright}</p>}
          {legal.length > 0 && (
            <nav aria-label={legalLabel}>
              <ul className="flex items-center gap-6">
                {legal.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} className="text-xs">
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  ),
)
FooterColumns.displayName = 'FooterColumns'
