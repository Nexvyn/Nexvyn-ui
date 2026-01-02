// "use client";

// import { useEffect, useState } from "react";

// export function StarsCount() {
//   const [count, setCount] = useState<string | null>(null);
//   const [error, setError] = useState(false);

//   useEffect(() => {

//     fetch("https://api.github.com/repos/Nexvyn/Nexvyn-ui")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch");
//         }
//         return res.json();
//       })
//       .then((json) => {
//         if (json && typeof json.stargazers_count === "number") {
//           const formattedCount =
//             json.stargazers_count >= 1000
//               ? json.stargazers_count % 1000 === 0
//                 ? `${Math.floor(json.stargazers_count / 1000)}k`
//                 : `${(json.stargazers_count / 1000).toFixed(1)}k`.replace(
//                     ".0k",
//                     "k"
//                   )
//               : json.stargazers_count.toLocaleString();
//           setCount(formattedCount);
//         } else {
//           setError(true);
//         }
//       })
//       .catch(() => {
//         setError(true);
//       });
//   }, []);

//   if (!count || error) return null;

//   return <span className="text-muted-foreground">{count}</span>;
// }

"use client"

import { useEffect, useState } from "react"

const formatCount = (count: number): string => {
  if (count >= 1000) {
    const formatted = (count / 1000).toFixed(1)
    return `${formatted.replace(".0", "")}k`
  }
  return count.toLocaleString()
}

export function StarsCount() {
  const [count, setCount] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch("https://api.github.com/repos/Nexvyn/Nexvyn-ui")
        if (!res.ok) {
          throw new Error("Failed to fetch")
        }
        const json = await res.json()
        if (json && typeof json.stargazers_count === "number") {
          setCount(formatCount(json.stargazers_count))
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      }
    }

    fetchStars()
  }, [])

  if (!count || error) return null

  return <span className="text-muted-foreground">{count}</span>
}
