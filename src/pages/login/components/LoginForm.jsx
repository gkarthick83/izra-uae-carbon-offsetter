import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError?.message);
        setLoading(false);
        return;
      }

      // Navigation is handled by RoleDashboardRouter component
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'An error occurred during login');
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
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
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