import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/user-context';
import ErrorNotice from '../misc/error-notice';

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:5000/users/login", {
                email: user.email,
                password: user.password
            });
            setUserData({
                token: data.token,
                user: data.user
            });
            localStorage.setItem("auth-token", data.token);
            history.push('/')
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <div className="page">
            <h2>Login</h2>

            {error && <ErrorNotice message={error} clearError={() => setError("")} />}
            <form className="form" onSubmit={submit}>
                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />

                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />

                <button type="submit">Login</button>

            </form>
        </div>
    )
}

export default Login
