import { Link } from 'react-router-dom'
import { Plus, GanttChart, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const phases = [
  { id: 'kickoff', name: 'Kickoff', progress: 100 },
  { id: 'concept', name: 'Concept', progress: 100 },
  { id: 'schematic', name: 'Schematic', progress: 80 },
  { id: 'dd', name: 'DD', progress: 20 },
  { id: 'permitting', name: 'Permitting', progress: 0 },
  { id: 'ca', name: 'CA', progress: 0 },
  { id: 'handover', name: 'Handover', progress: 0 },
]

const milestones = [
  { id: '1', phaseId: 'schematic', title: 'Floor plan approval', date: '2025-03-01', decisions: 1 },
  { id: '2', phaseId: 'schematic', title: 'Material palette', date: '2025-03-15', decisions: 2 },
]

export function ProjectBoardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Project timeline</h1>
          <p className="text-muted-foreground">
            Phases, milestones, and decision checkpoints.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <GanttChart className="h-4 w-4" />
            Gantt view
          </Button>
          <Button variant="accent" size="sm" asChild>
            <Link to="/dashboard/decisions/new">
              <Plus className="h-4 w-4" />
              New decision
            </Link>
          </Button>
        </div>
      </div>

      {/* Project selector placeholder */}
      <Card>
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            Project: <span className="font-medium text-foreground">Riverside Residence</span>
            {' · '}
            <Link to="/dashboard/projects" className="text-primary hover:underline">
              Switch project
            </Link>
          </p>
        </CardContent>
      </Card>

      {/* Horizontal phase timeline */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h2 className="mb-4 text-lg font-semibold">Phases</h2>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className={cn(
                  'flex flex-1 min-w-[100px] flex-col rounded-lg border border-border p-3 transition-shadow hover:shadow-md',
                  phase.progress === 100 && 'border-primary/30 bg-primary/5'
                )}
              >
                <span className="text-sm font-medium">{phase.name}</span>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
                <span className="mt-1 text-xs text-muted-foreground">
                  {phase.progress}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestones / decision checkpoints */}
      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-lg font-semibold">Decision checkpoints</h2>
          <p className="text-sm text-muted-foreground">
            Milestones linked to decisions. Click to open the decision.
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {milestones.map((m) => (
              <li key={m.id}>
                <Link
                  to="/dashboard/decisions"
                  className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {m.date} · {m.decisions} decision{m.decisions !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Badge variant="secondary">Schematic</Badge>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Add milestones from the timeline or when creating a decision.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
