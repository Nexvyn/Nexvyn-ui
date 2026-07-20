'use client'

import { forwardRef, useMemo, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { playHoverSound } from '@/lib/sound'

export interface BreadcrumbItem {
  label: ReactNode
  href?: string
  icon?: ReactNode
  title?: string
}

const breadcrumbVariants = cva(
  'flex items-center',
  {
    variants: {
      variant: {
        default: '',
        muted: '',
      },
      size: {
        sm: 'text-[11px] gap-1',
        md: 'text-sm gap-1.5',
        lg: 'text-base gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export interface BreadcrumbsProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof breadcrumbVariants> {
  items: BreadcrumbItem[]
  maxItems?: number
  separator?: ReactNode
  siteUrl?: string
  'aria-label'?: string
  listClassName?: string
}

const DefaultSeparator = () => (
  <span
    className="inline-flex translate-y-px shrink-0 items-center justify-center text-(--color-subtle)"
    aria-hidden="true"
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 2.5l3 3.5-3 3.5" />
    </svg>
  </span>
)

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      maxItems = 4,
      separator,
      siteUrl,
      'aria-label': ariaLabel = 'Breadcrumb',
      variant,
      size,
      className,
      listClassName,
      ...props
    },
    ref,
  ) => {
    const sep = separator ?? <DefaultSeparator />

    const { visibleItems, collapsedItems } = useMemo(() => {
      if (!maxItems || items.length <= maxItems) {
        return { visibleItems: items, collapsedItems: [] }
      }
      const keep = maxItems - 2
      return {
        visibleItems: [items[0], ...items.slice(-keep)],
        collapsedItems: items.slice(1, items.length - keep),
      }
    }, [items, maxItems])

    const hasEllipsis = collapsedItems.length > 0

    const jsonLd = useMemo(() => {
      if (!siteUrl) return null
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: typeof item.label === 'string' ? item.label : '',
          item: item.href ? `${siteUrl}${item.href}` : undefined,
        })),
      }
    }, [items, siteUrl])

    const renderItem = (item: BreadcrumbItem) => {
      const isLast = !item.href
      const content = (
        <span
          className={cn(
            breadcrumbVariants({ variant, size }),
            isLast ? 'font-medium text-(--color-fg)' : 'text-(--color-muted) transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none hover:text-(--color-fg)',
          )}
        >
          {item.icon && <span className="shrink-0 [&_svg]:size-3.5 me-1.5" aria-hidden="true">{item.icon}</span>}
          {item.label}
        </span>
      )

      if (isLast) {
        return <span aria-current="page" title={item.title}>{content}</span>
      }

      return (
        <a
          href={item.href}
          title={item.title}
          className="outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-1 focus-visible:ring-offset-(--color-bg) rounded-sm"
          onMouseEnter={() => playHoverSound()}
        >
          {content}
        </a>
      )
    }

    return (
      <>
        {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        <nav ref={ref} aria-label={ariaLabel} className={className} {...props}>
          <ol className={cn('flex flex-wrap items-center', listClassName)}>
            {visibleItems.map((item, i) => {
              const elements: ReactNode[] = []
              if (hasEllipsis && i === 1) {
                elements.push(
                  <li key="ellipsis" className="flex items-center">
                    <button
                      type="button"
                      aria-label={`Show ${collapsedItems.length} hidden pages`}
                      className={cn(
                        'inline-flex items-center justify-center rounded-md squircle-corners text-(--color-muted) transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none hover:text-(--color-fg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)',
                        size === 'sm' && 'size-7',
                        size === 'lg' && 'size-10',
                      )}
                      onMouseEnter={() => playHoverSound()}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <circle cx="3" cy="8" r="1.5" />
                        <circle cx="8" cy="8" r="1.5" />
                        <circle cx="13" cy="8" r="1.5" />
                      </svg>
                    </button>
                  </li>,
                )
                elements.push(<li key="sep-ellipsis" role="presentation" aria-hidden="true" className="flex items-center">{sep}</li>)
              }
              elements.push(<li key={`item-${i}`} className="flex items-center">{renderItem(item)}</li>)
              if (i < visibleItems.length - 1) {
                elements.push(<li key={`sep-${i}`} role="presentation" aria-hidden="true" className="flex items-center">{sep}</li>)
              }
              return elements
            })}
          </ol>
        </nav>
      </>
    )
  },
)
Breadcrumbs.displayName = 'Breadcrumbs'

export { breadcrumbVariants }

export function BreadcrumbsPreview() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Components', href: '/components' },
            { label: 'Breadcrumbs' },
          ]}
        />
      </div>
    </div>
  )
}
