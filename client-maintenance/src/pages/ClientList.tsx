import React, { useState, useEffect } from "react";
import {
    Box, Typography, TextField, IconButton, Button, Table, TableBody, TableCell, TableHead, TableRow,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Stack, Paper
} from "@mui/material";
import { Search, Add, Edit, Delete, ArrowBack } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { getClients, deleteClient, Client } from "../services/clientService";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ClientsPage: React.FC = () => {
    const { user, open } = useAuth();
    const navigate = useNavigate();
    const [clients, setClients] = useState<Client[]>([]);
    const [filters, setFilters] = useState({ nombre: "", identificacion: "" });
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

    // Cargar clientes
    const loadClients = async () => {
        try {
            const data = await getClients({ ...filters, usuarioId: user?.id ?? "" });
            setClients(data);
        } catch (error) {
            setAlert({ open: true, message: "Error al cargar clientes.", severity: "error" });
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    // Eliminar cliente
    const handleDelete = async () => {
        if (!selectedClient) return;
        try {
            await deleteClient(selectedClient.id);
            setAlert({ open: true, message: "Cliente eliminado exitosamente.", severity: "success" });
            loadClients();
        } catch (error) {
            setAlert({ open: true, message: "Error al eliminar cliente.", severity: "error" });
        } finally {
            setOpenDeleteDialog(false);
            setSelectedClient(null);
        }
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>           
            <Sidebar />            

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
               <Header />
                <main
                    style={{
                        flexGrow:1,
                        padding:'16px',
                        transition:'margin 0.3s',
                        marginLeft:open ? 240:0,
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
                        > {/** BORDES REDONDEADOS */}

                    {/* Contenido principal */}
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h4">Consulta de Clientes</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    color="primary"
                                    onClick={() => navigate("/client-form")}
                                >
                                    Agregar Cliente
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowBack />}
                                    onClick={() => navigate("/home")}
                                >
                                    Regresar
                                </Button>
                            </Stack>
                        </Stack>

                        {/* Filtros de búsqueda */}
                        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                variant="outlined"
                                size="small"
                                value={filters.nombre}
                                onChange={(e) => setFilters({ ...filters, nombre: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                label="Identificación"
                                variant="outlined"
                                size="small"
                                value={filters.identificacion}
                                onChange={(e) => setFilters({ ...filters, identificacion: e.target.value })}
                            />
                            <IconButton 
                                color="inherit" 
                                onClick={loadClients} 
                                sx={{ backgroundColor: 'ButtonFace', '&:hover': { backgroundColor: 'darkgrey' } }}
                            >
                                <Search />
                            </IconButton>
                        </Stack>

                        {/* Tabla de clientes */}
                        <Paper elevation={3}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#90caf9" }}>
                                        <TableCell>Identificación</TableCell>
                                        <TableCell>Nombre Completo</TableCell>
                                        <TableCell width={100}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clients.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell>{client.identificacion}</TableCell>
                                            <TableCell>{`${client.nombre} ${client.apellidos}`}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => navigate(`/client-form/${client.id}`)}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => {
                                                        setSelectedClient(client);
                                                        setOpenDeleteDialog(true);
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>

                        {/* Modal de confirmación para eliminar */}
                        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                            <DialogTitle>Eliminar Cliente</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    ¿Está seguro de que desea eliminar al cliente{" "}
                                    <strong>{selectedClient?.nombre}</strong>? Esta acción no se puede deshacer.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
                                <Button onClick={handleDelete} color="error">Eliminar</Button>
                            </DialogActions>
                        </Dialog>

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
                </main>
            </Box>
        </Box>
    );
};

export default ClientsPage;