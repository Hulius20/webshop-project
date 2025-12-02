import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import api, { setToken } from './api/axiosWithAuth.jsx';

async function initializeApp() {
  const token = localStorage.getItem('token');
  if (token) {
    try{
      await api.get('/api/accounts/me/');
    } catch (error) {
      setToken(null);
      window.dispatchEvent(new Event('userLoggedOut'));
    }
  }
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
}

initializeApp();
