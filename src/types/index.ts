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
