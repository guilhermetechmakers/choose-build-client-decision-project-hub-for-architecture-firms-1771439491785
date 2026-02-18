import { useState } from 'react'
import { FolderOpen, FileText, Upload, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const mockFolders = [
  { id: '1', name: 'Drawings', count: 12 },
  { id: '2', name: 'Specs', count: 5 },
]
const mockFiles = [
  { id: '1', name: 'A-101 Floor Plan.pdf', size: '2.4 MB', linkedDecision: 'Kitchen finish' },
  { id: '2', name: 'Material Board v2.pdf', size: '1.1 MB', linkedDecision: null },
]

export function FilesPage() {
  const [path, setPath] = useState<string[]>([])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Files & drawings</h1>
          <p className="text-muted-foreground">
            Project assets with versions and link-to-decision.
          </p>
        </div>
        <Button variant="accent">
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </div>

      <div className="flex gap-4">
        {/* Folder browser */}
        <Card className="w-64 shrink-0">
          <CardContent className="p-2">
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">
              <FolderOpen className="h-4 w-4" />
              Project files
            </div>
            <ul className="mt-1 space-y-0.5">
              {mockFolders.map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => setPath([f.name])}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted/50"
                  >
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    {f.name}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {f.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* File list */}
        <Card className="min-w-0 flex-1">
          <CardContent className="p-4">
            {path.length > 0 && (
              <p className="mb-4 text-sm text-muted-foreground">
                / {path.join(' / ')}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Input placeholder="Search files…" className="max-w-xs" />
              <Button variant="outline" size="sm">
                Link to decision
                <Link2 className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <ul className="mt-4 space-y-2">
              {mockFiles.map((f) => (
                <li
                  key={f.id}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30'
                  )}
                >
                  <FileText className="h-8 w-8 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{f.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {f.size}
                      {f.linkedDecision && (
                        <> · Linked: {f.linkedDecision}</>
                      )}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Preview
                  </Button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Full-width viewer with metadata pane and version history in detail
              view.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
