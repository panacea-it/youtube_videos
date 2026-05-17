import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster position="top-right" richColors closeButton />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}
