import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './routes/Router.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SnackbarProvider>
        <Router />
      </SnackbarProvider>
    </AuthProvider>
  </StrictMode>,
)
