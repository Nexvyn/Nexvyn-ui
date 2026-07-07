'use client'

import { forwardRef, useEffect, useRef, type HTMLAttributes, type Ref } from 'react'

import { cn } from '@/lib/utils'
import {
  BlossomColorPicker as LocalBlossomColorPicker,
  type BlossomColorPickerOptions,
} from './blossom picker/BlossomColorPicker'
import { DEFAULT_COLORS, INNER_COLORS, OUTER_COLORS } from './blossom picker/constants'
import { blossomPickerStyles } from './blossom picker/styles'
import type {
  BlossomColorPickerColor,
  BlossomColorPickerValue,
  ColorInput,
  SliderPosition,
} from './blossom picker/types'
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
} from './blossom picker/utils'

export type BlossomPickerVariant = 'blossom' | 'blossom-arc'

export type BlossomPickerValue = BlossomColorPickerValue
export type BlossomPickerColor = BlossomColorPickerColor
export type { ColorInput, SliderPosition }

export interface BlossomPickerProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'value'>,
    BlossomColorPickerOptions {
  variant?: BlossomPickerVariant
}

export type { BlossomColorPickerValue, BlossomColorPickerColor, BlossomColorPickerOptions }
export type ColorPickerProps = BlossomPickerProps

function propsToOptions(props: BlossomPickerProps): Partial<BlossomColorPickerOptions> {
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

export const BlossomPicker = forwardRef<HTMLDivElement, BlossomPickerProps>(
  ({ className, variant = 'blossom-arc', ...props }, ref) => {
    const blossomProps = {
      ...props,
      showAlphaSlider: variant === 'blossom' ? false : (props.showAlphaSlider ?? true),
    }

    return <BlossomPickerInner ref={ref} className={className} {...blossomProps} />
  },
)

BlossomPicker.displayName = 'BlossomPicker'

const BlossomPickerInner = forwardRef<HTMLDivElement, Omit<BlossomPickerProps, 'variant'>>(
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
        <style dangerouslySetInnerHTML={{ __html: blossomPickerStyles }} />
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

BlossomPickerInner.displayName = 'BlossomPickerInner'

export function BlossomPickerPreview() {
  return (
    <BlossomPicker
      variant="blossom-arc"
      initialExpanded
      coreSize={48}
      petalSize={48}
      circularBarWidth={14}
      sliderWidth={14}
      sliderOffset={38}
    />
  )
}

export const ColorPicker = BlossomPicker
export const BlossomColorPicker = BlossomPicker

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

export default BlossomPicker
