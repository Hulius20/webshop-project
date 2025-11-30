import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api, {setToken} from '../api/axiosWithAuth.jsx';


export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
       try{
          const response = await api.post("api/accounts/register/", {
            username,
            password,
        });
        const token = response.data?.access;
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
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Sign Up</button>
        </form>
    );
}