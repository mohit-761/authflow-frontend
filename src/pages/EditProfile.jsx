import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "../api/profile.api";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    let { userData, setUserData } = useContext(AuthContext);
    let navigate = useNavigate();
    let [formFields, setFormFields] = useState({
        name: '',
        email: '',
    });
    let [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (userData) {
            setFormFields({
                name: userData.name,
                email: userData.email,
            })
        }
    }, [userData]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let response = await updateProfile(formFields);
            setUserData(response.data);
            localStorage.setItem('userData', JSON.stringify(response.data));
            navigate('/profile', { replace: true })
        } catch (error) {
            let errorData = error?.response?.data;
            if (errorData.data) {
                setFieldErrors(errorData.data);
            } else {
                let message = errorData.message || 'something went wrong please try again';
                alert(message);
            }
        }
    }

    function handleOnChange(e) {
        
        let { name, value } = e.target;

        setFormFields((previous) => {
            return {
                ...previous,
                [name]: value,
            }
        });

        setFieldErrors((previous) => {
            return {
                ...previous,
                [name]: ''
            }
        })
    }

    return <>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' name='name' value={formFields.name} onChange={handleOnChange} autoComplete="off" />
            <p>{fieldErrors.name}</p>
            <input type='email' name='email' value={formFields.email} onChange={handleOnChange} autoComplete="off" />
            <p>{fieldErrors.email}</p>
            <button>submit</button>
        </form>
    </>
}
export default EditProfile;