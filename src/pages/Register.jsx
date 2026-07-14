import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../api/auth.api";

function Register() {

    let [formFields, setFormFields] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    let navigate = useNavigate();
    let [formErrors, setFormErrors] = useState({});
    let [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        // clear the previous errors
        setFormErrors({});

        setIsLoading(true);

        try {

            let response = await registerUser(formFields);

            if (response.success) {
                setFormFields({
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                })

                // navigate to login page
                navigate('/', { replace: true });
            }


        } catch (error) {
            let errorData = error?.response?.data;
            if (errorData?.data) {
                setFormErrors(errorData.data);

            } else {
                alert(errorData?.message || 'something went wrong');
            }
        } finally {
            setIsLoading(false);
        }

    }

    function handleOnChange(e) {

        let { name, value } = e.target;

        setFormFields((previous) => ({
            ...previous,
            [name]: value
        }));

        let tempObj = { ...formErrors };

        delete tempObj[name];

        setFormErrors({ ...tempObj });

    }

    return (<>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit} >
            <div>
                <input type='text' name='name' value={formFields.name} placeholder="please enter the name" onChange={handleOnChange} autoComplete="off" required />
                <p style={{ color: 'red' }}>{formErrors.name && formErrors.name}</p>
            </div>
            <div>
                <input type='email' name='email' value={formFields.email} placeholder="please enter the email" onChange={handleOnChange} autoComplete="off" required />
                <p style={{ color: 'red' }}>{formErrors.email && formErrors.email}</p>
            </div>
            <div>
                <input type="password" name='password' value={formFields.password} placeholder="please enter the password" onChange={handleOnChange} autoComplete="off" required />
                <p style={{ color: 'red' }}>{formErrors.password && formErrors.password}</p>
            </div>
            <div>
                <input type="password" name='confirm_password' value={formFields.confirm_password} placeholder="please enter the confirm password" onChange={handleOnChange} autoComplete="off" required />
                <p style={{ color: 'red' }}>{formErrors.confirm_password && formErrors.confirm_password}</p>
            </div>
            <button type='submit' disabled={isLoading}>{isLoading ? 'registering...' : 'register'}</button>
        </form>
        <p>if you already have an account then please: <Link to='/' >Login</Link></p>
    </>)
}

export default Register;