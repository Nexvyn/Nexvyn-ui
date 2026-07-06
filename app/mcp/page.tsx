'use client'

import { ThemeToggle } from '@/components/layout/theme-toggle'
import { AnimatedTitle } from '@/components/showcase/animated-title'
import { InstallCommandBox } from '@/components/detail/install-command-box'

const examplePrompts = [
  'Add a bounce sidebar component',
  'Add a goo dropdown animation',
  'Add a color picker with petals',
  'Add a password input with eye tracking',
  'Add a scroll indicator with tick marks',
]

export default function MCPPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle showShortcut={false} />
      </div>
      <div
        id="mcp-scroll-viewport"
        className="min-h-0 flex-1 overflow-y-auto h-full relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `#mcp-scroll-viewport::-webkit-scrollbar { display: none; }`,
          }}
        />
        <div className="max-w-xl mx-auto py-4 md:py-6 px-3 sm:px-4">
          <AnimatedTitle
            title="MCP"
            className="text-2xl sm:text-3xl font-normal tracking-tight mb-4"
          />

          <p className="text-sm text-(--color-muted) mb-8 max-w-2xl">
            Integrating MCP with Nexvyn lets you control it via AI.
          </p>

          <section className="mb-8">
            <h2 className="border-b pb-1 md:pb-1.5 tracking-tight text-lg md:text-2xl text-(--color-fg) border-(--color-border) mb-3">
              Installation
            </h2>
            <p className="mt-1 md:mt-2 font-sans text-sm md:text-base leading-relaxed text-(--color-muted) mb-4">
              Enable MCP in your project environment.
            </p>
            <InstallCommandBox registry="mcp" />
          </section>

          <section className="mb-8">
            <h2 className="border-b pb-1 md:pb-1.5 tracking-tight text-lg md:text-2xl text-(--color-fg) border-(--color-border) mb-3">
              Add the registry to your project
            </h2>
            <p className="mt-1 md:mt-2 font-sans text-sm md:text-base leading-relaxed text-(--color-muted) mb-4">
              Add the following to your components.json file.
            </p>

            <div className="relative rounded-lg overflow-hidden border border-(--color-border) bg-(--color-surface)">
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono leading-relaxed">
                  <span className="text-(--color-fg)">{'{'}</span>{'\n'}
                  <span className="text-(--color-fg)">  </span>
                  <span className="text-(--color-accent)">"registries"</span>
                  <span className="text-(--color-fg)">: {'{'}</span>{'\n'}
                  <span className="text-(--color-fg)">    </span>
                  <span className="text-(--color-accent)">"@nexvyn"</span>
                  <span className="text-(--color-fg)">: </span>
                  <span className="text-(--color-muted)">"https://ui.nexvyn.dev/r/{'{name}'}.json"</span>{'\n'}
                  <span className="text-(--color-fg)">  {'}'}</span>{'\n'}
                  <span className="text-(--color-fg)">{'}'}</span>
                </code>
              </pre>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(`{
  "registries": {
    "@nexvyn": "https://ui.nexvyn.dev/r/{name}.json"
  }
}`)}
                className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-(--color-surface-2) transition-colors text-(--color-muted) hover:text-(--color-fg)"
                aria-label="Copy"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="border-b pb-1 md:pb-1.5 tracking-tight text-lg md:text-2xl text-(--color-fg) border-(--color-border) mb-3">
              Usage
            </h2>
            <p className="mt-1 md:mt-2 font-sans text-sm md:text-base leading-relaxed text-(--color-muted) mb-4">
              You can now ask your IDE to use any Nexvyn component. Here are some examples:
            </p>

            <ul className="space-y-1.5 text-sm text-(--color-muted)">
              {examplePrompts.map((prompt) => (
                <li key={prompt} className="flex items-start gap-2">
                  <span className="text-(--color-accent) mt-0.5">•</span>
                  {prompt}
                </li>
              ))}
            </ul>
          </section>

          <div className="h-16 md:h-25" />
        </div>
      </div>
    </div>
  )
}
