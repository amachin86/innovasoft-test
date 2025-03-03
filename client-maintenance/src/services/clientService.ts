import api from "./api"; // Axios configurado con baseURL y token
import { ClientData, ClientCreate, Client } from "../Interfaces/clienteInterface";
import axios from 'axios';

var base_url = "https://pruebareactjs.test-class.com/Api";
export class CustomError extends Error {
    statusCode = 500;
    constructor(message: string) {
      super(message);      
    }
  }



// Obtener listado de clientes
export const getClients = async (filters: { identificacion?: string; nombre?: string; usuarioId: string }) => {
    try {
        const response = await api.post<Client[]>("/api/Cliente/Listado", filters);
        console.log(filters);
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
export const createClient = async (clientData: ClientCreate) => {
    try {
        console.log(clientData);

        const response = await api.post("/api/Cliente/Crear", clientData);
        return response.data;
        
    } catch (error) {
        console.error("Error creando cliente ", error);
        throw error;
    }
    
};

// Actualizar cliente
export const updateClient = async (clientData: ClientCreate) => {

   /* const token = localStorage.getItem('token');
    
    const axiosAPI = axios.create({
        baseURL: base_url, // Cambia esto por la URL base de tu API
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido
            'Accept': 'application/json', // Aceptar respuesta en formato JSON
            'Authorization': `Bearer ${token}`,  
            'User-Agent': 'PostmanRuntime/7.43.0', // Simula el User-Agent de Postman
            // Agrega otros encabezados que necesites
        }
    });*/
    console.log(clientData);
    try {
        const response = await api.post(`/api/Cliente/Actualizar`, clientData);///api/Cliente/Actualizar/${id}
        return response.data;
        
    } catch (error) {
        console.error("Error actualizando cliente ", error);
        throw error;
        
    }   
};

export const createClientTest = async (clientData: ClientCreate) => {
    
        let data = JSON.stringify({
        "nombre": "Prueba",
        "apellidos": "Test API",
        "identificacion": "0009865-op",
        "celular": "85757575775",
        "otroTelefono": "84847477474664",
        "direccion": "direccion de prueba",
        "fNacimiento": "2025-02-28T10:45:49.652Z",
        "fAfiliacion": "2025-02-28T10:45:49.652Z",
        "sexo": "M",
        "resennaPersonal": "Probar API",
        "imagen": "string",
        "interesFK": "bca7ed8f-ee04-483b-bde6-2a7c186276fc",
        "usuarioId": "770096bd-6cae-41f8-a591-3a7368402dc4"
        });
        
        const token = localStorage.getItem('token');
        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://pruebareactjs.test-class.com/Api/api/Cliente/Crear',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`,             
        },
        data : clientData
        };

        axios.request(config)
        .then(function (response): any {
        console.log(JSON.stringify(response.data));
        return response.data;
        })
        .catch(function (error) {
        console.log(error);
        throw error;
        });

};

