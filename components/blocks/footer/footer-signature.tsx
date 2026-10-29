'use client'

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { useReducedMotion } from 'motion/react'
import {
  FOOTER_SOCIALS,
  FooterSocialLinks,
  type FooterSocialItem,
} from '@/components/blocks/footer/footer'
import { cn } from '@/lib/utils'

const DASH = 420

function Signature({
  text,
  label,
  fontFamily,
}: {
  text: string
  label: string
  fontFamily: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const reduceMotion = useReducedMotion()
  const [inView, setInView] = useState(false)
  const drawn = Boolean(reduceMotion) || inView

  useEffect(() => {
    const node = ref.current
    if (!node || reduceMotion) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { threshold: 0.6 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <svg ref={ref} role="img" aria-label={label} viewBox="0 0 240 72" className="h-14 w-auto">
      <text
        x="120"
        y="50"
        textAnchor="middle"
        fontSize="48"
        strokeWidth="0.9"
        strokeDasharray={DASH}
        style={{
          fontFamily,
          strokeDashoffset: drawn ? 0 : DASH,
          fillOpacity: drawn ? 1 : 0,
          transition: reduceMotion
            ? 'none'
            : 'stroke-dashoffset var(--motion-dur-ambient) var(--motion-ease-in-out), fill-opacity var(--motion-dur-showcase) var(--motion-ease-out) var(--motion-dur-ambient)',
        }}
        className="fill-current stroke-current"
      >
        {text}
      </text>
    </svg>
  )
}

export interface FooterSignatureProps extends ComponentPropsWithoutRef<'footer'> {
  signature?: string
  signatureLabel?: string
  signatureFont?: string
  socials?: FooterSocialItem[]
  copyright?: ReactNode
}

export const FooterSignature = forwardRef<HTMLElement, FooterSignatureProps>(
  (
    {
      signature = 'Nexvyn',
      signatureLabel = 'Signed, Nexvyn',
      signatureFont = 'var(--font-handwriting), cursive',
      socials = FOOTER_SOCIALS,
      copyright = '© 2026 Nexvyn',
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
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-6 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <div className="text-(--color-fg) md:order-2">
          <Signature text={signature} label={signatureLabel} fontFamily={signatureFont} />
        </div>
        <div className="flex w-full items-center justify-between md:contents">
          {copyright && (
            <p className="text-xs leading-5 text-(--color-muted) md:order-1">{copyright}</p>
          )}
          <FooterSocialLinks items={socials} className="-me-3 md:order-3 md:justify-self-end" />
        </div>
      </div>
    </footer>
  ),
)
FooterSignature.displayName = 'FooterSignature'
