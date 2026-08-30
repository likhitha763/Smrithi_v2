import React from 'react';

/**
 * ProtectedRoute — temporarily bypasses auth check in dev/demo mode so all UI pages can be tested.
 * To re-enable strict auth redirect later, restore `if (!currentUser) return <Navigate to="/login-signup" />`.
 */
export default function ProtectedRoute({ children }) {
  return children;
}
