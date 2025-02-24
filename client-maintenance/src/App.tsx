import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ClientList from './pages/ClientList';
import ClientForm from './pages/ClientForm';
import ErrorPage from './pages/ErrorPage';

// Componente de Ruta Protegida
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    return user ? <>{children}</> : <Navigate to="/" />;
};

// Aplicación Principal
const App: React.FC = () => {
    return (
        <AuthProvider>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/clients"
                        element={
                            <PrivateRoute>
                                <ClientList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/client-form/:id?"
                        element={
                            <PrivateRoute>
                                <ClientForm />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;