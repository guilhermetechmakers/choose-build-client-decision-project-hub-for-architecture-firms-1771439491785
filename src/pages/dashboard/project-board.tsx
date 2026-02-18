import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useProjectBoard } from '@/hooks/use-project-board'
import {
  PhaseTimeline,
  MilestoneCards,
  DecisionCheckpoints,
  GanttToggle,
  Filters,
  ActionBar,
} from '@/components/project-board-timeline-phases'
import type { ViewMode } from '@/components/project-board-timeline-phases'
import type { FilterState } from '@/components/project-board-timeline-phases'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { PhaseId } from '@/types'

const PHASE_NAMES: Record<PhaseId, string> = {
  kickoff: 'Kickoff',
  concept: 'Concept',
  schematic: 'Schematic',
  dd: 'DD',
  permitting: 'Permitting',
  ca: 'CA',
  handover: 'Handover',
}

function getPhaseName(phaseId: PhaseId): string {
  return PHASE_NAMES[phaseId] ?? phaseId
}

export function ProjectBoardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [filter, setFilter] = useState<FilterState>({
    actionableOnly: false,
    overdueOnly: false,
    approvalsNeededOnly: false,
  })

  const {
    project,
    phases,
    milestones,
    checkpoints,
    projects,
    isLoading,
    isError,
    error,
    refetch,
  } = useProjectBoard()

  const projectTitle =
    'name' in project ? project.name : (project as { title: string }).title

  const filteredMilestones = useMemo(() => {
    let list = milestones
    if (filter.actionableOnly) {
      list = list.filter(
        (m) => m.status === 'in_progress' || m.status === 'overdue'
      )
    }
    if (filter.overdueOnly) {
      list = list.filter((m) => m.status === 'overdue')
    }
    if (filter.approvalsNeededOnly) {
      const idsWithPending = new Set(
        checkpoints.filter((c) => c.status === 'pending').map((c) => c.milestoneId)
      )
      list = list.filter((m) => idsWithPending.has(m.id))
    }
    return list
  }, [milestones, checkpoints, filter])

  const filteredCheckpoints = useMemo(() => {
    let list = checkpoints
    if (filter.approvalsNeededOnly) {
      list = list.filter((c) => c.status === 'pending')
    }
    return list
  }, [checkpoints, filter])

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-1 h-5 w-72" />
          </div>
        </div>
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
          <p className="font-medium text-destructive">
            Unable to load project board
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'Something went wrong.'}
          </p>
          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Project timeline
          </h1>
          <p className="text-muted-foreground">
            Phases, milestones, and decision checkpoints.
          </p>
        </div>
        <ActionBar
          onAddMilestone={() => {}}
          onScheduleMeeting={() => {}}
        />
      </div>

      {/* Project selector */}
      <Card>
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            Project:{' '}
            <span className="font-medium text-foreground">{projectTitle}</span>
            {' · '}
            <Link
              to="/dashboard/projects"
              className="text-primary hover:underline"
            >
              Switch project
            </Link>
            {projects.length > 1 && (
              <span className="ml-2 text-xs text-muted-foreground">
                ({projects.length} projects)
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Filters */}
      <Filters filter={filter} onFilterChange={setFilter} />

      {/* Phase timeline */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h2 className="mb-4 text-lg font-semibold">Phases</h2>
          <PhaseTimeline phases={phases} />
        </CardContent>
      </Card>

      {/* Gantt toggle + list/gantt content */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h2 className="mb-4 text-lg font-semibold">Schedule</h2>
          <GanttToggle
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            phases={phases}
            milestones={filteredMilestones}
            canReschedule={false}
          />
          {viewMode === 'list' && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Milestones
              </h3>
              <MilestoneCards
                milestones={filteredMilestones}
                getPhaseName={getPhaseName}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Decision checkpoints */}
      <DecisionCheckpoints checkpoints={filteredCheckpoints} />
    </div>
  )
}
