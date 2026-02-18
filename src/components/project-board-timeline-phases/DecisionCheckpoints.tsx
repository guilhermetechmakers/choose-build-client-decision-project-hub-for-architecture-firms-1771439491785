import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { DecisionCheckpointSummary } from '@/types'

export interface DecisionCheckpointsProps {
  checkpoints: DecisionCheckpointSummary[]
  className?: string
}

const statusVariant: Record<
  DecisionCheckpointSummary['status'],
  'default' | 'secondary' | 'success' | 'warning' | 'accent'
> = {
  draft: 'secondary',
  pending: 'accent',
  approved: 'success',
  changes_requested: 'warning',
}

export function DecisionCheckpoints({
  checkpoints,
  className,
}: DecisionCheckpointsProps) {
  if (checkpoints.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <h2 className="text-lg font-semibold">Decision checkpoints</h2>
          <p className="text-sm text-muted-foreground">
            Milestones linked to decisions. Click to open the decision.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">No decision checkpoints</p>
            <p className="text-sm text-muted-foreground">
              Publish a decision and link it to a milestone to see it here.
            </p>
            <Link
              to="/dashboard/decisions/new"
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
            >
              Create decision
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <h2 className="text-lg font-semibold">Decision checkpoints</h2>
        <p className="text-sm text-muted-foreground">
          Milestones linked to decisions. Click to open the decision.
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {checkpoints.map((c) => (
            <li key={c.id}>
              <Link
                to={`/dashboard/decisions?highlight=${c.decisionId}`}
                className={cn(
                  'flex items-center justify-between rounded-lg border border-border p-3 transition-colors',
                  'hover:bg-muted/50 hover:border-primary/20 hover:shadow-sm'
                )}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate">
                    {c.decisionTitle}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Decision · {c.decisionId.slice(0, 8)}…
                  </p>
                </div>
                <Badge variant={statusVariant[c.status]} className="shrink-0">
                  {c.status.replace('_', ' ')}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
