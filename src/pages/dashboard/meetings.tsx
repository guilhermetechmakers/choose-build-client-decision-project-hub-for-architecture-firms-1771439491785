import { Calendar, Plus, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockMeetings = [
  { id: '1', title: 'Client review', date: '2025-03-20', time: '10:00', project: 'Riverside Residence', agenda: true },
  { id: '2', title: 'Design sync', date: '2025-03-22', time: '14:00', project: 'Riverside Residence', agenda: false },
]

export function MeetingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meetings & agendas</h1>
          <p className="text-muted-foreground">
            Schedule meetings, capture agendas and minutes, export PDFs.
          </p>
        </div>
        <Button variant="accent">
          <Plus className="h-4 w-4" />
          New meeting
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockMeetings.map((m) => (
          <Card key={m.id} className="transition-shadow hover:shadow-card-hover">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{m.title}</CardTitle>
                {m.agenda && (
                  <Badge variant="secondary">Agenda ready</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{m.project}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {m.date} at {m.time}
              </p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Agenda
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4" />
                  Minutes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Agenda builder links to decisions/drawings/tasks. Notes template and
        export minutes to PDF.
      </p>
    </div>
  )
}
