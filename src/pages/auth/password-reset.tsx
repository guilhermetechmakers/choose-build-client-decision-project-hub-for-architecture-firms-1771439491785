import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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

const requestSchema = z.object({
  email: z.string().email('Enter a valid email'),
})

type RequestForm = z.infer<typeof requestSchema>

export function PasswordResetPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestForm>({
    resolver: zodResolver(requestSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: RequestForm) => {
    await new Promise((r) => setTimeout(r, 800))
    console.info('Password reset requested', data)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-block text-lg font-semibold text-primary"
        >
          Choose & Build
        </Link>
        <Card className="shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Reset password</CardTitle>
            <CardDescription>
              Enter your email and we&apos;ll send you a link to reset your
              password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@firm.com"
                  autoComplete="email"
                  className={cn(errors.email && 'border-destructive')}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="accent"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send reset link'}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              <Link to="/login" className="font-medium text-primary hover:underline">
                Back to log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
