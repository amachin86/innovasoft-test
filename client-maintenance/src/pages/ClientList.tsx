import React, { useState, useEffect } from "react";
import {
    Box, Typography, TextField, IconButton, Button, Table, TableBody, TableCell, TableHead, TableRow,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Stack, Paper,
    CircularProgress, Pagination
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
    const [tempFilters, setTempFilters] = useState({ nombre: "", identificacion: "" }); // Estado temporal para filtros
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Cargar clientes
    const loadClients = async () => {
        setLoading(true);
        try {
            const data = await getClients({ ...filters, usuarioId: user?.id ?? "" });
            setClients(data);
        } catch (error) {
            setAlert({ open: true, message: "Error al cargar clientes.", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClients();
    }, [filters]);

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

    // Manejar cambio de página
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // Calcular clientes a mostrar en la página actual
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedClients = clients.slice(startIndex, endIndex);

    // Aplicar filtros al hacer clic en el botón de búsqueda
    const applyFilters = () => {
        setFilters(tempFilters);
    };

    return (
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
                                        value={tempFilters.nombre}
                                        onChange={(e) => setTempFilters({ ...tempFilters, nombre: e.target.value })}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Identificación"
                                        variant="outlined"
                                        size="small"
                                        value={tempFilters.identificacion}
                                        onChange={(e) => setTempFilters({ ...tempFilters, identificacion: e.target.value })}
                                    />
                                    <IconButton
                                        color="inherit"
                                        onClick={applyFilters}
                                        sx={{ backgroundColor: 'ButtonFace', '&:hover': { backgroundColor: 'darkgrey' } }}
                                    >
                                        <Search />
                                    </IconButton>
                                </Stack>

                                {/* Indicador de carga */}
                                {loading ? (
                                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    <>
                                        {/* Tabla de clientes */}
                                        <Paper elevation={3}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ backgroundColor: "#90caf9" }}>
                                                        <TableCell>Identificación</TableCell>
                                                        <TableCell>Nombre Completo</TableCell>
                                                        <TableCell width={150}>Acciones</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {paginatedClients.map((client) => (
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

                                        {/* Paginación */}
                                        <Pagination
                                            count={Math.ceil(clients.length / rowsPerPage)}
                                            page={page}
                                            onChange={handleChangePage}
                                            variant="outlined"
                                            shape="rounded"
                                            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                                        />
                                    </>
                                )}

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