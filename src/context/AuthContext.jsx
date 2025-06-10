import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        if (storedToken) {
            // Backend token verification
            if (storedToken === "LOGGED_IN_DUMMY") {
                setCurrentUser({ username: 'TestUser' });
            }
        }
        setIsLoading(false)

    }, []);

    const login = (userData, token) => {

        localStorage.setItem('userToken', token);

        setCurrentUser(userData);
    };

    const logout = () => {

        localStorage.removeItem('userToken');
        setCurrentUser(null);

    };

    if (isLoading) {
        return <div>Loading application...</div>
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};