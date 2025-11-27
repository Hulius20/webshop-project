import { useState } from "react";
import axios from "axios";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://127.0.0.1:8000/api/accounts/register/", {
            username,
            password,
        });
        alert("User registered successfully!");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Sign Up</button>
        </form>
    );
}