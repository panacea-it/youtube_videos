import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f9f9f9] px-4 text-center">
      <p className="text-6xl font-bold text-[#ff0000]">404</p>
      <h1 className="text-xl font-bold text-[#0f0f0f]">Page not found</h1>
      <Link to="/dashboard" className="rounded-full bg-[#065fd4] px-5 py-2 text-sm font-medium text-white hover:bg-[#0556c2]">
        Back to dashboard
      </Link>
    </div>
  )
}
