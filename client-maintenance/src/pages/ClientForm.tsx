import React, { useState } from 'react';
import axios from 'axios';

const ClientForm: React.FC = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [identification, setIdentification] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/Cliente/Crear', {
                name,
                surname,
                identification,
                address,
                date,
                gender,
            });
            if (response.data.success) {
                setSuccess('Client added successfully!');
                setError('');
            } else {
                setError('Failed to add client. Please try again.');
                setSuccess('');
            }
        } catch (err) {
            setError('Failed to add client. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div>
            <h1>Client Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Identification"
                    value={identification}
                    onChange={(e) => setIdentification(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button type="submit">Submit</button>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
            </form>
        </div>
    );
};

export default ClientForm;
