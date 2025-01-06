import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Brain, LogOut, Menu, X } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand - Always visible */}
            <Link to="/" className="flex items-center space-x-2 shrink-0" onClick={closeMenu}>
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">Human Benchmark</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/auth" 
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/auth?signup=true" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <Link
                to="/dashboard"
                className="block text-gray-600 hover:text-gray-900"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              {user ? (
                <>
                  <div className="py-2 text-sm text-gray-600">{user.email}</div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeMenu();
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/auth"
                    className="block text-gray-600 hover:text-gray-900"
                    onClick={closeMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?signup=true"
                    className="block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-center"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}