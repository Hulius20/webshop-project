import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/logout.jsx';
import '../styles/Navbar.css';

function Navbar() {
    const [username, setUsername] = useState(() => localStorage.getItem('username'));
    const navigate = useNavigate();
    const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 1 minute
    let inactivityTimer;

    useEffect(() => {
        const onStorageChange = () => {
                setUsername(localStorage.getItem('username'));
            
        };
        window.addEventListener('storage', onStorageChange);
        return () => {
            window.removeEventListener('storage', onStorageChange);
            }
 }, []);

    useEffect(() => {
        const onUserLoggedIn = () => {
            setUsername(localStorage.getItem('username'));
        };
        window.addEventListener('userLoggedIn', onUserLoggedIn);
        return () => {
            window.removeEventListener('userLoggedIn', onUserLoggedIn);
        };
    }, []);

    useEffect(() => {
        const onUserLoggedOut = () => {
            setUsername(null);
            localStorage.removeItem('username');
        };
        window.addEventListener('userLoggedOut', onUserLoggedOut);
        return () => {
            window.removeEventListener('userLoggedOut', onUserLoggedOut);
        };
    }, []);

    // Inactivity logout effect
    const resetInactivityTimer = () => {
        if (inactivityTimer) clearTimeout(inactivityTimer);

        if (username) {
            inactivityTimer = setTimeout(() => {
                handleLogout();
            }, INACTIVITY_TIMEOUT);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', resetInactivityTimer);
        window.addEventListener('keydown', resetInactivityTimer);
        resetInactivityTimer();

        return () => {
            window.removeEventListener('mousemove', resetInactivityTimer);
            window.removeEventListener('keydown', resetInactivityTimer);
            if (inactivityTimer) clearTimeout(inactivityTimer);
        };
    }, [username]);





    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if(storedUsername && storedUsername !== username) {
            setUsername(storedUsername);
        }
    }, []);
    
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
        setUsername(null);
        navigate('/');
    };
    return (
        <nav>
            <h2>
                <Link to="/">Webshop</Link>
            </h2>
            <div className="nav-links">
                {username ? (
                    <>
                        <span className="nav-username">Welcome, {username}!</span>
                        <Link to="/account">Account</Link>
                        <Link to="/cart">Cart</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <span className="nav-username">Guest</span>
                        <Link to="/sign-in">Sign In</Link>
                        <Link to="/cart">Cart</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;