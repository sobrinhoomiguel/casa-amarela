import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import casaLogo from '../assets/casa_logo.png'

const WPP_URL =
  'https://wa.me/5521982338037?text=Ol%C3%A1!%20Vi%20a%20Casa%20Amarela%20em%20Arraial%20do%20Cabo%20e%20quero%20saber%20sobre%20disponibilidade!'

const NAV_LINKS_HOME = [
  { label: 'A Casa',      href: '#sobre'      },
  { label: 'Comodidades', href: '#comodidades' },
  { label: 'Galeria',     href: '#galeria'     },
  { label: 'Localização', href: '#localizacao' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location                = useLocation()
  const isHome                  = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      <Link to="/" className="navbar__logo" onClick={close}>
        <img src={casaLogo} alt="Casa Amarela" className="navbar__logo-img" />
        <span className="navbar__logo-text">Casa<strong> Amarela</strong></span>
      </Link>

      <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>

        {/* Links âncora — só na home */}
        {isHome && NAV_LINKS_HOME.map(link => (
          <li key={link.label}>
            <a href={link.href} onClick={close}>{link.label}</a>
          </li>
        ))}

        {/* Pontos Turísticos — sempre visível */}
        <li>
          <Link
            to="/roteiro"
            className={location.pathname === '/roteiro' ? 'navbar__link--active' : ''}
            onClick={close}
          >
            Pontos Turísticos
          </Link>
        </li>

        {/* CTA */}
        <li>
          <a
            href={WPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__cta"
            onClick={close}
          >
            Reservar
          </a>
        </li>
      </ul>

      <button
        className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}