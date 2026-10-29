'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from 'react'
import Image, { type StaticImageData } from 'next/image'
import reactLogo from 'runeicons-brands/svg/react.svg'
import nextLogo from 'runeicons-brands/svg/nextdotjs.svg'
import typescriptLogo from 'runeicons-brands/svg/typescript.svg'
import motionLogo from 'runeicons-brands/svg/motion.svg'
import radixLogo from 'runeicons-brands/svg/radix-ui.svg'
import shadcnLogo from 'runeicons-brands/svg/shadcn-ui.svg'
import npmLogo from 'runeicons-brands/svg/npm.svg'
import vercelLogo from 'runeicons-brands/svg/vercel.svg'
import { cn } from '@/lib/utils'

export type SocialProofLogo = {
  name: string
  src: StaticImageData | string
  invert?: 'dark' | 'light'
  href?: string
}

export const SOCIAL_PROOF_LOGOS: SocialProofLogo[] = [
  { name: 'React', src: reactLogo, invert: 'dark', href: 'https://react.dev' },
  { name: 'Next.js', src: nextLogo, invert: 'dark', href: 'https://nextjs.org' },
  { name: 'TypeScript', src: typescriptLogo, href: 'https://www.typescriptlang.org' },
  { name: 'Motion', src: motionLogo, invert: 'dark', href: 'https://motion.dev' },
  { name: 'Radix UI', src: radixLogo, invert: 'dark', href: 'https://www.radix-ui.com' },
  { name: 'shadcn/ui', src: shadcnLogo, invert: 'light', href: 'https://ui.shadcn.com' },
  { name: 'npm', src: npmLogo, href: 'https://www.npmjs.com' },
  { name: 'Vercel', src: vercelLogo, invert: 'dark', href: 'https://vercel.com' },
]

export const LOGOS_TITLE = 'Built on the tools you already ship'
export const LOGOS_DESCRIPTION =
  'Written in TypeScript for React and Next.js, animated with Motion, shaped by Radix patterns and installed through the shadcn CLI.'

export interface LogosBlockProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  title?: ReactNode
  description?: ReactNode
  logos?: SocialProofLogo[]
}

export const LogosSection = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'> & { labelledBy: string }
>(({ labelledBy, className, children, ...props }, ref) => (
  <section
    ref={ref}
    aria-labelledby={labelledBy}
    className={cn('w-full bg-(--color-bg) px-6 py-16 sm:px-8 md:py-24', className)}
    {...props}
  >
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:gap-10">{children}</div>
  </section>
))
LogosSection.displayName = 'LogosSection'

export function LogosHeader({
  id,
  title,
  description,
}: {
  id: string
  title: ReactNode
  description?: ReactNode
}) {
  return (
    <div className="flex max-w-md flex-col gap-2">
      <h2
        id={id}
        className="text-balance text-xl font-normal tracking-tight text-(--color-fg) md:text-2xl"
      >
        {title}
      </h2>
      {description && (
        <p className="text-pretty text-sm text-(--color-muted) md:text-base">{description}</p>
      )}
    </div>
  )
}

export function LogoImage({
  logo,
  className,
  style,
}: {
  logo: SocialProofLogo
  className?: string
  style?: CSSProperties
}) {
  return (
    <span className={cn('relative block h-7 w-24 sm:h-8 sm:w-28', className)} style={style}>
      <Image
        src={logo.src}
        alt={logo.name}
        fill
        sizes="112px"
        className={cn(
          'object-contain',
          logo.invert === 'dark' && 'dark:invert',
          logo.invert === 'light' && 'invert dark:invert-0',
        )}
      />
    </span>
  )
}

export function LogoMark({
  logo,
  linked = true,
  className,
  imageClassName,
  imageStyle,
}: {
  logo: SocialProofLogo
  linked?: boolean
  className?: string
  imageClassName?: string
  imageStyle?: CSSProperties
}) {
  const image = <LogoImage logo={logo} className={imageClassName} style={imageStyle} />
  const base = 'flex size-full min-h-11 items-center justify-center'

  if (linked && logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          base,
          'rounded-md outline-none transition-colors duration-(--motion-dur-fast) ease-[ease] hover:bg-(--color-surface) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--color-accent) motion-reduce:transition-none',
          className,
        )}
      >
        {image}
      </a>
    )
  }

  return <span className={cn(base, className)}>{image}</span>
}

export interface LogoGridProps extends ComponentPropsWithoutRef<'ul'> {
  logos: SocialProofLogo[]
  linked?: boolean
  imageClassName?: string
  imageStyle?: (index: number) => CSSProperties | undefined
}

export const LogoGrid = forwardRef<HTMLUListElement, LogoGridProps>(
  ({ logos, linked = true, imageClassName, imageStyle, className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(
        'grid grid-cols-2 gap-px overflow-hidden rounded-md border border-(--color-border) bg-(--color-border) sm:grid-cols-4',
        className,
      )}
      {...props}
    >
      {logos.map((logo, index) => (
        <li key={logo.name} className="flex h-20 bg-(--color-bg) sm:h-24">
          <LogoMark
            logo={logo}
            linked={linked}
            imageClassName={imageClassName}
            imageStyle={imageStyle?.(index)}
          />
        </li>
      ))}
    </ul>
  ),
)
LogoGrid.displayName = 'LogoGrid'
