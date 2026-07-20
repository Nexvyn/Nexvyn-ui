export const BAR_BOX = 16

export function fillEdgePx(percent: number, trackWidth: number): number {
  return Math.min(Math.max(0, (percent / 100) * trackWidth), trackWidth)
}

export function barCenterFor(fillEdge: number): number {
  return fillEdge >= BAR_BOX ? fillEdge - BAR_BOX / 2 : BAR_BOX / 2
}
