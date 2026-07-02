'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { activeComponent } from '@/lib/components-registry'
import ComponentColorBar from './component-color-bar'
import { InstallCommandBox } from './install-command-box'
import { DescriptionPanel } from './description-panel'
import { PreviewControlProvider } from './preview-controls'

const INFO_SPACE = 576

export default function DetailSidebarShell({ children }: { children: React.ReactNode }) {
  const [infoOpen, setInfoOpen] = useState(false)
  const pathname = usePathname()
  const item = activeComponent(pathname)

  return (
    <PreviewControlProvider>
      <div className="detail-page relative h-full font-sans">
        <DescriptionPanel open={infoOpen} setOpen={setInfoOpen} />

        <motion.div
          initial={false}
          animate={{
            paddingRight: infoOpen ? INFO_SPACE : 0,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          className="h-full"
        >
          <div className="detail-preview-card relative z-0 h-full rounded-[45px] p-4">
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
              <Link
                href="/components"
                className="text-3xl sm:text-4xl font-normal no-underline hover:opacity-80 transition-opacity"
                style={{
                  fontFamily: 'var(--font-handwriting), cursive',
                  color: 'var(--color-accent)',
                }}
              >
                Nexvyn/Ui (...)
              </Link>
            </div>
            {children}

            <div className="absolute bottom-5 right-5 z-10 pointer-events-auto">
              <ComponentColorBar />
            </div>

            {item?.registry && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 max-w-sm sm:max-w-md w-full pointer-events-auto">
                <InstallCommandBox registry={item.registry} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </PreviewControlProvider>
  )
}
