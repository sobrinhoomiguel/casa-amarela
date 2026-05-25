import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'A Casa', href: '#sobre' },
    { label: 'Comodidades', href: '#comodidades' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Localização', href: '#localizacao' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#hero" className="navbar__logo">
        <span className="navbar__logo-icon">🌊</span>
        <span className="navbar__logo-text">Casa<strong>Amarela</strong></span>
      </a>

      <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {navLinks.map(link => (
          <li key={link.label}>
            <a href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#reservar" className="navbar__cta" onClick={() => setMenuOpen(false)}>
            Reservar
          </a>
        </li>
      </ul>

      <button
        className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
