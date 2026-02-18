import { GanttChart, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Milestone, Phase } from '@/types'

export type ViewMode = 'list' | 'gantt'

export interface GanttToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  phases: Phase[]
  milestones: Milestone[]
  canReschedule?: boolean
  onMilestoneDateChange?: (milestoneId: string, newDueDate: string) => void
  className?: string
}

export function GanttToggle({
  viewMode,
  onViewModeChange,
  phases,
  milestones,
  canReschedule = false,
  className,
}: GanttToggleProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          View
        </span>
        <div className="inline-flex rounded-lg border border-border p-1">
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="gap-2"
            aria-pressed={viewMode === 'list'}
          >
            <List className="h-4 w-4" />
            List
          </Button>
          <Button
            variant={viewMode === 'gantt' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('gantt')}
            className="gap-2"
            aria-pressed={viewMode === 'gantt'}
          >
            <GanttChart className="h-4 w-4" />
            Gantt
          </Button>
        </div>
        {canReschedule && viewMode === 'gantt' && (
          <span className="text-xs text-muted-foreground">
            Drag to reschedule
          </span>
        )}
      </div>

      {viewMode === 'gantt' && (
        <div
          className="overflow-x-auto rounded-lg border border-border bg-card"
          role="table"
          aria-label="Schedule"
        >
          <div className="min-w-[600px]">
            {/* Header row: phase names */}
            <div className="flex border-b border-border bg-muted/50">
              <div className="w-48 shrink-0 border-r border-border p-2 text-sm font-medium">
                Deliverable
              </div>
              <div className="flex flex-1 gap-2 p-2">
                {phases.map((p) => (
                  <div
                    key={p.id}
                    className="min-w-[80px] flex-1 text-center text-xs font-medium text-muted-foreground"
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
            {/* Schedule lines: one per milestone */}
            {milestones.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'flex border-b border-border last:border-b-0 transition-colors hover:bg-muted/30',
                  canReschedule && 'cursor-grab active:cursor-grabbing'
                )}
              >
                <div className="w-48 shrink-0 border-r border-border p-2 text-sm">
                  {m.title}
                </div>
                <div className="flex flex-1 gap-2 p-2">
                  {phases.map((p) => (
                    <div
                      key={p.id}
                      className={cn(
                        'min-w-[80px] flex-1 rounded bg-muted/50',
                        m.phaseId === p.id && 'bg-primary/20'
                      )}
                    >
                      {m.phaseId === p.id && (
                        <div
                          className="h-6 rounded bg-primary/40"
                          style={{ width: '80%' }}
                          title={m.dueDate}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
