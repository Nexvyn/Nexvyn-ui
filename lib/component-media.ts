export type ComponentMedia = {
  thumbnail: string
  videoSrc: string
}

export const COMPONENT_MEDIA: Record<string, ComponentMedia> = {
  'bounce-sidebar': {
    thumbnail: '/thumbnails/bounce-sidebar.png',
    videoSrc: '/videos/bounce-sidebar.mp4',
  },
}
