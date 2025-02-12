import { useState, useEffect } from "react";

const useAuth = () => {
    const [user, setUser] = useState<null | string>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (username: string) => {
        localStorage.setItem("user", username);
        setUser(username);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return { user, login, logout };
};

export default useAuth;
