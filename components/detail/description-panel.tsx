'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { CodeXml, Maximize, Minimize, ExternalLink, Copy, Check, MessageSquare } from 'lucide-react'
import { activeComponent, installCommand, PANEL_INFO } from '@/lib/components-registry'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { MailIcon, XIcon } from './icons'
import DependencyPill from './dependency-pill'
import PropsTable from './props-table'
import { CodeBlock } from './code-block'
import CodeDrawer from './code-drawer'
import { StarsCount } from '@/components/detail/stars-count'
import { InstallCommandBox } from './install-command-box'
import { FeedbackModal } from './feedback-modal'

function CopyButton({
  value,
  className,
  children,
}: {
  value: string
  className?: string
  children?: React.ReactNode
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'rounded-lg hover:bg-(--color-surface-2) transition-colors cursor-pointer flex items-center justify-center shrink-0 border-0 bg-transparent',
        className,
      )}
      style={{ color: 'var(--color-muted)' }}
      title="Copy"
    >
      {copied ? <Check className="h-4.5 w-4.5 text-(--color-success)" /> : children || <Copy className="h-4.5 w-4.5" />}
    </button>
  )
}

const PANEL_SHIFT = 600
const INFO_SPACE = 576

type DescriptionPanelProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-wider text-(--color-muted)"
    >
      {children}
    </p>
  )
}

import { Tooltip } from './tooltip'

export function DescriptionPanel({ open, setOpen }: DescriptionPanelProps) {
  const pathname = usePathname()
  const router = useRouter()
  const item = activeComponent(pathname)
  const command = item ? installCommand(item) : null

  const [codeOpen, setCodeOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  useEffect(() => {
    if (!open) setCodeOpen(false)
  }, [open])

  const toggleCode = () => {
    if (codeOpen) {
      setCodeOpen(false)
    } else {
      setOpen(true)
      setCodeOpen(true)
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.key === 'f' || e.key === 'F') {
        setOpen((value) => !value)
      } else if ((e.key === 'p' || e.key === 'P') && item?.id) {
        router.push(`/preview/${item.id}`)
      } else if (e.key === 'c' || e.key === 'C') {
        toggleCode()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [item?.id, router, setOpen, codeOpen])

  return (
    <div className="pointer-events-none absolute right-0 top-0 z-40 h-full">
      <motion.div
        initial={false}
        animate={{
          right: open ? INFO_SPACE + 12 : 12,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 32 }}
        className="detail-elevated-pill pointer-events-auto absolute top-3 z-50 flex items-center gap-0.5 rounded-2xl p-1"
      >
        <Tooltip content={open ? 'Close description (F)' : 'Open description (F)'} side="bottom">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close description' : 'Open description'}
            className="detail-toolbar-btn cursor-pointer rounded-xl p-1.5"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)' }}
          >
            {open ? (
              <Maximize className="h-5 w-5" />
            ) : (
              <Minimize className="h-5 w-5" />
            )}
          </button>
        </Tooltip>

        {item?.registry && (
          <Tooltip content={codeOpen ? 'Hide code (C)' : 'Get code (C)'} side="bottom">
            <button
              type="button"
              onClick={toggleCode}
              aria-label={codeOpen ? 'Hide code' : 'Get code'}
              className="detail-toolbar-btn cursor-pointer rounded-xl p-1.5"
              style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)' }}
            >
              <CodeXml className="h-5 w-5" />
            </button>
          </Tooltip>
        )}

        {item?.id && (
          <Tooltip content="Standalone preview (P)" side="bottom">
            <Link
              href={`/preview/${item.id}`}
              aria-label="View standalone preview"
              className="detail-toolbar-btn cursor-pointer rounded-xl p-1.5 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)' }}
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          </Tooltip>
        )}

        {item?.id && (
          <Tooltip content="Star on GitHub" side="bottom">
            <a
              href="https://github.com/Nexvyn/Nexvyn-ui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="detail-toolbar-btn cursor-pointer rounded-xl px-2 h-8 flex items-center gap-1 text-xs font-medium"
              style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)' }}
            >
              <StarsCount />
            </a>
          </Tooltip>
        )}

        <Tooltip content="Switch theme (T)" side="bottom">
          <ThemeToggle showShortcut={false} variant="link" className="h-8 w-8 p-0 flex items-center justify-center rounded-xl bg-transparent hover:bg-transparent text-(--color-muted) hover:text-(--color-fg)" />
        </Tooltip>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ x: open ? 0 : PANEL_SHIFT }}
        transition={{ type: 'spring', stiffness: 280, damping: 32 }}
        className="detail-panel pointer-events-auto relative flex h-full w-140 flex-col overflow-hidden rounded-2xl"
        style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12"
          style={{
            background: 'linear-gradient(to bottom, var(--color-bg) 25%, transparent)',
          }}
        />


        <div className="no-scrollbar flex flex-1 flex-col gap-12 overflow-y-auto p-8 pt-60 text-left">
          <div className="flex flex-col gap-1 text-left">
            <h1
              className="text-3xl font-semibold tracking-tight text-(--color-fg)"
            >
              {item?.name ?? 'Component'}
            </h1>
            <p
              className="text-base leading-relaxed text-(--color-muted) text-pretty mt-2"
            >
              {item?.description ?? 'This component is not available yet.'}
            </p>
          </div>

          {item?.dependencies && item.dependencies.length > 0 && (
            <div className="detail-section">
              <SectionLabel>Dependencies</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {item.dependencies.map((dep) => (
                  <DependencyPill key={dep.name} name={dep.name} icon={dep.icon} />
                ))}
              </div>
            </div>
          )}

          {item?.interaction && (
            <div className="detail-section">
              <SectionLabel>Interaction Type</SectionLabel>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {item.interaction}
              </p>
            </div>
          )}

          {item?.props && item.props.length > 0 && (
            <div className="detail-section">
              <SectionLabel>Props</SectionLabel>
              <p className="-mt-1 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Options you can pass to customize this component.
              </p>
              <PropsTable props={item.props} />
            </div>
          )}

          {item?.registry && (
            <div className="detail-section">
              <SectionLabel>Installation</SectionLabel>
              <div className="w-full pt-1">
                <InstallCommandBox registry={item.registry} />
              </div>
            </div>
          )}

          {item?.usage && (
            <div className="detail-section">
              <SectionLabel>How to use</SectionLabel>
              <div className="detail-code-wrapper">
                <CopyButton value={item.usage} className="detail-copy-btn" />
                <CodeBlock variant="usage">{item.usage}</CodeBlock>
              </div>
            </div>
          )}

          {item?.registry && (
            <div className="detail-section">
              <SectionLabel>Source Code</SectionLabel>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {PANEL_INFO.sourceHint}
              </p>
            </div>
          )}

          <div className="detail-section">
            <SectionLabel>Keep in mind</SectionLabel>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {PANEL_INFO.keepInMind}
            </p>
          </div>

          <div className="detail-section">
            <SectionLabel>Contact</SectionLabel>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {PANEL_INFO.contactNote}
            </p>
            <div className="flex items-center gap-2">
              <CopyButton
                value={PANEL_INFO.contactEmail}
                className="size-8 hover:text-foreground flex items-center justify-center"
              >
                <MailIcon className="size-5" />
              </CopyButton>
              <a
                href="https://x.com/nexvyn"
                target="_blank"
                rel="noreferrer"
                aria-label="X — @nexvyn"
                title="@nexvyn"
                className="inline-flex size-8 items-center justify-center transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                <XIcon className="size-5" />
              </a>
              <button
                type="button"
                onClick={() => setFeedbackOpen(true)}
                className="inline-flex size-8 items-center justify-center transition-colors hover:text-(--color-fg) cursor-pointer"
                style={{ color: 'var(--color-muted)' }}
                title="Send Feedback"
              >
                <MessageSquare className="size-5" />
              </button>
            </div>
          </div>

          <div className="detail-section">
            <SectionLabel>License & Usage</SectionLabel>
            <ul className="flex flex-col gap-2 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {PANEL_INFO.license.map((line) => (
                <li key={line} className="flex gap-2">
                  <span style={{ color: 'var(--color-subtle)' }}>•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CodeDrawer open={codeOpen} onClose={() => setCodeOpen(false)} item={item} />
        <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} componentName={item?.name} />
      </motion.div>
    </div>
  )
}
