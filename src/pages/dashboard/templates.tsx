import { Link } from 'react-router-dom'
import { LayoutTemplate, Plus, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockTemplates = [
  { id: '1', name: 'Residential - Single family', phases: 7, decisions: 12 },
  { id: '2', name: 'Commercial - Office fit-out', phases: 6, decisions: 8 },
]

export function TemplatesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Templates library</h1>
          <p className="text-muted-foreground">
            Reusable project and decision templates. Apply to new projects.
          </p>
        </div>
        <Button variant="accent">
          <Plus className="h-4 w-4" />
          New template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockTemplates.map((t) => (
          <Card key={t.id} className="transition-shadow hover:shadow-card-hover">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <LayoutTemplate className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{t.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {t.phases} phases · {t.decisions} decision sets
              </p>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Edit
              </Button>
              <Button variant="accent" size="sm" className="flex-1" asChild>
                <Link to="/dashboard/projects">
                  <Copy className="h-4 w-4" />
                  Apply
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Versioning and apply-template wizard to clone into new project with
        mapping rules.
      </p>
    </div>
  )
}
