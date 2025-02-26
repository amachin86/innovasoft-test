import React, { useState, useEffect } from "react";
import {
    Box, TextField, Button, MenuItem, Typography, Stack, Avatar, Snackbar, Alert, Divider, IconButton
} from "@mui/material";
import { Save, ArrowBack, Person } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate, useParams } from "react-router-dom";
import { createClient, updateClient, getClientById, getInterests, ClientData } from "../services/clientService";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

// Interfaz de Intereses
interface Interest {
    id: string;
    nombre: string;
}

const ClientFormPage: React.FC = () => {
    const { open } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [interests, setInterests] = useState<Interest[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
    const [errors, setErrors] = useState<any>({});

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm<ClientData>({
        mode: "onChange",
        defaultValues: {
            identificacion: "",
            nombre: "",
            apellidos: "",
            telefonoCelular: "",
            otroTelefono: "",
            direccion: "",
            fNacimiento: new Date(),
            fAfiliacion: new Date(),
            sexo: "",
            resenaPersonal: "",
            imagen: "",
            interesesId: "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const interestsData = await getInterests();
                setInterests(interestsData);

                if (id) {
                    const clientData = await getClientById(id);
                    Object.keys(clientData).forEach((key) => {
                        setValue(key as keyof ClientData, (clientData as any)[key]);
                    });
                    if (clientData.imagen) setImagePreview(clientData.imagen);
                }
            } catch (error) {
                setAlert({ open: true, message: "Error al cargar la información.", severity: "error" });
            }
        };

        fetchData();
    }, [id, setValue]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result?.toString();
                setValue("imagen", base64String ?? "");
                setImagePreview(base64String ?? "");
            };
            reader.readAsDataURL(file);
        }
    };

    const validateFields = (data: ClientData) => {
        const newErrors: any = {};
        // Validación de campos (similar a la anterior)
        // ...
        return newErrors;
    };

    const onSubmit = async (data: ClientData) => {
        const validationErrors = validateFields(data);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (id) {
                await updateClient(id, data);
                setAlert({ open: true, message: "Cliente actualizado correctamente.", severity: "success" });
            } else {
                await createClient(data);
                setAlert({ open: true, message: "Cliente creado correctamente.", severity: "success" });
            }
            setTimeout(() => navigate("/clients"), 2000);
        } catch (error) {
            setAlert({ open: true, message: "Error al guardar el cliente.", severity: "error" });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Header />

                    <main
                        style={{
                            flexGrow: 1,
                            padding: '16px',
                            transition: 'margin 0.3s',
                            marginLeft: open ? 240 : 0,
                        }}
                    >

                        <Box sx={{ p: 3 }}>
                            <Box
                                sx={{
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    backgroundColor: "white",
                                    p: 3,
                                }}
                            >

                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload">
                                            <Avatar
                                                src={imagePreview ?? ""}
                                                sx={{ width: 100, height: 100, cursor: 'pointer' }}
                                            />
                                        </label>
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
                                            type="submit"
                                            disabled={!isValid}
                                            onClick={handleSubmit(onSubmit)}
                                        >
                                            {id ? "Actualizar" : "Guardar"}
                                        </Button>
                                    </Stack>
                                </Stack>

                                <Divider sx={{ my: 2 }} />

                                <Stack spacing={3} component="form">
                                    <Stack spacing={2}>
                                        {/* Primer grupo de campos */}
                                        <Stack direction="row" spacing={2}>
                                            <TextField
                                                fullWidth
                                                label="Identificación *"
                                                {...register("identificacion")}
                                                error={!!errors.identificacion}
                                                helperText={errors.identificacion}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Nombre *"
                                                {...register("nombre")}
                                                error={!!errors.nombre}
                                                helperText={errors.nombre}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Apellidos *"
                                                {...register("apellidos")}
                                                error={!!errors.apellidos}
                                                helperText={errors.apellidos}
                                            />
                                        </Stack>

                                        {/* Segundo grupo de campos */}
                                        <Stack direction="row" spacing={2}>
                                            <TextField
                                                fullWidth
                                                label="Teléfono Celular *"
                                                {...register("telefonoCelular")}
                                                error={!!errors.telefonoCelular}
                                                helperText={errors.telefonoCelular}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Otro Teléfono"
                                                {...register("otroTelefono")}
                                                error={!!errors.otroTelefono}
                                                helperText={errors.otroTelefono}
                                            />
                                            <TextField
                                                fullWidth
                                                select
                                                label="Género *"
                                                {...register("sexo")}
                                                error={!!errors.sexo}
                                                helperText={errors.sexo}
                                            >
                                                <MenuItem value="M">Masculino</MenuItem>
                                                <MenuItem value="F">Femenino</MenuItem>
                                            </TextField>
                                        </Stack>

                                        {/* Tercer grupo de campos */}
                                        <Stack direction="row" spacing={2}>
                                            <Controller
                                                name="fNacimiento"
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        label="Fecha de Nacimiento *"
                                                        value={field.value ? dayjs(field.value) : null}
                                                        onChange={(date: Dayjs | null) => field.onChange(date?.toDate())}
                                                    />
                                                )}
                                            />
                                            {errors.fNacimiento && (
                                                <Typography color="error" variant="body2">
                                                    {errors.fNacimiento}
                                                </Typography>
                                            )}

                                            <Controller
                                                name="fAfiliacion"
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        label="Fecha de Afiliación *"
                                                        value={field.value ? dayjs(field.value) : null}
                                                        onChange={(date: Dayjs | null) => field.onChange(date?.toDate())}
                                                    />
                                                )}
                                            />
                                            {errors.fAfiliacion && (
                                                <Typography color="error" variant="body2">
                                                    {errors.fAfiliacion}
                                                </Typography>
                                            )}

                                            <TextField
                                                fullWidth
                                                select
                                                label="Intereses *"
                                                {...register("interesesId")}
                                                error={!!errors.interesesId}
                                                helperText={errors.interesesId}
                                            >
                                                {interests.map((interest) => (
                                                    <MenuItem key={interest.id} value={interest.id}>
                                                        {interest.nombre}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Stack>
                                    </Stack>

                                    {/* Campos de Dirección y Reseña Personal */}
                                    <TextField
                                        fullWidth
                                        label="Dirección *"
                                        {...register("direccion")}
                                        error={!!errors.direccion}
                                        helperText={errors.direccion}
                                    />

                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="Reseña Personal"
                                        {...register("resenaPersonal")}
                                        error={!!errors.resenaPersonal}
                                        helperText={errors.resenaPersonal}
                                    />
                                </Stack>

                                <Snackbar
                                    open={alert.open}
                                    autoHideDuration={4000}
                                    onClose={() => setAlert({ ...alert, open: false })}
                                >
                                    <Alert severity={alert.severity as "success" | "error"}>{alert.message}</Alert>
                                </Snackbar>
                            </Box>
                        </Box>
                    </main>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default ClientFormPage;