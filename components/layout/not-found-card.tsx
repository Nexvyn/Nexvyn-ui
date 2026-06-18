import Link from 'next/link'
import { cn } from '@/lib/utils'

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12 2.5L13.4 10.1L21 11.5L13.4 12.9L12 20.5L10.6 12.9L3 11.5L10.6 10.1L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type NotFoundCardProps = {
  className?: string
  backHref?: string
  backLabel?: string
  message?: string
}

export function NotFoundCard({
  className,
  backHref = '/',
  backLabel = 'Go back',
  message = '404 - Page not found',
}: NotFoundCardProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-[min(340px,88vw)] rounded-[28px] bg-white p-3.5',
        'shadow-[0_12px_42px_rgba(0,0,0,0.09)]',
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-[22px] bg-[#3a3a3a]">
        <SparkleIcon className="pointer-events-none absolute bottom-[26%] right-[18%] text-white/85" />
      </div>

      <Link
        href={backHref}
        className="absolute left-0 top-0 z-10 bg-white px-5 py-3 text-[15px] font-medium leading-none text-black transition-opacity hover:opacity-65 rounded-br-[28px] rounded-tl-[28px]"
      >
        {backLabel}
      </Link>

      <div className="absolute bottom-0 right-0 z-10 bg-white px-5 py-3 text-[15px] font-medium leading-none text-black rounded-br-[28px] rounded-tl-[28px]">
        {message}
      </div>
    </div>
  )
}
