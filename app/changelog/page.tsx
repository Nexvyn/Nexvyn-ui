import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftRight, Minus, Plus, Wrench, type LucideIcon } from 'lucide-react'
import { AnimatedTitle } from '@/components/showcase/animated-title'
import { COMPONENTS } from '@/lib/components-registry'
import { commitsForRelease } from '@/lib/git-history'
import { pageMetadata } from '@/lib/seo'
import {
  parseChangelog,
  type ChangelogEntry,
  type ChangelogRelease,
  type ChangelogSegment,
} from '@/lib/parse-changelog'
import { CommitHistory } from './commit-history'

export const metadata = pageMetadata({
  title: 'Changelog',
  description: 'Notable changes to Nexvyn/UI, release by release.',
  path: '/changelog',
})

const AUTHOR = { name: 'Nexvyn', avatar: '/favicon.svg', href: 'https://github.com/Nexvyn' }

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Added: Plus,
  Changed: ArrowLeftRight,
  Removed: Minus,
  Fixed: Wrench,
}

const COMPONENT_HREFS = new Map(
  COMPONENTS.map((item) => [item.name.toLowerCase(), `/components/${item.id}`]),
)

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`)
  return Number.isNaN(parsed.getTime()) ? date : DATE_FORMAT.format(parsed)
}

function countEntries(release: ChangelogRelease) {
  return release.categories.reduce((total, category) => total + category.entries.length, 0)
}

function splitSubject(segments: ChangelogSegment[]) {
  if (!segments[0]?.bold) return { subject: [], body: segments }
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i]
    if (segment.bold || segment.code) continue
    const colon = segment.text.indexOf(':')
    if (colon === -1) continue
    const lead = segment.text.slice(0, colon)
    const tail = segment.text.slice(colon + 1).trimStart()
    return {
      subject: [...segments.slice(0, i), ...(lead ? [{ text: lead }] : [])],
      body: [...(tail ? [{ text: tail }] : []), ...segments.slice(i + 1)],
    }
  }
  return { subject: [], body: segments }
}

function InlineSegment({ segment, linkNames }: { segment: ChangelogSegment; linkNames?: boolean }) {
  if (segment.code) {
    return (
      <code className="rounded-sm bg-(--color-surface-2) px-1 py-0.5 font-mono text-[0.85em] text-(--color-fg)">
        {segment.text}
      </code>
    )
  }
  if (segment.bold) {
    const href = linkNames ? COMPONENT_HREFS.get(segment.text.toLowerCase()) : undefined
    if (href) {
      return (
        <Link
          href={href}
          prefetch={false}
          className="text-(--color-fg) underline-offset-3 transition-colors duration-(--motion-dur-fast) hover:text-(--color-accent) hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none"
        >
          {segment.text}
        </Link>
      )
    }
    return <span className="text-(--color-fg)">{segment.text}</span>
  }
  return <>{segment.text}</>
}

function Entry({ entry }: { entry: ChangelogEntry }) {
  const { subject, body } = splitSubject(entry.segments)

  return (
    <li className="flex flex-col gap-0.5 py-3 text-sm leading-relaxed">
      {subject.length > 0 && (
        <p className="text-(--color-fg)">
          {subject.map((segment, i) => (
            <InlineSegment key={i} segment={segment} linkNames />
          ))}
        </p>
      )}
      <p className="text-pretty text-(--color-muted)">
        {body.map((segment, i) => (
          <InlineSegment key={i} segment={segment} />
        ))}
      </p>
    </li>
  )
}

function Avatar() {
  return (
    <span className="squircle relative z-1 flex size-8 shrink-0 items-center justify-center border border-(--color-border) bg-(--color-bg)">
      <Image src={AUTHOR.avatar} alt="" width={20} height={20} className="rounded-full" />
    </span>
  )
}

type ReleaseProps = { release: ChangelogRelease; isLast: boolean; shippedDates: string[] }

function Release({ release, isLast, shippedDates }: ReleaseProps) {
  const unreleased = release.date === null
  const total = countEntries(release)
  const commits = commitsForRelease(release.date, shippedDates)
  const headingId = `release-${release.version.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <section aria-labelledby={headingId} className="grid grid-cols-[2rem_1fr] gap-x-4 sm:gap-x-6">
      <div className="relative flex justify-center">
        <Avatar />
        {!isLast && (
          <span
            aria-hidden="true"
            className="absolute inset-s-1/2 top-10 bottom-0 w-px -translate-x-1/2 bg-(--color-border) rtl:translate-x-1/2"
          />
        )}
      </div>

      <div className="min-w-0 pb-16">
        <header className="flex min-h-8 flex-wrap items-center gap-x-2 gap-y-1">
          <h2 id={headingId} className="text-lg font-normal leading-none text-(--color-fg)">
            {unreleased ? release.version : `v${release.version}`}
          </h2>
          <span className="text-sm text-(--color-muted)">
            by{' '}
            <Link
              href={AUTHOR.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--color-fg) underline-offset-3 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)"
            >
              {AUTHOR.name}
            </Link>
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-(--color-muted)">
            <span aria-hidden="true" className="text-(--color-subtle)">
              ·
            </span>
            {release.date ? (
              <time dateTime={release.date}>{formatDate(release.date)}</time>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="squircle size-1.5 bg-(--color-accent)" />
                In progress
              </span>
            )}
          </span>
        </header>
        <p className="mt-1 text-xs tabular-nums text-(--color-subtle)">
          {total} {total === 1 ? 'change' : 'changes'}
          {commits.length > 0 && (
            <>
              {' · '}
              {commits.length} {commits.length === 1 ? 'commit' : 'commits'}
            </>
          )}
        </p>

        <div className="mt-6 flex flex-col gap-8">
          {release.categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.heading] ?? Plus
            return (
              <div key={category.heading}>
                <h3 className="flex items-center gap-2 border-b border-(--color-border) pb-2 text-xs font-normal uppercase tracking-wider text-(--color-muted)">
                  <span className="squircle-corners flex size-6 items-center justify-center rounded-md border border-(--color-border) bg-(--color-bg) text-(--color-fg)">
                    <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                  </span>
                  {category.heading}
                  <span className="tabular-nums text-(--color-subtle)">
                    {category.entries.length}
                  </span>
                </h3>
                <ul className="divide-y divide-(--color-border)">
                  {category.entries.map((entry, i) => (
                    <Entry key={i} entry={entry} />
                  ))}
                </ul>
              </div>
            )
          })}
          <CommitHistory commits={commits} />
        </div>
      </div>
    </section>
  )
}

export default function ChangelogPage() {
  const releases = parseChangelog()
  const latest = releases.find((release) => release.date !== null)
  const shippedDates = releases.flatMap((release) => (release.date ? [release.date] : []))

  return (
    <div className="h-full w-full flex flex-col">
      <div
        id="changelog-scroll-viewport"
        className="no-scrollbar min-h-0 flex-1 overflow-y-auto h-full relative"
      >
        <div className="max-w-2xl mx-auto pt-16 pb-8 md:py-16 px-4 sm:px-6">
          <AnimatedTitle
            title="Changelog"
            className="text-2xl sm:text-3xl font-normal tracking-tight mb-4"
          />
          <p className="text-base leading-relaxed text-(--color-muted) max-w-lg text-pretty">
            Every notable change to Nexvyn/UI, release by release: new components, API changes, and
            fixes.
          </p>
          {latest?.date && (
            <p className="mt-4 text-sm text-(--color-subtle)">
              Latest release <span className="text-(--color-fg)">v{latest.version}</span>,{' '}
              {formatDate(latest.date)}
            </p>
          )}

          <div className="mt-12 md:mt-16">
            {releases.map((release, i) => (
              <Release
                key={release.version}
                release={release}
                isLast={i === releases.length - 1}
                shippedDates={shippedDates}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
