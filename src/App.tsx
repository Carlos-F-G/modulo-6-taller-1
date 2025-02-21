import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PatientForm from "./components/PatientForm";
import DoctorsList from "./components/DoctorsList";
import PatientsList from "./components/PatientsList";
import useAuth from "./hooks/useAuth";
import { agregarCita, obtenerCitasLazy, limpiarCitas } from "./utils/indexedDB";
import "./styles.css";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/" />;
};

function App() {
    const { user, login, logout } = useAuth();
    const [username, setUsername] = useState("");
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setUsername(storedUser);
            login(storedUser);
        }
    }, []);

    const handleLogin = () => {
        localStorage.setItem("username", username);
        login(username);
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        logout();
        setUsername("");
    };

    const handleAgregarCita = () => {
        const nuevaCita = {
            id: Date.now(),
            paciente: "Juan Pérez",
            doctor: "Dra. García",
            fecha: "2025-03-01"
        };
        agregarCita(nuevaCita).then(() => console.log("Cita agregada en IndexedDB"));
    };

    const handleObtenerCitas = async () => {
        try {
            const data = await obtenerCitasLazy();
            console.log("Citas obtenidas:", data);
            setCitas(data);
        } catch (error) {
            console.error("Error al obtener citas:", error);
        }
    };

    const handleLimpiarCitas = async () => {
        await limpiarCitas();
        setCitas([]);
        console.log("Todas las citas han sido eliminadas.");
    };

    return (
        <Router>
            <div className="container">
                <h1>Hospital Nueva Vida</h1>

                {!user ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button className="btn-primary" onClick={handleLogin}>
                            Iniciar Sesión
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>Bienvenido, {user}!</p>
                        <button className="btn-secondary" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </div>
                )}

                <hr />

                <div className="button-group">
                    <button className="btn-primary" onClick={handleAgregarCita}>
                        Agregar Cita a IndexedDB
                    </button>

                    <button className="btn-secondary" onClick={handleObtenerCitas}>
                        Ver Citas Guardadas
                    </button>

                    <button className="btn-danger" onClick={handleLimpiarCitas}>
                        Limpiar Todas las Citas
                    </button>
                </div>

                <ul>
                    {citas.length > 0 ? (
                        citas.map((cita, index) => (
                            <li key={index}>
                                {cita.paciente} - {cita.doctor} - {cita.fecha}
                            </li>
                        ))
                    ) : (
                        <p>No hay citas registradas.</p>
                    )}
                </ul>

                <Routes>
                    <Route path="/" element={<PatientForm />} />
                    <Route path="/doctors" element={<DoctorsList />} />
                    <Route path="/patients" element={<PrivateRoute><PatientsList /></PrivateRoute>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
