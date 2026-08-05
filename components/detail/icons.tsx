'use client'

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <g
        strokeLinecap="round"
        strokeWidth="2"
        stroke="currentColor"
        className="transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-reduce:transition-none"
      >
        <path
          d="m17 7.83l1.697 1.526c1.542 1.389 2.313 2.083 2.313 2.974c0 .89-.771 1.585-2.314 2.973L17 16.83"
          className="transition-transform duration-(--motion-dur-fast) ease-(--motion-ease-out) group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
        />
        <path d="m13.987 5l-3.974 14.83" opacity=".5" />
        <path
          d="M7 7.83L5.304 9.356C3.76 10.745 2.99 11.44 2.99 12.33s.771 1.585 2.314 2.973L7 16.83"
          className="transition-transform duration-(--motion-dur-fast) ease-(--motion-ease-out) group-hover:translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
        />
      </g>
    </svg>
  )
}
