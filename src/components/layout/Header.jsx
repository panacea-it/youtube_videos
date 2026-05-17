import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell,
  ChevronsUpDown,
  Command,
  Download,
  LogOut,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sun,
  Upload,
  User,
  X,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { notifications, searchSuggestions } from '../../data/enterpriseData'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { SearchInput } from '../ui/input'

export default function Header({ onMenuClick, onSidebarCollapse, isSidebarCollapsed }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]/90 px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onSidebarCollapse}
        className="hidden h-10 w-10 items-center justify-center rounded-xl text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] lg:inline-flex"
        aria-label="Collapse sidebar"
      >
        {isSidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
      </button>

      <div className="hidden min-w-0 flex-1 md:block">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">Enterprise Command Center</p>
        <p className="truncate text-base font-black text-[rgb(var(--foreground))]">Multi-Channel YouTube Management Platform</p>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="hidden h-10 min-w-[260px] items-center justify-between rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/60 px-3 text-sm text-[rgb(var(--muted-foreground))] transition hover:bg-[rgb(var(--muted))] xl:flex"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search channels, videos, reports...
            </span>
            <kbd className="rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-1.5 py-0.5 text-[10px] font-bold">
              Ctrl K
            </kbd>
          </button>
        </DialogTrigger>
        <DialogContent className="overflow-hidden p-0" aria-describedby="global-search-description">
          <DialogHeader>
            <DialogTitle>Global search</DialogTitle>
            <DialogDescription id="global-search-description">
              Jump to videos, channels, analytics, AI tools, settings, and reports.
            </DialogDescription>
          </DialogHeader>
          <div className="p-5">
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try: revenue alerts, AI title generator, Creator Ops Lab"
              autoFocus
              className="max-w-none"
            />
            <div className="mt-4 space-y-2">
              {searchSuggestions
                .filter((item) => item.label.toLowerCase().includes(query.toLowerCase()) || !query)
                .map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => {
                      navigate(item.path)
                      setSearchOpen(false)
                    }}
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[rgb(var(--muted))]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-[rgb(var(--foreground))]">{item.label}</span>
                  </button>
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="xl:hidden"
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button type="button" className="hidden sm:inline-flex">
          <Upload className="h-4 w-4" />
          Bulk upload
        </Button>
        <Button type="button" variant="outline" className="hidden lg:inline-flex">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </Button>
          </DialogTrigger>
          <DialogContent side="right">
            <DialogHeader>
              <DialogTitle>Notification center</DialogTitle>
              <DialogDescription>Real-time upload, revenue, copyright, and team alerts.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 p-5">
              {notifications.map((notification) => (
                <article key={notification.id} className="rounded-2xl border border-[rgb(var(--border))] p-4">
                  <div className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--muted))]">
                      <notification.icon className="h-5 w-5 text-[rgb(var(--foreground))]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-[rgb(var(--foreground))]">{notification.type}</p>
                        <Badge variant={notification.severity === 'danger' ? 'danger' : notification.severity}>
                          {notification.time}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">{notification.message}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] py-1 pl-1 pr-2 transition hover:bg-[rgb(var(--muted))]"
              aria-label="Open profile menu"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
                <User className="h-4 w-4" />
              </span>
              <span className="hidden min-w-0 text-left sm:block">
                <span className="block truncate text-xs font-bold text-[rgb(var(--foreground))]">{user?.name}</span>
                <span className="block truncate text-[11px] text-[rgb(var(--muted-foreground))]">Super Admin</span>
              </span>
              <ChevronsUpDown className="hidden h-3.5 w-3.5 text-[rgb(var(--muted-foreground))] sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="px-3 py-2">
              <p className="text-sm font-bold text-[rgb(var(--foreground))]">{user?.name}</p>
              <p className="text-xs text-[rgb(var(--muted-foreground))]">{user?.email}</p>
            </div>
            <DropdownMenuSeparator className="my-2 h-px bg-[rgb(var(--border))]" />
            <DropdownMenuItem onSelect={() => navigate('/settings')}>
              <Command className="h-4 w-4" />
              Workspace settings
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              Switch to {theme === 'dark' ? 'light' : 'dark'} mode
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2 h-px bg-[rgb(var(--border))]" />
            <DropdownMenuItem onSelect={logout} className="text-red-600 dark:text-red-300">
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button type="button" variant="ghost" size="icon" className="hidden" aria-label="Close">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
