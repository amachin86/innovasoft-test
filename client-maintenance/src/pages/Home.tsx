import React from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const { open } = useAuth();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", bgcolor: "#f0f0f0" }}>
        <Header />
        <Sidebar />
        <main
          style={{
            flexGrow: 1,
            padding: '16px',
            transition: 'margin 0.3s',
            marginLeft: open ? 240 : 0,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // Asegúrate de que el contenedor ocupe toda la altura
              bgcolor: "#f0f0f0",
            }}
          >
            <Typography variant="h2" fontWeight="bold">
              Bienvenido
            </Typography>
          </Box>
        </main>
      </Box>
    </Box>
  );
};

export default Home;