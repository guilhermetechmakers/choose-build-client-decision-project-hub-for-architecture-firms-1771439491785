export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  role: string
  firmId?: string
}

export interface Project {
  id: string
  name: string
  status: 'active' | 'on_hold' | 'completed'
  phase: string
  phaseProgress: number
  clientName?: string
  updatedAt: string
}

export interface DecisionOption {
  id: string
  title: string
  description?: string
  imageUrl?: string
  costDelta?: number
  recommended?: boolean
}

export interface Decision {
  id: string
  projectId: string
  title: string
  description?: string
  options: DecisionOption[]
  status: 'draft' | 'pending' | 'approved' | 'changes_requested'
  requiredApprovers?: string[]
  publishedAt?: string
  approvedAt?: string
  approvedBy?: string
  version: number
  createdAt: string
  updatedAt: string
}

export interface MessageThread {
  id: string
  resourceType: 'decision' | 'file' | 'task' | 'meeting'
  resourceId: string
  subject?: string
  messageCount: number
  lastMessageAt: string
}

export interface AuditLogEntry {
  id: string
  action: string
  userId: string
  resourceType: string
  resourceId: string
  metadata?: Record<string, unknown>
  createdAt: string
}

/** Login/Signup record (maps to login_/_signup table) */
export interface LoginSignup {
  id: string
  user_id: string
  title: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

// --- Project Board (Timeline & Phases) ---

export type PhaseId =
  | 'kickoff'
  | 'concept'
  | 'schematic'
  | 'dd'
  | 'permitting'
  | 'ca'
  | 'handover'

export interface ProjectBoardTimelinePhases {
  id: string
  user_id: string
  title: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

export interface Phase {
  id: PhaseId
  name: string
  progress: number
  order: number
  startDate?: string
  endDate?: string
}

export interface Milestone {
  id: string
  phaseId: PhaseId
  title: string
  dueDate: string
  assigneeId?: string
  assigneeName?: string
  status: 'not_started' | 'in_progress' | 'complete' | 'overdue'
  decisionIds: string[]
  order: number
}

export interface DecisionCheckpointSummary {
  id: string
  decisionId: string
  decisionTitle: string
  milestoneId: string
  phaseId: PhaseId
  status: Decision['status']
}

// --- Decision Log API DTOs (for Create Decision, Decision List, Decision Detail) ---

export interface DecisionOptionDTO {
  id?: string
  title: string
  description?: string
  imageUrl?: string
  costDelta?: number
  recommended?: boolean
}

export interface DecisionCreateDTO {
  projectId: string
  title: string
  description?: string
  options: DecisionOptionDTO[]
  requiredApprovers?: string[]
  audience?: string[]
}

export interface DecisionListDTO {
  id: string
  projectId: string
  title: string
  description?: string
  status: Decision['status']
  version: number
  publishedAt?: string
  approvedAt?: string
  createdAt: string
  updatedAt: string
}

export interface DecisionDetailDTO extends DecisionListDTO {
  options: DecisionOption[]
  requiredApprovers?: string[]
  approvedBy?: string
  auditLog?: AuditLogEntry[]
}

export interface DecisionPublishDTO {
  decisionId: string
  notifyApprovers?: boolean
}

export interface DecisionApprovalActionDTO {
  decisionId: string
  version: number
  action: 'approve' | 'request_change' | 'ask_question'
  comment?: string
}
