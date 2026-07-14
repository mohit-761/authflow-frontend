import { createContext, useState } from 'react';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {

    let [isAuthenticated, setIsAuthenticated] = useState(false);
    let [userData, setUserData] = useState(null);

    return <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}>
        {children}
    </AuthContext.Provider>

};

export default AuthContextProvider;