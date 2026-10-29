'use client'

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import Image from 'next/image'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { CtaAction, CtaActionIcon } from '@/components/blocks/cta/cta'
import { PhoneMockupCard } from '@/components/illustration/phone-mockup'
import { cn } from '@/lib/utils'

export interface CtaSplitProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  title?: ReactNode
  description?: ReactNode
  actionLabel?: string
  actionHref?: string
  actionIcon?: ReactNode
  imageSrc?: string
  imageDarkSrc?: string
  imageAlt?: string
  media?: ReactNode
}

function ScreenSkeleton() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col gap-3 bg-(--color-bg) px-4 pt-12">
      <span className="h-3 w-24 rounded-md bg-(--color-fg)/10" />
      <span className="aspect-4/3 w-full rounded-md bg-(--color-fg)/7" />
      <span className="h-2 w-4/5 rounded-md bg-(--color-fg)/7" />
      <span className="h-2 w-3/5 rounded-md bg-(--color-fg)/7" />
    </div>
  )
}

function PhoneScreen({ src, darkSrc, alt }: { src?: string; darkSrc?: string; alt: string }) {
  if (!src) return <ScreenSkeleton />

  return (
    <div className="relative h-full w-full bg-(--color-bg)">
      <div className="absolute inset-x-0 top-10 bottom-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="256px"
          className={cn('object-cover object-top', darkSrc && 'dark:hidden')}
        />
        {darkSrc && (
          <Image
            src={darkSrc}
            alt={alt}
            fill
            sizes="256px"
            className="hidden object-cover object-top dark:block"
          />
        )}
      </div>
    </div>
  )
}

export const CtaSplit = forwardRef<HTMLElement, CtaSplitProps>(
  (
    {
      title = 'Blocks that fit every screen',
      description = 'Every block starts at phone width and grows into wide layouts. Check it on a device, then copy it into your app.',
      actionLabel = 'Browse blocks',
      actionHref = '#',
      actionIcon = <HugeiconsIcon icon={ArrowRight02Icon} size={16} strokeWidth={1.5} />,
      imageSrc,
      imageDarkSrc,
      imageAlt = 'App screen on a phone',
      media,
      className,
      ...props
    },
    ref,
  ) => {
    const headingId = useId()

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn(
          'w-full overflow-hidden rounded-md border border-(--color-border) bg-(--color-bg)',
          className,
        )}
        {...props}
      >
        <div className="grid items-center gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-0">
          <div className="mx-auto max-w-xl px-6 text-center sm:px-8 lg:mx-0 lg:py-16 lg:ps-14 lg:text-start">
            <h2
              id={headingId}
              className="text-balance text-2xl font-normal tracking-tight text-(--color-fg) md:text-3xl"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-pretty text-sm text-(--color-muted) md:text-base">
                {description}
              </p>
            )}
            {actionLabel && (
              <div className="mt-8 flex justify-center lg:justify-start">
                <CtaAction href={actionHref}>
                  {actionLabel}
                  {actionIcon && <CtaActionIcon>{actionIcon}</CtaActionIcon>}
                </CtaAction>
              </div>
            )}
          </div>
          <div className="flex items-end justify-center self-stretch lg:justify-end lg:pe-14 lg:pt-12">
            {media ?? (
              <PhoneMockupCard visibleRatio={0.55}>
                <PhoneScreen src={imageSrc} darkSrc={imageDarkSrc} alt={imageAlt} />
              </PhoneMockupCard>
            )}
          </div>
        </div>
      </section>
    )
  },
)
CtaSplit.displayName = 'CtaSplit'
