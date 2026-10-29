'use client'

import { useState, type ReactNode } from 'react'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import {
  Archive02Icon,
  Clock01Icon,
  CrownIcon,
  GitBranchIcon,
  InboxIcon,
  PencilEdit02Icon,
  SparklesIcon,
  Sent02Icon,
} from '@hugeicons/core-free-icons'
import { Badge } from '../badge'
import type { ComponentExample } from '@/components/detail/examples-types'

function Icon({ icon, size = 12 }: { icon: IconSvgElement; size?: number }) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={1.75} aria-hidden="true" />
}

function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`w-full max-w-sm ${className}`}>{children}</div>
}

const SIZES = ['sm', 'md', 'lg'] as const
const VARIANTS = [
  { variant: 'solid', label: 'Solid', text: 'New' },
  { variant: 'muted', label: 'Muted', text: 'Beta' },
  { variant: 'dot', label: 'Dot', text: 'Live' },
] as const

function VariantMatrix() {
  return (
    <div className="grid w-full max-w-xl grid-cols-[4rem_repeat(3,1fr)] items-center gap-x-4 gap-y-5">
      <span />
      {SIZES.map((size) => (
        <span key={size} className="font-mono text-xs text-(--color-muted)">
          {size}
        </span>
      ))}
      {VARIANTS.map((row) => (
        <div key={row.variant} className="contents">
          <span className="text-sm text-(--color-muted)">{row.label}</span>
          {SIZES.map((size) => (
            <span key={size}>
              <Badge variant={row.variant} size={size}>
                {row.text}
              </Badge>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

const DEPLOYMENTS = [
  { name: 'nexvyn-ui', branch: 'main', time: '2m ago', status: 'live' },
  { name: 'docs', branch: 'preview/blocks', time: '6m ago', status: 'building' },
  { name: 'api', branch: 'main', time: '1h ago', status: 'queued' },
] as const

function Deployments() {
  return (
    <Panel>
      <p className="border-b border-(--color-fg)/8 pb-3 text-sm text-(--color-fg)">Deployments</p>
      <ul>
        {DEPLOYMENTS.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-3 border-b border-(--color-fg)/6 py-3 last:border-b-0"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-(--color-fg)">{item.name}</p>
              <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-(--color-muted)">
                <Icon icon={GitBranchIcon} />
                {item.branch} · {item.time}
              </p>
            </div>
            {item.status === 'live' && (
              <Badge variant="dot" size="sm" pulse>
                Live
              </Badge>
            )}
            {item.status === 'building' && (
              <Badge variant="muted" size="sm" icon={<Icon icon={Clock01Icon} />}>
                Building
              </Badge>
            )}
            {item.status === 'queued' && (
              <Badge variant="muted" size="sm">
                Queued
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function PricingCard() {
  return (
    <Panel>
      <div className="flex items-center justify-between gap-3">
        <p className="text-base text-(--color-fg)">Pro</p>
        <Badge size="sm" shimmer icon={<Icon icon={SparklesIcon} />}>
          Most popular
        </Badge>
      </div>
      <p className="mt-3 text-3xl tracking-tight text-(--color-fg)">
        $24<span className="text-sm text-(--color-muted)"> / month</span>
      </p>
      <p className="mt-2 text-sm text-(--color-muted)">
        Every component and block, with updates for a year.
      </p>
    </Panel>
  )
}

const TEAM = [
  { name: 'Maya Chen', email: 'maya@acme.com', role: 'Owner' },
  { name: 'Riya Shah', email: 'riya@acme.com', role: 'Admin' },
  { name: 'Leo Park', email: 'leo@acme.com', role: 'Member' },
] as const

function TeamList() {
  return (
    <Panel>
      <ul>
        {TEAM.map((member) => (
          <li
            key={member.email}
            className="flex items-center gap-3 border-b border-(--color-fg)/6 py-3 last:border-b-0"
          >
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--color-fg)/8 text-xs text-(--color-fg)"
            >
              {member.name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-(--color-fg)">{member.name}</p>
              <p className="truncate text-xs text-(--color-muted)">{member.email}</p>
            </div>
            {member.role === 'Owner' ? (
              <Badge size="sm" icon={<Icon icon={CrownIcon} />}>
                Owner
              </Badge>
            ) : (
              <Badge variant="muted" size="sm">
                {member.role}
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function ChangelogEntry() {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <Badge size="sm" icon={<Icon icon={GitBranchIcon} />}>
          v2.1.0
        </Badge>
        <span className="text-xs text-(--color-muted)">October 2026</span>
      </div>
      <p className="mt-3 text-base text-(--color-fg)">Banner blocks</p>
      <p className="mt-1 text-sm text-(--color-muted)">
        Six banner layouts, from a filled strip to a cookie consent card.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="muted" size="sm">
          Blocks
        </Badge>
        <Badge variant="muted" size="sm">
          Accessible
        </Badge>
      </div>
    </Panel>
  )
}

const NAV = [
  { label: 'Inbox', icon: InboxIcon, count: '12', active: true },
  { label: 'Sent', icon: Sent02Icon },
  { label: 'Drafts', icon: PencilEdit02Icon, count: '3' },
  { label: 'Archive', icon: Archive02Icon },
] as const

function NavCounts() {
  return (
    <Panel>
      <ul className="flex flex-col gap-0.5">
        {NAV.map((item) => (
          <li
            key={item.label}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
              'active' in item ? 'bg-(--color-fg)/6 text-(--color-fg)' : 'text-(--color-muted)'
            }`}
          >
            <Icon icon={item.icon} size={16} />
            <span className="flex-1">{item.label}</span>
            {'count' in item && (
              <Badge variant="muted" size="sm">
                {item.count}
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  )
}

const INITIAL_TAGS = ['React', 'Motion', 'Tailwind', 'Accessible']

function FilterBar() {
  const [tags, setTags] = useState<string[]>(INITIAL_TAGS)

  return (
    <Panel>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-(--color-fg)">Filters</p>
        <button
          type="button"
          disabled={tags.length === INITIAL_TAGS.length}
          onClick={() => setTags(INITIAL_TAGS)}
          className="rounded-md text-xs text-(--color-muted) transition-colors duration-(--motion-dur-fast) hover:text-(--color-fg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
        >
          Reset
        </button>
      </div>
      <div className="mt-3 flex min-h-6 flex-wrap gap-2">
        {tags.length === 0 && <p className="text-xs text-(--color-muted)">No filters applied.</p>}
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="muted"
            dismissLabel={`Remove ${tag}`}
            onDismiss={() => setTags((current) => current.filter((item) => item !== tag))}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </Panel>
  )
}

export const examples: ComponentExample[] = [
  {
    id: 'variant-matrix',
    title: 'Variants and sizes',
    group: 'Variants',
    span: 4,
    code: `<Badge variant="solid" size="sm">New</Badge>
<Badge variant="muted" size="md">Beta</Badge>
<Badge variant="dot" size="lg">Live</Badge>`,
    render: () => <VariantMatrix />,
  },
  {
    id: 'deployments',
    title: 'Deployment status',
    group: 'In product',
    span: 2,
    code: `<Badge variant="dot" size="sm" pulse>Live</Badge>
<Badge variant="muted" size="sm" icon={<HugeiconsIcon icon={Clock01Icon} size={12} />}>
  Building
</Badge>
<Badge variant="muted" size="sm">Queued</Badge>`,
    render: () => <Deployments />,
  },
  {
    id: 'team',
    title: 'Team roles',
    group: 'In product',
    span: 2,
    code: `<Badge size="sm" icon={<HugeiconsIcon icon={CrownIcon} size={12} />}>Owner</Badge>
<Badge variant="muted" size="sm">Admin</Badge>`,
    render: () => <TeamList />,
  },
  {
    id: 'pricing',
    title: 'Pricing highlight',
    group: 'In product',
    span: 2,
    code: `<Badge size="sm" shimmer icon={<HugeiconsIcon icon={SparklesIcon} size={12} />}>
  Most popular
</Badge>`,
    render: () => <PricingCard />,
  },
  {
    id: 'changelog',
    title: 'Changelog entry',
    group: 'In product',
    span: 2,
    code: `<Badge size="sm" icon={<HugeiconsIcon icon={GitBranchIcon} size={12} />}>v2.1.0</Badge>
<Badge variant="muted" size="sm">Blocks</Badge>`,
    render: () => <ChangelogEntry />,
  },
  {
    id: 'nav-counts',
    title: 'Navigation counts',
    group: 'In product',
    span: 2,
    code: `<a className="flex items-center gap-3">
  <HugeiconsIcon icon={InboxIcon} size={16} />
  Inbox
  <Badge variant="muted" size="sm" className="ms-auto">12</Badge>
</a>`,
    render: () => <NavCounts />,
  },
  {
    id: 'filters',
    title: 'Removable filters',
    group: 'In product',
    span: 2,
    code: `{tags.map((tag) => (
  <Badge
    key={tag}
    variant="muted"
    dismissLabel={\`Remove \${tag}\`}
    onDismiss={() => removeTag(tag)}
  >
    {tag}
  </Badge>
))}`,
    render: () => <FilterBar />,
  },
]
