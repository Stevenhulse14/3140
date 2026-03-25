/**
 * React entry: mounts <App /> into #root.
 *
 * StrictMode double-invokes some lifecycles in dev to surface side effects;
 * production behavior is unchanged.
 *
 * Global styles: index.css (layout/theme) + React Toastify base CSS (toast skins).
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
