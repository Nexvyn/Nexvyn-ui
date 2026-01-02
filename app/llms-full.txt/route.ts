import { getLLMText, source } from "@/lib/source"
import { metadata } from "@/app/layout"

export const revalidate = false

const PROJECT_STRUCTURE = `
Project Name: ${metadata.title?.toString() || "nexvyn/ui"}
Description: ${metadata.description || "A lightweight documentation UI library"}

File Structure Overview:
- app/: Next.js App Router directory
  - (app)/: Main application routes (landing pages, playground)
  - docs/: Documentation routes
  - config/: Configuration files
- components/: React components
  - ui/: Primitive components (atomic building blocks)
  - patterns/: Complex visual patterns and compositions
  - icons/: Iconography (animated and static)
  - internal/: Internal components for the documentation site
- lib/: Utilities and helper functions

---
`

export async function GET() {
  const scan = source.getPages().map(getLLMText)
  const scanned = await Promise.all(scan)

  const fullText = [PROJECT_STRUCTURE, ...scanned].join("\n\n")

  return new Response(fullText)
}
