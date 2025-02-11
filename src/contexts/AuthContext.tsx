import React, { createContext, useState, ReactNode, useContext } from 'react';

type User = {
    username: string;
    password: string;
};

const mockUser: User = {
  username: 'mockuser',
  password: 'password',
}

type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (username: string, password: string) => {
        // Mock authentication logic
        if (username === mockUser.username && password === mockUser.password) {
            setUser(mockUser);
        } else {
            alert('Invalid credentials');
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};