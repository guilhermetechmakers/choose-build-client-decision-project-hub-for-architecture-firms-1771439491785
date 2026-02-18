import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Building2, Mail, Shield } from 'lucide-react'

export interface SSOButtonsProps {
  onGoogle?: () => void
  onMicrosoft?: () => void
  onSAML?: () => void
  className?: string
}

/**
 * SSO buttons: Google, Microsoft, SAML (enterprise).
 * Placeholder handlers; actual OAuth/SAML is invoked server-side via Edge Function.
 */
export function SSOButtons({
  onGoogle,
  onMicrosoft,
  onSAML,
  className,
}: SSOButtonsProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-center text-sm text-muted-foreground">
        Or continue with
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Button
          type="button"
          variant="outline"
          className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
          onClick={onGoogle}
          aria-label="Sign in with Google"
        >
          <Mail className="mr-2 h-4 w-4" aria-hidden />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
          onClick={onMicrosoft}
          aria-label="Sign in with Microsoft"
        >
          <Building2 className="mr-2 h-4 w-4" aria-hidden />
          Microsoft
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
          onClick={onSAML}
          aria-label="Sign in with SAML (enterprise)"
        >
          <Shield className="mr-2 h-4 w-4" aria-hidden />
          SAML
        </Button>
      </div>
    </div>
  )
}
