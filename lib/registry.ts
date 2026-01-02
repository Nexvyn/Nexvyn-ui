import fs from "fs/promises"
import path from "path"

interface RegistryFile {
  path?: string
  content?: string
}

interface RegistryItem {
  name: string
  type: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
  tailwind?: Record<string, unknown>
  cssVars?: Record<string, unknown>
}

/**
 * Get a registry item by name
 * Loads component data and reads file contents
 * Primary source: registry/components/ (canonical)
 * Fallback: public/r/ (for backwards compatibility)
 */
export async function getRegistryItem(name: string): Promise<RegistryItem | null> {
  try {
    // Try to load from canonical registry/components/ first
    const canonicalRegistryPath = path.join(process.cwd(), "registry", "components", `${name}.json`)

    try {
      const data = await fs.readFile(canonicalRegistryPath, "utf-8")
      const item = JSON.parse(data) as RegistryItem

      // Read file contents if files are specified
      if (item.files) {
        for (const file of item.files) {
          if (file.path && !file.content) {
            try {
              const filePath = path.join(process.cwd(), file.path)
              file.content = await fs.readFile(filePath, "utf-8")
            } catch {
              // File not found, skip
            }
          }
        }
      }

      return item
    } catch {
      // Fallback to public registry (for backwards compatibility)
      const publicRegistryPath = path.join(
        process.cwd(),
        "public",
        "r",
        "styles",
        "new-york-v4",
        `${name}.json`
      )

      try {
        const data = await fs.readFile(publicRegistryPath, "utf-8")
        const item = JSON.parse(data) as RegistryItem

        // Read file contents if files are specified
        if (item.files) {
          for (const file of item.files) {
            if (file.path && !file.content) {
              try {
                const filePath = path.join(process.cwd(), file.path)
                file.content = await fs.readFile(filePath, "utf-8")
              } catch {
                // File not found, skip
              }
            }
          }
        }

        return item
      } catch {
        // Try alternate location in registry folder
        const altRegistryPath = path.join(
          process.cwd(),
          "registry",
          "new-york-v4",
          "ui",
          `${name}.tsx`
        )

        try {
          const content = await fs.readFile(altRegistryPath, "utf-8")
          return {
            name,
            type: "registry:ui",
            files: [{ path: altRegistryPath, content }],
          }
        } catch {
          return null
        }
      }
    }
  } catch (error) {
    console.error(`Failed to get registry item: ${name}`, error)
    return null
  }
}

/**
 * Check if a registry item exists
 */
export async function hasRegistryItem(name: string): Promise<boolean> {
  const item = await getRegistryItem(name)
  return item !== null
}
