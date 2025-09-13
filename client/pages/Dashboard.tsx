import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './dashboard/AdminDashboard';
import AuthorityDashboard from './dashboard/AuthorityDashboard';
import TouristDashboard from './dashboard/TouristDashboard';

export default function Dashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'authority':
      return <AuthorityDashboard />;
    case 'tourist':
      return <TouristDashboard />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Unknown Role</h1>
            <p className="text-gray-600">Your account has an unrecognized role.</p>
          </div>
        </div>
      );
  }
}
