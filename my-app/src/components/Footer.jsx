import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer">

            <p>&copy; 2024 Webshop. All rights reserved.</p>
            <div className="footer-links">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-of-service">Terms of Service</Link>
            </div>
        </footer>
    );
}