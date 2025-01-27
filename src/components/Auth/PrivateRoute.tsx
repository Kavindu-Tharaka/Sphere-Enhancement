import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

type PrivateRouteProps = {
    children: React.ReactElement;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { user } = auth;

    // Redirect to the login page if the user is not authenticated
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
