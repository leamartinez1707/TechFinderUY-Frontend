import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './routes/Router.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { SnackbarProvider } from 'notistack'
import { UsersProvider } from './context/UsersContext.tsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UsersProvider>
        <SnackbarProvider>
          <Router />
        </SnackbarProvider>
      </UsersProvider>
    </AuthProvider>
  </StrictMode>,
)
