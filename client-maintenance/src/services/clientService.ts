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

export const registerUser = async (username: string, email: string, password: string,) => {
    try {
        const response = await api.post('/api/Authenticate/register', {
            username,
            email,
            password,
          });
        return response.data;
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        throw error;
    }
};

export const loginUser = async (username: string, password: string,) => {
    try {
        const response = await api.post('/api/Authenticate/login', {
            username,
            password,
          });
        return response.data;
    } catch (error) {
        console.error("Error en login", error);
        throw error;
    }
};
