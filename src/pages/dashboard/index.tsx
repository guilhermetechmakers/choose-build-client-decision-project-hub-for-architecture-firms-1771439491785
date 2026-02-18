import { Link } from 'react-router-dom'
import {
  ClipboardList,
  Calendar,
  FolderKanban,
  ArrowUpRight,
  Clock,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const mockProjects = [
  { id: '1', name: 'Riverside Residence', status: 'active', pendingDecisions: 2 },
  { id: '2', name: 'Downtown Office Fit-out', status: 'active', pendingDecisions: 0 },
]
const mockPending = [
  { id: '1', title: 'Kitchen finish options', project: 'Riverside Residence', due: '2 days' },
  { id: '2', title: 'Exterior material palette', project: 'Riverside Residence', due: '5 days' },
]
const mockActivity = [
  { id: '1', text: 'Decision "Kitchen finish" published', time: '1h ago' },
  { id: '2', text: 'Approval received on "Flooring"', time: '3h ago' },
]
const mockMeetings = [
  { id: '1', title: 'Client review', date: 'Tomorrow, 10:00', project: 'Riverside Residence' },
]

export function DashboardPage() {
  const isLoading = false

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Active projects and pending approvals at a glance.
        </p>
      </div>

      {/* KPI tiles */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending approvals
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-2xl font-bold">2</span>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-2xl font-bold">2</span>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Decisions this week
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-2xl font-bold">3</span>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming meetings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-2xl font-bold">1</span>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending approvals</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/decisions">
                View all
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : mockPending.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No pending approvals. Great work!
              </p>
            ) : (
              <ul className="space-y-3">
                {mockPending.map((d) => (
                  <li key={d.id}>
                    <Link
                      to={`/dashboard/decisions?highlight=${d.id}`}
                      className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                    >
                      <div>
                        <p className="font-medium">{d.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {d.project} · Due {d.due}
                        </p>
                      </div>
                      <Badge variant="warning">Pending</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Activity feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <p className="text-sm text-muted-foreground">
              Latest updates across your projects
            </p>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <ul className="space-y-4">
                {mockActivity.map((a) => (
                  <li
                    key={a.id}
                    className="flex gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{a.text}</p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Projects + Meetings */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Projects</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/projects">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockProjects.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/dashboard/projects"
                    className={cn(
                      'flex items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-muted/50'
                    )}
                  >
                    <span className="font-medium">{p.name}</span>
                    {p.pendingDecisions > 0 && (
                      <Badge variant="accent">{p.pendingDecisions} pending</Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockMeetings.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {m.date} · {m.project}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard/meetings">Open</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div>
        <Button variant="accent" asChild>
          <Link to="/dashboard/decisions/new">Create decision</Link>
        </Button>
      </div>
    </div>
  )
}
