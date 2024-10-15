import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated (e.g., by checking a token in localStorage)
        const token = localStorage.getItem('adminToken');
        setIsAuthenticated(!!token);
    }, []);

    const login = (username, password) => {
        // In a real application, you would validate credentials against your backend
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('adminToken', 'dummyToken');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
    };

    return { isAuthenticated, login, logout };
};

export default useAuth;