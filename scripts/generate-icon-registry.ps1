# Icon Registry Generator
# Creates registry JSON files for all animated icons

$iconsSourceDir = "components\icons\animated\icons"
$registryDir = "registry\icons"

# Get all icon files
$iconFiles = Get-ChildItem "$iconsSourceDir\*.tsx" | Select-Object -ExpandProperty BaseName

Write-Host "Found $($iconFiles.Count) animated icons"

# Import icon registry data for descriptions
$iconRegistryContent = Get -Content "components\icons\animated\icon-registry.ts" -Raw

# Create registry entry for each icon
foreach ($iconName in $iconFiles) {
    $jsonPath = "$registryDir\$iconName.json"
    
    # Extract description from icon-registry.ts if available
    $description = "$iconName animated icon"
    if ($iconRegistryContent -match "`"$iconName`".*description: `"([^`"]+)`"") {
        $description = $matches[1]
    }
    
    $template = @"
{
    "`$schema": "../schema.json",
    "name": "$iconName",
    "type": "registry:icon",
    "description": "$description",
    "dependencies": ["framer-motion"],
    "devDependencies": ["@types/react"],
    "registryDependencies": [],
    "files": [
        {
            "path": "components/icons/animated/icons/$iconName.tsx",
            "type": "registry:icon"
        },
        {
            "path": "components/icons/animated/motion-icon.tsx",
            "type": "registry:lib"
        },
        {
            "path": "components/icons/animated/icon-variants.ts",
            "type": "registry:lib"
        },
        {
            "path": "components/icons/animated/types.ts",
            "type": "registry:lib"
        }
    ]
}
"@
    
    $template | Out-File -FilePath $jsonPath -Encoding UTF8
    Write-Host "Created: $iconName.json"
}

Write-Host "`nIcon registry generation complete! Created $($iconFiles.Count) entries."
