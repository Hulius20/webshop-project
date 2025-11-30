import { useState } from 'react'
import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Cart from './pages/Cart.jsx'
import Footer from './components/Footer.jsx'
import Account from './pages/Account.jsx'

function App() {
  
  return (
    <> 
      <Navbar />
      <main className="app-content">
      <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/sign-in" element={<SignIn />} />
           <Route path="/cart" element={<Cart />} /> 
           <Route path="/account" element={<Account />} />
      </Routes>
      <Footer />
      </main>
      
   
    </>
  )
}

export default App
