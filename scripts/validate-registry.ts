/**
 * Registry Validation Script
 * Validates all registry JSON files to ensure:
 * - JSON schema compliance
 * - Referenced file paths exist
 * - Dependencies are valid
 *
 * Run with: npx tsx scripts/validate-registry.ts
 * Or: npm run validate:registry
 */

import fs from "fs/promises"
import path from "path"

// Get root directory
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, "..")

interface RegistryFile {
  path: string
  type: string
  content?: string
  target?: string
}

interface RegistryItem {
  name: string
  type: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
  tailwind?: Record<string, unknown>
  cssVars?: Record<string, unknown>
}

// Basic schema validation
function validateSchema(item: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const obj = item as Record<string, unknown>

  // Required fields
  if (!obj.name || typeof obj.name !== "string") {
    errors.push("Missing or invalid 'name' field")
  }
  if (!obj.type || typeof obj.type !== "string") {
    errors.push("Missing or invalid 'type' field")
  }
  if (!Array.isArray(obj.files)) {
    errors.push("Missing or invalid 'files' field")
  }

  // Type validation
  const validTypes = ["registry:ui", "registry:lib", "registry:example"]
  if (obj.type && !validTypes.includes(obj.type as string)) {
    errors.push(`Invalid type: ${obj.type}. Must be one of: ${validTypes.join(", ")}`)
  }

  // Files validation
  if (Array.isArray(obj.files)) {
    obj.files.forEach((file: unknown, index: number) => {
      const fileObj = file as Record<string, unknown>
      if (!fileObj.path || typeof fileObj.path !== "string") {
        errors.push(`File[${index}]: Missing or invalid 'path' field`)
      }
      if (!fileObj.type || typeof fileObj.type !== "string") {
        errors.push(`File[${index}]: Missing or invalid 'type' field`)
      }
      if (fileObj.type && !validTypes.includes(fileObj.type as string)) {
        errors.push(`File[${index}]: Invalid type: ${fileObj.type}`)
      }
    })
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Check if file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    const fullPath = path.join(rootDir, filePath)
    await fs.access(fullPath)
    return true
  } catch {
    return false
  }
}

// Validate a single registry item
async function validateRegistryItem(
  name: string,
  item: RegistryItem
): Promise<{ valid: boolean; errors: string[]; warnings: string[] }> {
  const errors: string[] = []
  const warnings: string[] = []

  // Schema validation
  const schemaResult = validateSchema(item)
  if (!schemaResult.valid) {
    errors.push(...schemaResult.errors)
  }

  // File path validation
  if (item.files && Array.isArray(item.files)) {
    for (const file of item.files) {
      if (file.path) {
        const exists = await fileExists(file.path)
        if (!exists) {
          errors.push(`File path does not exist: ${file.path}`)
        }
      }
    }
  }

  // Dependency validation (warnings only - we can't verify npm packages exist)
  if (item.registryDependencies && Array.isArray(item.registryDependencies)) {
    for (const dep of item.registryDependencies) {
      const depPath = path.join(rootDir, "registry", "components", `${dep}.json`)
      try {
        await fs.access(depPath)
      } catch {
        warnings.push(`Registry dependency may not exist: ${dep}`)
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

// Main validation function
async function validateRegistry(): Promise<boolean> {
  const registryDir = path.join(rootDir, "registry", "components")
  let allValid = true

  try {
    const files = await fs.readdir(registryDir)
    const jsonFiles = files.filter((f) => f.endsWith(".json"))

    console.log(`\n🔍 Validating ${jsonFiles.length} registry files...\n`)

    for (const file of jsonFiles) {
      const filePath = path.join(registryDir, file)
      const name = file.replace(".json", "")

      try {
        const content = await fs.readFile(filePath, "utf-8")
        const item = JSON.parse(content) as RegistryItem

        console.log(`📦 ${name}...`)

        const result = await validateRegistryItem(name, item)

        if (result.errors.length > 0) {
          console.error(`  ❌ Errors:`)
          result.errors.forEach((error) => console.error(`     - ${error}`))
          allValid = false
        }

        if (result.warnings.length > 0) {
          console.warn(`  ⚠️  Warnings:`)
          result.warnings.forEach((warning) => console.warn(`     - ${warning}`))
        }

        if (result.valid && result.warnings.length === 0) {
          console.log(`  ✅ Valid\n`)
        } else if (result.valid) {
          console.log(`  ✅ Valid (with warnings)\n`)
        }
      } catch (error) {
        console.error(`  ❌ Failed to parse JSON: ${error}`)
        allValid = false
      }
    }

    if (allValid) {
      console.log("✨ All registry files are valid!\n")
    } else {
      console.error("❌ Some registry files have errors. Please fix them before proceeding.\n")
    }

    return allValid
  } catch (error) {
    console.error(`Failed to read registry directory: ${error}`)
    return false
  }
}

// Run validation
validateRegistry()
  .then((success) => {
    process.exit(success ? 0 : 1)
  })
  .catch((error) => {
    console.error("Validation failed:", error)
    process.exit(1)
  })
