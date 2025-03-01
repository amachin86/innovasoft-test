import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert, Paper } from '@mui/material';
import { registerUser , CustomError } from "../services/clientService";

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

    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Correo electrónico inválido.');
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
      const response = await registerUser (username, email, password);

      if (response.data.status === 'Success') {
        setSuccess('Usuario creado correctamente. Redirigiendo a inicio de sesión...');
        setTimeout(() => navigate('/'), 3000);
      } else {
        setError(response.data.message || 'Error al registrar el usuario.');
        console.log("Axios response :" + response);
      }
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        const handlerError = error as CustomError;
        setError(handlerError.message);
      } else {
        setError('Hubo un problema con el registro. Inténtelo nuevamente.');
      }
    }
  };

  // Función para limpiar el error al escribir en los campos
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (error) {
      setError(''); // Limpiar el error al escribir
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ borderRadius: 2, padding: 3, mt: 8 }}>
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
            onChange={handleInputChange(setUsername)}
          />
          <TextField
            fullWidth
            label="Correo Electrónico *"
            type="email"
            margin="normal"
            value={email}
            onChange={handleInputChange(setEmail)}
          />
          <TextField
            fullWidth
            type="password"
            label="Contraseña *"
            margin="normal"
            value={password}
            onChange={handleInputChange(setPassword)}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirmar Contraseña *"
            margin="normal"
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword)}
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
            Registrarse
          </Button>
          <Button fullWidth variant="text" color="secondary" onClick={() => navigate('/')} sx={{ mt: 1 }}>
            ¿Ya tiene una cuenta? Inicie sesión
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default RegisterPage;