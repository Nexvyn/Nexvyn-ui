'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { BannerStripBlueprint } from '@/components/diagrams/lib/banner-strip'

export function BannerNoticeBlueprint() {
  return (
    <BannerStripBlueprint
      kind="notice"
      message="Maintenance"
      link=""
      note="icon 16 · gap 8 · role status"
    />
  )
}
