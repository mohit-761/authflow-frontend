import { useEffect, useState } from "react";
import { getProfile } from "../api/profile.api";

function Dashboard() {

    let [user, setUser] = useState(null);
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        let fetchProfile = async () => {
            try {
                let response = await getProfile();
                setUser(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return <h3>Loading...</h3>
    }

    if (error) {
        return <h3>{error}</h3>
    }

    return (<>
        <h1>Dashboard Page</h1>
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
                    <td>{user.avatar || <img src="#" alt="user profile image" />}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr>
            </tbody>
        </table>}
    </>)
};

export default Dashboard;