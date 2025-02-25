import React, { useState } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Home: React.FC = () => {
 
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />      
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Header />
      <Sidebar />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#f0f0f0" }}>
          <Typography variant="h2" fontWeight="bold">
            Bienvenido
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
