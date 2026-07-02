import { readFile } from 'node:fs/promises'
import path from 'node:path'

const SOURCE_MAP: Record<string, string[]> = {
  'bounce-sidebar': ['components', 'ui', 'bounce-sidebar.tsx'],
  'goo-dropdown': ['components', 'ui', 'goo-dropdown.tsx'],
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
