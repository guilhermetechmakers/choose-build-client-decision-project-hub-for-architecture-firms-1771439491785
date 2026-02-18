import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-primary">
            Choose & Build
          </Link>
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
        </div>
      </header>
      <main className="prose prose-neutral mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">
          Last updated: March 2025
        </p>
        <p>
          By using Choose & Build, you agree to these terms. The service is
          provided for architecture firms and their clients to manage projects,
          decisions, and deliverables. You are responsible for your account and
          content. We may update these terms with notice.
        </p>
        <h2>Acceptable use</h2>
        <p>
          You agree not to misuse the service, violate laws, or infringe
          others&apos; rights. We may suspend or terminate accounts that violate
          these terms.
        </p>
        <h2>Contact</h2>
        <p>
          Questions? Contact{' '}
          <a href="mailto:legal@chooseandbuild.com">legal@chooseandbuild.com</a>.
        </p>
        <p>
          <Link to="/" className="text-primary hover:underline">
            Back to home
          </Link>
        </p>
      </main>
    </div>
  )
}
