import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Menu, Bell, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <AppSidebar />
        </SheetContent>
      </Sheet>
      <main className="flex flex-1 flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 justify-end gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Profile" asChild>
              <Link to="/dashboard/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </header>
        <div
          className={cn(
            'flex-1 p-4 md:p-6',
            'max-w-[1200px] mx-auto w-full'
          )}
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}
