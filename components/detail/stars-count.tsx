'use client'

import { useState, useEffect, useRef } from 'react'

export function StarsCount() {
  const [stars, setStars] = useState('1')
  const leftEyeRef = useRef<SVGGElement>(null)
  const rightEyeRef = useRef<SVGGElement>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/Nexvyn/Nexvyn-ui')
      .then((res) => res.json())
      .then((json) => {
        if (json && typeof json.stargazers_count === 'number') {
          const formattedCount =
            json.stargazers_count >= 1000
              ? json.stargazers_count % 1000 === 0
                ? `${Math.floor(json.stargazers_count / 1000)}k`
                : `${(json.stargazers_count / 1000).toFixed(1)}k`
              : json.stargazers_count.toLocaleString()
          setStars(formattedCount.replace(".0k", "k"))
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveEye = (eye: SVGGElement | null, cx: number, cy: number) => {
        if (!eye) return
        const svg = eye.closest('svg')
        if (!svg) return
        const rect = svg.getBoundingClientRect()
        const eyeCenterX = rect.left + (cx / 128) * rect.width
        const eyeCenterY = rect.top + (cy / 128) * rect.height
        const dx = e.clientX - eyeCenterX
        const dy = e.clientY - eyeCenterY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxMove = 2
        const moveX = dist > 0 ? (dx / dist) * Math.min(maxMove, dist * 0.05) : 0
        const moveY = dist > 0 ? (dy / dist) * Math.min(maxMove, dist * 0.05) : 0
        eye.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
      moveEye(leftEyeRef.current, 48, 62)
      moveEye(rightEyeRef.current, 76, 62)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <span className="flex items-center gap-0.5 text-xs font-normal opacity-70 border-l border-(--color-border) pl-1.5 ml-0.5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="size-5">
        <path fill="#040000" d="m126.2 49.7c-1.7-5.6-8.7-7.2-16.9-8.4l-15.2-1.8c-5.7-0.8-6.5-1.1-8.2-4.4-8.2-16.7-12.3-24.6-15-27.7-2.1-2.3-4.2-3.5-6.8-3.5s-4.9 1.1-7 3.1c-2.8 2.7-4.9 7.1-15 27.5-1.7 3.3-2.1 3.7-6.7 4.3l-15.3 1.9c-9.5 1.3-16.9 2.6-18.3 8.6-1.4 5.9 3.4 11.4 7.9 16.2 3.3 3.5 6.9 7.1 10.1 10.3l3.5 3.5c2.3 2.4 2.1 3.5 1.7 7.4l-0.3 2.1c-0.5 3.1-1 6.3-1.6 9.6-1.9 10.5-3.5 20.3 1.4 24.1 1.4 1 3.2 1.5 5.4 1.5 4.8 0 9-1.9 18.2-6.7l6.4-3.2c3.5-1.8 6.6-3.7 9.1-3.7h0.2c2.6 0 5 1.1 8.6 2.8l6.6 3.2c8.7 4.1 14.5 7.5 19.6 7.6 1.9 0 3.8-0.3 5-1.2 5-3.1 3.7-11 2.2-19.5l-2.2-13c-1.3-7.7-1.3-8.3 0.8-10.8 1.6-1.7 3.6-3.7 5.8-6 3.2-3.2 6.8-6.8 9.7-9.9 3.7-4 8-8.6 6.3-13.9z"/>
        <path fill="#FFFFFF" d="m63.9 7c-4.3 0.2-6.5 4.4-8.6 8.1l-10.6 21.3c-1.8 3.5-3.7 4.3-6.4 4.9-13.9 2.4-31.3 2.4-33.9 8.4-2.1 5.3 4.8 11.8 7.8 15l11.7 11.9c3.7 3.7 4.6 5.2 3.9 10.5l-2.4 13.4c-1.9 10.5-2.6 17.3 0.5 19.6 4 2.8 9.9 0.4 17.5-3.4l12-6.2c3.2-1.6 5.6-3.2 8.5-3.2 3 0 5.4 0.9 8.7 2.5l12.1 5.9c5.8 2.7 10.2 5.3 14 5.3 4.2 0 5.4-2.6 5.2-7.9-0.1-2.3-2.1-14.1-3.5-22.6-1.3-7.9-1.4-9.4 2.3-13.4l11.8-11.8c3-3.2 10-9.5 9.9-13.9 0-7.4-21.2-7.8-33.3-9.8-4.1-0.7-6.1-1.7-8.1-5.6l-10.1-20.3c-2.1-3.6-4.5-8.7-9-8.7z"/>
        <path fill="#E5E2DD" opacity="0.9" d="m61.7 9c-2.5 1.6-4.1 5-7.2 11.4l-7.8 15.6c-2.6 5.2-4.4 5.9-7.7 6.5l-15.3 1.8c-9.2 1.2-16 2.1-16.9 3.9 3.6-1.8 11.4-2.4 17-3.1l15.3-1.8c3.6-0.6 5.7-1.4 7.3-3.3 1.8-2.1 2.7-4.5 5.6-10.5 2.6-5.5 6.1-14.6 9.7-20.5z"/>
        <path fill="#D1D0CC" opacity="0.6" d="m6 53.7c0.6 4.3 5.5 8.4 10.6 13.5l9.2 8.6c3.9 4.1 4.9 6.4 2.6 16.2-1.1 5.2-3 12.9-3.3 19.9 1.3-8.9 3.9-18 4.9-25.1 1-7.3-2.1-9.7-5.9-13.3l-8.9-8.8c-3.8-3.8-8.6-8.3-9.2-11z"/>
        <path fill="#E5E2DD" opacity="0.9" d="m84.1 41.9c-2.7-2-3.4-4-5.2-7.8l-8.2-18.4v0.1c4.4 12.3 6.2 19.9 8.9 23.1 1.4 1.7 3.1 2.8 4.5 3z"/>
        <path fill="#D1D0CC" opacity="0.6" d="m119.5 48.8c-4.2-2.3-10.5-2.5-27.4-4.8-3.2-0.3-5.5-0.7-7.5-2-1.2-0.2-2.6-0.7-3.6-1.2 2.1 1.7 5 2.1 8.4 2.5 17.6 2 28 2.7 30.1 5.5z"/>
        <path fill="#E5E2DD" opacity="0.9" d="m39.5 43.2c-12.1 2.4-31.3 3.4-32.6 6.7-0.8 2.9 1.2 1.5 5.3 0.4 5.7-1.8 13.7-2.9 27-5.4 1.9-0.4 4.8-1 6.4-3.5-1.4 1.1-3.9 1.6-6.1 1.8z"/>
        <path fill="#AFAFAF" opacity="0.7" d="m121.9 52.4c-0.2 1.5-1.4 2.2-4.3 4.1-4.2 4.2-12.9 11.1-18.1 16.5-4.5 4.5-5.7 7.4-4.1 15.2 2.1 9.5 4.7 18.7 4.3 25.4 2.3-1.4 2.3-4.6 2.6-4.3l-3.4-18.6c-1.4-8.6-0.3-11.2 3.4-15.2l10.7-10.1c4.2-4.1 9-7.8 8.9-13z"/>
        <path fill="#AFAFAF" opacity="0.7" d="m97 117.3c-4.5 0.4-14.6-5-24.1-10.2-4.3-2.2-6.6-3.4-10.7-3.4-3.5 0-6.1 1.3-9 2.8-4.5 2.4-15.2 8.2-18.7 9.9-8.3 3.3-9.5-0.6-9.4-4.6-0.6 3.9 0.3 7.7 4.5 7.9 3.6 0.2 7-1.5 11.6-3.8l12-6c3.2-1.5 6-3.5 10.2-3.7 3.3-0.1 6.4 1.1 10 2.8l10.6 5c5.1 2.1 10.5 5.4 14.1 5.5 3.8 0.2 4.8-2.6 4.3-6-2 0.4-3.5 3.5-5.4 3.8z"/>
        <g ref={leftEyeRef} style={{ transition: 'transform 0.1s ease-out' }}>
          <path fill="#040000" d="m48.5 53.3c-3.5 0.7-5.4 6.7-5.3 15.8 0.2 4.4 0.9 12.9 5.2 13.9 4.3 0.7 6.5-4.3 6.6-13.5 0.1-9.1-2-16.8-6.5-16.2zm0.1 12.5c-1.3-0.3-2.2-2.1-2.2-4.8-0.1-3.5 1.3-5.1 2.5-4.9 1.7 0.1 2.5 2.4 2.4 5-0.1 2.8-1.1 4.8-2.7 4.7z"/>
        </g>
        <g ref={rightEyeRef} style={{ transition: 'transform 0.1s ease-out' }}>
          <path fill="#040000" d="m75.9 53.5c-3.5 1.2-5 6.6-5.1 14.5 0.1 6 1 11.7 3.2 13.8 1.7 1.7 4.2 1.7 5.7 0.1 1.9-2 3-7 3-14.3-0.1-7.7-1.7-15.2-6.8-14.1zm0.4 12.5c-1.4-0.1-2.3-2.5-2.2-5.4 0.2-3.6 1.9-4.8 3-4.4 1.5 0.4 2.1 2.9 1.9 5.6-0.1 2.5-1.4 4.1-2.7 4.2z"/>
        </g>
      </svg>
      <span>{stars}</span>
    </span>
  )
}
