import { useQuery } from '@tanstack/react-query'
import type {
  Phase,
  Milestone,
  DecisionCheckpointSummary,
  Project,
} from '@/types'
import { fetchProjectBoard, fetchProjects } from '@/api/project-board'

const DEFAULT_PHASES: Phase[] = [
  { id: 'kickoff', name: 'Kickoff', progress: 100, order: 0 },
  { id: 'concept', name: 'Concept', progress: 100, order: 1 },
  { id: 'schematic', name: 'Schematic', progress: 80, order: 2 },
  { id: 'dd', name: 'DD', progress: 20, order: 3 },
  { id: 'permitting', name: 'Permitting', progress: 0, order: 4 },
  { id: 'ca', name: 'CA', progress: 0, order: 5 },
  { id: 'handover', name: 'Handover', progress: 0, order: 6 },
]

const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: '1',
    phaseId: 'schematic',
    title: 'Floor plan approval',
    dueDate: '2025-03-01',
    assigneeName: 'J. Smith',
    status: 'in_progress',
    decisionIds: ['1'],
    order: 0,
  },
  {
    id: '2',
    phaseId: 'schematic',
    title: 'Material palette',
    dueDate: '2025-03-15',
    assigneeName: 'A. Lee',
    status: 'not_started',
    decisionIds: ['2'],
    order: 1,
  },
]

const DEFAULT_CHECKPOINTS: DecisionCheckpointSummary[] = [
  {
    id: 'cp1',
    decisionId: '1',
    decisionTitle: 'Kitchen finish options',
    milestoneId: '1',
    phaseId: 'schematic',
    status: 'pending',
  },
  {
    id: 'cp2',
    decisionId: '2',
    decisionTitle: 'Exterior material palette',
    milestoneId: '2',
    phaseId: 'schematic',
    status: 'approved',
  },
]

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Riverside Residence',
    status: 'active',
    phase: 'Schematic',
    phaseProgress: 80,
    clientName: 'Acme Corp',
    updatedAt: new Date().toISOString(),
  },
]

const PROJECT_ID = '1'

export function useProjectBoard(projectId: string = PROJECT_ID) {
  const boardQuery = useQuery({
    queryKey: ['project-board', projectId],
    queryFn: () => fetchProjectBoard(projectId),
    retry: false,
    staleTime: 60 * 1000,
  })

  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    retry: false,
    staleTime: 60 * 1000,
  })

  const isLoading = boardQuery.isLoading
  const isError = false

  const project =
    boardQuery.data?.project ??
    DEFAULT_PROJECTS.find((p) => p.id === projectId) ?? {
      id: projectId,
      name: 'Riverside Residence',
      status: 'active' as const,
      phase: 'Schematic',
      phaseProgress: 80,
      updatedAt: new Date().toISOString(),
    }

  const phases = boardQuery.data?.phases ?? DEFAULT_PHASES
  const milestones = boardQuery.data?.milestones ?? DEFAULT_MILESTONES
  const projects = projectsQuery.data ?? DEFAULT_PROJECTS
  const checkpoints = DEFAULT_CHECKPOINTS

  return {
    project,
    phases,
    milestones,
    checkpoints,
    projects,
    isLoading,
    isError,
    error: boardQuery.error,
    refetch: boardQuery.refetch,
  }
}
