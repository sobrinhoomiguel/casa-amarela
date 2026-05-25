import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const SLIDES = [
  {
    // Pool from outside - wide shot
    gradient: 'linear-gradient(135deg, #0d2b1f 0%, #1a4a35 50%, #0a1f2e 100%)',
    accent: '#3BBFDB',
  },
  {
    gradient: 'linear-gradient(135deg, #2b1a00 0%, #4a3500 50%, #1f1000 100%)',
    accent: '#F5C200',
  },
  {
    gradient: 'linear-gradient(135deg, #0a1f2e 0%, #1a3a50 50%, #0d2b1f 100%)',
    accent: '#3CAE4A',
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const parallaxRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.4}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const PHOTOS = [
    // Using CSS gradient placeholders — replace src with real image paths
    'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1600&q=85', // pool
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1600&q=85', // tropical house
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=85', // backyard
  ]

  return (
    <section className="hero" id="hero">
      {/* Background parallax layer */}
      <div className="hero__bg" ref={parallaxRef}>
        <div
          className="hero__gradient"
          style={{ background: SLIDES[activeSlide].gradient }}
        />
        {/* Real property photos as background */}
        <div className="hero__photo-grid">
          {[1,2,3].map(n => (
            <div key={n} className={`hero__photo-cell hero__photo-cell--${n} ${activeSlide === n - 1 ? 'active' : ''}`}>
              <div className="hero__photo-placeholder" style={{ background: SLIDES[n-1].gradient }} />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay texture */}
      <div className="hero__overlay" />

      {/* Noise grain texture */}
      <div className="hero__grain" />

      {/* Content */}
      <div className={`hero__content ${loaded ? 'hero__content--loaded' : ''}`}>
        <div className="hero__eyebrow">
          <span className="hero__badge">
            <span className="hero__badge-dot" />
            Arraial do Cabo · RJ
          </span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">Seu paraíso</span>
          <span className="hero__title-line hero__title-line--accent">
            particular
            <svg className="hero__underline" viewBox="0 0 400 20" fill="none">
              <path d="M 0 12 Q 100 2 200 12 Q 300 22 400 12" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="hero__title-line">na Figueira</span>
        </h1>

        <p className="hero__subtitle">
          Piscina privativa · Área gourmet completa · A 5 minutos do mar
        </p>

        <div className="hero__pills">
          {['🏊 Piscina Privativa', '🍖 Área Gourmet', '🌊 Praia próxima', '🐟 Arraial do Cabo'].map((pill) => (
            <span key={pill} className="hero__pill">{pill}</span>
          ))}
        </div>

        <div className="hero__actions">
          <a href="#reservar" className="hero__btn hero__btn--primary">
            <span>Verificar Disponibilidade</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#galeria" className="hero__btn hero__btn--ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <span>Ver Fotos</span>
          </a>
        </div>

        {/* Stats strip */}
        <div className="hero__stats">
          {[
            { value: '5★', label: 'Avaliação' },
            { value: '3+', label: 'Anos Recebendo' },
            { value: '100%', label: 'Satisfação' },
          ].map(stat => (
            <div key={stat.label} className="hero__stat">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="hero__indicators">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero__indicator ${activeSlide === i ? 'hero__indicator--active' : ''}`}
            onClick={() => setActiveSlide(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="hero__scroll-cue">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-dot" />
        </div>
        <span>Explore</span>
      </div>
    </section>
  )
}
