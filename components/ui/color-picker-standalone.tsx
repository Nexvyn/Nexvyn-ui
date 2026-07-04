'use client'

import { forwardRef, useEffect, useRef, type HTMLAttributes, type Ref } from 'react'

import { cn } from '@/lib/utils'
import {
  BlossomColorPicker as LocalBlossomColorPicker,
  type BlossomColorPickerOptions,
} from './blossom-vendor/BlossomColorPicker'
import { DEFAULT_COLORS, INNER_COLORS, OUTER_COLORS } from './blossom-vendor/constants'
import { blossomPickerStyles } from './blossom-vendor/styles'
import type {
  BlossomColorPickerColor,
  BlossomColorPickerValue,
  ColorInput,
  SliderPosition,
} from './blossom-vendor/types'
import {
  createColorOutput,
  getVisualSaturation,
  hexToHsl,
  hslToHex,
  hslToRgb,
  hslToString,
  hslaToString,
  lightnessToSliderValue,
  organizeColorsIntoLayers,
  parseColor,
  rgbaToString,
  rgbToHsl,
  sliderValueToLightness,
} from './blossom-vendor/utils'

export type ColorPickerValue = BlossomColorPickerValue
export type ColorPickerColor = BlossomColorPickerColor
export type { ColorInput, SliderPosition }

export interface ColorPickerProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'value'>,
    BlossomColorPickerOptions {}

export type { BlossomColorPickerValue, BlossomColorPickerColor, BlossomColorPickerOptions }
export type BlossomColorPickerProps = ColorPickerProps

function propsToOptions(props: ColorPickerProps): Partial<BlossomColorPickerOptions> {
  const options: Partial<BlossomColorPickerOptions> = {}

  if (props.value !== undefined) options.value = props.value
  if (props.defaultValue !== undefined) options.defaultValue = props.defaultValue
  if (props.colors !== undefined) options.colors = props.colors
  if (props.onChange !== undefined) options.onChange = props.onChange
  if (props.onCollapse !== undefined) options.onCollapse = props.onCollapse
  if (props.disabled !== undefined) options.disabled = props.disabled
  if (props.openOnHover !== undefined) options.openOnHover = props.openOnHover
  if (props.initialExpanded !== undefined) {
    options.initialExpanded = props.initialExpanded
  }
  if (props.animationDuration !== undefined) {
    options.animationDuration = props.animationDuration
  }
  if (props.showAlphaSlider !== undefined) {
    options.showAlphaSlider = props.showAlphaSlider
  }
  if (props.coreSize !== undefined) options.coreSize = props.coreSize
  if (props.petalSize !== undefined) options.petalSize = props.petalSize
  if (props.showCoreColor !== undefined) {
    options.showCoreColor = props.showCoreColor
  }
  if (props.sliderPosition !== undefined) {
    options.sliderPosition = props.sliderPosition
  }
  if (props.adaptivePositioning !== undefined) {
    options.adaptivePositioning = props.adaptivePositioning
  }
  if (props.circularBarWidth !== undefined) {
    options.circularBarWidth = props.circularBarWidth
  }
  if (props.sliderWidth !== undefined) options.sliderWidth = props.sliderWidth
  if (props.sliderOffset !== undefined) options.sliderOffset = props.sliderOffset
  if (props.collapsible !== undefined) options.collapsible = props.collapsible

  return options
}

function syncRef(ref: Ref<HTMLDivElement> | undefined, node: HTMLDivElement | null) {
  if (!ref) return
  if (typeof ref === 'function') {
    ref(node)
  } else {
    ref.current = node
  }
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ className, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const pickerRef = useRef<LocalBlossomColorPicker | null>(null)

    useEffect(() => {
      if (!containerRef.current) return

      pickerRef.current = new LocalBlossomColorPicker(containerRef.current, propsToOptions(props))

      return () => {
        pickerRef.current?.destroy()
        pickerRef.current = null
      }
    }, [])

    useEffect(() => {
      pickerRef.current?.setOptions(propsToOptions(props))
    }, [
      props.value,
      props.defaultValue,
      props.colors,
      props.onChange,
      props.onCollapse,
      props.disabled,
      props.openOnHover,
      props.initialExpanded,
      props.animationDuration,
      props.showAlphaSlider,
      props.coreSize,
      props.petalSize,
      props.showCoreColor,
      props.sliderPosition,
      props.adaptivePositioning,
      props.circularBarWidth,
      props.sliderWidth,
      props.sliderOffset,
      props.collapsible,
    ])

    return (
      <>
        <style>{blossomPickerStyles}</style>
        <div
          ref={(node) => {
            containerRef.current = node
            syncRef(ref, node)
          }}
          data-disabled={props.disabled || undefined}
          data-state={props.initialExpanded ? 'expanded' : 'collapsed'}
          className={cn(className)}
        />
      </>
    )
  },
)

ColorPicker.displayName = 'ColorPicker'

export function ColorPickerPreview() {
  return (
    <ColorPicker
      initialExpanded
      coreSize={48}
      petalSize={48}
      circularBarWidth={14}
      sliderWidth={14}
      sliderOffset={38}
    />
  )
}

export const BlossomColorPicker = ColorPicker

export {
  DEFAULT_COLORS,
  INNER_COLORS,
  OUTER_COLORS,
  createColorOutput,
  getVisualSaturation,
  hexToHsl,
  hslToHex,
  hslToRgb,
  hslToString,
  hslaToString,
  lightnessToSliderValue,
  organizeColorsIntoLayers,
  parseColor,
  rgbaToString,
  rgbToHsl,
  sliderValueToLightness,
}

export default ColorPicker
