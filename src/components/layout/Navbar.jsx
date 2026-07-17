import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {

    let { isAuthenticated, setIsAuthenticated, setUserData } = useContext(AuthContext);

    function handleLogout() {

        localStorage.removeItem('token');
        localStorage.removeItem('userData');

        setIsAuthenticated(false);
        setUserData(null);

    }

    return (
        <nav>
            {isAuthenticated ?
                <>
                    <NavLink style={{ padding: "20px" }} to="/dashboard">Dashboard</NavLink>
                    <NavLink style={{ padding: "20px" }} to="/profile">Profile</NavLink>
                    <button onClick={handleLogout}>logout</button>
                </>
                :
                <>
                    <NavLink to="/" style={{ padding: "20px" }}>Login</NavLink>
                    <NavLink to="/register" style={{ padding: "20px" }}>Register</NavLink>
                </>}
        </nav>
    );
}

export default Navbar;
