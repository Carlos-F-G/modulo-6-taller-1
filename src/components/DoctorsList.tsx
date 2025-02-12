import { useEffect, useState } from "react";
import { fetchData } from "../services/apiService";

interface Doctor {
    id: number;
    name: string;
    email: string;
}

const DoctorsList: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        let isMounted = true; // Evita actualizaciones en componentes desmontados

        fetchData("users")
            .then((data) => {
                if (isMounted) {
                    setDoctors(data.map((d: any) => ({
                        id: d.id,
                        name: d.name,
                        email: d.email,
                    })));
                }
            })
            .catch((error) => console.error(error.message));

        return () => { isMounted = false; }; // Cleanup para evitar renderizados innecesarios
    }, []); // Dependencias vacías para ejecutar solo una vez

    return (
        <div>
            <h2>Lista de Doctores</h2>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>
                        {doctor.name} - {doctor.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorsList;
