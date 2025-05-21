import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Mail, Lock, LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to home
  const from = (location.state as any)?.from?.pathname || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await login(email, password);
      // Redirect to the page they tried to visit or home
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Demo credentials
  const setAdminCredentials = () => {
    setEmail('shiyasv999@gmail.com');
    setPassword('shiyasv7736612120');
  };
  
  const setUserCredentials = () => {
    setEmail('user@offzone.com');
    setPassword('user123');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">
            Sign in to access your OffZone account
          </p>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start animate-fade-in">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-red-700">{error}</span>
          </div>
        )}
        
        {/* Login form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="label flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input mt-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="label flex items-center gap-2">
                <Lock size={16} className="text-gray-500" />
                Password
              </label>
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input mt-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your password"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full btn btn-primary py-3 flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign in</span>
                </>
              )}
            </button>
          </div>
        </form>
        
        {/* Demo account buttons */}
        <div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Quick access</span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={setAdminCredentials}
              className="btn bg-primary-50 text-primary-700 hover:bg-primary-100 flex justify-center py-2 px-4 text-sm font-medium transition-colors"
            >
              Admin Login
            </button>
            <button
              type="button"
              onClick={setUserCredentials}
              className="btn bg-accent-50 text-accent-700 hover:bg-accent-100 flex justify-center py-2 px-4 text-sm font-medium transition-colors"
            >
              Demo User
            </button>
          </div>
        </div>
        
        {/* Sign up link */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;