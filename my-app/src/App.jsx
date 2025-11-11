import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import SimpleFunctionalComponent from './components/SimpleFunctionalComponent.jsx'
import SimpleClassComponents from './components/SimpleClassComponents.jsx'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Cart from './pages/Cart.jsx'

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
      </main>
    </>
  )
}

export default App
