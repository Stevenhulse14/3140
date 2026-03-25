import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext.jsx'
import { TrainerProvider } from './context/TrainerContext.jsx'
import { EncounterProvider } from './context/EncounterContext.jsx'
import { MainLayout } from './layouts/MainLayout.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'
import { PokemonDashboardPage } from './pages/PokemonDashboardPage.jsx'
import { FindPage } from './pages/FindPage.jsx'
import { TeamPage } from './pages/TeamPage.jsx'
import { BoxPage } from './pages/BoxPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        theme="dark"
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <AuthProvider>
        <TrainerProvider>
          <EncounterProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/pokemon"
                  element={
                    <ProtectedRoute>
                      <PokemonDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pokemon/find"
                  element={
                    <ProtectedRoute>
                      <FindPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pokemon/team"
                  element={
                    <ProtectedRoute>
                      <TeamPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pokemon/box"
                  element={
                    <ProtectedRoute>
                      <BoxPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </EncounterProvider>
        </TrainerProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
