"use client"

import { SupportProject } from "@/components/ui/our/home/support-project"
import { GithubIcon } from "@/components/ui/icons/animated/github"
import { TwitterIcon } from "@/components/ui/icons/animated/twitter"
import { LiveVisitors } from "@/components/ui/our/common/live-visitors"

export function SponsorsSection() {
  return (
    <section className="bg-background min-h-[calc(100vh-80px)] w-full rounded-3xl border border-dashed relative overflow-hidden">
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10">
        <LiveVisitors />
      </div>
      <div className="mx-auto max-w-2xl rounded-xl px-6 py-16 sm:py-24">
        <header className="mb-12">
          <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Sponsors
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Nexvyn UI is free and open source, made possible by our sponsors and contributors.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-foreground border-border mb-6 border-b pb-3 text-xl font-semibold">
            Current Sponsors
          </h2>
          <p className="text-muted-foreground">
            Be the first to sponsor Nexvyn UI and have your name here.
          </p>
        </section>

        <section className="mb-16">
          <SupportProject />
        </section>

        <section className="mb-16">
          <h2 className="text-foreground border-border mb-6 border-b pb-3 text-xl font-semibold">
            Other Ways to Support
          </h2>
          <ul className="text-muted-foreground space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-foreground">→</span>
              <span>
                <a
                  href="https://github.com/Nexvyn/ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground decoration-border hover:decoration-foreground underline underline-offset-4 transition-colors"
                >
                  Star the repository
                </a>{" "}
                on GitHub
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">→</span>
              <span>Share Nexvyn UI with other developers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">→</span>
              <span>
                <a
                  href="https://github.com/Nexvyn/ui/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground decoration-border hover:decoration-foreground underline underline-offset-4 transition-colors"
                >
                  Report bugs
                </a>{" "}
                or suggest features
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground">→</span>
              <span>
                <a
                  href="https://github.com/Nexvyn/ui/pulls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground decoration-border hover:decoration-foreground underline underline-offset-4 transition-colors"
                >
                  Contribute code
                </a>{" "}
                or documentation
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground border-border mb-6 border-b pb-3 text-xl font-semibold">
            Credits
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Nexvyn UI is built and maintained by{" "}
            <a
              href="https://x.com/Nexvyn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground decoration-border hover:decoration-foreground underline underline-offset-4 transition-colors"
            >
              Aman (Nexvyn)
            </a>{" "}
            .
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://x.com/Nexvyn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon size={20} />
            </a>
            <a
              href="https://github.com/Nexvyn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
          </div>
        </section>
      </div>
    </section>
  )
}
