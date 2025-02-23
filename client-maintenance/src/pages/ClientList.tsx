import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Client {
    id: number;
    name: string;
    // Add other relevant fields as necessary
}

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('/api/Cliente/Listado');
                setClients(response.data);
            } catch (err) {
                setError('Failed to fetch clients. Please try again.');
            }
        };

        fetchClients();
    }, []);

    return (
        <div>
            <h1>Client List</h1>
            {error && <p>{error}</p>}
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>{client.name}</li>
                ))}
            </ul>
            {/* Add buttons for adding, editing, and deleting clients */}
        </div>
    );
};

export default ClientList;
