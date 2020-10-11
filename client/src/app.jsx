import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './layout/header';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import UserContext from './context/user-context'

import './index.scss'

const App = () => {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    const checkLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
        if(token === null) {
            localStorage.setItem("auth-token", "");
            token = "";
        }
        const tokenRes = await axios.post("http://localhost:5000/users/tokenIsValid", null, {
            headers: {
                "x-auth-token": token
            }
        });

        if(tokenRes.data) {
            const userRes = await axios.get("http://localhost:5000/users/", {
                headers: {
                    'x-auth-token': token
                }
            });
            setUserData({
                token,
                user: userRes.data
            })
        }
    };

    useEffect(() => {
        checkLoggedIn()
    }, [])

    return (
        <>
            <UserContext.Provider value={{ userData, setUserData }}>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </UserContext.Provider>
        </>
    )
}

export default App
