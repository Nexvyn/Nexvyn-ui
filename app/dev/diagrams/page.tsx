'use client'

import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

const BlueprintsBundle = dynamic(() => import('@/components/diagrams/blueprints-bundle'), {
  ssr: false,
})

const BLUEPRINT_IDS = [
  'accordion-blueprint',
  'action-button-blueprint',
  'adaptive-actions-blueprint',
  'ai-input-blueprint',
  'badge-blueprint',
  'bars-theme-blueprint',
  'bounce-sidebar-blueprint',
  'breadcrumbs-blueprint',
  'checkbox-blueprint',
  'clipboard-field-blueprint',
  'color-picker-blueprint',
  'context-menu-blueprint',
  'dia-text-blueprint',
  'dropdown-menu-blueprint',
  'fader-blueprint',
  'fluid-orb-blueprint',
  'glow-orb-blueprint',
  'goo-dropdown-blueprint',
  'icon-bar-blueprint',
  'input-copy-blueprint',
  'laptop-mockup-blueprint',
  'morph-nav-blueprint',
  'nav-menu-blueprint',
  'navigation-compass-blueprint',
  'password-input-blueprint',
  'phone-mockup-blueprint',
  'radio-group-blueprint',
  'ratio-slider-blueprint',
  'rocket-launch-blueprint',
  'scroll-indicator-blueprint',
  'select-blueprint',
  'switch-blueprint',
  'table-of-contents-blueprint',
  'tabs-subtle-blueprint',
]

export default function DiagramsPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return (
    <div className="min-h-screen bg-(--color-bg) p-8">
      <style>{`
        .diagram-grid .group:hover svg,
        .diagram-grid .group:focus-visible svg {
          opacity: 1;
        }
        .diagram-grid .forced-hover svg {
          opacity: 1 !important;
        }
      `}</style>

      <h1 className="mb-12 text-3xl font-normal">Blueprint Diagrams QA</h1>

      <div className="space-y-24">
        {BLUEPRINT_IDS.map((id) => (
          <div key={id} className="space-y-6">
            <h2 className="text-lg font-normal text-(--color-fg)">{id}</h2>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <p className="mb-4 text-sm text-(--color-muted)">Light theme at rest</p>
                  <div className="diagram-grid rounded-lg border border-(--color-border) bg-(--color-bg) p-6">
                    <div className="group inline-block">
                      <BlueprintsBundle render={id} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-sm text-(--color-muted)">Light theme hover</p>
                  <div className="diagram-grid rounded-lg border border-(--color-border) bg-(--color-bg) p-6">
                    <div className="forced-hover group inline-block">
                      <BlueprintsBundle render={id} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="mb-4 text-sm text-(--color-muted)">Dark theme at rest</p>
                  <div className="dark diagram-grid rounded-lg border border-(--color-border) bg-(--color-bg) p-6">
                    <div className="group inline-block">
                      <BlueprintsBundle render={id} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-sm text-(--color-muted)">Dark theme hover</p>
                  <div className="dark diagram-grid rounded-lg border border-(--color-border) bg-(--color-bg) p-6">
                    <div className="forced-hover group inline-block">
                      <BlueprintsBundle render={id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
