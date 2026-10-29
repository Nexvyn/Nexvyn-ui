'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export type FaqItem = { value: string; question: string; answer: ReactNode }
export type FaqGroup = { title: string; items: FaqItem[] }
export type FaqPerson = { name: string; src?: string }

export const FAQ_ITEMS: FaqItem[] = [
  {
    value: 'install',
    question: 'How do I install a component?',
    answer:
      'Run the add command shown on its page. The source is copied into your project, so every line is yours to read and change.',
  },
  {
    value: 'tailwind',
    question: 'Do I need Tailwind CSS?',
    answer:
      'Yes. Components are styled with Tailwind v4 utilities and read every color from CSS variables, so they follow your own tokens.',
  },
  {
    value: 'dark-mode',
    question: 'Does it support dark mode?',
    answer:
      'Every component reads semantic tokens that switch under a .dark class on a parent. No component needs its own dark mode code.',
  },
  {
    value: 'accessibility',
    question: 'Are the components accessible?',
    answer:
      'They use semantic HTML, full keyboard support and visible focus rings, and they respect reduced motion. Each page lists its keyboard interactions.',
  },
  {
    value: 'license',
    question: 'Can I use it in a commercial product?',
    answer:
      'Yes. The code is MIT with the Commons Clause: ship your own products with it, just do not resell the components themselves as a kit.',
  },
  {
    value: 'updates',
    question: 'How do updates work?',
    answer:
      'The code lives in your project, so nothing changes on its own. Run the add command again to pull a newer version and review the diff.',
  },
]

export const FAQ_GROUPS: FaqGroup[] = [
  { title: 'Getting started', items: FAQ_ITEMS.slice(0, 2) },
  { title: 'Design and access', items: FAQ_ITEMS.slice(2, 4) },
  { title: 'License and updates', items: FAQ_ITEMS.slice(4, 6) },
]

export const FAQ_SUPPORT_TEAM: FaqPerson[] = [
  { name: 'Maya Okafor' },
  { name: 'Daniel Brandt' },
  { name: 'Priya Raman' },
]

export const FaqSection = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'> & { labelledBy: string }
>(({ labelledBy, className, children, ...props }, ref) => (
  <section
    ref={ref}
    aria-labelledby={labelledBy}
    className={cn('w-full bg-(--color-bg) px-6 py-16 sm:px-8 md:py-24', className)}
    {...props}
  >
    <div className="mx-auto w-full max-w-5xl">{children}</div>
  </section>
))
FaqSection.displayName = 'FaqSection'

export function FaqHeader({
  id,
  title,
  description,
}: {
  id: string
  title: ReactNode
  description?: ReactNode
}) {
  return (
    <div className="flex max-w-md flex-col gap-3">
      <h2
        id={id}
        className="text-balance text-2xl font-normal tracking-tight text-(--color-fg) md:text-3xl"
      >
        {title}
      </h2>
      {description && (
        <p className="text-pretty text-sm text-(--color-muted) md:text-base">{description}</p>
      )}
    </div>
  )
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
}

export function FaqAvatar({ person }: { person: FaqPerson }) {
  return (
    <span className="squircle relative flex size-8 shrink-0 items-center justify-center overflow-hidden bg-(--color-surface-2) text-[11px] text-(--color-muted) ring-2 ring-(--color-bg)">
      {person.src ? (
        <Image src={person.src} alt={person.name} fill sizes="32px" className="object-cover" />
      ) : (
        <span aria-hidden="true">{initials(person.name)}</span>
      )}
    </span>
  )
}

export function FaqTextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-md text-(--color-fg) underline decoration-(--color-fg)/30 underline-offset-4 transition-[text-decoration-color] duration-(--motion-dur-fast) ease hover:decoration-(--color-fg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none"
    >
      {children}
    </a>
  )
}

export function FaqSupport({
  people,
  text,
  linkLabel,
  href,
}: {
  people: FaqPerson[]
  text: ReactNode
  linkLabel: string
  href: string
}) {
  return (
    <div className="flex flex-col gap-3">
      {people.length > 0 && (
        <div className="flex -space-x-1.5 rtl:space-x-reverse">
          {people.map((person) => (
            <FaqAvatar key={person.name} person={person} />
          ))}
        </div>
      )}
      <p className="max-w-xs text-pretty text-sm text-(--color-muted)">
        {text} {linkLabel && <FaqTextLink href={href}>{linkLabel}</FaqTextLink>}
      </p>
    </div>
  )
}
