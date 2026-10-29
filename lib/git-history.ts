import history from '@/lib/generated/git-history.json'

export const REPOSITORY_URL = 'https://github.com/Nexvyn/Nexvyn-ui'

export type GitCommit = {
  hash: string
  shortHash: string
  author: string
  date: string
  type: string
  scope: string | null
  breaking: boolean
  subject: string
  filesChanged: number
  insertions: number
  deletions: number
}

export const ALL_COMMITS: GitCommit[] = [...(history as GitCommit[])].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
)

function dayOf(commit: GitCommit): string {
  return commit.date.slice(0, 10)
}

export function commitsForRelease(releaseDate: string | null, shippedDates: string[]): GitCommit[] {
  const shipped = [...shippedDates].sort()

  if (releaseDate === null) {
    const latest = shipped[shipped.length - 1]
    return ALL_COMMITS.filter((commit) => !latest || dayOf(commit) > latest)
  }

  const previous = shipped.filter((date) => date < releaseDate).pop()
  return ALL_COMMITS.filter((commit) => {
    const day = dayOf(commit)
    return day <= releaseDate && (!previous || day > previous)
  })
}

export function groupByDay(commits: GitCommit[]): { day: string; commits: GitCommit[] }[] {
  const days: { day: string; commits: GitCommit[] }[] = []
  for (const commit of commits) {
    const day = dayOf(commit)
    const last = days[days.length - 1]
    if (last && last.day === day) last.commits.push(commit)
    else days.push({ day, commits: [commit] })
  }
  return days
}

export function summarize(commits: GitCommit[]): {
  commits: number
  insertions: number
  deletions: number
} {
  return commits.reduce(
    (total, commit) => ({
      commits: total.commits + 1,
      insertions: total.insertions + commit.insertions,
      deletions: total.deletions + commit.deletions,
    }),
    { commits: 0, insertions: 0, deletions: 0 },
  )
}
