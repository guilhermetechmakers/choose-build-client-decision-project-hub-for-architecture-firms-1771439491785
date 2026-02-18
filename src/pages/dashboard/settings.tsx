import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Project and account preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            When to receive email and in-app notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>New decision published</Label>
              <p className="text-sm text-muted-foreground">
                When a decision you need to approve is published
              </p>
            </div>
            <input type="checkbox" className="h-4 w-4" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Weekly digest</Label>
              <p className="text-sm text-muted-foreground">
                Summary of pending items and activity
              </p>
            </div>
            <input type="checkbox" className="h-4 w-4" />
          </div>
          <Button>Save</Button>
        </CardContent>
      </Card>
    </div>
  )
}
