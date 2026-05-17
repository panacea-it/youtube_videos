import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, PanelLeftClose, PanelLeftOpen, Play } from 'lucide-react'
import { cn } from '../../utils/cn'
import { SIDEBAR_DASHBOARD, SIDEBAR_GROUPS, getGroupIdForPath } from '../../constants/navigation'

const childActive = 'bg-white/12 text-white ring-1 ring-white/10'
const childIdle = 'text-slate-300 hover:bg-white/8 hover:text-white'

function TooltipLabel({ children }) {
  return (
    <span className="pointer-events-none absolute left-[4.25rem] top-1/2 z-50 hidden -translate-y-1/2 rounded-lg bg-slate-950 px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-xl transition group-hover/navitem:block group-hover/navitem:opacity-100">
      {children}
    </span>
  )
}

function SubNavLink({ to, label, icon: Icon, onNavigate, isCollapsed }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      end
      className={({ isActive }) =>
        cn(
          'group/navitem relative flex min-h-10 items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all',
          isCollapsed ? 'justify-center px-2' : 'pl-10',
          isActive ? childActive : childIdle,
        )
      }
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {!isCollapsed && <span className="min-w-0 truncate">{label}</span>}
      {isCollapsed && <TooltipLabel>{label}</TooltipLabel>}
    </NavLink>
  )
}

function NavGroup({ group, isOpen, onToggle, onNavigate, isCollapsed }) {
  const { label, icon: Icon, children } = group
  const location = useLocation()
  const hasActiveChild = children.some(
    (c) => location.pathname === c.path || location.pathname.startsWith(`${c.path}/`),
  )

  if (isCollapsed) {
    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'group/navitem relative flex h-11 w-full items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/8 hover:text-white',
            hasActiveChild && 'bg-white/12 text-white ring-1 ring-white/10',
          )}
          aria-label={label}
          title={label}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
          <TooltipLabel>{label}</TooltipLabel>
        </button>
        {isOpen && (
          <div className="space-y-1">
            {children.map((child) => (
              <SubNavLink
                key={child.path}
                to={child.path}
                label={child.label}
                icon={child.icon}
                isCollapsed
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('overflow-hidden rounded-2xl py-1 transition', isOpen && 'bg-white/6')}>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-slate-200 transition hover:bg-white/8',
          hasActiveChild && 'text-white',
        )}
      >
        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} />
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 opacity-80 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className="flex flex-col gap-0.5 px-2 pb-2">
          {children.map((child) => (
            <SubNavLink
              key={child.path}
              to={child.path}
              label={child.label}
              icon={child.icon}
              onNavigate={onNavigate}
              isCollapsed={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar({ isOpen, isMobile, isCollapsed, onClose, onToggleCollapse }) {
  const location = useLocation()
  const [openGroups, setOpenGroups] = useState(() => {
    const active = getGroupIdForPath(location.pathname)
    return active ? { [active]: true } : { operations: true, insights: true }
  })

  useEffect(() => {
    const active = getGroupIdForPath(location.pathname)
    if (active) setOpenGroups((prev) => ({ ...prev, [active]: true }))
  }, [location.pathname])

  const toggleGroup = (id) => setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  const desktopCollapsed = isCollapsed && !isMobile

  const sidebar = (
    <aside
      className={cn(
        'flex h-full shrink-0 flex-col border-r border-white/10 bg-slate-950 text-slate-100 transition-[width] duration-300',
        desktopCollapsed ? 'w-[84px]' : 'w-[286px]',
      )}
    >
      <div className={cn('flex items-center gap-3 border-b border-white/10 px-4 py-4', desktopCollapsed && 'justify-center px-3')}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ff0000] shadow-lg shadow-red-500/25">
          <Play className="h-4 w-4 fill-white text-white" />
        </div>
        {!desktopCollapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-black tracking-tight text-white">ChannelOps Enterprise</p>
            <p className="truncate text-[11px] font-medium text-slate-400">50+ channel command center</p>
          </div>
        )}
      </div>

      <nav className="scrollbar-thin flex-1 space-y-2 overflow-y-auto px-3 py-4">
        <NavLink
          to={SIDEBAR_DASHBOARD.path}
          onClick={onClose}
          end
          className={({ isActive }) =>
            cn(
              'group/navitem relative mb-2 flex min-h-[44px] items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[14px] font-bold transition-all',
              desktopCollapsed && 'justify-center px-2',
              isActive ? 'bg-white text-slate-950 shadow-xl shadow-white/10' : 'text-slate-200 hover:bg-white/8 hover:text-white',
            )
          }
        >
          <SIDEBAR_DASHBOARD.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
          {!desktopCollapsed && SIDEBAR_DASHBOARD.label}
          {desktopCollapsed && <TooltipLabel>{SIDEBAR_DASHBOARD.label}</TooltipLabel>}
        </NavLink>

        {SIDEBAR_GROUPS.map((group) => (
          <NavGroup
            key={group.id}
            group={group}
            isOpen={Boolean(openGroups[group.id])}
            onToggle={() => toggleGroup(group.id)}
            onNavigate={onClose}
            isCollapsed={desktopCollapsed}
          />
        ))}
      </nav>

      <div className={cn('border-t border-white/10 p-3', desktopCollapsed && 'flex justify-center')}>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden h-10 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-slate-300 transition hover:bg-white/8 hover:text-white lg:flex"
          aria-label="Toggle sidebar collapse"
        >
          {desktopCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          {!desktopCollapsed && 'Collapse'}
        </button>
      </div>
    </aside>
  )

  const bottomNavItems = [
    SIDEBAR_DASHBOARD,
    SIDEBAR_GROUPS[0].children[2],
    SIDEBAR_GROUPS[1].children[0],
    SIDEBAR_GROUPS[2].children[1],
  ]

  if (!isMobile) return sidebar

  return (
    <>
      {isOpen && (
        <button type="button" className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} aria-label="Close menu" />
      )}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 transition-transform duration-200 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {sidebar}
      </div>
      <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-4 rounded-2xl border border-slate-200 bg-white/95 p-1 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold transition',
                isActive
                  ? 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300'
                  : 'text-slate-500 dark:text-slate-400',
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span className="max-w-full truncate">{item.label.replace(' Management', '')}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
