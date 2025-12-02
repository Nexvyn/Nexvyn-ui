export const registry = {
    button: {
        name: "button",
        type: "registry:ui",
        files: ["components/Button/index.tsx"],
        dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    },
    card: {
        name: "card",
        type: "registry:ui",
        files: ["components/Card/index.tsx"],
    },
    input: {
        name: "input",
        type: "registry:ui",
        files: ["components/Input/index.tsx"],
    },
    preview: {
        name: "preview",
        type: "registry:ui",
        files: ["components/Preview/index.tsx"],
    },
} as const;

export type ComponentName = keyof typeof registry;
