import fs from 'fs';
import path from 'path';

interface RegistryComponent {
    name: string;
    type: string;
    description?: string;
    dependencies?: string[];
    devDependencies?: string[];
    registryDependencies?: string[];
    files: Array<{
        path: string;
        type: string;
    }>;
    tailwind?: Record<string, any>;
    cssVars?: Record<string, any>;
}

/**
 * Load a component from the registry
 */
export function loadComponent(name: string): RegistryComponent | null {
    try {
        const componentPath = path.join(process.cwd(), 'registry', 'components', `${name}.json`);
        const data = fs.readFileSync(componentPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Failed to load component: ${name}`, error);
        return null;
    }
}

/**
 * Load all components from the registry
 */
export function loadAllComponents(): Record<string, RegistryComponent> {
    const componentsDir = path.join(process.cwd(), 'registry', 'components');
    const files = fs.readdirSync(componentsDir);

    const components: Record<string, RegistryComponent> = {};

    for (const file of files) {
        if (file.endsWith('.json')) {
            const name = file.replace('.json', '');
            const component = loadComponent(name);
            if (component) {
                components[name] = component;
            }
        }
    }

    return components;
}

/**
 * Get component dependencies (including registry dependencies)
 */
export function getComponentDependencies(name: string): {
    npm: string[];
    registry: string[];
} {
    const component = loadComponent(name);
    if (!component) {
        return { npm: [], registry: [] };
    }

    const npmDeps = [
        ...(component.dependencies || []),
        ...(component.devDependencies || []),
    ];

    const registryDeps = component.registryDependencies || [];

    // Recursively get dependencies of registry dependencies
    const allRegistryDeps = new Set(registryDeps);
    for (const dep of registryDeps) {
        const subDeps = getComponentDependencies(dep);
        subDeps.registry.forEach(d => allRegistryDeps.add(d));
    }

    return {
        npm: [...new Set(npmDeps)],
        registry: Array.from(allRegistryDeps),
    };
}

/**
 * Validate component against schema
 */
export function validateComponent(component: RegistryComponent): boolean {
    // Basic validation
    if (!component.name || !component.type || !component.files) {
        return false;
    }

    if (!['registry:ui', 'registry:lib', 'registry:example'].includes(component.type)) {
        return false;
    }

    if (!Array.isArray(component.files) || component.files.length === 0) {
        return false;
    }

    return true;
}
