import { readFile } from 'node:fs/promises'
import path from 'node:path'

const SOURCE_MAP: Record<string, string[]> = {
  accordion: ['components', 'ui', 'accordion.tsx'],
  'action-button': ['components', 'ui', 'action-button.tsx'],
  'adaptive-actions': ['components', 'ui', 'adaptive-actions.tsx'],
  badge: ['components', 'ui', 'badge.tsx'],
  button: ['components', 'ui', 'button.tsx'],
  'bounce-sidebar': ['components', 'ui', 'bounce-sidebar.tsx'],
  breadcrumbs: ['components', 'ui', 'breadcrumbs.tsx'],
  checkbox: ['components', 'ui', 'checkbox.tsx'],
  combobox: ['components', 'ui', 'combobox.tsx'],
  'context-menu': ['components', 'ui', 'context-menu.tsx'],
  'morph-nav': ['components', 'ui', 'morph-nav.tsx'],
  'mobile-drawer': ['components', 'ui', 'mobile-drawer.tsx'],
  'clipboard-field': ['components', 'ui', 'clipboard-field.tsx'],
  fader: ['components', 'ui', 'fader', 'fader.tsx'],
  'color-picker': ['components', 'ui', 'color-picker-standalone.tsx'],
  'dropdown-menu': ['components', 'ui', 'dropdown-menu.tsx'],
  'goo-dropdown': ['components', 'ui', 'goo-dropdown.tsx'],
  'icon-bar': ['components', 'ui', 'icon-bar.tsx'],
  input: ['components', 'ui', 'input.tsx'],
  'nav-menu': ['components', 'ui', 'nav-menu.tsx'],
  'password-input': ['components', 'ui', 'password-input.tsx'],
  'radio-group': ['components', 'ui', 'radio-group.tsx'],
  'ratio-slider': ['components', 'ui', 'ratio-slider.tsx'],
  'scroll-indicator': ['components', 'ui', 'scroll-indicator.tsx'],
  select: ['components', 'ui', 'select.tsx'],
  switch: ['components', 'ui', 'switch.tsx'],
  table: ['components', 'ui', 'table.tsx'],
  'table-of-contents': ['components', 'ui', 'table-of-contents.tsx'],
  'tabs-subtle': ['components', 'ui', 'tabs-subtle.tsx'],
  'input-copy': ['components', 'ui', 'input-copy.tsx'],
  'input-message': ['components', 'ui', 'input-message.tsx'],
  'bars-theme': ['components', 'ui', 'bars-theme.tsx'],
  'glow-orb': ['components', 'ui', 'glow-orb.tsx'],
  'fluid-orb': ['components', 'ui', 'fluid-orb.tsx'],
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
