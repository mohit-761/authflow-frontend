import { useContext, useEffect, useState } from "react";
import { deleteProfile, getProfile } from "../api/profile.api";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from 'react-router-dom';
import EditProfile from "./EditProfile";

function Profile() {

    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState('');
    let { setIsAuthenticated, setUserData } = useContext(AuthContext);

    useEffect(() => {

        let fetchProfile = async () => {
            try {
                let response = await getProfile();
                setUser(response.data);
            } catch (error) {
                let errorData = error?.response?.data;
                setError(errorData.message || 'something went wrong. please try again later');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, []);

    async function handleDeleteProfile() {

        let ans = confirm('are you sure you want to delete the profile');

        if (ans) {
            try {

                await deleteProfile();
                setIsAuthenticated(false);
                setUserData(null);
                localStorage.removeItem('token');
                localStorage.removeItem('userData');

            } catch (error) {
                let errorData = error?.response?.data;
                setError(errorData.message || 'something went wrong. please try again later');
            }
        }
    }

    if (loading) {
        return <h3>Loading...</h3>
    }

    if (error) {
        return <h3>{error}</h3>
    }

    return (<>
        <h1>Profile Page</h1>
        {user && <table border={1} cellPadding={10} cellSpacing={10}>
            <thead>
                <tr>
                    <th> id </th>
                    <th> avatar </th>
                    <th> name </th>
                    <th> email </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{user._id}</td>
                    <td>{
                        user.avatar_url ? (
                            <img src={user.avatar_url}
                                alt='profile'
                                width={100}
                                height="auto"
                            />) : (
                            "No Profile Photo"
                        )
                    }</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <td>
                        <button onClick={() => handleDeleteProfile()}>delete profile</button>
                    </td>
                    <td>
                        <NavLink to='/profile/edit-avatar'>edit profile photo</NavLink>
                    </td>
                    <td>
                        <NavLink to='/profile/edit'>edit profile details</NavLink>
                    </td>
                    <td>
                        <NavLink to='/profile/change-password'>edit password</NavLink>
                    </td>
                </tr>
            </tbody>
        </table>}
    </>)
}

export default Profile;