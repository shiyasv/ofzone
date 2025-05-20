
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Check for existing auth on load
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    // In a real app, this would be a secure API call
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      toast({
        title: "Admin Access Granted",
        description: "You can now manage offers and discounts",
        variant: "default",
      });
      return true;
    } else {
      toast({
        title: "Authentication Failed",
        description: "The password you entered is incorrect",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    toast({
      title: "Logged Out",
      description: "You have been logged out of admin mode",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
