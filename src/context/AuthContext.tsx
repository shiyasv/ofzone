import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock data - replace with real authentication
const MOCK_ADMIN_USER: User = {
  id: '1',
  name: 'Admin User',
  email: 'shiyasv999@gmail.com',
  role: 'admin'
};

const MOCK_REGULAR_USER: User = {
  id: '2',
  name: 'Regular User',
  email: 'user@offzone.com',
  role: 'user'
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('offzone_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function (replace with real authentication)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock authentication logic (replace with real auth)
      if (email === 'shiyasv999@gmail.com' && password === 'shiyasv7736612120') {
        setUser(MOCK_ADMIN_USER);
        localStorage.setItem('offzone_user', JSON.stringify(MOCK_ADMIN_USER));
      } else if (email === 'user@offzone.com' && password === 'user123') {
        setUser(MOCK_REGULAR_USER);
        localStorage.setItem('offzone_user', JSON.stringify(MOCK_REGULAR_USER));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('offzone_user');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};