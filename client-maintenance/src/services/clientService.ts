import api from "./api"; // Axios configurado con baseURL y token
import axios from 'axios';

var base_url = "https://pruebareactjs.test-class.com/Api";
export class CustomError extends Error {
    statusCode = 500;
    constructor(message: string) {
      super(message);      
    }
  }

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
    otroTelefono?: string; // Opcional
    direccion: string;
    fNacimiento: Date; // Cambiado a Date
    fAfiliacion: Date; // Cambiado a Date
    sexo: string;
    resenaPersonal?: string; // Opcional
    imagen?: string; // Opcional
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
    
        const response = await axios.post( base_url +'/api/Authenticate/register', {
            username,
            email,
            password,
          }).then(function(response): any {
            console.log(response);
            return response;
          })
          .catch(function (error) {           
            if (error.response) {
              // La respuesta fue hecha y el servidor respondió con un código de estado
              // que esta fuera del rango de 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              throw new CustomError(error.response.data.message);
              //console.log(error.response.headers);
            } else if (error.request) {
              // La petición fue hecha pero no se recibió respuesta
              // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
              // http.ClientRequest en node.js
              console.log(error.request);              
            } else {
              // Algo paso al preparar la petición que lanzo un Error
              console.log('Error', error.message);              
            }
            console.log(error.config);
          });
        return response;
};

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(base_url + '/api/Authenticate/login', {
            username,
            password,
          });
        console.log(response);
        return response;
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
export const createClient = async (clientData: ClientData) => {
    try {
        const response = await api.post("/api/Cliente/Crear", clientData);
        return response.data;
        
    } catch (error) {
        console.error("Error creando cliente ", error);
        throw error;
    }
    
};

// Actualizar cliente
export const updateClient = async (id: string, clientData: ClientData) => {
    try {
        const response = await api.put(`/api/Cliente/Actualizar/${id}`, clientData);
        return response.data;
        
    } catch (error) {
        console.error("Error actualizando cliente ", error);
        throw error;
        
    }   
};

