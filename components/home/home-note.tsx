import Image from 'next/image'
import Link from 'next/link'

export function HomeNote() {
  return (
    <section
      aria-label="A note from Nexvyn"
      className="mx-auto w-full max-w-xl space-y-5 px-6 pt-28 sm:pt-36"
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1 text-lg">
          A note from{' '}
          <Link
            href="https://github.com/Nexvyn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 underline-offset-3 hover:text-(--color-accent) hover:underline"
          >
            <span>
              <Image
                alt="Nexvyn"
                width={20}
                height={20}
                className="ms-1 rounded-full"
                src="/favicon.svg"
              />
            </span>{' '}
            Nexvyn
          </Link>
          .
        </p>
      </div>
      <div className="space-y-4 text-lg leading-relaxed text-(--color-muted)">
        <p>
          I’ve seen many UI libraries, but few that feel truly polished, thoughtful, and tasteful.
          Many aim to impress quickly, while others feel vibe-coded.
        </p>
        <p>With Nexvyn UI, I’m focused on quality, craft, and tasteful animation.</p>
        <p>
          Explore the{' '}
          <Link
            href="/components"
            className="text-(--color-accent) underline-offset-3 hover:underline"
          >
            components
          </Link>
          . Blocks are coming next.
        </p>
        <p>Take your time. Enjoy the visit.</p>
      </div>
    </section>
  )
}
