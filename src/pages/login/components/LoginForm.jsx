import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJWTAuth } from '../../../contexts/JWTAuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useJWTAuth();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        // Convert technical errors to user-friendly messages
        let friendlyMessage = signInError?.message || 'Login failed';
        
        if (friendlyMessage.includes('Invalid credentials')) {
          friendlyMessage = 'Incorrect email or password. Please try again.';
        } else if (friendlyMessage.includes('User not found')) {
          friendlyMessage = 'No account found with this email address.';
        } else if (friendlyMessage.includes('Validation failed')) {
          friendlyMessage = 'Please check your email and password and try again.';
        } else if (friendlyMessage.includes('Email address is required')) {
          friendlyMessage = 'Please enter your email address.';
        } else if (friendlyMessage.includes('Password is required')) {
          friendlyMessage = 'Please enter your password.';
        } else if (friendlyMessage.includes('valid email')) {
          friendlyMessage = 'Please enter a valid email address.';
        }
        
        setError(friendlyMessage);
        setLoading(false);
        return;
      }

      // Navigation is handled by RoleDashboardRouter component
      navigate('/dashboard');
    } catch (err) {
      let friendlyMessage = err?.message || 'An error occurred during login';
      
      if (friendlyMessage.includes('Network Error')) {
        friendlyMessage = 'Unable to connect. Please check your internet connection.';
      } else if (friendlyMessage.includes('timeout')) {
        friendlyMessage = 'Request timed out. Please try again.';
      }
      
      setError(friendlyMessage);
      setLoading(false);
    }
  };

  const handleDemoCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign in to IZRA Platform
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Login issue:
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e?.target?.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Demo Credentials Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleDemoCredentials('admin@izra.ae', 'admin123')}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">Admin:</span>{' '}
              <span className="text-gray-600">admin@izra.ae / admin123</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoCredentials('seller@izra.ae', 'seller123')}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">Seller:</span>{' '}
              <span className="text-gray-600">seller@izra.ae / seller123</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoCredentials('buyer@izra.ae', 'buyer123')}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">Buyer:</span>{' '}
              <span className="text-gray-600">buyer@izra.ae / buyer123</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoCredentials('investor@izra.ae', 'investor123')}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">Investor:</span>{' '}
              <span className="text-gray-600">investor@izra.ae / investor123</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoCredentials('sponsor@izra.ae', 'sponsor123')}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">Sponsor:</span>{' '}
              <span className="text-gray-600">sponsor@izra.ae / sponsor123</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}