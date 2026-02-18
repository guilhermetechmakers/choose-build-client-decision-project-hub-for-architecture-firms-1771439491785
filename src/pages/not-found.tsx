import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <FileQuestion className="h-16 w-16 text-muted-foreground" />
      <h1 className="mt-6 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-center text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="accent" asChild>
          <Link to="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
