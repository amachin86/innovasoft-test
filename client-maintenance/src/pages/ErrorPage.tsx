import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning'; 
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ErrorPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#f0f0f0" }}>
          <Container sx={{ mt: 4, textAlign: 'center', alignItems: "center" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <WarningIcon sx={{ color: 'blue', fontSize: '7rem', mr: 1 }} /> {/* Ajusta el tamaño y color del ícono */}
              <Typography variant="h1" color="blue" gutterBottom>
                404
              </Typography>
            </Box>
            <Typography variant="h3" gutterBottom>
              OOps... Page Not Found!
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorPage;