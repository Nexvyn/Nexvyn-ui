import React from "react"
import { ExternalLink } from "lucide-react"

export interface PreviewProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  code?: string // The code to share/open in various platforms
  githubUrl?: string // Optional direct GitHub link
}

const OPEN_IN_LINKS = [
  {
    name: "V0",
    url: (code: string) => `https://v0.dev?code=${encodeURIComponent(code)}`,
    icon: "",
  },
  {
    name: "GitHub Gist",
    url: (code: string) => `https://gist.github.com/`,
    icon: "",
  },
  {
    name: "Scira AI",
    url: (code: string) => `https://scira.ai?code=${encodeURIComponent(code)}`,
    icon: "",
  },
  {
    name: "ChatGPT",
    url: (code: string) => `https://chat.openai.com/`,
    icon: "",
  },
  { name: "Claude", url: (code: string) => `https://claude.ai/`, icon: "" },
  {
    name: "T3 Chat",
    url: (code: string) => `https://t3.chat/new?q=${encodeURIComponent(code)}`,
    icon: "",
  },
]

export function Preview({
  children,
  title,
  description,
  className = "",
  code,
  githubUrl,
}: PreviewProps) {
  return (
    <div className={`my-6 ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        {title && <h3 className="text-foreground text-sm font-semibold">{title}</h3>}
        {code && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground mr-2 text-xs">Open in:</span>
            <div className="flex gap-1">
              {OPEN_IN_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url(code)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors"
                  title={`Open in ${link.name}`}
                >
                  <span>{link.icon}</span>
                  <span className="hidden sm:inline">{link.name}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      {description && <p className="text-muted-foreground mb-4 text-sm">{description}</p>}
      <div className="bg-muted/50 rounded-lg border p-6">{children}</div>
    </div>
  )
}

export default Preview
