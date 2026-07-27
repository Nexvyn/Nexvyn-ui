'use client'

import { useEffect, useRef } from 'react'
import { usePreviewControl } from '@/components/detail/preview-controls'
import {
  RocketLaunchIllustration,
  type RocketLaunchHandle,
} from '@/components/illustration/rocket-launch'

export function RocketLaunchDemo() {
  const [launchNonce] = usePreviewControl('rocket-launch-launch-nonce', '')
  const [resetNonce] = usePreviewControl('rocket-launch-reset-nonce', '')
  const [, setPhase] = usePreviewControl('rocket-launch-phase', 'idle')
  const ref = useRef<RocketLaunchHandle>(null)

  useEffect(() => {
    if (launchNonce) ref.current?.launch()
  }, [launchNonce])

  useEffect(() => {
    if (resetNonce) ref.current?.reset()
  }, [resetNonce])

  return (
    <RocketLaunchIllustration
      ref={ref}
      showControls={false}
      onPhaseChange={setPhase}
      className="absolute inset-0 h-auto w-auto max-w-none"
    />
  )
}
