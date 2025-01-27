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
        if (username === 'mockuser' && password === 'password') {
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

            <br/>
            <br/>
            <br/>
            <br/>
            
            <div className="flex -space-x-1 overflow-hidden">
                <img className="inline-block size-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <img className="inline-block size-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <img className="inline-block size-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                <img className="inline-block size-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>

        </div>
    );
};

export default LoginForm;
