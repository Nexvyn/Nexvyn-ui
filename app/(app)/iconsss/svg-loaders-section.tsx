"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Copy, Check, ExternalLink, X, Terminal, Code } from "lucide-react"
import Link from "next/link"

// SVG Loader names (matches files in public/svg-loaders/)
const SVG_LOADERS = [
  "12-dots-scale-rotate",
  "180-ring-with-bg",
  "180-ring",
  "270-ring-with-bg",
  "270-ring",
  "3-dots-bounce",
  "3-dots-fade",
  "3-dots-move",
  "3-dots-rotate",
  "3-dots-scale-middle",
  "3-dots-scale",
  "6-dots-rotate",
  "6-dots-scale-middle",
  "6-dots-scale",
  "8-dots-rotate",
  "90-ring-with-bg",
  "90-ring",
  "audio",
  "ball-triangle",
  "bars-fade",
  "bars-rotate-fade",
  "bars-scale-fade",
  "bars-scale-middle",
  "bars-scale",
  "bars",
  "blocks-scale",
  "blocks-shuffle-2",
  "blocks-shuffle-3",
  "blocks-wave",
  "bouncing-ball",
  "circles",
  "clock",
  "dot-revolve",
  "eclipse-half",
  "eclipse",
  "gooey-balls-1",
  "gooey-balls-2",
  "grid",
  "hearts",
  "oval",
  "puff",
  "pulse-2",
  "pulse-3",
  "pulse-multiple",
  "pulse-ring",
  "pulse-rings-2",
  "pulse-rings-3",
  "pulse-rings-multiple",
  "pulse",
  "ring-resize",
  "rings",
  "spinning-circles",
  "tadpole",
  "tail-spin",
  "three-dots",
  "wifi-fade",
  "wifi",
  "wind-toy",
]

function formatLoaderName(filename: string): string {
  return filename
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

interface LoaderCardProps {
  name: string
  index: number
}

function LoaderCard({ name, index }: LoaderCardProps) {
  const [copied, setCopied] = useState<"svg" | "react" | "cli" | null>(null)
  const [svgCode, setSvgCode] = useState("")

  useEffect(() => {
    fetch(`/svg-loaders/${name}.svg`)
      .then((res) => res.text())
      .then((code) => setSvgCode(code))
      .catch(() => {})
  }, [name])

  const copyCLI = async () => {
    const cliCommand = `npx shadcn@latest add "https://ui.nexvyn.dev/r/styles/new-york-v4/loaders/${name}.json"`
    await navigator.clipboard.writeText(cliCommand)
    setCopied("cli")
    setTimeout(() => setCopied(null), 2000)
  }

  const copySVG = async () => {
    await navigator.clipboard.writeText(svgCode)
    setCopied("svg")
    setTimeout(() => setCopied(null), 2000)
  }

  const copyReact = async () => {
    const pascalName = name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")
    const componentName = /^\d/.test(pascalName) ? `Loader${pascalName}` : `${pascalName}Loader`

    const reactComponent = `"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface ${componentName}Props extends Omit<ComponentProps<"svg">, "ref"> {
  size?: number;
  className?: string;
}

export function ${componentName}({
  size = 24,
  className,
  ...props
}: ${componentName}Props) {
  return (
    <svg
      width={size}
      height={size}
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="${formatLoaderName(name)}"
      {...props}
    >
      ${svgCode.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] || ""}
    </svg>
  );
}`

    await navigator.clipboard.writeText(reactComponent)
    setCopied("react")
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="group bg-background border-border hover:bg-muted/50 relative flex flex-col items-center justify-between border-r border-b p-6 transition-colors duration-200">
      {/* Loader */}
      <div className="mb-4 flex flex-1 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/svg-loaders/${name}.svg`}
          alt={formatLoaderName(name)}
          className="h-12 w-12"
          style={{
            filter:
              "invert(32%) sepia(98%) saturate(1234%) hue-rotate(213deg) brightness(97%) contrast(101%)",
          }}
        />
      </div>

      {/* Action buttons - show on hover */}
      <div className="bg-muted flex items-center gap-1 rounded-md p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          onClick={copyCLI}
          className="hover:bg-background relative rounded p-1.5 transition-colors"
          title="Copy CLI command"
        >
          {copied === "cli" ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Terminal className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={copySVG}
          className="hover:bg-background relative rounded p-1.5 transition-colors"
          title="Copy SVG code"
        >
          {copied === "svg" ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={copyReact}
          className="hover:bg-background relative rounded p-1.5 transition-colors"
          title="Copy React component"
        >
          {copied === "react" ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Code className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Index */}
      <span className="text-muted-foreground absolute right-2 bottom-1 mt-2 text-xs">#{index}</span>
    </div>
  )
}

interface LoaderModalProps {
  isOpen: boolean
  onClose: () => void
  loaderName: string | null
}

function LoaderModal({ isOpen, onClose, loaderName }: LoaderModalProps) {
  const [svgCode, setSvgCode] = useState<string>("")
  const [copied, setCopied] = useState<"svg" | "react" | null>(null)

  useEffect(() => {
    if (loaderName) {
      fetch(`/svg-loaders/${loaderName}.svg`)
        .then((res) => res.text())
        .then(setSvgCode)
        .catch(() => setSvgCode(""))
    }
  }, [loaderName])

  const generateReactComponent = (name: string, svg: string): string => {
    const componentName = formatLoaderName(name).replace(/ /g, "") + "Loader"

    // Extract the inner content of the SVG (everything between <svg> and </svg>)
    const svgInnerMatch = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i)
    const svgInner = svgInnerMatch ? svgInnerMatch[1].trim() : ""

    // Convert SVG attributes to JSX format
    const jsxInner = svgInner
      .replace(/class=/g, "className=")
      .replace(/stroke-width=/g, "strokeWidth=")
      .replace(/stroke-linecap=/g, "strokeLinecap=")
      .replace(/stroke-linejoin=/g, "strokeLinejoin=")
      .replace(/stroke-dasharray=/g, "strokeDasharray=")
      .replace(/stroke-dashoffset=/g, "strokeDashoffset=")
      .replace(/stroke-miterlimit=/g, "strokeMiterlimit=")
      .replace(/fill-opacity=/g, "fillOpacity=")
      .replace(/fill-rule=/g, "fillRule=")
      .replace(/clip-path=/g, "clipPath=")
      .replace(/clip-rule=/g, "clipRule=")
      .replace(/stop-color=/g, "stopColor=")
      .replace(/stop-opacity=/g, "stopOpacity=")

    return `"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface ${componentName}Props extends Omit<ComponentProps<"svg">, "ref"> {
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ${formatLoaderName(name)} Loader
 * CSS-animated SVG loader icon
 */
export function ${componentName}({
  size = 24,
  className,
  ...props
}: ${componentName}Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="${formatLoaderName(name)} loading indicator"
      {...props}
    >
      ${jsxInner}
    </svg>
  );
}
`
  }

  const copyToClipboard = async (type: "svg" | "react") => {
    const textToCopy = type === "svg" ? svgCode : generateReactComponent(loaderName || "", svgCode)

    await navigator.clipboard.writeText(textToCopy)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!isOpen || !loaderName) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background border-border w-full max-w-md rounded-2xl border p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{formatLoaderName(loaderName)}</h3>
          <button onClick={onClose} className="hover:bg-accent rounded-lg p-1 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="bg-muted mb-6 flex items-center justify-center rounded-xl p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/svg-loaders/${loaderName}.svg`}
            alt={formatLoaderName(loaderName)}
            className="h-16 w-16 dark:invert"
          />
        </div>

        {/* Copy Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => copyToClipboard("svg")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
          >
            {copied === "svg" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied === "svg" ? "Copied!" : "Copy SVG"}
          </button>
          <button
            onClick={() => copyToClipboard("react")}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
          >
            {copied === "react" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied === "react" ? "Copied!" : "Copy React"}
          </button>
        </div>
      </div>
    </div>
  )
}

export function SvgLoadersSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLoaders = useMemo(() => {
    if (!searchQuery.trim()) return SVG_LOADERS
    const query = searchQuery.toLowerCase()
    return SVG_LOADERS.filter(
      (name) =>
        name.toLowerCase().includes(query) || formatLoaderName(name).toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <section className="bg-background mt-2 w-full rounded-3xl border border-dashed">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-10 space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-primary">SVG Loaders</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-md text-sm">
              58 animated SVG loading spinners. MIT licensed, no attribution required.
            </p>
          </div>

          {/* Badge */}
          <div className="flex items-center justify-center">
            <span className="bg-muted inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs">
              Source:{" "}
              <Link
                href="https://github.com/n3r4zzurr0/svg-spinners"
                target="_blank"
                className="text-primary inline-flex items-center gap-0.5 font-medium hover:underline"
              >
                svg-spinners <ExternalLink className="h-2.5 w-2.5" />
              </Link>{" "}
              &{" "}
              <Link
                href="https://github.com/SamHerbert/SVG-Loaders"
                target="_blank"
                className="text-primary inline-flex items-center gap-0.5 font-medium hover:underline"
              >
                SVG-Loaders <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            </span>
          </div>

          {/* Search */}
          <div className="flex justify-center pt-4">
            <div className="relative w-full max-w-sm">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search loaders..."
                className="bg-muted focus:border-primary/50 w-full rounded-xl border border-transparent py-2.5 pr-4 pl-10 text-sm transition-colors focus:outline-none"
              />
            </div>
          </div>
        </header>

        {/* Grid */}
        {filteredLoaders.length === 0 ? (
          <div className="bg-card flex flex-col items-center justify-center rounded-xl py-24 text-center">
            <div className="mb-4 text-4xl">🔍</div>
            <p className="text-muted-foreground">No loaders found</p>
            <p className="text-muted-foreground/70 mt-1 text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="border-border bg-background overflow-hidden rounded-lg border-t border-l">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredLoaders.map((name, index) => (
                <LoaderCard key={name} name={name} index={SVG_LOADERS.indexOf(name)} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs">
            Use the action buttons to copy CLI command, SVG code, or React component •{" "}
            {SVG_LOADERS.length} loaders available
          </p>
        </div>
      </div>
    </section>
  )
}
