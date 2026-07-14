import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
    let { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    return (
        <nav>
            {isAuthenticated ?
                <>
                    <NavLink style={{ padding: "20px" }} to="/dashboard">Dashboard</NavLink>
                    <NavLink style={{ padding: "20px" }} to="/profile">Profile</NavLink>
                    <button>logout</button>
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
