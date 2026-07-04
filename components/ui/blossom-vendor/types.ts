export interface BlossomColorPickerValue {
  hue: number;
  saturation: number;
  lightness?: number;
  originalSaturation?: number;
  alpha: number;
  layer: 'inner' | 'outer';
}

export interface BlossomColorPickerColor extends BlossomColorPickerValue {
  hex: string;
  hsl: string;
  hsla: string;
  rgb: string;
  rgba: string;
  r: number;
  g: number;
  b: number;
}

export type ColorInput = string | {
  h: number;
  s: number;
  l: number;
};

export type SliderPosition = 'top' | 'bottom' | 'left' | 'right';
