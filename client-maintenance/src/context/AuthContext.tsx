import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from "react-router-dom";

// Definir tipo de usuario
export type User = {
    id: string;
    name: string;
    email: string;
  };
  
  // Contexto de autenticación
  interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    //const navigate = useNavigate();

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    //navigate("/login")
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
