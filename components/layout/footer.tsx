'use client'

export function Footer(_props?: { showWordmark?: boolean }) {
  return (
    <footer className="text-(--color-muted)">
      <div className="mx-auto flex w-full max-w-325 items-center justify-center px-4 py-8 text-sm sm:px-6 md:px-12">
        <span className="text-center text-sm">
          Designed and developed by{' '}
          <a
            href="https://x.com/nexvyn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-(--color-fg) underline-offset-4 hover:underline"
          >
            Nexvyn
          </a>
        </span>
      </div>
    </footer>
  )
}
