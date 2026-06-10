import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWater,
  faFire,
  faUmbrellaBeach,
  faFish,
} from '@fortawesome/free-solid-svg-icons'
import './Hero.css'
import piscinaImg    from '../assets/piscina_img.png'
import areaExImg     from '../assets/area_ex.jpeg'
import varandaImg    from '../assets/varanda_img.png'
import piscinaImg3   from '../assets/piscina_img3.jpeg'

const SLIDES = [
  { src: piscinaImg,   label: 'Piscina Privativa' },
  { src: areaExImg,    label: 'Área Gourmet'      },
  { src: varandaImg,   label: 'Fachada da Casa'   },
  { src: piscinaImg3,  label: 'Área Externa'      },
]

const PILLS = [
  { icon: faWater,         label: 'Piscina Privativa' },
  { icon: faFire,          label: 'Área Gourmet'      },
  { icon: faUmbrellaBeach, label: 'Praia e Lagoa'     },
  { icon: faFish,          label: 'Arraial do Cabo'   },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const startInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length)
    }, 5000)
  }

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  const goTo = (i) => {
    setActiveSlide(i)
    startInterval()
  }

  const onPointerDown = (e) => {
    dragStart.current = e.clientX
    setDragging(false)
  }
  const onPointerUp = (e) => {
    if (dragStart.current === null) return
    const delta = e.clientX - dragStart.current
    if (Math.abs(delta) > 40) {
      setDragging(true)
      if (delta < 0) goTo((activeSlide + 1) % SLIDES.length)
      else goTo((activeSlide - 1 + SLIDES.length) % SLIDES.length)
    }
    dragStart.current = null
  }

  return (
    <section
      className="hero"
      id="hero"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="hero__slides" aria-hidden="true">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero__slide ${i === activeSlide ? 'hero__slide--active' : ''}`}
          >
            <img src={slide.src} alt="" className="hero__slide-img" />
          </div>
        ))}
      </div>

      <div className="hero__vignette" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

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
            <svg className="hero__underline" viewBox="0 0 400 18" fill="none" aria-hidden="true">
              <path d="M 0 12 Q 100 2 200 12 Q 300 22 400 12"
                stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <span className="hero__title-line">em Figueira</span>
        </h1>

        <p className="hero__subtitle">
          Piscina Particular · Área Gourmet completa · A 5 minutos do mar
        </p>

        <div className="hero__pills" role="list">
          {PILLS.map(pill => (
            <span key={pill.label} className="hero__pill" role="listitem">
              <FontAwesomeIcon icon={pill.icon} className="hero__pill-icon" />
              {pill.label}
            </span>
          ))}
        </div>

        <div className="hero__actions">
          <a href="#reservar" className="hero__btn hero__btn--primary">
            <span>Verificar Disponibilidade</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#galeria" className="hero__btn hero__btn--ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>Ver Fotos</span>
          </a>
        </div>

        <div className="hero__stats" role="list">
          {[
            { value: '5★', label: 'Avaliação' },
            { value: '6+', label: 'Anos Recebendo' },
            { value: '100%', label: 'Satisfação' },
          ].map(stat => (
            <div key={stat.label} className="hero__stat" role="listitem">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__controls" aria-label="Slides da galeria">
        <span className="hero__slide-label">{SLIDES[activeSlide].label}</span>
        <div className="hero__dots" role="tablist">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeSlide}
              aria-label={`Foto ${i + 1}: ${SLIDES[i].label}`}
              className={`hero__dot ${i === activeSlide ? 'hero__dot--active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-dot" />
        </div>
        <span>Explore</span>
      </div>
    </section>
  )
}