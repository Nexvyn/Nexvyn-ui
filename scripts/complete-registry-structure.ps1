# Complete Registry Structure Generator - V2
# Handles subdirectory structure (core, icons, our)
# This script:
# 1. Copies UI components from components/ui/** to registry/new-york-v4/ui/
# 2. Creates public registry JSON for each in public/r/styles/new-york-v4/

$registryUIDir = "registry\new-york-v4\ui"
$publicRegistryDir = "public\r\styles\new-york-v4"

# Create directories if they don't exist
New-Item -ItemType Directory -Path $registryUIDir -Force | Out-Null
New-Item -ItemType Directory -Path $publicRegistryDir -Force | Out-Null

Write-Host "=== Complete Registry Structure Generator V2 ===" -ForegroundColor Cyan
Write-Host ""

# Source directories to process
$sourceDirs = @(
    @{ Path = "components\ui\core"; Prefix = "" },
    @{ Path = "components\ui\our\common"; Prefix = "" },
    @{ Path = "components\ui\our\home"; Prefix = "" },
    @{ Path = "components\ui\our\docs"; Prefix = "" }
)

$copiedCount = 0
$jsonCreatedCount = 0

foreach ($dir in $sourceDirs) {
    if (-not (Test-Path $dir.Path)) {
        Write-Host "Skipping non-existent: $($dir.Path)" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "Processing: $($dir.Path)" -ForegroundColor Magenta
    
    # Get all .tsx files in this directory
    $files = Get-ChildItem "$($dir.Path)\*.tsx" -File -ErrorAction SilentlyContinue
    
    foreach ($file in $files) {
        $name = $file.BaseName
        $targetPath = "$registryUIDir\$($file.Name)"
        $jsonPath = "$publicRegistryDir\$name.json"
        
        # Copy the component file (skip if exists)
        if (-not (Test-Path $targetPath)) {
            Copy-Item $file.FullName -Destination $targetPath
            $copiedCount++
            Write-Host "  Copied: $($file.Name)" -ForegroundColor Green
        }
        
        # Create public registry JSON (skip if exists)
        if (-not (Test-Path $jsonPath)) {
            $description = ($name -replace '-', ' ')
            $description = (Get-Culture).TextInfo.ToTitleCase($description)
            
            $jsonContent = @"
{
  "name": "$name",
  "type": "registry:ui",
  "description": "$description component",
  "dependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "registry/new-york-v4/ui/$($file.Name)",
      "type": "registry:ui",
      "target": "components/ui/$($file.Name)"
    }
  ]
}
"@
            $jsonContent | Out-File -FilePath $jsonPath -Encoding UTF8
            $jsonCreatedCount++
            Write-Host "  Created JSON: $name.json" -ForegroundColor Blue
        }
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Components copied: $copiedCount" -ForegroundColor Green
Write-Host "Registry JSON created: $jsonCreatedCount" -ForegroundColor Blue

$totalUI = (Get-ChildItem "$registryUIDir\*.tsx" -File -ErrorAction SilentlyContinue).Count
$totalJSON = (Get-ChildItem "$publicRegistryDir\*.json" -File -ErrorAction SilentlyContinue).Count

Write-Host ""
Write-Host "Total UI files: $totalUI" -ForegroundColor Yellow
Write-Host "Total Registry JSON: $totalJSON" -ForegroundColor Yellow
