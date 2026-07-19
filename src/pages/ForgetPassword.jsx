import { useState } from "react"
import { forgetPassword } from "../api/password.api";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {

    let [formFields, setFormFields] = useState({
        email: '',
        password: '',
        confirm_password: ''
    });

    let [fieldErrors, setFieldErrors] = useState({});

    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let response = await forgetPassword(formFields);
            navigate('/', { replace: true })
        } catch (error) {
            let errorData = error.response?.data;
            if (errorData.data) {
                setFieldErrors(errorData.data);
            } else {
                let message = errorData.message;
                alert(message);
            }
        }
    }

    function handleOnChange(e) {

        let { name, value } = e.target;

        setFormFields((previous) => {
            return {
                ...previous,
                [name]: value
            }
        })

        setFieldErrors((previous) => {
            return {
                ...previous,
                [name]: ''
            }
        })
    }

    return (<>
        <h1>Forget Password Page</h1>
        <form onSubmit={handleSubmit}>
            <input type='email' name='email' value={formFields.email} placeholder='enter the email' onChange={handleOnChange} />
            <p>{fieldErrors.email}</p>
            <input type='password' name='password' value={formFields.password} placeholder='enter the password' onChange={handleOnChange} />
            <p>{fieldErrors.password}</p>
            <input type='password' name='confirm_password' value={formFields.confirm_password} placeholder='confirm the password' onChange={handleOnChange} />
            <p>{fieldErrors.confirm_password}</p>
            <button type='submit'>save password</button>
        </form>
    </>)
}