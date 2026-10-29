import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { GitCommit } from '../lib/git-history'

const OUTPUT = join(process.cwd(), 'lib/generated/git-history.json')
const MARKER = '__commit__'
const FIELD = '\u001f'
const CONVENTIONAL = /^([a-z]+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/
// Typos already in published history (eee09a3 was committed as "ffeat:").
const TYPE_FIXES: Record<string, string> = { ffeat: 'feat' }

function parseSubject(raw: string): Pick<GitCommit, 'type' | 'scope' | 'breaking' | 'subject'> {
  const match = CONVENTIONAL.exec(raw.trim())
  if (!match) return { type: 'other', scope: null, breaking: false, subject: raw.trim() }
  const [, type, scope, bang, subject] = match
  return { type: TYPE_FIXES[type] ?? type, scope: scope ?? null, breaking: Boolean(bang), subject }
}

function readCommits(): GitCommit[] {
  const log = execFileSync(
    'git',
    [
      'log',
      '--no-merges',
      `--format=${MARKER}%H${FIELD}%h${FIELD}%an${FIELD}%aI${FIELD}%s`,
      '--numstat',
    ],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  )

  return log
    .split(MARKER)
    .filter((chunk) => chunk.trim())
    .map((chunk) => {
      const [header, ...stats] = chunk.split('\n')
      const [hash, shortHash, author, date, rawSubject] = header.split(FIELD)
      const files = stats.filter((line) => line.trim())

      let insertions = 0
      let deletions = 0
      for (const line of files) {
        const [added, removed] = line.split('\t')
        insertions += Number(added) || 0
        deletions += Number(removed) || 0
      }

      return {
        hash,
        shortHash,
        author,
        date,
        ...parseSubject(rawSubject),
        filesChanged: files.length,
        insertions,
        deletions,
      }
    })
}

const commits = readCommits()
mkdirSync(dirname(OUTPUT), { recursive: true })
writeFileSync(OUTPUT, `${JSON.stringify(commits, null, 2)}\n`)
console.log(`git-history: wrote ${commits.length} commits to lib/generated/git-history.json`)
