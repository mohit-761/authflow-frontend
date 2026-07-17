import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {

    let [isAuthenticated, setIsAuthenticated] = useState(false);
    let [userData, setUserData] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem('token');
        let userData = localStorage.getItem('userData');

        if (token && userData) {
            setIsAuthenticated(true);
            setUserData(JSON.parse(userData));
        }
    }, []);

    return <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}>
        {children}
    </AuthContext.Provider>

};

export default AuthContextProvider;