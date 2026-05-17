import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronUp, Play } from 'lucide-react'
import { cn } from '../../utils/cn'
import { SIDEBAR_DASHBOARD, SIDEBAR_GROUPS, getGroupIdForPath } from '../../constants/navigation'

const childActive = 'rounded-lg bg-[#3d3d3d] text-white'
const childIdle = 'rounded-lg text-[#f1f1f1] hover:bg-[#3d3d3d]/60'

function SubNavLink({ to, label, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      end
      className={({ isActive }) =>
        cn('block px-4 py-2.5 text-[13px] font-medium transition-colors', isActive ? childActive : childIdle)
      }
    >
      {label}
    </NavLink>
  )
}

function NavGroup({ group, isOpen, onToggle, onNavigate }) {
  const { label, icon: Icon, children } = group
  const location = useLocation()
  const hasActiveChild = children.some(
    (c) => location.pathname === c.path || location.pathname.startsWith(`${c.path}/`),
  )

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'flex w-full min-h-[44px] items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[14px] font-medium text-[#f1f1f1] transition-colors',
          hasActiveChild ? 'bg-[#3d3d3d]' : 'hover:bg-[#3d3d3d]/50',
        )}
      >
        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-80" />
      </button>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl bg-[#3d3d3d]/40 py-1">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full min-h-[44px] items-center gap-3 px-3.5 py-2.5 text-left text-[14px] font-medium text-[#f1f1f1]"
      >
        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <ChevronUp className="h-4 w-4 shrink-0 opacity-80" />
      </button>
      <div className="flex flex-col gap-0.5 px-2 pb-2">
        {children.map((child) => (
          <SubNavLink key={child.path} to={child.path} label={child.label} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  )
}

export default function Sidebar({ isOpen, isMobile, onClose }) {
  const location = useLocation()
  const [openGroups, setOpenGroups] = useState(() => {
    const active = getGroupIdForPath(location.pathname)
    return active ? { [active]: true } : { content: true }
  })

  useEffect(() => {
    const active = getGroupIdForPath(location.pathname)
    if (active) setOpenGroups((prev) => ({ ...prev, [active]: true }))
  }, [location.pathname])

  const toggleGroup = (id) => setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))

  const sidebar = (
    <aside className="flex h-full w-[240px] shrink-0 flex-col bg-[#0f0f0f] text-[#f1f1f1]">
      <div className="flex items-center gap-2 border-b border-[#272727] px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff0000]">
          <Play className="h-4 w-4 fill-white text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">YouTube Studio</p>
          <p className="truncate text-[11px] text-[#aaa]">Video admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <NavLink
          to={SIDEBAR_DASHBOARD.path}
          onClick={onClose}
          end
          className={({ isActive }) =>
            cn(
              'mb-2 flex min-h-[44px] items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors',
              isActive ? 'bg-[#3d3d3d] text-white' : 'text-[#f1f1f1] hover:bg-[#3d3d3d]/50',
            )
          }
        >
          <SIDEBAR_DASHBOARD.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
          {SIDEBAR_DASHBOARD.label}
        </NavLink>

        {SIDEBAR_GROUPS.map((group) => (
          <NavGroup
            key={group.id}
            group={group}
            isOpen={Boolean(openGroups[group.id])}
            onToggle={() => toggleGroup(group.id)}
            onNavigate={onClose}
          />
        ))}
      </nav>
    </aside>
  )

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
    </>
  )
}
