import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/apiService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'buyer',
    phone: '',
    country: 'UAE'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'buyer', label: 'Buyer - Purchase Carbon Credits' },
    { value: 'seller', label: 'Seller - Sell Carbon Credits' },
    { value: 'investor', label: 'Investor - Invest in IZRA Token' },
    { value: 'sponsor', label: 'Sponsor - Plant Trees in UAE' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e?.target?.name]: e?.target?.value
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData?.email?.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!formData?.fullName?.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }

    if (formData?.password !== formData?.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData?.password?.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData?.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Prepare registration data, omitting empty fields
      const registrationData = {
        email: formData?.email,
        password: formData?.password,
        role: formData?.role,
        profile: {
          fullName: formData?.fullName,
          country: formData?.country
        }
      };

      // Only include phone if it's not empty
      if (formData?.phone?.trim()) {
        registrationData.profile.phone = formData?.phone;
      }

      console.log('Sending registration data:', registrationData);
      const response = await authService.register(registrationData);

      if (!response.success) {
      // Handle detailed validation errors with user-friendly messages
      if (response.errors && Array.isArray(response.errors)) {
        const userFriendlyErrors = response.errors.map(err => {
          // Convert technical validation messages to user-friendly ones
          switch (err.field) {
            case 'email':
              if (err.message.includes('not allowed to be empty')) {
                return '• Please enter your email address';
              } else if (err.message.includes('valid email')) {
                return '• Please enter a valid email address (like name@example.com)';
              }
              return `• Email: ${err.message}`;
            
            case 'password':
              if (err.message.includes('at least 6 characters')) {
                return '• Password must be at least 6 characters long';
              }
              return `• Password: ${err.message}`;
            
            case 'profile.fullName':
              if (err.message.includes('not allowed to be empty')) {
                return '• Please enter your full name';
              } else if (err.message.includes('at least 2 characters')) {
                return '• Full name must be at least 2 characters long';
              } else if (err.message.includes('cannot exceed 100 characters')) {
                return '• Full name is too long (maximum 100 characters)';
              }
              return `• Full name: ${err.message}`;
            
            case 'profile.phone':
              if (err.message.includes('not allowed to be empty')) {
                return '• Please enter a valid phone number or remove the phone field';
              } else if (err.message.includes('valid phone')) {
                return '• Please enter a valid phone number (like +971 50 123 4567)';
              }
              return `• Phone: ${err.message}`;
            
            case 'role':
              return '• Please select a valid user role';
            
            default:
              return `• ${err.field}: ${err.message}`;
          }
        });
        
        setError(userFriendlyErrors.join('\n'));
      } else {
        // Handle general errors with user-friendly messages
        let friendlyMessage = response.message || 'Registration failed';
        
        // Convert common backend errors to user-friendly messages
        if (friendlyMessage.includes('Email already exists')) {
          friendlyMessage = 'This email address is already registered. Try logging in or use a different email.';
        } else if (friendlyMessage.includes('Validation failed')) {
          friendlyMessage = 'Please check all fields and try again.';
        } else if (friendlyMessage.includes('Database error')) {
          friendlyMessage = 'Something went wrong. Please try again in a moment.';
        }
        
        setError(friendlyMessage);
      }
      setLoading(false);
      return;
    }

      setSuccess(true);
      setLoading(false);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'An error occurred during signup');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Account Created Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your account has been created successfully! You can now log in.
            </p>
            <Button
              onClick={() => navigate('/login')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Go to Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Join IZRA Platform
            </h1>
            <p className="text-gray-600">
              Create your account to start your carbon offset journey
            </p>
          </div>

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
                    Please fix the following issues:
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <pre className="whitespace-pre-wrap font-sans">{error}</pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData?.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData?.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <Select
                id="role"
                name="role"
                value={formData?.role}
                onChange={handleChange}
                options={roleOptions}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData?.phone}
                onChange={handleChange}
                placeholder="+971 50 123 4567"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData?.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData?.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}