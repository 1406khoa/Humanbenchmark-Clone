import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { Login } from '../components/auth/Login';
import { SignUp } from '../components/auth/SignUp';

function Auth() {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(!searchParams.get('signup'));

  useEffect(() => {
    setIsLogin(!searchParams.get('signup'));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">Human Benchmark</span>
              </Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-gray-600">Track your progress and compete with others</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 flex">
              <div 
                className="w-1/2 bg-indigo-600 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${isLogin ? '0%' : '100%'})` }}
              />
            </div>

            <div className="relative grid grid-cols-2 text-sm font-medium">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-3 transition-colors duration-200 ${
                  isLogin ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-3 transition-colors duration-200 ${
                  !isLogin ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLogin ? <Login /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;