import { useContext, useState } from "react";
import { loginUser } from "../api/auth.api";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {

    let [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });

    let [formErrors, setFormErrors] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let [apiError, setApiError] = useState('');
    let navigate = useNavigate();
    let { setIsAuthenticated, setUserData } = useContext(AuthContext);


    async function handleSubmit(e) {

        e.preventDefault();
        setFormErrors({});
        setApiError('');
        setIsLoading(true);

        try {

            let response = await loginUser(formFields);

            if (response.success) {

                setFormFields({
                    email: '',
                    password: '',
                })

                let { token, user } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('userData', JSON.stringify(user));

                setIsAuthenticated(true);
                setUserData(user);

                navigate('/dashboard', { replace: true })
            }

        } catch (error) {

            let errorData = error?.response?.data;

            if (errorData.data) {

                setFormErrors(errorData.data);

            } else {

                setApiError(errorData?.message);

            }

        } finally {
            setIsLoading(false);
        }

    }

    function handleOnChange(e) {

        let { name, value } = e.target;

        setFormFields((previous) => {
            return {
                ...previous,
                [name]: value
            }
        });

        // reset errors
        let tempErrorObj = { ...formErrors };

        delete tempErrorObj[name];
        
        setFormErrors({ ...tempErrorObj });

    }

    return (<>
        <h1>Login Page</h1>
        <p>{apiError && apiError}</p>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='email' name='email' value={formFields.email} placeholder='please enter the email' autoComplete="off" onChange={handleOnChange} required />
                    <p style={{ color: 'red' }}>{formErrors.email}</p>
                </div>
                <div>
                    <input type='password' name='password' value={formFields.password} placeholder='please enter the password' autoComplete="off" onChange={handleOnChange} required />
                    <p style={{ color: 'red' }}>{formErrors.password}</p>
                </div>
                <div>
                    <button>{isLoading ? 'Login...' : 'Login'}</button>
                    <p>forget password: <NavLink to='/profile/forget-password'>forget-password</NavLink></p>
                    <p>new to application please: <NavLink to='/register'>register</NavLink></p>
                </div>
            </form>
        </div>
    </>)
}

export default Login;