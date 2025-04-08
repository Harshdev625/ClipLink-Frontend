import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import CreateLinkPage from './pages/CreateLinkPage'
import ViewLinkStats from './pages/ViewLinkStats'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/create'
          element={
            <ProtectedRoute>
              <CreateLinkPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/analytics/:shortCode'
          element={
            <ProtectedRoute>
              <ViewLinkStats />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
