// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth)
  return token ? children : <Navigate to="/" />
}

export default ProtectedRoute
