import { readFileSync } from 'fs'
import { join } from 'path'

export type ChangelogSegment = { text: string; bold?: boolean; code?: boolean }

export type ChangelogEntry = { segments: ChangelogSegment[] }

export type ChangelogCategory = {
  heading: string
  entries: ChangelogEntry[]
}

export type ChangelogRelease = {
  version: string
  date: string
  categories: ChangelogCategory[]
}

function parseInline(line: string): ChangelogSegment[] {
  const segments: ChangelogSegment[] = []
  const pattern = /\*\*(.+?)\*\*|`(.+?)`/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: line.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      segments.push({ text: match[1], bold: true })
    } else if (match[2] !== undefined) {
      segments.push({ text: match[2], code: true })
    }
    lastIndex = pattern.lastIndex
  }
  if (lastIndex < line.length) {
    segments.push({ text: line.slice(lastIndex) })
  }
  return segments
}

export function parseChangelog(): ChangelogRelease[] {
  const raw = readFileSync(join(process.cwd(), 'CHANGELOG.md'), 'utf-8')
  const lines = raw.split('\n')

  const releases: ChangelogRelease[] = []
  let currentRelease: ChangelogRelease | null = null
  let currentCategory: ChangelogCategory | null = null

  for (const line of lines) {
    const releaseMatch = line.match(/^##\s*\[([^\]]+)\]\s*-\s*(.+)$/)
    const categoryMatch = line.match(/^###\s*(.+)$/)
    const bulletMatch = line.match(/^-\s+(.+)$/)

    if (releaseMatch) {
      currentRelease = { version: releaseMatch[1], date: releaseMatch[2].trim(), categories: [] }
      releases.push(currentRelease)
      currentCategory = null
      continue
    }

    if (categoryMatch && currentRelease) {
      currentCategory = { heading: categoryMatch[1].trim(), entries: [] }
      currentRelease.categories.push(currentCategory)
      continue
    }

    if (bulletMatch && currentCategory) {
      currentCategory.entries.push({ segments: parseInline(bulletMatch[1]) })
    }
  }

  return releases
}
