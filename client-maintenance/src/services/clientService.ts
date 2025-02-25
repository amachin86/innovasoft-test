import api from "./api"; // Axios configurado con baseURL y token

// Interfaz del cliente
export interface Client {
    id: string;
    identificacion: string;
    nombre: string;
    apellidos: string;
}

// Interfaz del cliente
export interface ClientData {
    id?: string;
    identificacion: string;
    nombre: string;
    apellidos: string;
    telefonoCelular: string;
    otroTelefono?: string;
    direccion: string;
    fNacimiento: string;
    fAfiliacion: string;
    sexo: string;
    resenaPersonal?: string;
    imagen?: string;
    interesesId: string;
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

//Obtener listado de intereses
export const getInterests = async () => {
    try {
        const response = await api.get("/api/Intereses/Listado");
        return response.data;
        
    } catch (error) {
        console.error("Error listando intereses ", error);
        throw error;
    }    
};

// Obtener cliente por ID
export const getClientById = async (id: string) => {
    try {
        const response = await api.get<ClientData>(`/api/Cliente/Obtener/${id}`);
        return response.data;
        
    } catch (error) {
        console.error("Error obteniendo cliente ", error);
        throw error;
    }
   
};

// Crear cliente
export const createClient = async (clientData: Client) => {
    try {
        const response = await api.post("/api/Cliente/Crear", clientData);
        return response.data;
        
    } catch (error) {
        console.error("Error creando cliente ", error);
        throw error;
    }
    
};

// Actualizar cliente
export const updateClient = async (id: string, clientData: Client) => {
    try {
        const response = await api.put(`/api/Cliente/Actualizar/${id}`, clientData);
        return response.data;
        
    } catch (error) {
        console.error("Error actualizando cliente ", error);
        throw error;
        
    }   
};

