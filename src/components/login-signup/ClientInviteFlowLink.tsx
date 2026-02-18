import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Link2 } from 'lucide-react'

export interface ClientInviteFlowLinkProps {
  onInviteTokenSubmit?: (token: string) => Promise<void>
  className?: string
}

/**
 * Client invite flow: enter invite token or link.
 * Validates token and redirects to signup/onboarding with token applied.
 */
export function ClientInviteFlowLink({
  onInviteTokenSubmit,
  className,
}: ClientInviteFlowLinkProps) {
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = token.trim()
    if (!trimmed) {
      setError('Enter an invite token or paste the full invite link.')
      return
    }
    setError(null)
    setIsSubmitting(true)
    try {
      let inviteToken = trimmed
      try {
        const url = new URL(trimmed)
        inviteToken = url.searchParams.get('token') ?? url.pathname.split('/').pop() ?? trimmed
      } catch {
        // not a URL, use as token
      }
      if (onInviteTokenSubmit) {
        await onInviteTokenSubmit(inviteToken)
      } else {
        navigate(`/signup?invite=${encodeURIComponent(inviteToken)}`, { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid invite. Please check and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card/80 p-4 shadow-card backdrop-blur-sm transition-all duration-300 hover:shadow-card-hover',
        className
      )}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Link2 className="h-5 w-5" aria-hidden />
        <span className="text-sm font-medium">Have an invite?</span>
      </div>
      <form onSubmit={handleSubmit} className="mt-3 space-y-3">
        <div className="space-y-2">
          <Label htmlFor="invite-token" className="sr-only">
            Invite token or link
          </Label>
          <Input
            id="invite-token"
            type="text"
            placeholder="Paste invite link or token"
            value={token}
            onChange={(e) => {
              setToken(e.target.value)
              setError(null)
            }}
            autoComplete="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'invite-token-error' : undefined}
            className={cn(
              'transition-colors duration-200',
              error && 'border-destructive'
            )}
          />
          {error && (
            <p
              id="invite-token-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="w-full transition-all duration-200 hover:scale-[1.02]"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Validating…' : 'Use invite'}
        </Button>
      </form>
    </div>
  )
}
