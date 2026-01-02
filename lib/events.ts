/**
 * Event tracking utilities
 * Placeholder for analytics event tracking
 */

export type Event = {
  name: string
  properties?: Record<string, unknown>
}

export function trackEvent(event: Event | string, properties?: Record<string, unknown>) {
  const eventName = typeof event === "string" ? event : event.name
  const eventProps = typeof event === "string" ? properties : event.properties

  if (process.env.NODE_ENV === "development") {
    console.log("[Event]", eventName, eventProps)
  }

  if (typeof window !== "undefined" && window.datafast) {
    window.datafast(eventName, eventProps)
  }
}

// Common events
export const Events = {
  COPY_CODE: "copy_code",
  COPY_COMMAND: "copy_command",
  VIEW_COMPONENT: "view_component",
} as const
