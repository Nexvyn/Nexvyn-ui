'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { activeComponent } from '@/lib/components-registry'
import ComponentColorBar from './component-color-bar'
import { InstallCommandBox } from './install-command-box'
import { DescriptionPanel } from './description-panel'
import { PreviewControlProvider } from './preview-controls'
import { useScreenSize } from '@/hooks/use-screen-size'

const INFO_SPACE = 576

export default function DetailSidebarShell({ children }: { children: React.ReactNode }) {
  const [infoOpen, setInfoOpen] = useState(false)
  const pathname = usePathname()
  const item = activeComponent(pathname)
  const screenSize = useScreenSize()
  const isMobile = screenSize.lessThan('md')
  return (
    <PreviewControlProvider>
      <div className="detail-page relative h-full font-sans">
        <DescriptionPanel open={infoOpen} setOpen={setInfoOpen} />

        <motion.div
          initial={false}
          animate={{
            paddingRight: infoOpen && !isMobile ? INFO_SPACE : 0,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          className="h-full"
        >
          <div className="detail-preview-card relative z-0 h-full rounded-[45px] p-4 pt-16 sm:pt-20">
            {children}{' '}
            {/* <div className="absolute bottom-5 right-5 z-10 pointer-events-auto hidden sm:block">
              <ComponentColorBar />
            </div> */}
            {item?.registry && !infoOpen && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 max-w-[calc(100%-2.5rem)] sm:max-w-sm md:max-w-md w-full pointer-events-auto backdrop-blur-sm rounded-xl">
                <InstallCommandBox registry={item.registry} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </PreviewControlProvider>
  )
}
