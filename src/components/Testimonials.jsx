import { useRef, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faUser,
  faUsers,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import './Testimonials.css'

const REVIEWS = [
  {
    name: 'Mariana S.',
    city: 'Rio de Janeiro',
    stars: 5,
    text: 'Que casa incrível! A piscina é perfeita, a área gourmet super completa. Fomos com a família e todo mundo amou. Com certeza voltaremos!',
    date: 'Fevereiro 2025',
    faIcon: faUser,
  },
  {
    name: 'Rafael e Ana',
    city: 'São Paulo',
    stars: 5,
    text: 'Estrutura impecável, limpa e muito bem cuidada. A proprietária foi super atenciosa. Arraial do Cabo é um paraíso e essa casa combina 100%!',
    date: 'Janeiro 2025',
    faIcon: faUsers,
  },
  {
    name: 'Carla M.',
    city: 'Niterói',
    stars: 5,
    text: 'Perfeita para quem quer relaxar. A piscina é privativa e a casa bem espaçosa. Gramado lindo, muito conforto. Super recomendo!',
    date: 'Dezembro 2024',
    faIcon: faUserTie,
  },
]

function Stars({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star">
          <FontAwesomeIcon icon={faStar} />
        </span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(p => (p + 1) % REVIEWS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="testimonials" id="feedbacks" ref={ref}>
      <div className="testimonials__container">
        <div className={`testimonials__header ${visible ? 'testimonials__header--visible' : ''}`}>
          <span className="section-tag">Avaliações</span>
          <h2 className="testimonials__title">
            O que nossos<br />
            <em>hóspedes dizem</em>
          </h2>
        </div>

        <div className={`testimonials__score ${visible ? 'testimonials__score--visible' : ''}`}>
          <div className="testimonials__score-number">5.0</div>
          <div className="testimonials__score-details">
            <Stars count={5} />
            <span>Avaliação máxima no Airbnb</span>
          </div>
        </div>

        <div className="testimonials__carousel">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className={`review-card ${i === active ? 'review-card--active' : ''} ${visible ? 'review-card--loaded' : ''}`}
              style={{ '--delay': `${i * 0.15}s` }}
            >
              <div className="review-card__header">
                <span className="review-card__avatar">
                  <FontAwesomeIcon icon={review.faIcon} />
                </span>
                <div>
                  <div className="review-card__name">{review.name}</div>
                  <div className="review-card__city">{review.city}</div>
                </div>
                <Stars count={review.stars} />
              </div>
              <blockquote className="review-card__text">"{review.text}"</blockquote>
              <div className="review-card__date">{review.date}</div>
            </div>
          ))}
        </div>

        <div className="testimonials__dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}