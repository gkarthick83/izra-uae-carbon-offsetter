import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useJWTAuth } from '../../contexts/JWTAuthContext';

export default function RoleDashboardRouter() {
  const { user, loading } = useJWTAuth();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setRedirectPath('/login');
        return;
      }

      if (user?.role) {
        // Map user role to dashboard route
        const roleRoutesMap = {
          admin: '/admin-console',
          seller: '/seller-portal',
          buyer: '/buyer-dashboard',
          investor: '/investor-dashboard',
          sponsor: '/sponsor-dashboard'
        };

        const targetRoute = roleRoutesMap?.[user?.role] || '/buyer-dashboard';
        setRedirectPath(targetRoute);
      }
    }
  }, [user, loading]);

  // Show loading state while checking authentication
  if (loading || !redirectPath) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return <Navigate to={redirectPath} replace />;
}