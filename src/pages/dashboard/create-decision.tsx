import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

const step1Schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
})

type Step1Form = z.infer<typeof step1Schema>

const steps = [
  { id: 1, name: 'Info' },
  { id: 2, name: 'Options' },
  { id: 3, name: 'Cost & recommendation' },
  { id: 4, name: 'Audience & publish' },
]

export function CreateDecisionPage() {
  const [step, setStep] = useState(1)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Form>({
    resolver: zodResolver(step1Schema),
    defaultValues: { title: '', description: '' },
  })

  const onStep1 = (data: Step1Form) => {
    console.info(data)
    setStep(2)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/decisions">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Create decision
          </h1>
          <p className="text-muted-foreground">
            Multi-step publisher: info → options → cost → audience.
          </p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2">
        {steps.map((s) => (
          <div
            key={s.id}
            className={cn(
              'flex h-9 flex-1 items-center justify-center rounded-md text-sm font-medium transition-colors',
              step === s.id
                ? 'bg-primary text-primary-foreground'
                : step > s.id
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground'
            )}
          >
            {s.name}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Decision info'}
            {step === 2 && 'Options'}
            {step === 3 && 'Cost & recommendation'}
            {step === 4 && 'Audience & publish'}
          </CardTitle>
          <CardDescription>
            {step === 1 &&
              'Title and short description for this decision card.'}
            {step === 2 &&
              'Add options with images or PDFs. Mark the recommended option.'}
            {step === 3 &&
              'Cost deltas per option and your recommendation summary.'}
            {step === 4 &&
              'Choose who must approve and when to publish.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form
              onSubmit={handleSubmit(onStep1)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Kitchen finish options"
                  className={cn(errors.title && 'border-destructive')}
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  placeholder="Short context for the client"
                  {...register('description')}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="accent">
                  Next: Options
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
                <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">
                  Drag and drop option images or PDFs
                </p>
                <p className="text-sm text-muted-foreground">
                  Or click to browse. Add titles and cost deltas in the next
                  step.
                </p>
                <Button variant="outline" className="mt-4" type="button">
                  Upload
                </Button>
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button type="button" variant="accent" onClick={() => setStep(3)}>
                  Next: Cost & recommendation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Cost delta per option and recommendation text. (Form fields
                wired in full implementation.)
              </p>
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button type="button" variant="accent" onClick={() => setStep(4)}>
                  Next: Audience & publish
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select required approvers and schedule publish. Notifications
                sent on publish.
              </p>
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(3)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button variant="accent">Preview & publish</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
