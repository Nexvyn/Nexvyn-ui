# Registry Generator Script
# This script creates registry JSON files for all UI components

$componentsDir = "components\ui"
$registryDir = "registry\components"

# Get all components
$allComponents = Get-ChildItem "$componentsDir\*.tsx" | Select-Object -ExpandProperty BaseName

# Get existing registry entries
$existingRegistry = Get-ChildItem "$registryDir\*.json" | Select-Object -ExpandProperty BaseName

# Find components without registry entries
$missingComponents = $allComponents | Where-Object { $existingRegistry -notcontains $_ }

Write-Host "Total components: $($allComponents.Count)"
Write-Host "Existing registry entries: $($existingRegistry.Count)"  
Write-Host "Missing registry entries: $($missingComponents.Count)"
Write-Host "`nMissing components:"
$missingComponents | ForEach-Object { Write-Host "  - $_" }

# Create basic registry template for each missing component
foreach ($component in $missingComponents) {
    $jsonPath = "$registryDir\$component.json"
    
    $template = @"
{
    "`$schema": "../schema.json",
    "name": "$component",
    "type": "registry:ui",
    "description": "$component component",
    "dependencies": [],
    "devDependencies": ["@types/react"],
    "registryDependencies": [],
    "files": [
        {
            "path": "components/ui/$component.tsx",
            "type": "registry:ui"
        },
        {
            "path": "lib/utils.ts",
            "type": "registry:lib"
        }
    ]
}
"@
    
    $template | Out-File -FilePath $jsonPath -Encoding UTF8
    Write-Host "Created: $component.json"
}

Write-Host "`nRegistry generation complete!"
