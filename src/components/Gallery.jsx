import { useRef, useEffect, useState } from 'react'
import './Gallery.css'

// Placeholder items — to be replaced with actual property photos from /src/assets/
const GALLERY_ITEMS = [
  { label: 'Fachada', span: 'wide', bg: 'linear-gradient(135deg, #F5C200 0%, #D4A800 100%)' },
  { label: 'Piscina', span: 'tall', bg: 'linear-gradient(135deg, #3BBFDB 0%, #1A6FA3 100%)' },
  { label: 'Área Gourmet', span: 'normal', bg: 'linear-gradient(135deg, #8B5E3C 0%, #4a2f1a 100%)' },
  { label: 'Gramado', span: 'normal', bg: 'linear-gradient(135deg, #3CAE4A 0%, #1f6a2b 100%)' },
  { label: 'Deck da Piscina', span: 'wide', bg: 'linear-gradient(135deg, #60C4D8 0%, #3BBFDB 100%)' },
  { label: 'Espreguiçadeira', span: 'normal', bg: 'linear-gradient(135deg, #E8D9B5 0%, #c4b48a 100%)' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <section className="gallery" id="galeria" ref={sectionRef}>
      <div className="gallery__container">
        <div className={`gallery__header ${visible ? 'gallery__header--visible' : ''}`}>
          <span className="section-tag">Galeria</span>
          <h2 className="gallery__title">
            Cada ângulo é<br />
            <em>uma razão pra vir</em>
          </h2>
        </div>

        <div className={`gallery__grid ${visible ? 'gallery__grid--visible' : ''}`}>
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`gallery__item gallery__item--${item.span}`}
              style={{ '--i': i, '--bg': item.bg }}
              onClick={() => setLightbox(item)}
            >
              <div className="gallery__item-bg" style={{ background: item.bg }} />
              {/* Replace with: <img src={item.src} alt={item.label} /> */}
              <div className="gallery__item-overlay">
                <span className="gallery__item-label">{item.label}</span>
                <svg className="gallery__item-zoom" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className={`gallery__cta ${visible ? 'gallery__cta--visible' : ''}`}>
          <a
            href="https://www.instagram.com/cs.amarela/"
            target="_blank"
            rel="noopener noreferrer"
            className="gallery__ig-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Ver mais no Instagram @cs.amarela
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="gallery__lightbox" onClick={() => setLightbox(null)}>
          <div className="gallery__lightbox-inner" onClick={e => e.stopPropagation()}>
            <div className="gallery__lightbox-img" style={{ background: lightbox.bg }} />
            <div className="gallery__lightbox-info">
              <span>{lightbox.label}</span>
              <span>Casa Amarela · Arraial do Cabo</span>
            </div>
            <button className="gallery__lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}
