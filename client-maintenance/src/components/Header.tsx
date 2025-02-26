import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { ExitToApp, Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";


const Header: React.FC = () => {
  const {  user, open, logout, toggleSidebar } = useAuth();
  

  return (
    <AppBar position="static" sx={{ backgroundColor: "darkblue", borderBottom: "3px solid #42a5f5" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton color="inherit" onClick={toggleSidebar}>
            {/*open ? <CloseIcon /> : <MenuIcon />*/}
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>
            COMPAÑIA PRUEBA
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: 2 }}>{user?.name || "Nombre de Usuario"}</Typography>
          <Button color="inherit" startIcon={<ExitToApp />} onClick={logout} />      
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
