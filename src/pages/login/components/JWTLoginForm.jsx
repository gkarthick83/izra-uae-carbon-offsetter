import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJWTAuth } from '../../../contexts/JWTAuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function JWTLoginForm() {
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
        setError(signInError);
        setLoading(false);
        return;
      }

      // Navigate to dashboard on successful login
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2 text-center font-medium">
            Demo Credentials
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoCredentials('admin@izra.com', 'admin123')}
              className="p-2 bg-blue-100 hover:bg-blue-200 rounded text-blue-700"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoCredentials('seller@izra.com', 'seller123')}
              className="p-2 bg-green-100 hover:bg-green-200 rounded text-green-700"
            >
              Seller
            </button>
            <button
              type="button"
              onClick={() => handleDemoCredentials('buyer@izra.com', 'buyer123')}
              className="p-2 bg-purple-100 hover:bg-purple-200 rounded text-purple-700"
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => handleDemoCredentials('investor@izra.com', 'investor123')}
              className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded text-yellow-700"
            >
              Investor
            </button>
            <button
              type="button"
              onClick={() => handleDemoCredentials('sponsor@izra.com', 'sponsor123')}
              className="p-2 bg-pink-100 hover:bg-pink-200 rounded text-pink-700 col-span-2"
            >
              Sponsor
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-green-600 hover:text-green-700 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
