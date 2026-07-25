'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { activeComponent } from '@/lib/components-registry'
import { InstallCommandBox } from './install-command-box'
import { DescriptionPanel } from './description-panel'
import { PreviewControlProvider, usePreviewControl } from './preview-controls'
import { Tooltip } from './tooltip'
import { AnatomyLicenseNotice } from './anatomy-license-notice'
import { SoundToggle } from '@/components/layout/sound-toggle'
import { useScreenSize } from '@/hooks/use-screen-size'

const INFO_SPACE = 576

function AnatomyLicenseToggle({ itemId }: { itemId: string }) {
  const [view] = usePreviewControl(`${itemId}-view`, 'preview')
  if (view !== 'anatomy') return null
  return (
    <AnatomyLicenseNotice className="shrink-0 h-10 w-10 rounded-xl squircle-corners border border-(--color-border) bg-(--color-surface-2) backdrop-blur-sm" />
  )
}

function PreviewBottomBar({ registry, itemId }: { registry: string; itemId: string }) {
  return (
    <div className="absolute bottom-5 left-1/2 z-10 flex w-full max-w-[calc(100%-2.5rem)] -translate-x-1/2 items-center gap-2 pointer-events-auto sm:max-w-sm md:max-w-md">
      <div className="min-w-0 flex-1 rounded-xl backdrop-blur-sm">
        <InstallCommandBox registry={registry} />
      </div>
      <Tooltip content="Toggle sound (M)" side="top">
        <SoundToggle className="h-10 w-10 shrink-0 rounded-xl squircle-corners border border-(--color-border) bg-(--color-surface-2) backdrop-blur-sm" />
      </Tooltip>
      <AnatomyLicenseToggle itemId={itemId} />
    </div>
  )
}

export default function DetailSidebarShell({ children }: { children: React.ReactNode }) {
  const [infoOpen, setInfoOpen] = useState(false)
  const pathname = usePathname()
  const item = activeComponent(pathname)
  const screenSize = useScreenSize()
  const isMobile = screenSize.lessThan('md')
  const isContentPage =
    pathname === '/mcp' ||
    pathname === '/icons' ||
    pathname === '/illustration' ||
    pathname === '/changelog' ||
    pathname === '/design'

  return (
    <PreviewControlProvider>
      <div className="detail-page relative h-full font-sans">
        {!isContentPage && <DescriptionPanel open={infoOpen} setOpen={setInfoOpen} />}

        <motion.div
          initial={false}
          animate={{
            paddingRight: infoOpen && !isMobile ? INFO_SPACE : 0,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          className="h-full"
        >
          <div
            className={`detail-preview-card relative z-0 h-full rounded-[45px] p-4 ${
              isContentPage ? 'pt-3 sm:pt-3' : 'pt-16 sm:pt-20'
            }`}
          >
            {children}
            {item?.registry && !infoOpen && (
              <PreviewBottomBar registry={item.registry} itemId={item.id} />
            )}
          </div>
        </motion.div>
      </div>
    </PreviewControlProvider>
  )
}
