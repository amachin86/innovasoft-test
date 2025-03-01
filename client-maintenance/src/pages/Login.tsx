import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography, Box, Alert, InputAdornment, IconButton, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser  } from "../services/clientService";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Estado para el mensaje de éxito
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Cargar el nombre de usuario si "Recuérdame" está activado
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  // Función para limpiar el error al escribir en los campos
    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (error) {
        setError(''); // Limpiar el error al escribir
      }
    };

  const handleLogin = async () => {
    if (!username || !password) {
      setError('El usuario y la contraseña son obligatorios.');
      return;
    }

    try {
      const response = await loginUser (username, password);
      const token = response.data.token;
      const userid = response.data.userid;

      localStorage.setItem('token', token);
      localStorage.setItem('userid', userid);

      if (rememberMe) {
        localStorage.setItem('username', username);
      } else {
        localStorage.removeItem('username'); // Eliminar el nombre de usuario si no se recuerda
      }
      
      setSuccess('Inicio de sesión exitoso. Redirigiendo...'); // Mensaje de éxito            

      // Redirigir después de un breve retraso
      setTimeout(() => {
        login({ id: userid, name: username }); // Cambia '/home' a la ruta deseada
      }, 2000); // 2 segundos de retraso

    } catch (error) {
      setError('Credenciales inválidas. Verifique su usuario y contraseña.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ borderRadius: 2, padding: 3, mt: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Iniciar Sesión
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>} {/* Mostrar mensaje de éxito */}
          <TextField
            fullWidth
            label="Usuario *"
            margin="normal"
            value={username}
            onChange={handleInputChange(setUsername)}
          />
          <TextField
            fullWidth
            label="Contraseña *"
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleInputChange(setPassword)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
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
      </Paper>
    </Container>
  );
}

export default LoginPage;