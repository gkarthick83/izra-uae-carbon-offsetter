import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/apiService';

const JWTAuthContext = createContext({})

export const useJWTAuth = () => {
  const context = useContext(JWTAuthContext)
  if (!context) {
    throw new Error('useJWTAuth must be used within JWTAuthProvider')
  }
  return context
}

export const JWTAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Verify token by getting user profile
          const response = await authService.getProfile();
          if (response.success) {
            setUser(response.data.user);
          } else {
            // Token invalid, clear it
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authService.login(email, password);
      
      if (response.success) {
        const { user: userData, tokens } = response.data;
        
        // Store tokens
        localStorage.setItem('token', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        
        // Update state
        setUser(userData);
        
        return { error: null };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email, password, fullName, role = 'buyer', phone = '', country = 'UAE') => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authService.register({
        email,
        password,
        role,
        profile: {
          fullName,
          phone,
          country
        }
      });
      
      if (response.success) {
        const { user: userData, tokens } = response.data;
        
        // Store tokens
        localStorage.setItem('token', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        
        // Update state
        setUser(userData);
        
        return { error: null };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and state
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setError(null);
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      setError(null);
      
      const response = await authService.updateProfile(profileData);
      
      if (response.success) {
        setUser(response.data.user);
        return { error: null };
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Profile update failed';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setError(null);
      
      const response = await authService.changePassword(currentPassword, newPassword);
      
      if (response.success) {
        return { error: null };
      } else {
        throw new Error(response.message || 'Password change failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Password change failed';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();
      
      if (response.success) {
        const { tokens } = response.data;
        localStorage.setItem('token', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        return true;
      } else {
        // Refresh failed, logout user
        await signOut();
        return false;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      await signOut();
      return false;
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Check if user is seller
  const isSeller = () => {
    return hasRole('seller');
  };

  // Check if user is buyer
  const isBuyer = () => {
    return hasRole('buyer');
  };

  // Check if user is investor
  const isInvestor = () => {
    return hasRole('investor');
  };

  // Check if user is sponsor
  const isSponsor = () => {
    return hasRole('sponsor');
  };

  // Check if user is verified (KYC)
  const isVerified = () => {
    return user?.profile?.kycStatus === 'verified';
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    changePassword,
    refreshToken,
    hasRole,
    isAdmin,
    isSeller,
    isBuyer,
    isInvestor,
    isSponsor,
    isVerified,
    setError,
  };

  return (
    <JWTAuthContext.Provider value={value}>
      {children}
    </JWTAuthContext.Provider>
  );
};
