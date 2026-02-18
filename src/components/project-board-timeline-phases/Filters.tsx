import { Filter, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface FilterState {
  actionableOnly: boolean
  overdueOnly: boolean
  approvalsNeededOnly: boolean
}

export interface FiltersProps {
  filter: FilterState
  onFilterChange: (filter: FilterState) => void
  className?: string
}

export function Filters({ filter, onFilterChange, className }: FiltersProps) {
  const toggle = (key: keyof FilterState) => {
    onFilterChange({ ...filter, [key]: !filter[key] })
  }

  return (
    <div
      className={cn('flex flex-wrap items-center gap-2', className)}
      role="group"
      aria-label="Filters"
    >
      <Filter className="h-4 w-4 text-muted-foreground" aria-hidden />
      <Button
        variant={filter.actionableOnly ? 'secondary' : 'outline'}
        size="sm"
        onClick={() => toggle('actionableOnly')}
        className="gap-1.5"
        aria-pressed={filter.actionableOnly}
      >
        <CheckCircle2 className="h-4 w-4" />
        Actionable only
      </Button>
      <Button
        variant={filter.overdueOnly ? 'secondary' : 'outline'}
        size="sm"
        onClick={() => toggle('overdueOnly')}
        className="gap-1.5"
        aria-pressed={filter.overdueOnly}
      >
        <Clock className="h-4 w-4" />
        Overdue
      </Button>
      <Button
        variant={filter.approvalsNeededOnly ? 'secondary' : 'outline'}
        size="sm"
        onClick={() => toggle('approvalsNeededOnly')}
        className="gap-1.5"
        aria-pressed={filter.approvalsNeededOnly}
      >
        <AlertCircle className="h-4 w-4" />
        Approvals needed
      </Button>
    </div>
  )
}
