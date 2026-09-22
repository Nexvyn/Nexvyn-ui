'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  FavouriteIcon,
  Image01Icon,
  Notification01Icon,
  Search01Icon,
  ShoppingBag01Icon,
} from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

export interface PagePrototypeProps {
  top?: ReactNode
  inline?: ReactNode
  bottom?: ReactNode
  footer?: ReactNode
  main?: ReactNode
  page?: ReactNode
  overlay?: ReactNode
  address?: string
  className?: string
}

const FILL = 'bg-(--color-fg)/7'
const FILL_SOFT = 'bg-(--color-fg)/4'

function Block({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('block rounded-md', FILL, className)} />
}

function Pill({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('squircle block', FILL, className)} />
}

function Glyph({ icon, size = 18 }: { icon: typeof Image01Icon; size?: number }) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={1.5}
      aria-hidden="true"
      className="text-(--color-fg)/25"
    />
  )
}

function ImageTile({ className, heart }: { className?: string; heart?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative flex items-center justify-center rounded-md', FILL, className)}
    >
      <Glyph icon={Image01Icon} size={22} />
      {heart && (
        <span className="squircle absolute end-2 top-2 flex size-7 items-center justify-center bg-(--color-bg)/80">
          <Glyph icon={FavouriteIcon} size={14} />
        </span>
      )}
    </div>
  )
}

function ProductCard() {
  return (
    <div aria-hidden="true" className={cn('flex flex-col gap-2.5 rounded-md p-2', FILL_SOFT)}>
      <ImageTile heart className="aspect-4/3 w-full" />
      <Pill className="ms-1 h-4 w-12 bg-(--color-bg)" />
      <Block className="mx-1 h-2 w-4/5" />
      <Block className="mx-1 mb-1 h-2 w-1/2" />
    </div>
  )
}

function ListCard() {
  return (
    <div aria-hidden="true" className={cn('flex gap-3 rounded-md p-2', FILL_SOFT)}>
      <ImageTile heart className="aspect-4/3 w-32 shrink-0 sm:w-40" />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5 py-1">
        <Pill className="h-4 w-14 bg-(--color-bg)" />
        <Block className="h-2 w-4/5" />
        <Block className="h-2 w-3/5" />
      </div>
    </div>
  )
}

function SectionHead() {
  return (
    <div aria-hidden="true" className="flex items-center justify-between">
      <Block className="h-3 w-32" />
      <Block className="h-2 w-12" />
    </div>
  )
}

function PageFooter() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-4xl shrink-0 items-center gap-3 px-4 py-6 sm:px-8"
    >
      <span className={cn('squircle size-5 shrink-0', FILL)} />
      <Block className="h-2 w-20" />
      <div className="ms-auto hidden items-center gap-5 sm:flex">
        <Block className="h-2 w-10" />
        <Block className="h-2 w-12" />
        <Block className="h-2 w-9" />
      </div>
    </div>
  )
}

function BrowserBar({ address }: { address: string }) {
  return (
    <div className={cn('flex h-10 shrink-0 items-center gap-3 px-4', FILL_SOFT)}>
      <div aria-hidden="true" className="flex gap-1.5">
        <span className={cn('size-2.5 rounded-full', FILL)} />
        <span className={cn('size-2.5 rounded-full', FILL)} />
        <span className={cn('size-2.5 rounded-full', FILL)} />
      </div>
      <div className="squircle mx-auto flex h-6 w-full max-w-64 items-center justify-center bg-(--color-bg) px-3 text-xs text-(--color-muted)">
        <span className="truncate">{address}</span>
      </div>
      <span aria-hidden="true" className="w-12" />
    </div>
  )
}

function PageContent({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pt-2 sm:px-8 *:shrink-0',
        className,
      )}
    >
      <div aria-hidden="true" className="flex items-center gap-3">
        <div className={cn('squircle flex h-10 flex-1 items-center gap-2 px-4', FILL)}>
          <Glyph icon={Search01Icon} size={16} />
          <Block className="h-2 w-24 bg-(--color-fg)/8" />
        </div>
        <span className={cn('squircle size-10 shrink-0', FILL)} />
      </div>

      <div aria-hidden="true" className="flex gap-4 overflow-hidden">
        {[0, 1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="flex shrink-0 flex-col items-center gap-2">
            <span className={cn('squircle size-12 sm:size-14', FILL)} />
            <Block className="h-1.5 w-8" />
          </div>
        ))}
      </div>

      {children}

      <SectionHead />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <ProductCard />
        <ProductCard />
        <div className="hidden md:block">
          <ProductCard />
        </div>
        <div className="hidden md:block">
          <ProductCard />
        </div>
      </div>

      <SectionHead />
      <div className="grid gap-3 md:grid-cols-2">
        <ListCard />
        <ListCard />
      </div>
    </div>
  )
}

function ScrollToEnd({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (node) node.scrollTop = node.scrollHeight
  }, [])

  return (
    <div ref={ref} className="min-h-0 flex-1 overflow-y-auto">
      <div className="flex min-h-full flex-col">{children}</div>
    </div>
  )
}

export function PagePrototype({
  top,
  inline,
  bottom,
  footer,
  main,
  page,
  overlay,
  address = 'acme.app',
  className,
}: PagePrototypeProps) {
  const endOfPage = Boolean(bottom || footer)

  return (
    <div className="flex h-full w-full justify-center px-1 pb-16 sm:px-4 md:pb-20">
      <div
        className={cn(
          'flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-md bg-(--color-bg)',
          className,
        )}
      >
        <BrowserBar address={address} />
        {page ? (
          <div className="min-h-0 flex-1 overflow-y-auto">{page}</div>
        ) : (
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            {top}

            <div aria-hidden="true" className="flex items-center gap-3 px-4 py-4 sm:px-8">
              <span className={cn('squircle size-7 shrink-0', FILL)} />
              <Block className="h-3 w-16" />
              <div className="ms-6 hidden items-center gap-5 md:flex">
                <Block className="h-2 w-10" />
                <Block className="h-2 w-12" />
                <Block className="h-2 w-9" />
              </div>
              <div className="ms-auto flex items-center gap-2">
                <span className={cn('squircle flex size-8 items-center justify-center', FILL)}>
                  <Glyph icon={Notification01Icon} size={14} />
                </span>
                <span className={cn('squircle flex size-8 items-center justify-center', FILL)}>
                  <Glyph icon={ShoppingBag01Icon} size={14} />
                </span>
                <span className={cn('squircle size-8', FILL)} />
              </div>
            </div>

            {main ? (
              <div className="min-h-0 flex-1 overflow-y-auto">
                {main}
                {footer ?? <PageFooter />}
              </div>
            ) : endOfPage ? (
              <ScrollToEnd>
                <PageContent className="pb-8" />
                <div className="mt-auto">
                  {bottom && <div className="mx-auto w-full max-w-4xl px-4 sm:px-8">{bottom}</div>}
                  {footer ?? <PageFooter />}
                </div>
              </ScrollToEnd>
            ) : (
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <PageContent className="pb-8">{inline}</PageContent>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-(--color-bg) to-transparent"
                />
              </div>
            )}

            {overlay && (
              <div className="pointer-events-none absolute inset-x-3 bottom-3 z-1 flex justify-end sm:inset-x-4 sm:bottom-4">
                <div className="pointer-events-auto w-full max-w-sm">{overlay}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
