import { useRef, useEffect, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar, faUser, faUsers, faUserTie, faCamera,
  faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import './Testimonials.css'

const REVIEWS = [
  { name: 'Priscila B.', city: null, stars: 5, text: 'Que saudade desse lugar!', date: 'Fevereiro 2022', faIcon: faUser },
  { name: 'Ellen C.', city: null, stars: 5, text: 'Obrigada Casa Amarela por esses dias maravilhosos, até breve.', date: 'Janeiro 2024', faIcon: faUserTie },
  { name: 'Sandra R.', city: null, stars: 5, text: 'Gente, essa casa é top, eu adorei estar lá!', date: 'Março 2024', faIcon: faUser },
  { name: 'Ellen C.', city: null, stars: 5, text: 'Saudades desse lugar maravilhoso.', date: 'Março 2024', faIcon: faUserTie },
  { name: 'Alexander M.', city: null, stars: 5, text: 'Muito obrigado pela hospedagem, se Deus quiser voltaremos mais vezes! Um lugar muito bom, tranquilo, sempre que vamos não dá vontade de ir embora.', date: 'Março 2024', faIcon: faUser },
  { name: 'Priscila M.', city: null, stars: 5, text: 'Onde queríamos estar! Essa casa incrível, linda, muito bem cuidada, essa piscina queria trazer na mala! Contando os dias para voltar. Parabéns por tudo, vocês são incríveis!', date: 'Novembro 2024', faIcon: faUser },
  { name: 'Karla M.', city: null, stars: 5, text: 'Gostaria muito de agradecer pela hospedagem e recepção. A Casa Amarela vai ficar eternizada com tantas memórias maravilhosas que tivemos aqui! GRATIDÃO!', date: 'Janeiro 2025', faIcon: faUserTie },
  { name: 'Ana J.', city: null, stars: 5, text: 'A casa é de um conforto surreal, nós amamos, vamos voltar outras vezes se Deus quiser! Deus abençoe.', date: 'Setembro 2025', faIcon: faUser },
  { name: 'Mayara V.', city: null, stars: 5, text: 'Foram dias incríveis, obrigado pela recepção, pela comodidade e confiança. Com certeza voltaremos.', date: 'Fevereiro 2026', faIcon: faUser },
  { name: 'Júlia O.', city: null, stars: 5, text: 'Final de semana maravilhoso com pessoas maravilhosas, que venham muitos outros nessa casa maravilhosa, super indico!', date: 'Março 2026', faIcon: faUsers },
  { name: '@viajarfaz_bem', city: 'Instagram', stars: 5, text: 'Casa pé na areia em Figueira, Arraial do Cabo — RJ!', date: 'Maio 2026', faIcon: faCamera },
]

function Stars({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star"><FontAwesomeIcon icon={faStar} /></span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref      = useRef(null)
  const trackRef = useRef(null)
  const [visible, setVisible]       = useState(false)
  const [active, setActive]         = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX]         = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const scrollTo = useCallback((idx) => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.querySelector('.review-card')?.offsetWidth + 16 || 300
    track.scrollTo({ left: cardWidth * idx, behavior: 'smooth' })
    setActive(idx)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(p => {
        const next = (p + 1) % REVIEWS.length
        scrollTo(next)
        return next
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [scrollTo])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const handleScroll = () => {
      const cardWidth = track.querySelector('.review-card')?.offsetWidth + 16 || 300
      const idx = Math.round(track.scrollLeft / cardWidth)
      setActive(Math.min(Math.max(idx, 0), REVIEWS.length - 1))
    }
    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [])

  const onMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }
  const onMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = scrollLeft - (x - startX)
  }
  const onMouseUp = () => setIsDragging(false)

  return (
    <section className="testimonials" id="feedbacks" ref={ref}>
      <div className="testimonials__container">

        <div className={`testimonials__header${visible ? ' testimonials__header--visible' : ''}`}>
          <div className="testimonials__header-left">
            <span className="section-tag">Avaliações</span>
            <h2 className="testimonials__title">
              O que nossos<br /><em>hóspedes dizem</em>
            </h2>
          </div>

          <div className="testimonials__header-right">
            <div className={`testimonials__score${visible ? ' testimonials__score--visible' : ''}`}>
              <div className="testimonials__score-number">5.0</div>
              <div className="testimonials__score-details">
                <Stars count={5} />
                <span>Avaliação máxima dos nossos queridos hóspedes!</span>
              </div>
            </div>

            <div className="testimonials__nav-arrows">
              <button
                className="testimonials__arrow"
                onClick={() => scrollTo(Math.max(0, active - 1))}
                disabled={active === 0}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                className="testimonials__arrow"
                onClick={() => scrollTo(Math.min(REVIEWS.length - 1, active + 1))}
                disabled={active === REVIEWS.length - 1}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`testimonials__track${isDragging ? ' testimonials__track--dragging' : ''}`}
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div className="testimonials__track-inner">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className={`review-card${i === active ? ' review-card--active' : ''}${visible ? ' review-card--loaded' : ''}`}
                style={{ '--delay': `${(i % 3) * 0.15}s` }}
              >
                <div className="review-card__header">
                  <span className="review-card__avatar">
                    <FontAwesomeIcon icon={review.faIcon} />
                  </span>
                  <div>
                    <div className="review-card__name">{review.name}</div>
                    {review.city && <div className="review-card__city">{review.city}</div>}
                  </div>
                  <Stars count={review.stars} />
                </div>
                <blockquote className="review-card__text">"{review.text}"</blockquote>
                <div className="review-card__date">{review.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials__dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot${i === active ? ' testimonials__dot--active' : ''}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}