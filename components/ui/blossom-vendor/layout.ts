export function calculateLayerRadii(
  layers: { h: number; s: number; l: number }[][],
  coreSize: number,
  petalSize: number
): number[] {
  const radii: number[] = [];
  const W = petalSize;
  const Rc = coreSize / 2;
  const Rp = petalSize / 2;

  for (let i = 0; i < layers.length; i++) {
    const N = layers[i].length;

    const overlapFactor = N <= 8 ? 0.45 : N <= 12 ? 0.5 : 0.55;

    const lateralGaplessR = (N * W * overlapFactor) / (2 * Math.PI);

    let r;

    if (i === 0) {
      const coreOverlap = N <= 5 ? W * 0.35 : W * 0.25;
      const idealCoreR = Rc + Rp - coreOverlap;
      r = Math.max(idealCoreR, lateralGaplessR);
    } else {
      const prevR = radii[i - 1];
      const prevN = layers[i - 1].length;

      const circumference = 2 * Math.PI * prevR;
      const coverage = prevN * W;
      const sparsity = coverage / circumference;

      let adaptiveStep = W * 0.35;

      if (sparsity < 0.85) {
        adaptiveStep = W * 0.15;
      } else if (sparsity > 1.1) {
        adaptiveStep = W * 0.45;
      }

      const idealNestleR = prevR + adaptiveStep;

      r = Math.max(idealNestleR, lateralGaplessR);

      r = Math.max(r, prevR + W * 0.1);
    }

    radii.push(r);
  }

  return radii;
}

export function calculateLayerRotations(
  layers: { h: number; s: number; l: number }[][]
): number[] {
  const rotations: number[] = [0];

  for (let i = 1; i < layers.length; i++) {
    const prevCount = layers[i - 1].length;
    const offset = 360 / prevCount / 2;
    rotations.push(offset);
  }

  return rotations;
}

export function calculateBarRadius(
  layerRadii: number[],
  petalSize: number,
  coreSize: number,
  barGap: number
): number {
  return layerRadii.length > 0
    ? layerRadii[layerRadii.length - 1] + petalSize / 2 + barGap
    : coreSize / 2 + barGap;
}

export function calculateContainerSize(
  barRadius: number,
  circularBarWidth: number,
  showAlphaSlider: boolean,
  sliderOffset: number,
  sliderWidth: number
): number {
  const barExtent = barRadius + circularBarWidth / 2;
  const sliderExtent = showAlphaSlider
    ? barRadius + sliderOffset + sliderWidth / 2
    : 0;
  return Math.max(barExtent, sliderExtent) * 2 + 4;
}

export function getPetalZIndex(
  index: number,
  bottomIndex: number,
  totalPetals: number,
  layerIdx: number,
  totalLayers: number,
  isBottomLeft: boolean = false,
  isBottomRight: boolean = false
): number {
  const baseZ = (totalLayers - layerIdx) * 100;
  const maxLocalZ = totalPetals + 10;

  if (index === bottomIndex) {
    if (isBottomRight) return baseZ + maxLocalZ;
    if (isBottomLeft) return baseZ;
    return baseZ;
  }

  const steps = (index - bottomIndex + totalPetals) % totalPetals;

  return baseZ + steps;
}
