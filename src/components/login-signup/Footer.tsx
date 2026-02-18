import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface AuthFooterProps {
  className?: string
}

/**
 * Footer with links to Terms, Privacy, Help.
 */
export function AuthFooter({ className }: AuthFooterProps) {
  return (
    <footer
      className={cn(
        'flex flex-wrap items-center justify-center gap-6 py-8 text-sm text-muted-foreground',
        className
      )}
    >
      <Link
        to="/terms"
        className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
      >
        Terms
      </Link>
      <Link
        to="/privacy"
        className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
      >
        Privacy
      </Link>
      <Link
        to="/help"
        className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
      >
        Help
      </Link>
    </footer>
  )
}
