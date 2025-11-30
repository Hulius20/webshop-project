import { setToken } from "./axiosWithAuth";

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
}