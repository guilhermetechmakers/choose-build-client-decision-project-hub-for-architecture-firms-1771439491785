import type { Phase } from '@/types'
import { cn } from '@/lib/utils'

export interface PhaseTimelineProps {
  phases: Phase[]
  className?: string
}

const defaultOrder: Phase['id'][] = [
  'kickoff',
  'concept',
  'schematic',
  'dd',
  'permitting',
  'ca',
  'handover',
]

export function PhaseTimeline({ phases, className }: PhaseTimelineProps) {
  const ordered = [...phases].sort(
    (a, b) =>
      defaultOrder.indexOf(a.id) - defaultOrder.indexOf(b.id) || a.order - b.order
  )

  return (
    <div
      className={cn('overflow-x-auto', className)}
      role="region"
      aria-label="Phase timeline"
    >
      <div className="flex min-w-0 gap-2 md:gap-4 pb-2">
        {ordered.map((phase) => (
          <div
            key={phase.id}
            className={cn(
              'flex min-w-[100px] max-w-[160px] flex-1 flex-col rounded-lg border border-border p-3 transition-all duration-300',
              'hover:shadow-card-hover hover:border-primary/20',
              phase.progress === 100 &&
                'border-primary/30 bg-primary/5 shadow-sm'
            )}
          >
            <span className="text-sm font-medium text-foreground">
              {phase.name}
            </span>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${Math.min(100, phase.progress)}%` }}
                role="progressbar"
                aria-valuenow={phase.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${phase.name} progress`}
              />
            </div>
            <span className="mt-1 text-xs text-muted-foreground">
              {phase.progress}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
