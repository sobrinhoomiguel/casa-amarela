import { useRef, useEffect, useState } from 'react'
import './Features.css'

const FEATURES = [
  {
    icon: '🏊',
    title: 'Piscina Privativa',
    desc: 'Piscina exclusiva com deck de madeira e espreguiçadeiras para relaxar ao sol do Nordeste.',
    color: '#3BBFDB',
  },
  {
    icon: '🍖',
    title: 'Área Gourmet Completa',
    desc: 'Cozinha externa com bancada em granito, cooktop embutido, pia e suporte para churrasqueira.',
    color: '#F5C200',
  },
  {
    icon: '🌿',
    title: 'Gramado Privativo',
    desc: 'Amplo jardim com grama sintética de alta qualidade — perfeito para crianças brincarem.',
    color: '#3CAE4A',
  },
  {
    icon: '❄️',
    title: 'Ar-Condicionado',
    desc: 'Ambiente climatizado para seu conforto, mesmo nos dias mais quentes do verão.',
    color: '#60C4D8',
  },
  {
    icon: '🚿',
    title: 'Banheiro de Apoio',
    desc: 'Banheiro externo para uso direto da piscina, mantendo sua casa sempre limpa.',
    color: '#A0C4FF',
  },
  {
    icon: '🌴',
    title: 'Ambiente Tropical',
    desc: 'Coqueiros, céu azul e brisa do mar — a Figueira em Arraial do Cabo é paraíso puro.',
    color: '#F5C200',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`feature-card ${visible ? 'feature-card--visible' : ''}`}
      style={{ '--delay': `${index * 0.1}s`, '--accent': feature.color }}
    >
      <div className="feature-card__icon">{feature.icon}</div>
      <h3 className="feature-card__title">{feature.title}</h3>
      <p className="feature-card__desc">{feature.desc}</p>
      <div className="feature-card__bar" />
    </div>
  )
}

export default function Features() {
  const titleRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.3 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="features" id="comodidades">
      <div className="features__container">
        <div
          ref={titleRef}
          className={`features__header ${titleVisible ? 'features__header--visible' : ''}`}
        >
          <span className="section-tag">Comodidades</span>
          <h2 className="features__title">
            Tudo que você precisa<br />
            <em>para esquecer o mundo</em>
          </h2>
          <p className="features__lead">
            A Casa Amarela foi pensada para proporcionar o máximo de conforto e diversão.
            Cada detalhe cuidado para que sua estadia seja inesquecível.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
