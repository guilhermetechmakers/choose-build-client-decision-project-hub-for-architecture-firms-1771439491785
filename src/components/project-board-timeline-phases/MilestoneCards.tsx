import { Calendar, User, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Milestone } from '@/types'

export interface MilestoneCardsProps {
  milestones: Milestone[]
  getPhaseName: (phaseId: Milestone['phaseId']) => string
  className?: string
}

const statusConfig: Record<
  Milestone['status'],
  { label: string; variant: 'default' | 'secondary' | 'success' | 'warning' | 'accent'; icon: typeof Clock }
> = {
  not_started: { label: 'Not started', variant: 'secondary', icon: Clock },
  in_progress: { label: 'In progress', variant: 'accent', icon: Clock },
  complete: { label: 'Complete', variant: 'success', icon: CheckCircle2 },
  overdue: { label: 'Overdue', variant: 'warning', icon: AlertCircle },
}

export function MilestoneCards({
  milestones,
  getPhaseName,
  className,
}: MilestoneCardsProps) {
  if (milestones.length === 0) {
    return (
      <div
        className={cn(
          'rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center',
          className
        )}
      >
        <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium text-foreground">
          No milestones yet
        </p>
        <p className="text-sm text-muted-foreground">
          Add a milestone from the action bar or when creating a decision.
        </p>
      </div>
    )
  }

  return (
    <ul className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {milestones.map((m) => {
        const config = statusConfig[m.status]
        const Icon = config.icon
        return (
          <li key={m.id}>
            <Card
              className={cn(
                'h-full transition-all duration-200 hover:shadow-card-hover hover:border-primary/20'
              )}
            >
              <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-foreground">{m.title}</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {m.dueDate}
                    </span>
                    {m.assigneeName && (
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {m.assigneeName}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={config.variant} className="gap-1">
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                    <Badge variant="outline">{getPhaseName(m.phaseId)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
