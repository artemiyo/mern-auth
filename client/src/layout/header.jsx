import React from 'react';
import { Link } from 'react-router-dom'
import AuthOptions from '../components/auth-options';

const Header = () => {
    return (
        <header id="header">
            <Link to="/">
                <h1 className="title">MERN auth</h1>
            </Link>
            <AuthOptions />
        </header>
    )
}

export default Header
