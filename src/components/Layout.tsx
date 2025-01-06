import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

export function Layout() {
  const { user, signOut } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification('Successfully signed out!', 'success');
      navigate('/');
    } catch (error) {
      showNotification('Failed to sign out', 'error');
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Navigation links for both desktop and mobile
  const navLinks = [
    { to: '/dashboard', label: 'DASHBOARD' },
    ...(user 
      ? [{ to: '#', label: 'SIGN OUT', onClick: handleSignOut }]
      : [
          { to: '/auth', label: 'SIGN IN' },
          { to: '/auth?signup=true', label: 'SIGN UP' }
        ]
    )
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">Human Benchmark</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map(({ to, label, onClick }) => 
                onClick ? (
                  <button
                    key={label}
                    onClick={onClick}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm tracking-wider"
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    key={label}
                    to={to}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm tracking-wider"
                  >
                    {label}
                  </Link>
                )
              )}
             
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`fixed inset-0 bg-white z-40 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          } md:hidden`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={closeMenu}
              className="p-1"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
          </div>
          <nav className="flex flex-col items-center w-full">
            {navLinks.map(({ to, label, onClick }) => 
              onClick ? (
                <button
                  key={label}
                  onClick={() => {
                    onClick();
                    closeMenu();
                  }}
                  className="w-full py-4 text-gray-900 hover:text-gray-600 transition-colors tracking-wider text-sm border-b border-indigo-100 text-center"
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={label}
                  to={to}
                  onClick={closeMenu}
                  className="w-full py-4 text-gray-900 hover:text-gray-600 transition-colors tracking-wider text-sm border-b border-indigo-100 text-center"
                >
                  {label}
                </Link>
              )
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}