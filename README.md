# 📌 Proyecto React - Gestión de Clientes

## 📖 Descripción
Este proyecto es una aplicación web desarrollada con React, TypeScript y Material UI, diseñada para gestionar clientes de una empresa. Permite crear, editar, eliminar y listar clientes, además de manejar autenticación y carga de imágenes.

## 🚀 Características
- ✔️ Inicio de sesión y registro de usuarios.
- ✔️ Gestión de clientes con CRUD (Crear, Leer, Actualizar, Eliminar).
- ✔️ Validaciones de formularios sin Yup.
- ✔️ Carga de imágenes usando Avatar.
- ✔️ Rutas protegidas, evitando acceso no autorizado.
- ✔️ Diseño responsivo con Material UI.

## 🛠 Tecnologías utilizadas
- React (con TypeScript)
- React Router (gestión de rutas)
- Material UI (componentes estilizados)
- Axios (consumo de API)
- React Hook Form (manejo de formularios)
- Day.js (manejo de fechas)

## ⚙️ Instalación y Configuración
1️⃣ Clonar el repositorio
```bash
git clone https://github.com/usuario/proyecto-react-clientes.git
cd proyecto-react-clientes
```
2️⃣ Instalar dependencias
```bash
npm install
```
3️⃣ Ejecutar el proyecto
```bash
npm run dev
```
## 🏗 Uso del Proyecto

### 🔹 Autenticación
El usuario debe iniciar sesión o registrarse para acceder a la aplicación.  
Se almacena la sesión en el contexto `AuthContext`.

### 🔹 Gestión de Clientes
Desde `ClientsPage.tsx`, se pueden buscar, editar, eliminar y agregar clientes.  
`ClientFormPage.tsx` permite crear o actualizar clientes con validaciones manuales.  
Se usa Avatar para la carga y previsualización de imágenes en Base64.

### 🔹 Rutas Protegidas
Solo usuarios autenticados pueden acceder a las páginas de clientes.  
Se usa `PrivateRoute.tsx` para bloquear accesos no autorizados.

## ❗ Validaciones en Formularios
- 🔹 Sin Yup, con reglas manuales en `ClientFormPage.tsx`.
- 🔹 Se valida que todos los campos obligatorios sean completados.
- 🔹 El botón Guardar se deshabilita hasta que el formulario esté válido.

## 🛠 API y Servicios
### 📌 `clientService.ts` maneja las peticiones a la API:
- `getClients()` → Obtiene la lista de clientes.
- `getClientById(id)` → Obtiene un cliente por ID.
- `createClient(data)` → Crea un nuevo cliente.
- `updateClient(id, data)` → Actualiza un cliente existente.
- `deleteClient(id)` → Elimina un cliente.
- `getInterests()` → Obtiene los intereses del cliente.

## 📜 Licencia
Este proyecto está bajo la licencia GNU General Public License.

## ✨ Mejoras futuras
- ☑ Agregar soporte para Redux en la gestión del estado.
- ☑ Implementar Yup para validaciones más robustas.
- ☑ Agregar un sistema de roles de usuario.





Copyright (C) 2025


