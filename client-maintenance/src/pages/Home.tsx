import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Avatar, Box, CssBaseline, Button, IconButton, Divider } from '@mui/material';
import { ExitToApp, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [userName] = useState('Nombre de Usuario');
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />

            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', bgcolor: '#ffffff' },
                }}
            >
                <Box sx={{ p: 2, textAlign: 'center', bgcolor: '#ffffff' }}>
                    <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }} />
                    <Typography variant="h6">{userName}</Typography>
                </Box>
                <Divider />
                <Typography variant="subtitle1" sx={{ pl: 2, pt: 1, fontWeight: 'bold' }}>MENÚ</Typography>
                <List>
                    <ListItem component="div" onClick={() => handleNavigation('/home')} sx={{ cursor: 'pointer' }}>
                        <Typography sx={{ color: 'blue', fontWeight: 'bold', minWidth: 30 }}>IN</Typography>
                        <ListItemText primary="INICIO" />
                    </ListItem>
                    <ListItem component="div" onClick={() => handleNavigation('/consulta-clientes')} sx={{ cursor: 'pointer' }}>
                        <Typography sx={{ color: 'blue', fontWeight: 'bold', minWidth: 30 }}>CC</Typography>
                        <ListItemText primary="Consulta Clientes" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <AppBar position="static" sx={{ backgroundColor: '#0d47a1', width: '100%' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ ml: 2 }}>COMPAÑIA PRUEBA</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ mr: 2 }}>{userName}</Typography>
                            <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout}>CERRAR SESIÓN</Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Main section */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f0f0f0' }}>
                    <Typography variant="h2" fontWeight="bold">Bienvenido</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
