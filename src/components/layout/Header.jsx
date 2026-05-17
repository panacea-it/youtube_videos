import { Menu, Bell, Upload, User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex min-h-14 items-center justify-between gap-4 border-b border-[#e5e5e5] bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0f0f0f] hover:bg-[#f2f2f2] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden flex-1 sm:block">
        <p className="text-sm font-medium text-[#606060]">Channel overview</p>
        <p className="text-base font-bold text-[#0f0f0f]">YouTube Videos — Video Studio</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="hidden items-center gap-2 rounded-full bg-[#ff0000] px-4 py-2 text-sm font-medium text-white hover:bg-[#cc0000] sm:inline-flex"
        >
          <Upload className="h-4 w-4" />
          Upload
        </button>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0f0f0f] hover:bg-[#f2f2f2]"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-[#e5e5e5] py-1 pl-1 pr-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#065fd4] text-white">
            <User className="h-4 w-4" />
          </span>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-xs font-semibold text-[#0f0f0f]">{user?.name}</p>
            <button type="button" onClick={logout} className="text-[11px] text-[#606060] hover:text-[#065fd4]">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
