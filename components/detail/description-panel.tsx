'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { CodeXml, Maximize, Minimize } from 'lucide-react'
import { activeComponent, installCommand, PANEL_INFO } from '@/lib/components'
import { cn } from '@/lib/utils'
import CompactThemeToggle from './compact-theme-toggle'
import { MailIcon, XIcon } from './icons'
import DependencyPill from './dependency-pill'
import PropsTable from './props-table'
import { CodeBlock } from './code-block'
import CodeDrawer from './code-drawer'

function CopyButton({
  value,
  label,
  idleIcon,
  className,
}: {
  value: string
  label?: string
  idleIcon?: React.ReactNode
  className?: string
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
      title={label}
      className={cn(
        'detail-toolbar-btn detail-copy-btn shrink-0 rounded-md px-2 py-1 text-xs font-medium transition-colors',
        className,
      )}
      style={{
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-muted)',
      }}
    >
      {idleIcon ?? (copied ? 'Copied' : 'Copy')}
    </button>
  )
}

const PANEL_SHIFT = 600

type DescriptionPanelProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-medium uppercase tracking-wider"
      style={{ color: 'var(--color-muted)' }}
    >
      {children}
    </p>
  )
}

export function DescriptionPanel({ open, setOpen }: DescriptionPanelProps) {
  const pathname = usePathname()
  const item = activeComponent(pathname)
  const command = item ? installCommand(item) : null

  const [codeOpen, setCodeOpen] = useState(false)
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

  return (
    <div className="pointer-events-none absolute right-0 top-0 z-40 h-full">
      <div className="detail-elevated-pill pointer-events-auto absolute top-4 right-4 z-50 flex items-center gap-1.5 rounded-2xl p-1.5">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close description' : 'Open description'}
          className="detail-toolbar-btn cursor-pointer rounded-full p-1.5"
          style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-fg)' }}
        >
          {open ? (
            <Maximize className="h-4 w-4" />
          ) : (
            <Minimize className="h-4 w-4" />
          )}
        </button>

        {item?.registry && (
          <button
            type="button"
            onClick={toggleCode}
            aria-label={codeOpen ? 'Hide code' : 'Get code'}
            className="detail-toolbar-btn cursor-pointer rounded-full p-1.5"
            style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-fg)' }}
          >
            <CodeXml className="h-4 w-4" />
          </button>
        )}

        <CompactThemeToggle />
      </div>

      <motion.div
        initial={false}
        animate={{ x: open ? 0 : PANEL_SHIFT }}
        transition={{ type: 'spring', stiffness: 280, damping: 32 }}
        className="detail-panel pointer-events-auto relative flex h-full w-[35rem] flex-col overflow-hidden rounded-2xl"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12"
          style={{
            background: 'linear-gradient(to bottom, var(--color-bg) 25%, transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12"
          style={{
            background: 'linear-gradient(to top, var(--color-bg) 25%, transparent)',
          }}
        />

        <div className="no-scrollbar flex flex-1 flex-col gap-12 overflow-y-auto p-8 pt-60 text-left">
          <div className="flex flex-col gap-4">
            <SectionLabel>{item?.name ?? 'Component'}</SectionLabel>
            <p
              className="text-2xl font-normal leading-relaxed tracking-tight text-pretty"
              style={{ color: 'var(--color-fg)' }}
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

          {command && (
            <div className="detail-section">
              <SectionLabel>Installation</SectionLabel>
              <span className="detail-badge">Nexvyn UI · component registry</span>
              <div className="detail-code-wrapper flex items-center gap-2">
                <CodeBlock variant="install" className="flex-1">
                  {command}
                </CodeBlock>
                <CopyButton value={command} />
              </div>
            </div>
          )}

          {item?.usage && (
            <div className="detail-section">
              <SectionLabel>How to use</SectionLabel>
              <div className="detail-code-wrapper">
                <CopyButton value={item.usage} />
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
                label={`Copy email (${PANEL_INFO.contactEmail})`}
                idleIcon={<MailIcon />}
                className="size-8 hover:text-foreground"
              />
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
      </motion.div>
    </div>
  )
}
