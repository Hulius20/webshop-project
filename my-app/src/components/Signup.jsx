import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api, {setToken} from '../api/axiosWithAuth.jsx';


export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
       try{
          const response = await api.post("api/accounts/register/", {
            username,
            email,
            password,
        });
        
        let token = response.data?.access ?? response.data?.token;
        
        if (!token) {
            try {
                const loginRes = await api.post("api/accounts/login/", { username, password });
                token = loginRes.data?.access ?? loginRes.data?.token;
            } catch (loginErr) {
                console.error('Login fallback failed', loginErr);
            }
        }
        
        if (token) {
            setToken(token);
            localStorage.setItem("username", username);
            window.dispatchEvent(new Event('userLoggedIn'));
            alert("Account created successfully!");
            navigate("/account");
        }
         } catch (error){
              alert("Error creating account. Please try again." );
            }
       };
    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
            <button type="submit">Sign Up</button>
        </form>
    );
}