import {
  BarChart3,
  TrendingUp,
  Clock,
  FileCheck,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

const kpiData = [
  { label: 'Pending approvals', value: 2, icon: FileCheck, trend: 'same' },
  { label: 'Avg. approval time', value: '3.2 days', icon: Clock, trend: 'down' },
  { label: 'Decisions this month', value: 12, icon: BarChart3, trend: 'up' },
]
const barData = [
  { name: 'Jan', count: 4 },
  { name: 'Feb', count: 7 },
  { name: 'Mar', count: 5 },
]
const lineData = [
  { name: 'Week 1', days: 4.2 },
  { name: 'Week 2', days: 3.8 },
  { name: 'Week 3', days: 3.1 },
  { name: 'Week 4', days: 3.2 },
]

export function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & analytics</h1>
          <p className="text-muted-foreground">
            Project health, pending approvals, approval turnaround, exports.
          </p>
        </div>
        <Button variant="outline">Export CSV</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {kpiData.map((k) => (
          <Card key={k.label} className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {k.label}
              </CardTitle>
              <k.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{k.value}</span>
                {k.trend === 'up' && (
                  <TrendingUp className="h-4 w-4 text-success" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Decisions by month</CardTitle>
            <p className="text-sm text-muted-foreground">
              Published decision count
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="count" fill="rgb(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Approval turnaround (days)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Average time to approval
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="days"
                    stroke="rgb(var(--accent))"
                    strokeWidth={2}
                    dot={{ fill: 'rgb(var(--accent))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <p className="text-sm text-muted-foreground">
        Standard and custom reports. Export to CSV/PDF, scheduled email
        delivery.
      </p>
    </div>
  )
}
