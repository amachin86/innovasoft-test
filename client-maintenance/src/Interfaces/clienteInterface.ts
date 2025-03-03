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
    otroTelefono: string; 
    direccion: string;
    fNacimiento: string; 
    fAfiliacion: string; 
    sexo: string;
    resenaPersonal: string; 
    imagen?: string; // Opcional
    interesesId: string;
    usuarioId: string;
}

export interface ClientCreate {
    id?: string;    
    identificacion: string;
    nombre: string;
    apellidos: string;
    celular: string;
    otroTelefono: string; 
    direccion: string;
    fNacimiento: string; 
    fAfiliacion: string; 
    sexo: string;
    resenaPersonal: string; 
    imagen?: string; // Opcional
    interesesId: string;
    usuarioId: string;
}