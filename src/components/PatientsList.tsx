import { useEffect, useState } from 'react';
import { fetchData } from '../services/apiService';

interface Patient {
    id: number;
    name: string;
    email: string;
    age: number;
}
const PatientsList = () => {
    const [patients, setPatients] = useState<Patient[]>([]);

useEffect(() => {
    fetchData('users')
        .then(data => {
            // Agregar un campo age con un valor aleatorio entre 20 y 80
            const patientsWithAge = data.map((p: any) => ({
                ...p,
                age: Math.floor(Math.random() * 60) + 20, 
            }));
            setPatients(patientsWithAge);
        })
        .catch(error => console.error(error.message));
}, []);



return (
    <div>
        <h2>Lista de Pacientes</h2>
        <ul>
            {patients.map((p) => (
                <li key={p.id}>{p.name} - {p.email} - {p.age} años</li>
            ))}
        </ul>
    </div>
);

};

export default PatientsList;
