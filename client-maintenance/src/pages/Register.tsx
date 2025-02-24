import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!passwordRegex.test(password)) {
      setError('La contraseña debe tener entre 8 y 20 caracteres, incluir mayúsculas, minúsculas y números.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/Authenticate/register`, {
        username,
        email,
        password,
      });

      if (response.data.status === 'Success') {
        setSuccess('Usuario creado correctamente. Redirigiendo a inicio de sesión...');
        setTimeout(() => navigate('/'), 3000);
      } else {
        setError(response.data.message || 'Error al registrar el usuario.');
      }
    } catch (error) {
      setError('Hubo un problema con el registro. Inténtelo nuevamente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Registro de Usuario
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField
          fullWidth
          label="Nombre Usuario *"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Correo Electrónico *"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Contraseña *"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirmar Contraseña *"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button fullWidth variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
          Registrarse
        </Button>
        <Button fullWidth variant="text" color="secondary" onClick={() => navigate('/')} sx={{ mt: 1 }}>
          ¿Ya tiene una cuenta? Inicie sesión
        </Button>
      </Box>
    </Container>
  );
}

export default RegisterPage;