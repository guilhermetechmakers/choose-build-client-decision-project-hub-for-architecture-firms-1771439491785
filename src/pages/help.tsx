import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HelpCircle, Search, Book, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const faqs = [
  { q: 'How do I publish a decision?', a: 'Go to Decision Log → New decision. Complete the multi-step form (info, options, cost, audience) and click Publish.' },
  { q: 'How does the client approve?', a: 'Clients receive a link to the decision card. They can approve, request changes, or add comments. All actions are timestamped.' },
  { q: 'Can I link a file to a decision?', a: 'Yes. In Files & Drawings, use "Link to decision" on a file. The file then appears in the decision detail.' },
]

export function HelpPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-primary">
            Choose & Build
          </Link>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="accent">Dashboard</Button>
            </Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-12 text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold">Help & support</h1>
          <p className="mt-2 text-muted-foreground">
            FAQs, guides, and contact. Find answers or submit a request.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search help…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                FAQs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q}>
                  <p className="font-medium">{f.q}</p>
                  <p className="text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact support
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Can&apos;t find what you need? Send us a message with details
                and we&apos;ll get back to you.
              </p>
            </CardHeader>
            <CardContent>
              <Button variant="accent">Open contact form</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
