import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import LoginPage from '../pages/auth/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from './ProtectedRoute'
import GuestRoute from './GuestRoute'
import { MODULE_ROUTE_ELEMENTS } from './moduleRoutes'

const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'))

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6">
      <div className="surface-card rounded-2xl px-5 py-4 text-sm font-semibold text-[rgb(var(--muted-foreground))]">
        Loading workspace...
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          {MODULE_ROUTE_ELEMENTS.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
