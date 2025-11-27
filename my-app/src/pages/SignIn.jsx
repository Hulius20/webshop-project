import React from 'react';
import axios from 'axios';
import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';

function SignIn() {
    return (
        <>
        <div>
            <h1>Sign In Page</h1>
          </div>
        <div>
            <h2>Login</h2>
            <Login />
        </div>
        <div>
            <h2>Sign Up</h2>
            <Signup />
        </div>
        </>
    );
}
export default SignIn;