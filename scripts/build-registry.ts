import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const registry = JSON.parse(readFileSync(join(ROOT, 'registry.json'), 'utf8'))

mkdirSync(join(ROOT, 'public', 'r'), { recursive: true })

for (const item of registry.items) {
  const files = item.files.map((file: { path: string; type: string }) => {
    const content = readFileSync(join(ROOT, file.path), 'utf8')
    return { ...file, content }
  })

  const output = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: item.name,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies || [],
    files,
    type: item.type,
  }

  const outPath = join(ROOT, 'public', 'r', `${item.name}.json`)
  writeFileSync(outPath, JSON.stringify(output, null, 2))
  console.log(`Built: ${item.name}.json`)
}

console.log(`Done. Built ${registry.items.length} registry files.`)
