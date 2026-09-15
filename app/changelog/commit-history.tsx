import {
  ChevronDown,
  FileText,
  Gauge,
  GitCommitHorizontal,
  Image as ImageIcon,
  Palette,
  Plus,
  Settings2,
  Shuffle,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { REPOSITORY_URL, groupByDay, summarize, type GitCommit } from '@/lib/git-history'

const TYPE_ICONS: Record<string, LucideIcon> = {
  feat: Plus,
  fix: Wrench,
  refactor: Shuffle,
  style: Palette,
  docs: FileText,
  chore: Settings2,
  perf: Gauge,
  assets: ImageIcon,
}

const DAY_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

const NUMBER_FORMAT = new Intl.NumberFormat('en-US')

export function formatDay(day: string) {
  return DAY_FORMAT.format(new Date(`${day}T00:00:00Z`))
}

export function LineStats({ insertions, deletions }: { insertions: number; deletions: number }) {
  return (
    <span className="inline-flex gap-1.5 font-mono text-xs tabular-nums">
      <span className="text-(--color-success)">+{NUMBER_FORMAT.format(insertions)}</span>
      <span className="text-(--color-error)">−{NUMBER_FORMAT.format(deletions)}</span>
      <span className="sr-only">
        {insertions} lines added, {deletions} lines removed
      </span>
    </span>
  )
}

function CommitRow({ commit }: { commit: GitCommit }) {
  const Icon = TYPE_ICONS[commit.type] ?? GitCommitHorizontal
  const label = commit.scope ? `${commit.type}(${commit.scope})` : commit.type

  return (
    <li className="grid grid-cols-[1.5rem_1fr] gap-x-3 py-3 sm:grid-cols-[1.5rem_1fr_auto]">
      <span className="squircle-corners mt-0.5 flex size-6 items-center justify-center rounded-md border border-(--color-border) bg-(--color-bg) text-(--color-muted)">
        <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <p className="text-sm leading-relaxed text-(--color-fg) text-pretty first-letter:uppercase">
          {commit.subject}
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-(--color-subtle)">
          <span className="font-mono">{label}</span>
          <span aria-hidden="true">·</span>
          <span>
            {commit.filesChanged} {commit.filesChanged === 1 ? 'file' : 'files'}
          </span>
          <span className="sm:hidden">
            <LineStats insertions={commit.insertions} deletions={commit.deletions} />
          </span>
        </p>
      </div>
      <div className="col-start-2 mt-1 flex items-center gap-3 sm:col-start-3 sm:mt-0.5 sm:flex-col sm:items-end sm:gap-1">
        <a
          href={`${REPOSITORY_URL}/commit/${commit.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View commit ${commit.shortHash} on GitHub`}
          className="rounded-sm font-mono text-xs text-(--color-muted) underline-offset-3 transition-colors duration-(--motion-dur-fast) hover:text-(--color-fg) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none"
        >
          {commit.shortHash}
        </a>
        <span className="hidden sm:inline-flex">
          <LineStats insertions={commit.insertions} deletions={commit.deletions} />
        </span>
      </div>
    </li>
  )
}

export function CommitHistory({ commits }: { commits: GitCommit[] }) {
  if (commits.length === 0) return null
  const summary = summarize(commits)
  const days = groupByDay(commits)

  return (
    <details className="group">
      <summary className="squircle-corners flex cursor-pointer list-none items-center gap-2 rounded-md border-b border-(--color-border) pb-2 text-xs font-normal uppercase tracking-wider text-(--color-muted) outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) [&::-webkit-details-marker]:hidden">
        <span className="squircle-corners flex size-6 items-center justify-center rounded-md border border-(--color-border) bg-(--color-bg) text-(--color-fg)">
          <GitCommitHorizontal aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
        </span>
        Commits
        <span className="tabular-nums text-(--color-subtle)">{summary.commits}</span>
        <span className="ms-auto flex items-center gap-3 normal-case tracking-normal">
          <LineStats insertions={summary.insertions} deletions={summary.deletions} />
          <ChevronDown
            aria-hidden="true"
            className="size-4 text-(--color-subtle) transition-[rotate] duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-open:rotate-180 motion-reduce:transition-none"
            strokeWidth={1.5}
          />
        </span>
      </summary>

      <ol className="mt-2 flex flex-col gap-6">
        {days.map(({ day, commits: dayCommits }) => (
          <li key={day}>
            <h4 className="flex items-baseline gap-2 pt-2 text-xs text-(--color-muted)">
              <time dateTime={day}>{formatDay(day)}</time>
              <span className="tabular-nums text-(--color-subtle)">
                {dayCommits.length} {dayCommits.length === 1 ? 'commit' : 'commits'}
              </span>
            </h4>
            <ul className="divide-y divide-(--color-border)">
              {dayCommits.map((commit) => (
                <CommitRow key={commit.hash} commit={commit} />
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </details>
  )
}
