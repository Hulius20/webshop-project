import React, { useState } from 'react'
import '../styles/SearchBar.css'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    setQuery(e.target.value)
    onSearch(e.target.value)  // pass search query to parent
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      {query && (
        <button onClick={handleClear} className="search-clear">✕</button>
      )}
    </div>
  )
}