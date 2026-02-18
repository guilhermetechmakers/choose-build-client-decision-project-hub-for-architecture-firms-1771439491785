import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function PrivacyPolicyPage() {
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
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: March 2025
        </p>
        <p>
          This privacy policy describes how Choose & Build collects, uses, and
          protects your information when you use our platform. We are committed
          to transparency and compliance with applicable data protection laws
          (including GDPR).
        </p>
        <h2>Information we collect</h2>
        <p>
          We collect account information (name, email, firm details), usage
          data, and project data you upload (decisions, files, messages) to
          provide the service and improve our product.
        </p>
        <h2>How we use it</h2>
        <p>
          We use your data to operate the platform, send transactional and
          optional marketing communications, support you, and improve our
          services. We do not sell your personal data.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy requests or questions, contact us at{' '}
          <a href="mailto:privacy@chooseandbuild.com">privacy@chooseandbuild.com</a>.
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
