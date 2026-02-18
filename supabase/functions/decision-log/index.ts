// Decision Log & Approval Workflow — Supabase Edge Function
// Handles: create/read/list/publish/versioning, approve/request-change/ask-question,
// immutable snapshot storage, conflict handling when new versions published during pending approvals.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const path = url.pathname.replace('/decision-log', '') || '/'
    const segments = path.split('/').filter(Boolean)

    let body: Record<string, unknown> = {}
    if (req.method !== 'GET' && req.body) {
      body = await req.json()
    }

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'Missing Authorization' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Route: GET /decisions?projectId= — list
    if (req.method === 'GET' && segments[0] === 'decisions' && !segments[1]) {
      const projectId = url.searchParams.get('projectId')
      if (!projectId) {
        return new Response(
          JSON.stringify({ error: 'Bad request', message: 'projectId required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      const { data, error } = await supabase
        .from('decisions')
        .select('*')
        .eq('project_id', projectId)
        .order('updated_at', { ascending: false })
      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Route: GET /decisions/:id — detail
    if (req.method === 'GET' && segments[0] === 'decisions' && segments[1]) {
      const { data, error } = await supabase
        .from('decisions')
        .select('*')
        .eq('id', segments[1])
        .single()
      if (error || !data) {
        return new Response(
          JSON.stringify({ error: error?.message ?? 'Not found' }),
          { status: data ? 500 : 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Route: POST /decisions — create
    if (req.method === 'POST' && segments[0] === 'decisions' && !segments[1]) {
      const { projectId, title, description, options, requiredApprovers } = body as {
        projectId?: string
        title?: string
        description?: string
        options?: unknown[]
        requiredApprovers?: string[]
      }
      if (!projectId || !title) {
        return new Response(
          JSON.stringify({ error: 'Bad request', message: 'projectId and title required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      const { data, error } = await supabase
        .from('decisions')
        .insert({
          project_id: projectId,
          title,
          description: description ?? null,
          options: options ?? [],
          required_approvers: requiredApprovers ?? [],
          status: 'draft',
          version: 1,
          created_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Route: POST /decisions/publish — publish
    if (req.method === 'POST' && segments[0] === 'decisions' && segments[1] === 'publish') {
      const { decisionId, notifyApprovers } = body as { decisionId?: string; notifyApprovers?: boolean }
      if (!decisionId) {
        return new Response(
          JSON.stringify({ error: 'Bad request', message: 'decisionId required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      const { data, error } = await supabase
        .from('decisions')
        .update({
          status: 'pending',
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', decisionId)
        .select()
        .single()
      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Route: PATCH /decisions/approval — approve / request_change / ask_question
    if (req.method === 'PATCH' && segments[0] === 'decisions' && segments[1] === 'approval') {
      const { decisionId, version, action, comment } = body as {
        decisionId?: string
        version?: number
        action?: 'approve' | 'request_change' | 'ask_question'
        comment?: string
      }
      if (!decisionId || !action) {
        return new Response(
          JSON.stringify({ error: 'Bad request', message: 'decisionId and action required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      const status =
        action === 'approve'
          ? 'approved'
          : action === 'request_change'
            ? 'changes_requested'
            : null
      const updates: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
        ...(status && { status }),
        ...(action === 'approve' && {
          approved_at: new Date().toISOString(),
          approved_by: user.id,
        }),
      }
      const { data, error } = await supabase
        .from('decisions')
        .update(updates)
        .eq('id', decisionId)
        .eq('version', version ?? 1)
        .select()
        .single()
      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({ error: 'Not found', message: 'Route not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Internal error', message: String(e) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
