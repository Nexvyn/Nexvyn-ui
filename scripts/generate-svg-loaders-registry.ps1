# Generate SVG Loader components and public registry for shadcn CLI
# This creates:
# 1. Component files in registry/new-york-v4/loaders/*.tsx
# 2. Public registry JSON in public/r/styles/new-york-v4/loaders/*.json

$loadersDir = "public\svg-loaders"
$componentDir = "registry\new-york-v4\loaders"
$publicRegistryDir = "public\r\styles\new-york-v4\loaders"

# Ensure directories exist
if (-not (Test-Path $componentDir)) {
    New-Item -ItemType Directory -Path $componentDir -Force
}
if (-not (Test-Path $publicRegistryDir)) {
    New-Item -ItemType Directory -Path $publicRegistryDir -Force
}

# Function to convert kebab-case to PascalCase (valid JS identifier)
function ConvertTo-PascalCase {
    param([string]$text)
    $words = $text -split '-'
    $result = ($words | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ''
    # If starts with a number, prefix with "Loader" to make valid identifier
    if ($result -match '^\d') {
        $result = "Loader$result"
    }
    return $result
}

# Function to convert kebab-case to Title Case
function ConvertTo-TitleCase {
    param([string]$text)
    $words = $text -split '-'
    $result = ($words | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ' '
    return $result
}

Write-Host "Generating SVG Loader components and registry..." -ForegroundColor Cyan

# Get all SVG files
$svgFiles = Get-ChildItem $loadersDir -Filter "*.svg"

foreach ($file in $svgFiles) {
    $name = $file.BaseName
    $basePascalName = ConvertTo-PascalCase $name
    # If already prefixed with Loader (starts with number), don't add suffix
    if ($basePascalName -match '^Loader') {
        $componentName = $basePascalName
    } else {
        $componentName = "${basePascalName}Loader"
    }
    $titleName = ConvertTo-TitleCase $name
    
    # Read SVG content
    $svgContent = Get-Content $file.FullName -Raw
    
    # Extract inner SVG content (between <svg> and </svg>)
    if ($svgContent -match '<svg[^>]*>([\s\S]*)</svg>') {
        $svgInner = $matches[1].Trim()
    } else {
        $svgInner = ""
    }
    
    # Convert HTML attributes to JSX
    $jsxInner = $svgInner `
        -replace 'class=', 'className=' `
        -replace 'stroke-width=', 'strokeWidth=' `
        -replace 'stroke-linecap=', 'strokeLinecap=' `
        -replace 'stroke-linejoin=', 'strokeLinejoin=' `
        -replace 'stroke-dasharray=', 'strokeDasharray=' `
        -replace 'stroke-dashoffset=', 'strokeDashoffset=' `
        -replace 'stroke-miterlimit=', 'strokeMiterlimit=' `
        -replace 'fill-opacity=', 'fillOpacity=' `
        -replace 'fill-rule=', 'fillRule=' `
        -replace 'clip-path=', 'clipPath=' `
        -replace 'clip-rule=', 'clipRule=' `
        -replace 'stop-color=', 'stopColor=' `
        -replace 'stop-opacity=', 'stopOpacity='
    
    # Create component file
    $componentContent = @"
"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface ${componentName}Props extends Omit<ComponentProps<"svg">, "ref"> {
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ${titleName} Loader
 * CSS-animated SVG loader icon
 */
export function ${componentName}({
  size = 24,
  className,
  ...props
}: ${componentName}Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="${titleName} loading indicator"
      {...props}
    >
      ${jsxInner}
    </svg>
  );
}
"@
    
    $componentPath = "$componentDir\$name.tsx"
    $componentContent | Out-File -FilePath $componentPath -Encoding UTF8
    
    # Create public registry JSON
    $registryJson = @"
{
  "name": "$name",
  "type": "registry:ui",
  "description": "${titleName} animated SVG loader",
  "dependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "registry/new-york-v4/loaders/$name.tsx",
      "type": "registry:ui",
      "target": "components/ui/loaders/$name.tsx"
    }
  ]
}
"@
    
    $registryPath = "$publicRegistryDir\$name.json"
    $registryJson | Out-File -FilePath $registryPath -Encoding UTF8
    
    Write-Host "  Created: $name" -ForegroundColor Green
}

Write-Host "`nGeneration complete!" -ForegroundColor Cyan
$componentFiles = Get-ChildItem $componentDir -Filter "*.tsx"
$registryFiles = Get-ChildItem $publicRegistryDir -Filter "*.json"
Write-Host "Component files: $($componentFiles.Count)" -ForegroundColor Yellow
Write-Host "Registry files: $($registryFiles.Count)" -ForegroundColor Yellow
