// src/components/LoginForm.tsx

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        login(username, password);

        // Redirect to dashboard if login is successful
        if (username === 'qw' && password === 'qw') {
            navigate('/checkin');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
