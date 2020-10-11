import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user-context'

const Home = () => {
    const { userData } = useContext(UserContext);
    const history = useHistory()

    useEffect(() => {
        if (!userData.user) history.push("/login");
    }, [userData, history])
    return (
        <div>
            Home
        </div>
    )
}

export default Home
