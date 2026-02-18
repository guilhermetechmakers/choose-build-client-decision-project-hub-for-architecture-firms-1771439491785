import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => Promise<void>
  isSubmitting?: boolean
  className?: string
}

/**
 * Login form: email, password, remember me, submit button.
 */
export function LoginForm({
  onSubmit,
  isSubmitting = false,
  className,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-4', className)}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="you@firm.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'login-email-error' : undefined}
          className={cn(
            'transition-colors duration-200 focus-visible:ring-2',
            errors.email && 'border-destructive focus-visible:ring-destructive'
          )}
          {...register('email')}
        />
        {errors.email && (
          <p
            id="login-email-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          <Link
            to="/password-reset"
            className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? 'login-password-error' : undefined}
          className={cn(
            'transition-colors duration-200 focus-visible:ring-2',
            errors.password && 'border-destructive focus-visible:ring-destructive'
          )}
          {...register('password')}
        />
        {errors.password && (
          <p
            id="login-password-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          id="login-remember"
          type="checkbox"
          className="h-4 w-4 rounded border-input accent-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-describedby="login-remember-desc"
          {...register('rememberMe')}
        />
        <Label
          id="login-remember-desc"
          htmlFor="login-remember"
          className="cursor-pointer text-sm font-normal text-muted-foreground"
        >
          Remember me
        </Label>
      </div>
      <Button
        type="submit"
        variant="accent"
        className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
