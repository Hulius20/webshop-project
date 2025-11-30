import {useState } from "react";
import { useNavigate } from "react-router-dom";
import api, {setToken} from "../api/axiosWithAuth";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post("api/accounts/login/", {
            username,
            password,
            });
            const token = response.data?.access;
            if (token) {
                setToken(token);
                localStorage.setItem("username", username);
                window.dispatchEvent(new Event('userLoggedIn'));
                navigate("/");
            }
        } catch (error){
            alert("Login failed. Please check your credentials and try again.");

    }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Log In</button>
        </form>
    );
}