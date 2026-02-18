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

const firmSignupSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  adminEmail: z.string().email('Enter a valid admin email'),
  adminName: z.string().min(1, 'Admin contact name is required'),
})

export type FirmSignupFormValues = z.infer<typeof firmSignupSchema>

export interface SignupCTAProps {
  onSubmit: (data: FirmSignupFormValues) => Promise<void>
  isSubmitting?: boolean
  className?: string
}

/**
 * Signup CTA: firm sign-up flow with company name and admin contact.
 */
export function SignupCTA({
  onSubmit,
  isSubmitting = false,
  className,
}: SignupCTAProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FirmSignupFormValues>({
    resolver: zodResolver(firmSignupSchema),
    defaultValues: { companyName: '', adminEmail: '', adminName: '' },
  })

  return (
    <Card
      className={cn(
        'border-border bg-card/95 shadow-card backdrop-blur-sm transition-all duration-300 hover:shadow-card-hover',
        className
      )}
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Create your firm account</CardTitle>
        <CardDescription>
          Start with your company details and admin contact. We&apos;ll guide you through onboarding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="firm-company">Company name</Label>
            <Input
              id="firm-company"
              placeholder="Acme Architecture"
              autoComplete="organization"
              aria-invalid={Boolean(errors.companyName)}
              className={cn(errors.companyName && 'border-destructive')}
              {...register('companyName')}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive" role="alert">
                {errors.companyName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="firm-admin-name">Admin contact name</Label>
            <Input
              id="firm-admin-name"
              placeholder="Jane Smith"
              autoComplete="name"
              aria-invalid={Boolean(errors.adminName)}
              className={cn(errors.adminName && 'border-destructive')}
              {...register('adminName')}
            />
            {errors.adminName && (
              <p className="text-sm text-destructive" role="alert">
                {errors.adminName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="firm-admin-email">Admin email</Label>
            <Input
              id="firm-admin-email"
              type="email"
              placeholder="admin@firm.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.adminEmail)}
              className={cn(errors.adminEmail && 'border-destructive')}
              {...register('adminEmail')}
            />
            {errors.adminEmail && (
              <p className="text-sm text-destructive" role="alert">
                {errors.adminEmail.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="accent"
            className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Creating account…' : 'Start firm sign-up'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
