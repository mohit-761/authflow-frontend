import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {

    let { isAuthenticated } = useContext(AuthContext);

    return <>{
        isAuthenticated ?
            <Navigate to='/dashboard' replace />
            : children
    }</>
}

export default PublicRoute;