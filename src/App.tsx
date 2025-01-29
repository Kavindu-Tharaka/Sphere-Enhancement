import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginForm from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import CheckinComponent from './components/CheckIn/CheckIn';
import Checkout from './components/Checkout';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route
                        path="/checkin"
                        element={
                            <PrivateRoute>
                                <CheckinComponent />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/checkout" element={<Checkout/>} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
