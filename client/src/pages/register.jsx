import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/user-context';
import ErrorNotice from '../misc/error-notice';

const Register = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        passwordCheck: "",
        displayName: ""
    });

    const [error, setError] = useState("");

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            setError("")
            await axios.post("http://localhost:5000/users/register", user);

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
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError("")} />}
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <input id="register-check-password" type="password" placeholder="Verify password" onChange={(e) => setUser({ ...user, passwordCheck: e.target.value })} />

                <label htmlFor="register-display-name">Display name</label>
                <input id="register-display-name" type="text" onChange={(e) => setUser({ ...user, displayName: e.target.value })} />

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
