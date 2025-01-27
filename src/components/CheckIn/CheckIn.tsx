import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const CheckinComponent: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Protected Content</h2>
      <p>Welcome, {user?.username}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default CheckinComponent;
