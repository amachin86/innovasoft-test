import { ClientData, ClientCreate } from "../Interfaces/clienteInterface";

export const getClienteInfo = (data: ClientData) => {
     const client: ClientCreate =
    {
        identificacion: data.identificacion,
        nombre: data.nombre,
        apellidos: data.apellidos,
        celular: data.telefonoCelular,
        otroTelefono: data.otroTelefono,
        direccion: data.direccion,
        fNacimiento: data.fNacimiento,
        fAfiliacion: data.fAfiliacion,
        sexo: data.sexo,
        resenaPersonal: data.resenaPersonal,
        imagen: data.imagen,
        interesesId: data.interesesId,
        usuarioId: data.usuarioId,           
    }

    return client;
}