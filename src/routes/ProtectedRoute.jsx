import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    let { isAuthenticated } = useContext(AuthContext);
    let navigate = useNavigate();

    return <>
        {
            isAuthenticated
                ? children
                : <Navigate to='/' replace />
        }
    </>

}

export default ProtectedRoute;