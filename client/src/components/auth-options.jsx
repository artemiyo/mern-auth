import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user-context';
import Button from './button';

const AuthOptions = () => {
    const { userData, setUserData } = useContext(UserContext)
    const history = useHistory();

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
        history.push("/login")
    }

    return (
        <div className="auth-options">
            {userData.user ? (<Button text="Logout" onClick={logout} />) : (
                <>
                    <Button text="Register" onClick={() => history.push('/register')} />
                    <Button text="Login" onClick={() => history.push('/login')} />
                </>
            )}

        </div>
    )
}

export default AuthOptions
