import { apiGet, apiPost, apiPatch } from '@/lib/api'
import type {
  DecisionListDTO,
  DecisionDetailDTO,
  DecisionCreateDTO,
  DecisionPublishDTO,
  DecisionApprovalActionDTO,
} from '@/types'

export async function fetchDecisionList(
  projectId: string
): Promise<DecisionListDTO[]> {
  return apiGet<DecisionListDTO[]>(`/projects/${projectId}/decisions`)
}

export async function fetchDecisionDetail(
  decisionId: string
): Promise<DecisionDetailDTO> {
  return apiGet<DecisionDetailDTO>(`/decisions/${decisionId}`)
}

export async function createDecision(
  body: DecisionCreateDTO
): Promise<DecisionDetailDTO> {
  return apiPost<DecisionDetailDTO>('/decisions', body)
}

export async function publishDecision(
  body: DecisionPublishDTO
): Promise<DecisionDetailDTO> {
  return apiPost<DecisionDetailDTO>('/decisions/publish', body)
}

export async function approvalAction(
  body: DecisionApprovalActionDTO
): Promise<DecisionDetailDTO> {
  return apiPatch<DecisionDetailDTO>('/decisions/approval', body)
}
