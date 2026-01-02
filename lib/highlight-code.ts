import { codeToHtml } from "shiki"
import type { ShikiTransformer } from "shiki"

const defaultThemes = {
  light: "vitesse-light",
  dark: "vitesse-dark",
}

// Transformers for line numbers and package manager detection
export const transformers: ShikiTransformer[] = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source
        node.properties["__raw__"] = raw

        // Detect npm/npx commands and generate all package manager variants
        if (raw.startsWith("npm install")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm install", "yarn add")
          node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add")
          node.properties["__bun__"] = raw.replace("npm install", "bun add")
        }
        if (raw.startsWith("npx")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npx", "yarn")
          node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx")
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
        }
      }
    },
  },
]

export async function highlightCode(code: string, lang: string = "tsx", themes = defaultThemes) {
  const html = await codeToHtml(code, {
    lang,
    themes,
    defaultColor: false,
    transformers: [
      {
        pre(node) {
          node.properties["class"] =
            "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent"
        },
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
        line(node, line) {
          node.properties["data-line"] = ""
          node.properties["data-line-number"] = line
        },
      },
    ],
  })

  return html
}
