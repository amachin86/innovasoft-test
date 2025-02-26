import React from "react";
import { Drawer, List, ListItem, ListItemText, Avatar, Box, Typography, Divider, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar: React.FC = () => {
  const { user, open, toggleSidebar } = useAuth(); // Asegúrate de tener una función para alternar el Drawer
  const navigate = useNavigate();

  return (    
      <Drawer
        variant="persistent" // Cambiar a 'temporary' para un comportamiento responsive
        open={open}
        onClose={toggleSidebar} // Cerrar el Drawer al hacer clic fuera
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: "border-box",
            bgcolor: "#ffffff",
            mt: "70px",
            height: "calc(100vh - 60px)",
          },
        }}
      >
        {/* Sección del usuario */}
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Avatar
            src="/path/to/user-image.jpg"
            sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
          />
          <Typography variant="h6">{user?.name ?? "Nombre de Usuario"}</Typography>
        </Box>

        <Divider />

        {/* Título del menú */}
        <Box sx={{ textAlign: "center", py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>MENÚ</Typography>
        </Box>

        <Divider />

        {/* Opciones del menú */}
        <List>
          <ListItem component="div" onClick={() => navigate("/home")} sx={{ cursor: "pointer" }}>
            <Typography sx={{ color: "blue", fontWeight: "bold", minWidth: 30 }}>IN</Typography>
            <ListItemText primary="INICIO" />
          </ListItem>

          <ListItem component="div" onClick={() => navigate("/clients")} sx={{ cursor: "pointer" }}>
            <Typography sx={{ color: "blue", fontWeight: "bold", minWidth: 30 }}>CC</Typography>
            <ListItemText primary="Consulta Clientes" />
          </ListItem>
        </List>
      </Drawer>    
  );
};

export default Sidebar;
