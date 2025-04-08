import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { removeToken } from '../services/tokenHelper'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    removeToken()
    navigate('/')
  }

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-lg border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-xl md:text-2xl font-extrabold tracking-tight text-cyan-400 hover:text-cyan-300 transition-all duration-200"
          >
            🔗 ClipLink
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className="relative group text-sm font-medium"
            >
              <span className="text-gray-300 group-hover:text-cyan-400 transition">
                Dashboard
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/create"
              className="relative group text-sm font-medium"
            >
              <span className="text-gray-300 group-hover:text-cyan-400 transition">
                Create Link
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-400 truncate max-w-[160px]">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-1.5 rounded-lg text-sm transition-all duration-200 shadow-sm shadow-cyan-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="bg-neutral-800 hover:bg-neutral-700 text-cyan-300 px-4 py-1.5 rounded-lg text-sm border border-cyan-500 transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-cyan-400">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 space-y-2 pb-4 border-t border-neutral-700 pt-2">
            <Link
              to="/dashboard"
              className="block text-gray-300 hover:text-cyan-400 text-sm"
            >
              Dashboard
            </Link>
            <Link
              to="/create"
              className="block text-gray-300 hover:text-cyan-400 text-sm"
            >
              Create Link
            </Link>
            {user ? (
              <>
                <div className="text-sm text-gray-400">{user.email}</div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="block text-sm text-cyan-400 hover:text-cyan-300"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
