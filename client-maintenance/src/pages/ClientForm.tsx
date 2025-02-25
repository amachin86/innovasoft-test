import React, { useState, useEffect } from "react";
import {
    Box, TextField, Button, MenuItem, Typography, Stack, Avatar, Snackbar, Alert, Divider
} from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { createClient, updateClient, getClientById, getInterests, ClientData } from "../services/clientService";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

// Interfaz de Intereses
interface Interest {
    id: string;
    nombre: string;
}

const ClientFormPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>(); // ID del cliente si es edición
    const [client, setClient] = useState<ClientData>({
        identificacion: "",
        nombre: "",
        apellidos: "",
        telefonoCelular: "",
        otroTelefono: "",
        direccion: "",
        fNacimiento: "",
        fAfiliacion: "",
        sexo: "",
        resenaPersonal: "",
        imagen: "",
        interesesId: "",
    });
    const [interests, setInterests] = useState<Interest[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

    // Cargar intereses y cliente si es edición
    useEffect(() => {
        const fetchData = async () => {
            try {
                const interestsData = await getInterests();
                setInterests(interestsData);

                if (id) {
                    const clientData = await getClientById(id);
                    setClient(clientData);
                    if (clientData.imagen) setImagePreview(clientData.imagen);
                }
            } catch (error) {
                setAlert({ open: true, message: "Error al cargar la información.", severity: "error" });
            }
        };

        fetchData();
    }, [id]);

    // Manejar cambio de campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setClient((prev) => ({ ...prev, [name]: value }));
    };

    // Manejar carga de imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result?.toString();
                setClient((prev) => ({ ...prev, imagen: base64String ?? "" }));
                setImagePreview(base64String ?? "");
            };
            reader.readAsDataURL(file);
        }
    };

    // Guardar cliente
    const handleSubmit = async () => {
        const requiredFields = ["identificacion", "nombre", "apellidos", "telefonoCelular", "direccion", "interesesId"];
        for (const field of requiredFields) {
            if (!(client as any)[field]) {
                setAlert({ open: true, message: `El campo ${field} es obligatorio.`, severity: "warning" });
                return;
            }
        }

        try {
            if (id) {
                await updateClient(id, client);
                setAlert({ open: true, message: "Cliente actualizado correctamente.", severity: "success" });
            } else {
                await createClient(client);
                setAlert({ open: true, message: "Cliente creado correctamente.", severity: "success" });
            }

            // Redirigir a la consulta de clientes
            setTimeout(() => navigate("/clients"), 2000);
        } catch (error) {
            setAlert({ open: true, message: "Error al guardar el cliente.", severity: "error" });
        }
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Header />

                <Box sx={{ p: 3 }}>
                    <Box
                        sx={{
                            borderRadius: 2,
                            boxShadow: 3,
                            backgroundColor: "white",
                            p: 3,
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                            <Stack direction="row" alignItems="center">
                                <Avatar
                                    src={imagePreview ?? ""}
                                    sx={{ width: 40, height: 40, mr: 1, cursor: 'pointer' }}
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                />
                                <Typography variant="h4">Mantenimiento de Clientes</Typography>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowBack />}
                                    onClick={() => navigate("/clients")}
                                >
                                    Regresar
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<Save />}
                                    onClick={handleSubmit}
                                >
                                    {id ? "Actualizar" : "Guardar"}
                                </Button>
                            </Stack>
                        </Stack>

                        <Divider sx={{ mb: 3 }} />

                        {/* Carga de imagen */}
                        <input
                            type="file"
                            id="image-upload"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        {/* Campos del formulario */}
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth required
                                    label="Identificación *"
                                    name="identificacion"
                                    value={client.identificacion}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth required
                                    label="Nombre *"
                                    name="nombre"
                                    value={client.nombre}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth required
                                    label="Apellidos *"
                                    name="apellidos"
                                    value={client.apellidos}
                                    onChange={handleChange}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth required
                                    label="Teléfono Celular *"
                                    name="telefonoCelular"
                                    value={client.telefonoCelular}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    label="Otro Teléfono"
                                    name="otroTelefono"
                                    value={client.otroTelefono}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth required
                                    label="Dirección *"
                                    name="direccion"
                                    value={client.direccion}
                                    onChange={handleChange}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth required
                                    label="Fecha de Nacimiento *"
                                    name="fNacimiento"
                                    value={client.fNacimiento}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth required
                                    label="Fecha de Afiliación  *"
                                    name="fAfiliacion"
                                    value={client.fAfiliacion}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth required
                                    select
                                    label="Género *"
                                    name="sexo"
                                    value={client.sexo}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="M">Masculino</MenuItem>
                                    <MenuItem value="F">Femenino</MenuItem>
                                </TextField>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth required
                                    select
                                    label="Intereses *"
                                    name="interesesId"
                                    value={client.interesesId}
                                    onChange={handleChange}
                                >
                                    {interests.map((interest) => (
                                        <MenuItem key={interest.id} value={interest.id}>
                                            {interest.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Reseña Personal"
                                name="resenaPersonal"
                                value={client.resenaPersonal}
                                onChange={handleChange}
                            />
                        </Stack>

                        {/* Alertas */}
                        <Snackbar
                            open={alert.open}
                            autoHideDuration={4000}
                            onClose={() => setAlert({ ...alert, open: false })}
                        >
                            <Alert severity={alert.severity as "success" | "error"}>{alert.message}</Alert>
                        </Snackbar>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ClientFormPage;