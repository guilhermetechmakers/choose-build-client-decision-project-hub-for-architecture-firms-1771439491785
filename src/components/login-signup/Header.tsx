import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface AuthHeaderProps {
  className?: string
}

/**
 * Header with logo and marketing link to the Landing Page.
 * Used on the authentication entry page.
 */
export function AuthHeader({ className }: AuthHeaderProps) {
  return (
    <header
      className={cn(
        'relative z-10 flex h-16 w-full items-center justify-between px-4 md:px-8',
        className
      )}
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold text-primary transition-all duration-200 hover:scale-[1.02] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        aria-label="Choose & Build – Back to home"
      >
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Choose & Build
        </span>
      </Link>
      <Link
        to="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1"
      >
        Back to home
      </Link>
    </header>
  )
}
