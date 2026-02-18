import { Link } from 'react-router-dom'
import { ArrowRight, Check, LayoutGrid, FileCheck, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 animate-pulse opacity-30">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <span className="text-xl font-bold text-primary">Choose & Build</span>
          <div className="flex items-center gap-4">
            <Link to="/help">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Help
              </span>
            </Link>
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="accent">Get started</Button>
            </Link>
          </div>
        </nav>
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Centralize decisions.{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ship with clarity.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              The project hub for architecture firms. One source of truth for
              client approvals, decision logs, and handover—from kickoff to
              delivery.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="accent"
                  className="gap-2 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  Start free trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features - Bento-style grid */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
            Built for architecture teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Decision-first workflows, audit-ready records, and a polished client
            portal—all in one place.
          </p>
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="animate-fade-in rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:scale-[1.01] hover:shadow-card-hover md:col-span-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Decision Log</h3>
              <p className="mt-2 text-muted-foreground">
                Publish comparison cards with options, cost deltas, and
                recommendations. Clients approve or request changes—every
                action timestamped for audit.
              </p>
            </div>
            <div className="animate-fade-in rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:scale-[1.01] hover:shadow-card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <FileCheck className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Timeline & Phases</h3>
              <p className="mt-2 text-muted-foreground">
                Single source of truth for project phases, milestones, and
                decision checkpoints. Gantt-lite view when you need it.
              </p>
            </div>
            <div className="animate-fade-in rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:scale-[1.01] hover:shadow-card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Contextual messaging</h3>
              <p className="mt-2 text-muted-foreground">
                Threads tied to decisions, files, and tasks—no more scattered
                email. Read receipts and convert comments to tasks.
              </p>
            </div>
            <div className="animate-fade-in rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:scale-[1.01] hover:shadow-card-hover md:col-span-2">
              <h3 className="text-xl font-semibold">How it works</h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Create a project from a template or from scratch.',
                  'Publish decision cards with options, visuals, and cost impact.',
                  'Clients review and approve (or request changes) in the portal.',
                  'All versions and approvals are immutable and auditable.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fade-in rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6">
              <h3 className="text-xl font-semibold">Ready to start?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Reduce scope creep and approval latency. Get your team and
                clients on one platform.
              </p>
              <Link to="/signup" className="mt-4 inline-block">
                <Button variant="accent" className="w-full gap-2">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            One platform. Clear decisions. Audit-ready delivery.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join architecture firms that ship faster with fewer disputes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="accent" className="gap-2">
                Start free trial
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/help">
              <Button size="lg" variant="outline">
                Contact sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 md:px-8">
          <span className="text-sm text-muted-foreground">
            © Choose & Build. All rights reserved.
          </span>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              to="/help"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
