import { apiGet, apiPatch } from '@/lib/api'
import type {
  ProjectBoardTimelinePhases,
  Phase,
  Milestone,
  Project,
} from '@/types'

export interface ProjectBoardResponse {
  project: ProjectBoardTimelinePhases | Project
  phases: Phase[]
  milestones: Milestone[]
}

export async function fetchProjectBoard(
  projectId: string
): Promise<ProjectBoardResponse> {
  const [project, phases, milestones] = await Promise.all([
    apiGet<ProjectBoardTimelinePhases | Project>(`/projects/${projectId}`),
    apiGet<Phase[]>(`/projects/${projectId}/phases`),
    apiGet<Milestone[]>(`/projects/${projectId}/milestones`),
  ])
  return { project, phases, milestones }
}

export async function fetchProjects(): Promise<Project[]> {
  return apiGet<Project[]>('/projects')
}

export async function updateMilestoneDueDate(
  projectId: string,
  milestoneId: string,
  dueDate: string
): Promise<Milestone> {
  return apiPatch<Milestone>(
    `/projects/${projectId}/milestones/${milestoneId}`,
    { dueDate }
  )
}
