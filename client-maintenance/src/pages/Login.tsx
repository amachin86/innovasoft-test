import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('El usuario y la contraseña son obligatorios.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/Authenticate/login`, {
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
          label="Usuario"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Contraseña"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
          label="Recuérdame"
        />
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
