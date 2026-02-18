import { Link } from 'react-router-dom'
import { Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function EmailVerificationPage() {
  const verified = false // would come from route state or query

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-block text-lg font-semibold text-primary"
        >
          Choose & Build
        </Link>
        <Card className="shadow-card">
          <CardHeader className="space-y-1">
            {verified ? (
              <>
                <div className="flex justify-center">
                  <CheckCircle className="h-12 w-12 text-success" />
                </div>
                <CardTitle className="text-center text-2xl">
                  Email verified
                </CardTitle>
                <CardDescription className="text-center">
                  Your email has been confirmed. You can now sign in.
                </CardDescription>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <Mail className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-center text-2xl">
                  Verify your email
                </CardTitle>
                <CardDescription className="text-center">
                  We sent a verification link to your email. Click the link to
                  confirm your address. Check spam if you don&apos;t see it.
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {!verified && (
              <Button variant="outline" className="w-full" disabled>
                Resend email (cooldown)
              </Button>
            )}
            <Link to="/login" className="block">
              <Button variant="accent" className="w-full">
                {verified ? 'Sign in' : 'Back to log in'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
