import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './Index.css'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../src/context/AuthContext';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
