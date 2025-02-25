import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
    open: boolean;
    login: (userData: User) => void;
    logout: () => void;
    toggleSidebar: () => void;
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

  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

   // Cargar usuario desde localStorage si existe
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const toggleSidebar = () => {
    setOpen(!open);
  };    

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/home");  // Redirige tras iniciar sesión
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, open, login, logout, toggleSidebar }}>
      {children}
    </AuthContext.Provider>
  );
};
