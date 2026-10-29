'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { BannerStripBlueprint } from '@/components/diagrams/lib/banner-strip'

export function BannerFilledBlueprint() {
  return (
    <BannerStripBlueprint
      kind="filled"
      message="New blocks"
      link="View"
      note="close 32 · end 8 · w-full strip"
    />
  )
}
