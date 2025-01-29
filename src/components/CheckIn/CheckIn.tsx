import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Checkout from '../Checkout';

const CheckinComponent: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Protected Content</h2>
      <p>Welcome, {user?.username}!</p>
      <button onClick={logout}>Logout</button>

      <br />
      <br />
      <br />
      <br />

      <Checkout/>
    </div>
  );
};

export default CheckinComponent;
