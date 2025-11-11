import { useState } from 'react'
import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Cart from './pages/Cart.jsx'
import SearchBar from './components/SearchBar.jsx'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <> 
      <Navbar />
      <div className="search-section">
        <SearchBar onSearch={setSearchQuery} />
      </div>
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
