import { CreditCard, FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockPlan = { name: 'Professional', seats: 5, price: 99 }
const mockInvoices = [
  { id: '1', date: '2025-03-01', amount: 99, status: 'Paid' },
  { id: '2', date: '2025-02-01', amount: 99, status: 'Paid' },
]

export function BillingPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Plan, payment method, and invoice history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current plan
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {mockPlan.name} · {mockPlan.seats} seats
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-2xl font-bold">
            ${mockPlan.price}
            <span className="text-sm font-normal text-muted-foreground">
              /month
            </span>
          </p>
          <Button variant="outline">Change plan</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice history
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {mockInvoices.map((inv) => (
              <li
                key={inv.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="font-medium">{inv.date}</p>
                  <p className="text-sm text-muted-foreground">{inv.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">${inv.amount}</span>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        Add-ons (storage, e-sign bundles) and payment form in full checkout
        flow.
      </p>
    </div>
  )
}
