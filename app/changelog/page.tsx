import type { Metadata } from 'next'
import { AnimatedTitle } from '@/components/showcase/animated-title'
import { parseChangelog, type ChangelogSegment } from '@/lib/parse-changelog'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Notable changes to Nexvyn/UI, release by release.',
}

const CATEGORY_TONE: Record<string, string> = {
  Added: 'text-(--color-accent)',
  Changed: 'text-(--color-fg)',
  Fixed: 'text-(--color-muted)',
}

function Segment({ segment, index }: { segment: ChangelogSegment; index: number }) {
  if (segment.bold) {
    return (
      <strong key={index} className="text-(--color-fg) font-semibold">
        {segment.text}
      </strong>
    )
  }
  if (segment.code) {
    return (
      <code
        key={index}
        className="bg-(--color-surface-2) rounded-sm px-1 py-0.5 font-mono text-[0.85em]"
      >
        {segment.text}
      </code>
    )
  }
  return <span key={index}>{segment.text}</span>
}

export default function ChangelogPage() {
  const releases = parseChangelog()

  return (
    <div className="h-full w-full flex flex-col">
      <div
        id="changelog-scroll-viewport"
        className="min-h-0 flex-1 overflow-y-auto h-full relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `#changelog-scroll-viewport::-webkit-scrollbar { display: none; }`,
          }}
        />
        <div className="max-w-2xl mx-auto py-8 md:py-12 px-4 sm:px-6">
          <AnimatedTitle
            title="Changelog"
            className="text-2xl sm:text-3xl font-normal tracking-tight mb-2"
          />
          <p className="text-sm text-(--color-muted) mb-12">
            All notable changes to Nexvyn/UI, documented here.
          </p>

          <ol className="flex flex-col gap-14">
            {releases.map((release) => (
              <li key={release.version} className="relative ps-6">
                <span
                  aria-hidden="true"
                  className="absolute inset-s-0 top-1.5 size-2 rounded-full bg-(--color-accent)"
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-6">
                  <h2 className="text-lg font-medium text-(--color-fg)">v{release.version}</h2>
                  <time className="text-xs text-(--color-subtle)">{release.date}</time>
                </div>

                <div className="flex flex-col gap-6">
                  {release.categories.map((category) => (
                    <div key={category.heading}>
                      <h3
                        className={`text-xs font-medium uppercase tracking-wide mb-2 ${
                          CATEGORY_TONE[category.heading] ?? 'text-(--color-fg)'
                        }`}
                      >
                        {category.heading}
                      </h3>
                      <ul className="flex flex-col gap-1.5">
                        {category.entries.map((entry, i) => (
                          <li
                            key={i}
                            className="text-sm text-(--color-muted) leading-relaxed ps-4 relative before:absolute before:inset-s-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-(--color-border-strong)"
                          >
                            {entry.segments.map((segment, si) => (
                              <Segment key={si} segment={segment} index={si} />
                            ))}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
