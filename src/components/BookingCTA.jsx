import { useRef, useEffect, useState } from 'react'
import './BookingCTA.css'
import casaLogo   from '../assets/casa_logo.png'
import bugreImg   from '../assets/bugre_img.png'
import praiaImg4  from '../assets/praia_img4.png'
import lagoaImg   from '../assets/lagoa_img.png'
import praiaImg5  from '../assets/praia_img5.png'

const SLIDES = [
  { src: bugreImg,  label: 'Pôr do Sol',          position: 'center 80%'    },
  { src: praiaImg4, label: 'Praia de Figueira',    position: 'center 90%'    },
  { src: lagoaImg,  label: 'Pôr do Sol na Lagoa',  position: 'center 40%'    },
  { src: praiaImg5, label: 'Praia de Figueira',    position: 'center center' },
]

export default function BookingCTA() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
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

  return (
    <>
      <section className="cta" id="reservar" ref={ref}>

        <div className="cta__slides" aria-hidden="true">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`cta__slide${i === activeSlide ? ' cta__slide--active' : ''}`}
            >
              <img
                src={slide.src}
                alt=""
                className="cta__slide-img"
                style={{ objectPosition: slide.position }}
              />
            </div>
          ))}
        </div>

        <div className="cta__vignette" aria-hidden="true" />
        <div className="cta__grain" aria-hidden="true" />

        <div className="cta__bg" aria-hidden="true">
          <div className="cta__blob cta__blob--1" />
          <div className="cta__blob cta__blob--2" />
          <div className="cta__blob cta__blob--3" />
        </div>

        <div className={`cta__content${visible ? ' cta__content--visible' : ''}`}>
          <span className="section-tag">Reserve Agora</span>

          <h2 className="cta__title">
            Sua próxima<br />
            <em>memória inesquecível</em><br />
            começa aqui.
          </h2>

          <p className="cta__sub">
            Disponibilidade limitada. Garanta já suas datas e venha descobrir
            por que todo mundo que vem quer voltar.
          </p>

          <div className="cta__buttons">
            
            <a
              href="https://wa.me/5521982338037?text=Ol%C3%A1!%20Vi%20a%20Casa%20Amarela%20em%20Arraial%20do%20Cabo%20e%20quero%20saber%20sobre%20disponibilidade!"
              target="_blank"
              rel="noopener noreferrer"
              className="cta__btn cta__btn--whatsapp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chamar no WhatsApp
            </a>
            
            <a
              href="https://www.instagram.com/cs.amarela/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta__btn cta__btn--secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Ver no Instagram
            </a>
          </div>

          <div className="cta__perks">
            {['✓ Reserva imediata', '✓ Atendimento rápido', '✓ Pagamento facilitado'].map(p => (
              <span key={p} className="cta__perk">{p}</span>
            ))}
          </div>
        </div>

        <div className="cta__controls" aria-hidden="true">
          <span className="cta__slide-label">{SLIDES[activeSlide].label}</span>
          <div className="cta__dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`cta__dot${i === activeSlide ? ' cta__dot--active' : ''}`}
                onClick={() => { setActiveSlide(i); startInterval() }}
              />
            ))}
          </div>
        </div>

      </section>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo-row">
              <img src={casaLogo} alt="Casa Amarela" className="footer__logo-img" />
              <span className="footer__logo">Casa<strong> Amarela</strong></span>
            </div>
            <p>Figueira · Arraial do Cabo · RJ</p>
          </div>
          <div className="footer__links">
            <a href="#sobre">A Casa</a>
            <a href="#comodidades">Comodidades</a>
            <a href="#galeria">Galeria</a>
            
            <a
              href="https://www.instagram.com/cs.amarela/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @cs.amarela
            </a>
          </div>
          <div className="footer__bottom">
            <span>Casa Amarela · 2026</span>
          </div>
        </div>
      </footer>
    </>
  )
}