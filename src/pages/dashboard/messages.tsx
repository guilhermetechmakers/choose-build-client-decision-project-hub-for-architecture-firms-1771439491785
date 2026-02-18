import { useState } from 'react'
import { Search, MessageSquare, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const mockThreads = [
  { id: '1', subject: 'Kitchen finish options', resource: 'Decision', lastAt: '1h ago', unread: true },
  { id: '2', subject: 'Riverside - Floor plan', resource: 'File', lastAt: '3h ago', unread: false },
]

export function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 animate-fade-in md:flex-row">
      <Card className="flex flex-1 flex-col overflow-hidden md:max-w-sm">
        <div className="border-b border-border p-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search threads…" className="pl-9" />
          </div>
        </div>
        <CardContent className="flex-1 overflow-auto p-0">
          <ul>
            {mockThreads.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(t.id)}
                  className={cn(
                    'flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted/50',
                    selectedId === t.id && 'bg-primary/10'
                  )}
                >
                  <MessageSquare className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className={cn('truncate font-medium', t.unread && 'text-primary')}>
                      {t.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.resource} · {t.lastAt}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="flex flex-1 flex-col overflow-hidden">
        <CardContent className="flex flex-1 flex-col p-0">
          {selectedId ? (
            <>
              <div className="border-b border-border p-4">
                <h2 className="font-semibold">
                  {mockThreads.find((t) => t.id === selectedId)?.subject}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Contextual thread — attach to decisions, files, tasks.
                </p>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <p className="text-sm text-muted-foreground">
                  Messages appear here. Composer below with attachments and
                  read receipts.
                </p>
              </div>
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Write a message…"
                    className="flex-1"
                  />
                  <Button variant="accent">Send</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              <p>Select a thread or start a new conversation from a decision or file.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
