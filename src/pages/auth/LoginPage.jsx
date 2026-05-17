import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, Play } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, authLoading, isAuthenticated, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  useEffect(() => {
    if (!loading && isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, loading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields')
      return
    }
    try {
      await login(form)
      toast.success('Welcome to Studio')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      toast.error(err.message || 'Login failed')
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-[#212121] p-10 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff0000]">
            <Play className="h-6 w-6 fill-white text-white" />
          </div>
          <div>
            <p className="text-lg font-bold">YouTube Videos Studio</p>
            <p className="text-sm text-[#aaa]">Admin portal</p>
          </div>
        </div>
        <div>
          <h1 className="max-w-md text-3xl font-bold leading-tight">
            Manage videos like YouTube Studio
          </h1>
          <p className="mt-4 max-w-sm text-sm text-[#aaa]">
            Upload lectures, track analytics, moderate comments, and manage channels from one place.
          </p>
        </div>
        <p className="text-xs text-[#666]">Demo login â€” any email and password work locally.</p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#f9f9f9] px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[400px] rounded-2xl border border-[#e5e5e5] bg-white p-8 shadow-sm"
        >
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ff0000]">
              <Play className="h-5 w-5 fill-white text-white" />
            </div>
            <span className="font-bold text-[#0f0f0f]">YouTube Studio</span>
          </div>
          <h2 className="text-xl font-bold text-[#0f0f0f]">Sign in</h2>
          <p className="mt-1 text-sm text-[#606060]">Use your admin credentials</p>

          <label className="mt-6 block text-sm font-medium text-[#0f0f0f]">Email</label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#909090]" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="h-11 w-full rounded-lg border border-[#e5e5e5] pl-10 pr-3 text-sm outline-none focus:border-[#065fd4] focus:ring-1 focus:ring-[#065fd4]"
              placeholder="admin@youtube-videos.com"
            />
          </div>

          <label className="mt-4 block text-sm font-medium text-[#0f0f0f]">Password</label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#909090]" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="h-11 w-full rounded-lg border border-[#e5e5e5] pl-10 pr-10 text-sm outline-none focus:border-[#065fd4] focus:ring-1 focus:ring-[#065fd4]"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#909090]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="mt-6 h-11 w-full rounded-full bg-[#ff0000] text-sm font-medium text-white hover:bg-[#cc0000] disabled:opacity-60"
          >
            {authLoading ? 'Signing inâ€¦' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
