import React, { useState, useEffect } from "react";
import {
    Box, TextField, Button, MenuItem, Typography, Stack, Snackbar, Alert, Divider, CircularProgress
} from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate, useParams } from "react-router-dom";
import { createClient, updateClient, getClientById, getInterests } from "../services/clientService";
import { getClienteInfo } from "../services/utilityService";
import { ClientData } from "../Interfaces/clienteInterface";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import ImageUploader from "../components/ImageUploader"; // Importa el nuevo componente

// Interfaz de Intereses
interface Interest {
    id: string;
    descripcion: string;
}

const ClientFormPage: React.FC = () => {
    const { open, user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [interests, setInterests] = useState<Interest[]>([]);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
    const [loading, setLoading] = useState(true); // Estado para el loading
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Mueve el estado aquí

    const {
        control,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm<ClientData>({
        defaultValues: { 
            identificacion: "",
            nombre: "",
            apellidos: "",
            telefonoCelular: "",
            otroTelefono: "",
            direccion: "",
            fNacimiento: dayjs().format("YYYY-MM-DD"),
            fAfiliacion: dayjs().format("YYYY-MM-DD"),
            sexo: "",
            resenaPersonal: "",
            imagen: "",
            interesesId: "",
            usuarioId: user?.id,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Iniciar loading
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
            } finally {
                setLoading(false); // Finalizar loading
            }
        };

        fetchData();
    }, [id, setValue]);

    const handleImageChange = (base64String: string) => {
        setValue("imagen", base64String);
        setImagePreview(base64String);
    };   

    const validateFields = (data: ClientData) => {
        const newErrors: any = {};
        
        // Validación de campos
        if (!data.identificacion) {
            newErrors.identificacion = "La identificación es obligatoria.";
        } else if (!/^\d+$/.test(data.identificacion)) {
            newErrors.identificacion = "La identificación solo debe contener números.";
        } else if (data.identificacion.length < 8 || data.identificacion.length > 15) {
            newErrors.identificacion = "La identificación debe tener entre 8 y 15 dígitos.";
        }

        if (!data.nombre) {
            newErrors.nombre = "El nombre es obligatorio.";
        } else if (data.nombre.length < 3 || data.nombre.length > 50) {
            newErrors.nombre = "El nombre debe tener entre 3 y 50 caracteres.";
        }

        if (!data.apellidos) {
            newErrors.apellidos = "Los apellidos son obligatorios.";
        } else if (data.apellidos.length < 3 || data.apellidos.length > 50) {
            newErrors.apellidos = "Los apellidos deben tener entre 3 y 50 caracteres.";
        }

        if (!data.telefonoCelular) {
            newErrors.telefonoCelular = "El teléfono celular es obligatorio.";
        } else if (!/^\d{8,15}$/.test(data.telefonoCelular)) {
            newErrors.telefonoCelular = "El número de teléfono debe tener entre 8 y 15 dígitos.";
        }
        if (!data.otroTelefono){
            newErrors.otroTelefono= "El otro teléfono es obligatorio.";
        }else if (!/^\d{8,15}$/.test(data.otroTelefono)) {            
            newErrors.otroTelefono = "El número debe tener entre 8 y 15 dígitos.";
        }

        if (!data.direccion) {
            newErrors.direccion = "La dirección es obligatoria.";
        } else if (data.direccion.length < 10) {
            newErrors.direccion = "La dirección debe tener al menos 10 caracteres.";
        }

        if (!data.fNacimiento) {
            newErrors.fNacimiento = "La fecha de nacimiento es obligatoria.";
        } else if (dayjs(data.fNacimiento).isAfter(dayjs())) {
            newErrors.fNacimiento = "La fecha de nacimiento no puede ser futura.";
        }

        if (!data.fAfiliacion) {
            newErrors.fAfiliacion = "La fecha de afiliación es obligatoria.";        
        }else if (dayjs(data.fAfiliacion).isBefore(dayjs(data.fNacimiento))){
            newErrors.fAfiliacion = "La fecha de afiliación no puede ser antes de la fecha de nacimiento."; 
        }

        if (!data.sexo) {
            newErrors.sexo = "Debe seleccionar un género.";
        } else if (!["M", "F"].includes(data.sexo)) {
            newErrors.sexo = "El género debe ser Masculino (M) o Femenino (F).";
        }

        if (!data.interesesId) {
            newErrors.interesesId = "Debe seleccionar un interés.";
        }
        if (!data.resenaPersonal) {
            newErrors.resenaPersonal = "La reseña es obligatoria.";  
        }else if (data.resenaPersonal && data.resenaPersonal.length > 500) {
            newErrors.resenaPersonal = "La reseña no puede exceder 500 caracteres.";
        }

        return newErrors;
    };

    const handleInputChange = (fieldName: string) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: undefined, // Eliminar el error del campo que se está editando
        }));
    };

    const onSubmit = async (data: ClientData) => {
        const validationErrors = validateFields(data);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const cliente = getClienteInfo(data);
            if (id) {   
                cliente.id = id;             
                await updateClient(cliente);
                setAlert({ open: true, message: "Cliente actualizado correctamente.", severity: "success" });
            } else {
                
                await createClient(cliente); 
               // let response = await createClientTest(cliente); 
               // console.log(response);              
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

                            {loading ? ( // Mostrar loading si está cargando
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <ImageUploader 
                                                onImageChange={handleImageChange} 
                                                imagePreview={imagePreview} 
                                            />
                                            <Typography variant="h4">Mantenimiento de Clientes</Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                variant="contained"
                                                startIcon={<Save />}
                                                type="submit"
                                                disabled={!isValid}
                                                onClick={handleSubmit(onSubmit)}
                                            >
                                                {id ? "Actualizar" : "Guardar"}
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                startIcon={<ArrowBack />}
                                                onClick={() => navigate("/clients")}
                                            >
                                                Regresar
                                            </Button>                                               
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ my: 2 }} />

                                        <Stack spacing={3} component="form">
                                            <Stack spacing={2}>
                                                {/* Primer grupo de campos */}
                                                <Stack direction="row" spacing={2}>
                                                    <Controller
                                                        name="identificacion"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                fullWidth
                                                                label="Identificación *"
                                                                {...field}
                                                                error={!!errors.identificacion}
                                                                helperText={errors.identificacion}
                                                                onChange={(e) => {
                                                                    field.onChange(e); // Actualiza el valor del campo
                                                                    handleInputChange("identificacion"); // Limpia el error
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <Controller
                                                        name="nombre"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                fullWidth
                                                                label="Nombre *"
                                                                {...field}
                                                                error={!!errors.nombre}
                                                                helperText={errors.nombre}
                                                                onChange={(e) => {
                                                                    field.onChange(e); // Actualiza el valor del campo
                                                                    handleInputChange("nombre"); // Limpia el error
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <Controller
                                                        name="apellidos"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                fullWidth
                                                                label="Apellidos *"
                                                                {...field}
                                                                error={!!errors.apellidos}
                                                                helperText={errors.apellidos}
                                                                onChange={(e) => {
                                                                    field.onChange(e); // Actualiza el valor del campo
                                                                    handleInputChange("apellidos"); // Limpia el error
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Stack>

                                                {/* Segundo grupo de campos */}
                                                <Stack direction="row" spacing={2}>
                                                    <Controller
                                                        name="telefonoCelular"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                fullWidth
                                                                label="Teléfono Celular *"
                                                                {...field}
                                                                error={!!errors.telefonoCelular}
                                                                helperText={errors.telefonoCelular}
                                                                onChange={(e) => {
                                                                    field.onChange(e); // Actualiza el valor del campo
                                                                    handleInputChange("telefonoCelular"); // Limpia el error
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <Controller
                                                        name="otroTelefono"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                fullWidth
                                                                label="Otro Teléfono *"
                                                                {...field}
                                                                error={!!errors.otroTelefono}
                                                                helperText={errors.otroTelefono}
                                                                onChange={(e) => {
                                                                    field.onChange(e); // Actualiza el valor del campo
                                                                    handleInputChange("otroTelefono"); // Limpia el error
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <Controller
                                                        name="sexo"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                fullWidth
                                                                select
                                                                label="Género *"
                                                                {...field}
                                                                error={!!errors.sexo}
                                                                helperText={errors.sexo}
                                                                onChange={(e) => {
                                                                    field.onChange(e); // Actualiza el valor del campo
                                                                    handleInputChange("sexo"); // Limpia el error
                                                                }}
                                                            >
                                                                <MenuItem value="M">Masculino</MenuItem>
                                                                <MenuItem value="F">Femenino</MenuItem>
                                                            </TextField>
                                                        )}
                                                    />
                                                </Stack>

                                                {/* Tercer grupo de campos */}
                                                <Stack direction="row" spacing={2}>
                                                    <Controller
                                                        name="fNacimiento"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <DatePicker
                                                                label="Fecha de Nacimiento *"
                                                                slotProps={{textField: {fullWidth: true}}}
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
                                                                slotProps={{textField: {fullWidth: true}}}
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

                                                    <Controller
                                                        name="interesesId"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <TextField
                                                                fullWidth
                                                                select
                                                                label="Intereses *"
                                                                {...field}
                                                                error={!!errors.interesesId}
                                                                helperText={errors.interesesId}
                                                                onChange={(e) => {
                                                                    field.onChange(e); // Actualiza el valor del campo
                                                                    handleInputChange("interesesId"); // Limpia el error
                                                                }}
                                                            >
                                                                {interests.map((interest) => (
                                                                    <MenuItem key={interest.id} value={interest.id}>
                                                                        {interest.descripcion}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        )}
                                                    />                                                   
                                                </Stack>
                                            </Stack>

                                            {/* Campos de Dirección y Reseña Personal */}
                                            <Controller
                                                name="direccion"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        fullWidth
                                                        label="Dirección *"
                                                        {...field}
                                                        error={!!errors.direccion}
                                                        helperText={errors.direccion}
                                                        onChange={(e) => {
                                                            field.onChange(e); // Actualiza el valor del campo
                                                            handleInputChange("direccion"); // Limpia el error
                                                        }}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                name="resenaPersonal"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        rows={3}
                                                        label="Reseña Personal *"
                                                        {...field}
                                                        error={!!errors.resenaPersonal}
                                                        helperText={errors.resenaPersonal}
                                                        onChange={(e) => {
                                                            field.onChange(e); // Actualiza el valor del campo
                                                            handleInputChange("resenaPersonal"); // Limpia el error
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Stack>

                                        <Snackbar
                                            open={alert.open}
                                            autoHideDuration={4000}
                                            onClose={() => setAlert({ ...alert, open: false })}
                                        >
                                            <Alert severity={alert.severity as "success" | "error"}>{alert.message}</Alert>
                                        </Snackbar>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </main>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default ClientFormPage;