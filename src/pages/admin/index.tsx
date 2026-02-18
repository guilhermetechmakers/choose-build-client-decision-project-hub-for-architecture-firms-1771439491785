import { Link } from 'react-router-dom'
import { Users, LayoutTemplate, CreditCard, BarChart3, Shield, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const adminSections = [
  { to: '/admin/users', title: 'User management', description: 'Invite users, roles, bulk actions', icon: Users },
  { to: '/admin/templates', title: 'Templates', description: 'Firm-wide templates', icon: LayoutTemplate },
  { to: '/dashboard/billing', title: 'Billing', description: 'Plan and invoices', icon: CreditCard },
  { title: 'Usage metrics', description: 'Seats, projects, storage', icon: BarChart3 },
  { title: 'Security settings', description: 'SSO, 2FA policy', icon: Shield },
  { title: 'Audit logs', description: 'Critical actions', icon: FileText },
]

export function AdminDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
        <p className="text-muted-foreground">
          Firm-level controls: users, templates, billing, security.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {adminSections.map((s) => (
          <Card key={s.title} className="transition-shadow hover:shadow-card-hover">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{s.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </CardHeader>
            <CardContent>
              {'to' in s && s.to ? (
                <Button variant="outline" size="sm" asChild>
                  <Link to={s.to}>Open</Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  Coming soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
