import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { changePassword } from "../api/password.api";
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {

    let [formFields, setFormFields] = useState({
        old_password: '',
        password: '',
        confirm_password: '',
    });

    let { setIsAuthenticated, setUserData } = useContext(AuthContext);
    let [fieldErrors, setFieldErrors] = useState({});
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let response = await changePassword(formFields);
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            setIsAuthenticated(false);
            setUserData(null);
            navigate('/', { replace: true })
        } catch (error) {
            let errorData = error.response?.data;
            if (errorData.data) {
                setFieldErrors(errorData.data);
            } else {
                alert(errorData.message);
            }
        }
    }

    function handleOnChange(e) {

        let { name, value } = e.target;

        setFormFields((previous) => {
            return ({
                ...previous,
                [name]: value
            })
        });

        setFieldErrors((previous) => {
            return {
                ...previous,
                [name]: ''
            }
        });

    }

    return <>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
            <input type='password' name='old_password' placeholder='enter the current password' value={formFields.old_password} onChange={handleOnChange} required />
            <p>{fieldErrors.old_password}</p>
            <input type='password' name='password' placeholder='enter the new password' value={formFields.password} onChange={handleOnChange} required />
            <p>{fieldErrors.password}</p>
            <input type='password' name='confirm_password' placeholder='confirm the new password' value={formFields.confirm_password} onChange={handleOnChange} required />
            <p>{fieldErrors.confirm_password}</p>
            <button type='submit'>change password</button>
        </form>
    </>
}