"use client"

import { useEffect, useRef } from "react"

const MouseFollower2 = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<any[]>([])
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    prevMouseX: 0,
    prevMouseY: 0,
  })

  const images = [
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_17_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_18_rztlk1.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453936/download_14_nfkn6d.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_14_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453936/download_13_zjejzn.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_12_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_11_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_10_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_9_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_8_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_7_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_6_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_5_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_4_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_3_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_2_1_vgdog0.jpg",
    "https://res.cloudinary.com/dkljoxezr/image/upload/v1768453937/download_1_1_vgdog0.jpg",
  ]

  const config = {
    imageLifespan: 600,
    removalDelay: 16,
    mouseThreshold: 40,
    inDuration: 600,
    outDuration: 800,
    inEasing: "cubic-bezier(.07,.5,.5,1)",
    outEasing: "cubic-bezier(.87, 0, .13, 1)",
    baseImageSize: 120,
    minImageSize: 60,
    maxImageSize: 120,
    baseRotation: 30,
    maxRotationFactor: 3,
  }

  const createImage = () => {
    if (!containerRef.current) return
    const imageIndex = Math.floor(Math.random() * images.length)
    const imageSrc = images[imageIndex]
    const size = Math.random() * (config.maxImageSize - config.minImageSize) + config.minImageSize

    const img = document.createElement("img")
    img.className = "trail-img"
    img.src = imageSrc
    img.width = img.height = size

    const rect = containerRef.current.getBoundingClientRect()
    const x = stateRef.current.mouseX - rect.left
    const y = stateRef.current.mouseY - rect.top

    const rot = (Math.random() - 0.5) * config.baseRotation
    img.style.left = `${x}px`
    img.style.top = `${y}px`
    img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(0)`
    img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`

    containerRef.current.appendChild(img)

    setTimeout(() => {
      img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(1)`
    }, 10)

    trailRef.current.push({
      element: img,
      rotation: rot,
      removeTime: Date.now() + config.imageLifespan,
    })
  }

  const removeOldImages = () => {
    const now = Date.now()
    if (!trailRef.current.length) return

    while (trailRef.current.length && now >= trailRef.current[0].removeTime) {
      const imgObj = trailRef.current.shift()

      // Unique vortex implosion effect
      const randomX = (Math.random() - 0.5) * 100
      const randomY = (Math.random() - 0.5) * 100
      const randomRotation = Math.random() * 720 - 360
      const randomSkew = (Math.random() - 0.5) * 30

      imgObj.element.style.transition = `all ${config.outDuration}ms cubic-bezier(0.36, 0, 0.66, -0.56)`
      imgObj.element.style.opacity = "0"
      imgObj.element.style.transform = `
        translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px))
        rotate(${randomRotation}deg)
        skewX(${randomSkew}deg)
        scale(0.3)
        blur(20px)
      `

      setTimeout(() => imgObj.element.remove(), config.outDuration)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const state = stateRef.current
      state.prevMouseX = state.mouseX
      state.prevMouseY = state.mouseY
      state.mouseX = e.clientX
      state.mouseY = e.clientY

      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const isInContainer =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (isInContainer) {
        const dx = state.mouseX - state.lastMouseX
        const dy = state.mouseY - state.lastMouseY
        if (Math.hypot(dx, dy) > config.mouseThreshold) {
          createImage()
          state.lastMouseX = state.mouseX
          state.lastMouseY = state.mouseY
        }
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    const animationLoop = setInterval(() => {
      removeOldImages()
    }, config.removalDelay)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      clearInterval(animationLoop)
    }
  }, [])

  return (
    <>
      <style>{`
        .trail-img {
          position: absolute;
          pointer-events: none;
          will-change: transform;
          z-index: 12;
        }
      `}</style>

      <div className="h-96 w-96" ref={containerRef}></div>
    </>
  )
}

export default MouseFollower2
