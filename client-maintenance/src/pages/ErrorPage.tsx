import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const ErrorPage: React.FC = () => {
  //const navigate = useNavigate();  

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#f0f0f0" }}>
        <Container sx={{ mt: 4, textAlign: 'center', alignItems: "center" }}>
                   <Typography variant="h2" color="blue" gutterBottom>
            404 
          </Typography>
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

