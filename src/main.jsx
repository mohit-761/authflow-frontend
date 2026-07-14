import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
)

/**
 * "Context is only available to components that are descendants of its Provider.
 *  By wrapping <App />, every component in the application—Navbar, Login, Dashboard,
 *  Profile, and future components—can access the authentication state.
 *  If I wrapped only <Navbar />, only the Navbar and its children would have access."
 */
