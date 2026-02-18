import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  MessageSquare,
  FileText,
  Calendar,
  LayoutTemplate,
  BarChart3,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  HelpCircle,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const SIDEBAR_STORAGE_KEY = 'choose-build-sidebar-collapsed'

const mainNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { to: '/dashboard/decisions', label: 'Decision Log', icon: ClipboardList },
  { to: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { to: '/dashboard/files', label: 'Files & Drawings', icon: FileText },
  { to: '/dashboard/meetings', label: 'Meetings', icon: Calendar },
  { to: '/dashboard/templates', label: 'Templates', icon: LayoutTemplate },
  { to: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
]

const bottomNav = [
  { to: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  { to: '/admin', label: 'Admin', icon: Shield },
  { to: '/help', label: 'Help', icon: HelpCircle },
]

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const location = useLocation()

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed))
    } catch {
      // ignore
    }
  }, [collapsed])

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-border bg-card transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
      aria-label="Main navigation"
    >
      <div className="flex h-14 items-center gap-2 border-b border-border px-3">
        {!collapsed && (
          <span className="truncate text-lg font-semibold text-primary">
            Choose & Build
          </span>
        )}
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-auto p-2">
        {!collapsed && (
          <div className="px-2 py-2">
            <Button variant="accent" size="sm" className="w-full gap-2" asChild>
              <NavLink to="/dashboard/decisions/new">
                <Plus className="h-4 w-4" />
                New Decision
              </NavLink>
            </Button>
          </div>
        )}
        {collapsed && (
          <Button variant="outline" size="icon" className="mx-auto" asChild>
            <NavLink to="/dashboard/decisions/new" title="New Decision">
              <Plus className="h-4 w-4" />
            </NavLink>
          </Button>
        )}
        <Separator className="my-1" />
        {mainNav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent',
              location.pathname === to || location.pathname.startsWith(to + '/')
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground',
              collapsed && 'justify-center px-0'
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
        <div className="mt-auto">
          <Separator className="my-1" />
          {bottomNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent',
                location.pathname === to
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground',
                collapsed && 'justify-center px-0'
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="border-t border-border p-2">
        <Button
          variant="ghost"
          size={collapsed ? 'icon' : 'sm'}
          className="w-full gap-2"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              Collapse
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}
