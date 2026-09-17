'use client'

import { useId, useState, type ReactNode } from 'react'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { CopyButton } from '@/components/detail/copy-button'
import { InstallCommandBox } from '@/components/detail/install-command-box'
import { cn } from '@/lib/utils'

const CLIENTS = ['cursor', 'claude', 'vscode', 'opencode'] as const
type Client = (typeof CLIENTS)[number]

const REGISTRY_SNIPPET = `{
  "registries": {
    "@nexvyn": "https://ui.nexvyn.dev/r/{name}.json"
  }
}`

const EXAMPLE_PROMPTS = [
  'Add a bounce sidebar component',
  'Add a goo dropdown animation',
  'Add a color picker with petals',
  'Add a password input with eye tracking',
  'Add a scroll indicator with tick marks',
]

const RUNNERS = { npm: 'npx', pnpm: 'pnpm dlx', yarn: 'yarn dlx', bun: 'bunx' } as const

function Step({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 md:grid-cols-[3.5rem_1fr] md:gap-6">
      <p
        aria-hidden="true"
        className="font-mono text-sm tabular-nums text-(--color-subtle) md:pt-1.5"
      >
        {String(index).padStart(2, '0')}
      </p>
      <div className="min-w-0">
        <h2 className="text-xl tracking-tight text-(--color-fg) md:text-2xl">{title}</h2>
        <div className="mt-3 flex flex-col gap-4 text-sm leading-relaxed text-(--color-muted) md:text-base">
          {children}
        </div>
      </div>
    </section>
  )
}

function ClientSwitch({ value, onChange }: { value: Client; onChange: (next: Client) => void }) {
  const groupId = useId()

  return (
    <div
      role="radiogroup"
      aria-label="AI client"
      className="flex w-fit flex-wrap gap-1 rounded-md bg-(--color-fg)/5 p-1"
    >
      {CLIENTS.map((client) => {
        const checked = client === value
        return (
          <label
            key={client}
            className={cn(
              'relative cursor-pointer rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
              'has-focus-visible:ring-2 has-focus-visible:ring-(--color-accent)',
              checked
                ? 'bg-(--color-bg) text-(--color-fg)'
                : 'text-(--color-muted) hover:text-(--color-fg)',
            )}
          >
            <input
              type="radio"
              name={groupId}
              value={client}
              checked={checked}
              onChange={() => onChange(client)}
              className="sr-only"
            />
            {client}
          </label>
        )
      })}
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative rounded-md bg-(--color-fg)/4">
      <CopyButton value={code} label="Copy snippet" className="absolute end-2 top-2" />
      <pre className="overflow-x-auto p-4 pe-14 font-mono text-[13px] leading-relaxed text-(--color-fg)">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function MCPPage() {
  const [client, setClient] = useState<Client>('cursor')

  return (
    <div className="relative h-full w-full">
      <div className="absolute end-4 top-4 z-10">
        <ThemeToggle showShortcut={false} />
      </div>

      <div className="no-scrollbar h-full overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-14 px-4 pt-20 pb-40 sm:px-8 md:pt-24">
          <header className="flex flex-col gap-4">
            <p className="w-fit rounded-md bg-(--color-fg)/5 px-2 py-1 font-mono text-xs text-(--color-muted)">
              Model Context Protocol
            </p>
            <h1 className="text-4xl tracking-tight text-(--color-fg) md:text-5xl">
              Build with your AI editor
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-(--color-muted) md:text-lg">
              Connect the shadcn MCP server and ask for any Nexvyn component by name. Your editor
              searches the registry and installs it for you.
            </p>
          </header>

          <div className="flex flex-col gap-14">
            <Step index={1} title="Install the MCP server">
              <p>Pick your AI client, run the command, then restart the client.</p>
              <ClientSwitch value={client} onChange={setClient} />
              <InstallCommandBox
                getCommand={(pm) => `${RUNNERS[pm]} shadcn@latest mcp init --client ${client}`}
              />
            </Step>

            <Step index={2} title="Add the registry to your project">
              <p>
                Add the snippet to your{' '}
                <span className="font-mono text-(--color-fg)">components.json</span> file so the
                server can find Nexvyn components.
              </p>
              <CodeBlock code={REGISTRY_SNIPPET} />
            </Step>

            <Step index={3} title="Ask for a component">
              <p>Describe what you want. A few prompts to start with:</p>
              <ul className="flex flex-col gap-2">
                {EXAMPLE_PROMPTS.map((prompt) => (
                  <li
                    key={prompt}
                    className="flex items-center justify-between gap-3 rounded-md bg-(--color-fg)/4 py-1.5 ps-4 pe-2"
                  >
                    <span className="min-w-0 text-(--color-fg)">{prompt}</span>
                    <CopyButton value={prompt} label={`Copy prompt: ${prompt}`} />
                  </li>
                ))}
              </ul>
            </Step>
          </div>
        </div>
      </div>
    </div>
  )
}
