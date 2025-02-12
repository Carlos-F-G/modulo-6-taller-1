import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchData = async (endpoint: string, method: string = "GET", body?: any) => {
    const token = localStorage.getItem("token"); // Recuperamos el JWT si existe

    try {
        const response = await axios({
            url: `${API_URL}/${endpoint}`,
            method,
            data: body,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        return response.data;
    } catch (error: any) {
        console.error("Error en la API:", error);

        // Manejo específico de errores HTTP
        if (error.response) {
            throw new Error(`Error ${error.response.status}: ${error.response.data.message || "Error en la API"}`);
        } else if (error.request) {
            throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
        } else {
            throw new Error("Error desconocido al hacer la solicitud.");
        }
    }
};
