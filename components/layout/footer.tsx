'use client'

export function Footer(_props?: { showWordmark?: boolean }) {
  return (
    <footer style={{ color: 'var(--color-muted)' }}>
      <div className="mx-auto flex w-full max-w-325 items-center justify-center px-4 py-8 text-sm sm:px-6 md:px-12">
        <span className="text-center text-sm">
          Design and Developed by{' '}
          <a
            href="https://x.com/nexvyn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline-offset-4 hover:underline"
            style={{ color: 'var(--color-fg)' }}
          >
            Nexvyn
          </a>
        </span>
      </div>
    </footer>
  )
}
