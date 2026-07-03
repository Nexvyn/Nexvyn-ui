'use client'

export function Footer() {
  return (
    <footer
      className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-12 py-2 md:py-3 flex flex-col items-center text-sm tracking-tight"
      style={{ color: 'var(--color-muted)' }}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex-1 pointer-events-auto">
          <span className="text-xs sm:text-sm">© {new Date().getFullYear()}</span>
        </div>

        <div className="hidden md:block md:flex-1 md:text-center">
          <span
            className="text-xl sm:text-2xl"
            style={{ fontFamily: 'var(--font-handwriting), cursive', color: 'var(--color-accent)' }}
          >
            Nexvyn/UI
          </span>
        </div>

        <div className="flex-1 flex justify-end items-center gap-2">
          <a
            href="https://x.com/intent/follow?screen_name=nexvyn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-(--color-surface-2) transition-colors"
            aria-label="Follow @nexvyn on X"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://github.com/nexvyn/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-(--color-surface-2) transition-colors"
            aria-label="GitHub"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.195 22 16.44 22 12.017 22 6.484 17.522 2 12 2Z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mt-2 text-xs" style={{ color: 'var(--color-muted)' }}>
        Design and Developed by{' '}
        <span
          style={{ fontFamily: 'var(--font-handwriting), cursive', color: 'var(--color-accent)' }}
        >
          ©nexvyn
        </span>
      </div>
    </footer>
  )
}
