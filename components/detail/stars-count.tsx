'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

export function StarsCount() {
  const [stars, setStars] = useState('1')

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

  return (
    <span className="flex items-center gap-0.5 text-xs font-normal opacity-70 border-l border-(--color-border) pl-1.5 ml-0.5">
      <Star className="size-3 fill-current text-(--color-accent)" />
      <span>{stars}</span>
    </span>
  )
}
