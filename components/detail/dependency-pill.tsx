import type { ReactNode } from "react";

type DependencyPillProps = {
  name: string;
  icon?: ReactNode;
};

const DEPENDENCY_ICONS: Record<string, ReactNode> = {
  motion: (
    <svg viewBox="0 0 25.364 9" fill="currentColor" className="h-2.5 w-auto shrink-0" aria-hidden="true">
      <path d="M 9.587 0 L 4.57 9 L 0 9 L 3.917 1.972 C 4.524 0.883 6.039 0 7.301 0 Z M 20.794 2.25 C 20.794 1.007 21.817 0 23.079 0 C 24.341 0 25.364 1.007 25.364 2.25 C 25.364 3.493 24.341 4.5 23.079 4.5 C 21.817 4.5 20.794 3.493 20.794 2.25 Z M 10.443 0 L 15.013 0 L 9.997 9 L 5.427 9 Z M 15.841 0 L 20.411 0 L 16.494 7.028 C 15.887 8.117 14.372 9 13.11 9 L 10.825 9 Z" fill="currentColor" />
    </svg>
  ),
  'framer-motion': (
    <svg viewBox="0 0 25.364 9" fill="currentColor" className="h-2.5 w-auto shrink-0" aria-hidden="true">
      <path d="M 9.587 0 L 4.57 9 L 0 9 L 3.917 1.972 C 4.524 0.883 6.039 0 7.301 0 Z M 20.794 2.25 C 20.794 1.007 21.817 0 23.079 0 C 24.341 0 25.364 1.007 25.364 2.25 C 25.364 3.493 24.341 4.5 23.079 4.5 C 21.817 4.5 20.794 3.493 20.794 2.25 Z M 10.443 0 L 15.013 0 L 9.997 9 L 5.427 9 Z M 15.841 0 L 20.411 0 L 16.494 7.028 C 15.887 8.117 14.372 9 13.11 9 L 10.825 9 Z" fill="currentColor" />
    </svg>
  ),
  react: (
    <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4 shrink-0">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      <circle r="2" fill="currentColor"/>
    </svg>
  ),
  'lucide-react': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
      <path d="m12 3-1.912 5.886L4.202 9l5.886 1.912L12 16.8l1.912-5.888L19.8 9l-5.888-1.912Z" />
    </svg>
  ),
};

export default function DependencyPill({ name, icon }: DependencyPillProps) {
  const resolvedIcon = icon || DEPENDENCY_ICONS[name.toLowerCase()];

  return (
    <span
      className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-fg)' }}
    >
      {resolvedIcon != null && resolvedIcon !== "" && (
        <span className="flex h-5 w-auto items-center justify-center">
          {typeof resolvedIcon === "string" ? (
            <img src={resolvedIcon} alt="" className="h-5 w-5" />
          ) : (
            resolvedIcon
          )}
        </span>
      )}
      {name}
    </span>
  );
}
