import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography, Box, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import api from '../services/api';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('El usuario y la contraseña son obligatorios.');
      return;
    }

    try {
      const response = await api.post(`${process.env.REACT_APP_API_BASE_URL}/api/Authenticate/login`, {
        username,
        password,
      });

      const { token, userid } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userid', userid);

      if (rememberMe) {
        localStorage.setItem('username', username);
      }

      navigate('/home');
    } catch (error) {
      setError('Credenciales inválidas. Verifique su usuario y contraseña.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Iniciar Sesión
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          label="Usuario *"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Contraseña *"
          margin="normal"
          type={showPassword ? 'text' : 'password'} // Cambia el tipo según el estado
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)} // Alterna el estado de mostrar/ocultar
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mt: 1 }}>
          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
            label="Recuérdame"
          />
        </Box>
        <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
          Iniciar Sesión
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: '16px' }} color="secondary">
          ¿No tienes una cuenta?{' '}
          <Link to="/register">Regístrate aquí</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default LoginPage;