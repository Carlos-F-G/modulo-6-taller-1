import { useState } from "react";
import CryptoJS from "crypto-js"; // Importamos la librería de encriptación

interface Patient {
    name: string;
    age: string;
    email: string;
}

const SECRET_KEY = "mi-clave-segura"; // Clave para encriptar los datos

const sanitizeInput = (input: string) => {
    return input.replace(/[<>/"'();]/g, ""); // Elimina caracteres peligrosos
};

const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString(); // Encripta el dato
};

const PatientForm: React.FC = () => {
    const [formData, setFormData] = useState<Patient>({
        name: "",
        age: "",
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: sanitizeInput(e.target.value), // Limpia la entrada
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.age || !formData.email) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
            alert("Por favor, ingresa una edad válida.");
            return;
        }

        // Encriptamos el email antes de enviarlo
        const encryptedEmail = encryptData(formData.email);

        console.log("Datos del paciente enviados:", {
            name: formData.name,
            age: formData.age,
            email: encryptedEmail, // Enviamos el email encriptado
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label>Edad:</label>
            <input type="text" name="age" value={formData.age} onChange={handleChange} />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <button type="submit">Registrar Paciente</button>
        </form>
    );
};

export default PatientForm;