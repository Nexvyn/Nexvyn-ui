import type { Ref, RefCallback } from "react"

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> | null {
  if (refs.every((ref) => ref === null || ref === undefined)) {
    return null
  }

  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
