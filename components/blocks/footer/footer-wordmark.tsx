'use client'

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import {
  FOOTER_LEGAL,
  FOOTER_SITEMAP,
  FooterBottomBar,
  FooterSitemap,
  type FooterColumnItem,
  type FooterLinkItem,
} from '@/components/blocks/footer/footer'
import { cn } from '@/lib/utils'

export interface FooterWordmarkProps extends ComponentPropsWithoutRef<'footer'> {
  wordmark?: string
  mark?: ReactNode
  homeHref?: string
  homeLabel?: string
  columns?: FooterColumnItem[]
  legal?: FooterLinkItem[]
  copyright?: ReactNode
}

const SIZE = 200
// Cap height and descent of the bold sans face as shares of the font size; the viewBox crops to them.
const CAP = 0.73
const DESCENT = 0.22

function FittedWordmark({ text }: { text: string }) {
  const textRef = useRef<SVGTextElement>(null)
  const [viewBox, setViewBox] = useState(`0 ${-SIZE * CAP} 1000 ${SIZE * (CAP + DESCENT)}`)

  useEffect(() => {
    let cancelled = false
    const fit = () => {
      const node = textRef.current
      if (!node || cancelled) return
      const box = node.getBBox()
      if (box.width > 0)
        setViewBox(`${box.x} ${-SIZE * CAP} ${box.width} ${SIZE * (CAP + DESCENT)}`)
    }
    fit()
    document.fonts?.ready.then(fit)
    return () => {
      cancelled = true
    }
  }, [text])

  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      className="mt-12 block h-auto w-full text-(--color-fg)/90"
    >
      <text
        ref={textRef}
        x="0"
        y="0"
        fontSize={SIZE}
        letterSpacing="-0.01em"
        className="fill-current font-sans font-bold"
      >
        {text}
      </text>
    </svg>
  )
}

function DefaultMark() {
  return (
    <span className="flex size-9 items-center justify-center rounded-md bg-(--color-fg) text-sm text-(--color-bg)">
      N
    </span>
  )
}

export const FooterWordmark = forwardRef<HTMLElement, FooterWordmarkProps>(
  (
    {
      wordmark = 'Nexvyn UI',
      mark = <DefaultMark />,
      homeHref = '#',
      homeLabel = 'Nexvyn UI home',
      columns = FOOTER_SITEMAP,
      legal = FOOTER_LEGAL,
      copyright = '© 2026 Nexvyn',
      className,
      ...props
    },
    ref,
  ) => (
    <footer
      ref={ref}
      className={cn(
        'w-full overflow-hidden border-t border-(--color-border) bg-(--color-bg)',
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="flex items-start justify-between gap-10 py-12">
          <FooterSitemap columns={columns} className="flex-1 lg:max-w-2xl" />
          {mark && (
            <a
              href={homeHref}
              aria-label={homeLabel}
              className="hidden shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) sm:block"
            >
              {mark}
            </a>
          )}
        </div>
        <FooterBottomBar copyright={copyright} links={legal} />
        <FittedWordmark text={wordmark} />
      </div>
    </footer>
  ),
)
FooterWordmark.displayName = 'FooterWordmark'
