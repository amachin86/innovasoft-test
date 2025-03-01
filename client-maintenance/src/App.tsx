import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ClientList from "./pages/ClientList";
import ClientForm from "./pages/ClientForm";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
    return (
        <Router> {/* El Router debe envolver a AuthProvider */}
            <AuthProvider>
                <CssBaseline />
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
            </AuthProvider>
        </Router>
    );
};

export default App;
