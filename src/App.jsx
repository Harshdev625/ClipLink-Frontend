import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { hydrate } from './features/auth/authSlice';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CreateLinkPage from './pages/CreateLinkPage';
import ViewLinkStats from './pages/ViewLinkStats';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { user, isHydrated } = useSelector((state) => state.auth);

  // Hydrate from localStorage on initial load
  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);

  // Wait until hydration is done
  if (!isHydrated) return null; // Or a loader if you'd like

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
  );
}

export default App;
