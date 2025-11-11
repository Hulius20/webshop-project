import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav>
            <h2>Webshop</h2>
            <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/cart">Cart</Link>
            </div>
        </nav>
    );
}


export default Navbar;