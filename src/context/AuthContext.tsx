
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const { toast } = useToast();
  
  // Check for existing auth on load
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated');
    const storedUser = localStorage.getItem('admin_user');
    if (authStatus === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be a secure API call
    if (email === 'shiyasv999@gmail.com' && password === 'shiyasv9048262120') {
      const userData = { email };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_user', JSON.stringify(userData));
      toast({
        title: "Admin Access Granted",
        description: "You can now manage offers, categories and discounts",
        variant: "default",
      });
      return true;
    } else {
      toast({
        title: "Authentication Failed",
        description: "The email or password you entered is incorrect",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_user');
    toast({
      title: "Logged Out",
      description: "You have been logged out of admin mode",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
