import { readFile } from 'node:fs/promises'
import path from 'node:path'

const SOURCE_MAP: Record<string, string[]> = {
  badge: ['components', 'ui', 'badge.tsx'],
  'bounce-sidebar': ['components', 'ui', 'bounce-sidebar.tsx'],
  fader: ['components', 'ui', 'fader', 'fader.tsx'],
  'color-picker': ['components', 'ui', 'color-picker-standalone.tsx'],
  'goo-dropdown': ['components', 'ui', 'goo-dropdown.tsx'],
  'password-input': ['components', 'ui', 'password-input.tsx'],
  'ratio-slider': ['components', 'ui', 'ratio-slider.tsx'],
  'scroll-indicator': ['components', 'ui', 'scroll-indicator.tsx'],
  'table-of-contents': ['components', 'ui', 'table-of-contents.tsx'],
}

export async function GET(request: Request) {
  const name = new URL(request.url).searchParams.get('name')
  if (!name) {
    return new Response("Missing 'name' query.", { status: 400 })
  }

  const segments = SOURCE_MAP[name]
  if (!segments) {
    return new Response('Source not found.', { status: 404 })
  }

  try {
    const code = await readFile(path.join(process.cwd(), ...segments), 'utf8')
    return new Response(code, {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  } catch {
    return new Response('Unable to read source.', { status: 500 })
  }
}
