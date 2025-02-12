import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PatientForm from "./components/PatientForm";
import DoctorsList from "./components/DoctorsList";
import PatientsList from "./components/PatientsList";
import useAuth from "./hooks/useAuth";
import "./styles.css";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/" />;
};

function App() {
    const { user, login, logout } = useAuth();
    const [username, setUsername] = useState("");

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
                        <button onClick={() => login(username)}>Iniciar Sesión</button>
                    </div>
                ) : (
                    <div>
                        <p>Bienvenido, {user}!</p>
                        <button onClick={logout}>Cerrar Sesión</button>
                    </div>
                )}

                <hr />

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
