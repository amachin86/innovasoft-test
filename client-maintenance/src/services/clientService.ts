import api from "./api"; // Axios configurado con baseURL y token

// Interfaz del cliente
export interface Client {
    id: string;
    identificacion: string;
    nombre: string;
    apellidos: string;
}

// Obtener listado de clientes
export const getClients = async (filters: { identificacion?: string; nombre?: string; usuarioId: string }) => {
    try {
        const response = await api.post<Client[]>("/api/Cliente/Listado", filters);
        return response.data;
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        throw error;
    }
};

// Eliminar cliente por ID
export const deleteClient = async (clientId: string) => {
    try {
        const response = await api.delete(`/api/Cliente/Eliminar/${clientId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        throw error;
    }
};
