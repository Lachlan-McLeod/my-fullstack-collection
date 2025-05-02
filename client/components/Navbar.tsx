import { useState } from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <h1>Lachys Games Library</h1>
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/progress">Progress Tracker</Link></li>
        </ul>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        &#9776;
      </button>
    </nav>
  )
}