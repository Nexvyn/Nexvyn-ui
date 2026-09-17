import { useCallback, useEffect, useRef, useState } from 'react'

export function useControlledState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (next: T) => void,
): [T, (next: T) => void] {
  const [inner, setInner] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : inner
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  })

  const set = useCallback(
    (next: T) => {
      if (!isControlled) setInner(next)
      onChangeRef.current?.(next)
    },
    [isControlled],
  )

  return [current, set]
}
