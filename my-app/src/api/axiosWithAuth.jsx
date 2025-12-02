import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

// Function to set the authorization token
function setToken(token) {
    if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete api.defaults.headers.common.Authorization;
    }   
}
// Initialize token from localStorage if available
const existingToken = localStorage.getItem('token');
if (existingToken) {
    api.defaults.headers.common.Authorization = `Bearer ${existingToken}`;
}

// Clear bad tokens on 401 or network errors
api.interceptors.response.use(
    response => response,
    error => {
        const status = error?.response?.status;
        const isNetworkError = !error?.response && error?.code;
        if (status === 401 || isNetworkError) {
            //clear bad token
            setToken(null);
            window.dispatchEvent(new Event('userLoggedOut'));
        }
        return Promise.reject(error);
    }
);
export{setToken};
export default api;