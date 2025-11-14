import { useState } from 'react'
import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Cart from './pages/Cart.jsx'
import Footer from './components/Footer.jsx'

function App() {
  
  return (
    <> 
      <Navbar />
      <main className="app-content">
      <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/sign-in" element={<SignIn />} />
           <Route path="/cart" element={<Cart />} /> 
      </Routes>
      <Footer />
      </main>
      
   
    </>
  )
}

export default App
