import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../firebase/AuthContext';
import { Loader } from 'lucide-react';

/**
 * ProtectedRoute — guards access to authenticated pages.
 * - Shows a loading state while auth is being determined
 * - Redirects to /login-signup if not authenticated
 * - Allows access if authenticated
 */
export default function ProtectedRoute({ children }) {
  const { currentUser, authLoading } = useContext(AuthContext);

  // Show loading state while Firebase is checking auth
  if (authLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: 'var(--bg-color)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Loader
            size={48}
            color="var(--primary-green)"
            style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }}
          />
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Allow access if authenticated
  return children;
}
