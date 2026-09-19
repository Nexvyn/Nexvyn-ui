'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { HugeiconsIcon } from '@hugeicons/react'
import { GithubIcon, NewTwitterIcon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

export type FooterLinkItem = { label: string; href: string }
export type FooterColumnItem = { title: string; links: FooterLinkItem[] }
export type FooterSocialItem = { label: string; href: string; icon: ReactNode }

export const FOOTER_SOCIALS: FooterSocialItem[] = [
  {
    label: 'GitHub',
    href: '#',
    icon: <HugeiconsIcon icon={GithubIcon} size={18} strokeWidth={1.5} />,
  },
  {
    label: 'X',
    href: '#',
    icon: <HugeiconsIcon icon={NewTwitterIcon} size={18} strokeWidth={1.5} />,
  },
]

export interface FooterLinkProps extends ComponentPropsWithoutRef<'a'> {
  asChild?: boolean
}

export const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-md text-sm text-(--color-muted) transition-colors duration-(--motion-dur-fast) ease hover:text-(--color-fg) focus-visible:text-(--color-fg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none [@media(hover:none)]:min-h-11',
          className,
        )}
        {...props}
      />
    )
  },
)
FooterLink.displayName = 'FooterLink'

export function FooterSocialLinks({
  items,
  className,
}: {
  items: FooterSocialItem[]
  className?: string
}) {
  if (items.length === 0) return null

  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            aria-label={item.label}
            className="flex size-11 items-center justify-center rounded-md text-(--color-muted) transition-colors duration-(--motion-dur-fast) ease hover:bg-(--color-fg)/5 hover:text-(--color-fg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none"
          >
            <span aria-hidden="true" className="inline-flex">
              {item.icon}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function FooterColumn({ title, links }: FooterColumnItem) {
  return (
    <div>
      <h2 className="text-sm leading-6 text-(--color-fg)">{title}</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FooterBrand({ children = 'Nexvyn UI' }: { children?: ReactNode }) {
  return <span className="text-base leading-6 text-(--color-fg)">{children}</span>
}
