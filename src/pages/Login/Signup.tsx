import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  AuthHeader,
  LoginForm,
  type LoginFormValues,
  SSOButtons,
  SignupCTA,
  type FirmSignupFormValues,
  ClientInviteFlowLink,
  AuthFooter,
} from '@/components/login-signup'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

/**
 * Authentication entry page: sign in or create an account.
 * Offers email/password, SSO (Google, Microsoft, SAML), firm sign-up, and client invite flow.
 */
export default function LoginSignupPage() {
  const navigate = useNavigate()
  const [loginSubmitting, setLoginSubmitting] = useState(false)
  const [signupSubmitting, setSignupSubmitting] = useState(false)

  const handleLoginSubmit = async (_data: LoginFormValues) => {
    setLoginSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      toast.success('Signed in successfully')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Sign-in failed. Please try again.')
    } finally {
      setLoginSubmitting(false)
    }
  }

  const handleFirmSignupSubmit = async (_data: FirmSignupFormValues) => {
    setSignupSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      toast.success('Account creation started. Check your email to continue.')
      navigate('/signup', { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Sign-up failed. Please try again.')
    } finally {
      setSignupSubmitting(false)
    }
  }

  const handleSSO = (provider: string) => () => {
    toast.info(`${provider} SSO will be configured via Edge Function.`)
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Animated gradient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <AuthHeader className="relative" />

      <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-8 md:py-12">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Login + SSO */}
          <div className="animate-fade-in space-y-6">
            <Card className="border-border bg-card/95 shadow-card backdrop-blur-sm transition-all duration-300 hover:shadow-card-hover">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Sign in</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <LoginForm
                  onSubmit={handleLoginSubmit}
                  isSubmitting={loginSubmitting}
                />
                <SSOButtons
                  onGoogle={handleSSO('Google')}
                  onMicrosoft={handleSSO('Microsoft')}
                  onSAML={handleSSO('SAML')}
                />
              </CardContent>
            </Card>
            <ClientInviteFlowLink />
          </div>

          {/* Right: Firm sign-up CTA */}
          <div className="animate-fade-in flex flex-col justify-center">
            <SignupCTA
              onSubmit={handleFirmSignupSubmit}
              isSubmitting={signupSubmitting}
            />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Joining as an individual?{' '}
              <Link
                to="/signup"
                className={cn(
                  'font-medium text-primary hover:underline',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded'
                )}
              >
                Sign up without a firm
              </Link>
            </p>
          </div>
        </div>
      </main>

      <AuthFooter className="relative" />
    </div>
  )
}
