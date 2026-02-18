import { Link } from 'react-router-dom'
import { Plus, FileText, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ActionBarProps {
  onAddMilestone?: () => void
  onScheduleMeeting?: () => void
  className?: string
}

export function ActionBar({
  onAddMilestone,
  onScheduleMeeting,
  className,
}: ActionBarProps) {
  return (
    <div
      className={cn('flex flex-wrap items-center gap-2', className)}
      role="toolbar"
      aria-label="Project actions"
    >
      <Button variant="outline" size="sm" onClick={onAddMilestone} className="gap-2">
        <Plus className="h-4 w-4" />
        Add milestone
      </Button>
      <Button variant="accent" size="sm" asChild className="gap-2">
        <Link to="/dashboard/decisions/new">
          <FileText className="h-4 w-4" />
          Publish decision
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onScheduleMeeting}
        className="gap-2"
      >
        <Calendar className="h-4 w-4" />
        Schedule meeting
      </Button>
    </div>
  )
}
