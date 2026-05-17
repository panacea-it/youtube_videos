import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { clearAuth, getStoredUser, getToken, setStoredUser, setToken } from '../utils/authStorage'

const AuthContext = createContext(null)

const DEMO_USER = {
  id: '1',
  name: 'Studio Admin',
  email: 'admin@youtube-videos.com',
  role: 'superadmin',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    const token = getToken()
    const stored = getStoredUser()
    if (token && stored) setUser(stored)
    setLoading(false)
  }, [])

  const login = useCallback(async ({ email, password }) => {
    setAuthLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 400))
      if (!email || !password) throw new Error('Invalid credentials')
      const sessionUser = { ...DEMO_USER, email }
      setToken('demo-video-admin-token')
      setStoredUser(sessionUser)
      setUser(sessionUser)
      return sessionUser
    } finally {
      setAuthLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    clearAuth()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      authLoading,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, loading, authLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
