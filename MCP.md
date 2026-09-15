# MCP Integration

Nexvyn/UI works with the shadcn MCP server out of the box. This lets AI assistants (Claude Code, Cursor, VS Code Copilot, Codex, OpenCode) discover and install components.

## Setup

### 1. Configure the registry

Add to your project's `components.json`:

```json
{
  "registries": {
    "@nexvyn": "https://ui.nexvyn.dev/r/{name}.json"
  }
}
```

### 2. Install the MCP server

**Claude Code:**

```bash
npx shadcn@latest mcp init --client claude
```

**Cursor:**

```bash
npx shadcn@latest mcp init --client cursor
```

**VS Code:**

```bash
npx shadcn@latest mcp init --client vscode
```

**OpenCode:**

```bash
npx shadcn@latest mcp init --client opencode
```

### 3. Restart your AI client

## Usage

Try these prompts:

- "Show me the components in the nexvyn registry"
- "Install the bounce-sidebar component from nexvyn"
- "Create a navigation using the bounce-sidebar from nexvyn"
- "What props does the goo-dropdown accept?"

## Available Components

| Component      | Collection | Install Command                                |
| -------------- | ---------- | ---------------------------------------------- |
| bounce-sidebar | navigation | `npx shadcn@latest add @nexvyn/bounce-sidebar` |
| goo-dropdown   | inputs     | `npx shadcn@latest add @nexvyn/goo-dropdown`   |

## Registry URL

```
https://ui.nexvyn.dev/r/registry.json
```

## Best Practices

1. **Clear Descriptions**: Add concise, informative descriptions that help AI assistants understand what each component does
2. **Proper Dependencies**: List all `dependencies` accurately so MCP can install them automatically
3. **Registry Dependencies**: Use `registryDependencies` to indicate relationships between items
4. **Consistent Naming**: Use kebab-case for component names and maintain consistency across your registry
