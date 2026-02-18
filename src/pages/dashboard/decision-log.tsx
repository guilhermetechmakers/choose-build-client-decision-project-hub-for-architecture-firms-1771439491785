import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

const mockDecisions = [
  {
    id: '1',
    title: 'Kitchen finish options',
    description: 'Select counter and cabinet finish.',
    status: 'pending' as const,
    costDelta: 2400,
    lastActivity: '1h ago',
    thumbnail: null,
  },
  {
    id: '2',
    title: 'Exterior material palette',
    description: 'Siding and trim materials.',
    status: 'approved' as const,
    costDelta: 0,
    lastActivity: '2 days ago',
    thumbnail: null,
  },
  {
    id: '3',
    title: 'Flooring selection',
    description: 'Main floor and bedrooms.',
    status: 'changes_requested' as const,
    costDelta: 1800,
    lastActivity: '5h ago',
    thumbnail: null,
  },
]

export function DecisionLogPage() {
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = mockDecisions.find((d) => d.id === selectedId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Decision log</h1>
          <p className="text-muted-foreground">
            All decision cards. Open one to view details, approvals, and audit
            log.
          </p>
        </div>
        <Button variant="accent" asChild>
          <Link to="/dashboard/decisions/new">
            <Plus className="h-4 w-4" />
            New decision
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search decisions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Decision list - cards on mobile, table-like on desktop */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockDecisions.map((d) => (
          <Card
            key={d.id}
            className="cursor-pointer transition-all hover:shadow-card-hover"
            onClick={() => setSelectedId(d.id)}
          >
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{d.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {d.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge
                      variant={
                        d.status === 'approved'
                          ? 'success'
                          : d.status === 'changes_requested'
                            ? 'warning'
                            : 'accent'
                      }
                    >
                      {d.status.replace('_', ' ')}
                    </Badge>
                    {d.costDelta !== 0 && (
                      <span className="text-xs text-muted-foreground">
                        ${d.costDelta.toLocaleString()} delta
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {d.lastActivity}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail drawer */}
      <Sheet open={!!selectedId} onOpenChange={(o) => !o && setSelectedId(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.title}</SheetTitle>
                <SheetDescription>{selected.description}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    variant={
                      selected.status === 'approved'
                        ? 'success'
                        : selected.status === 'changes_requested'
                          ? 'warning'
                          : 'accent'
                    }
                  >
                    {selected.status.replace('_', ' ')}
                  </Badge>
                </div>
                {selected.costDelta !== 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Cost impact
                    </p>
                    <p className="font-medium">
                      ${selected.costDelta.toLocaleString()}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Options & recommendation
                  </p>
                  <p className="text-sm">
                    View gallery, PDFs, and recommendation in the full decision
                    view.
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="accent" className="flex-1">
                    Approve
                  </Button>
                  <Button variant="outline">Request change</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Version history and audit log available in the full view.
                </p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
