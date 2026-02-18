import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <AlertCircle className="h-16 w-16 text-destructive" />
      <h1 className="mt-6 text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-center text-muted-foreground">
        We encountered an error. Please try again or contact support if it
        persists.
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="accent" asChild>
          <Link to="/">Go home</Link>
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    </div>
  )
}
