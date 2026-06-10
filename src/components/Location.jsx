import { useRef, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUmbrellaBeach,
  faWater,
  faShoppingBag,
  faCar,
  faPersonWalking,
  faUtensils,
  faArrowRight,
  faLocationDot,
  faUpRightFromSquare,
  faFish,
  faSun,
  faShrimp,
  faDroplet,
} from '@fortawesome/free-solid-svg-icons'
import './Location.css'

const HOUSE_QUERY = 'Travessa+Pantanal,+Figueira,+Arraial+do+Cabo,+RJ'

const ROUTES = [
  {
    faIcon: faUmbrellaBeach,
    dest: 'Praia de Figueira',
    time: '5 min a pé',
    badge: 'A pé',
    color: '#3BBFDB',
    steps: [
      { faIcon: faPersonWalking, text: 'Saia pela porta e siga pela Tv. Pantanal' },
      { faIcon: faArrowRight,    text: 'Atravesse a RJ-102 (rua principal)' },
      { faIcon: faWater,         text: 'Siga reto — a praia está bem à frente' },
    ],
  },
  {
    faIcon: faDroplet,
    dest: 'Lagoa de Figueira',
    time: '7 min a pé',
    badge: 'A pé',
    color: '#60C4F0',
    steps: [
      { faIcon: faPersonWalking, text: 'Saia pela porta e siga pela Tv. Pantanal' },
      { faIcon: faArrowRight,    text: 'Caminhe sentido interior do bairro' },
      { faIcon: faDroplet,       text: 'A lagoa de águas calmas aparece à direita' },
    ],
  },
  {
    faIcon: faShoppingBag,
    dest: 'Centro de Figueira',
    time: '5 min de carro',
    badge: 'De carro',
    color: '#F5A623',
    steps: [
      { faIcon: faCar,          text: 'Pegue a RJ-102 sentido norte' },
      { faIcon: faArrowRight,   text: 'Siga pela via principal do bairro' },
      { faIcon: faShoppingBag,  text: 'Mercados, praça, comércios variados, lagoa e quadras' },
    ],
  },
  {
    faIcon: faUtensils,
    dest: 'Centro de Arraial',
    time: '10 min de carro',
    badge: 'De carro',
    color: '#F5C200',
    steps: [
      { faIcon: faCar,        text: 'Pegue a RJ-102 sentido sul' },
      { faIcon: faArrowRight, text: 'Siga até o centro de Arraial do Cabo' },
      { faIcon: faUtensils,   text: 'Restaurantes, mercados, comércio local e praias famosas' },
    ],
  },
]

const HIGHLIGHTS = [
  { faIcon: faDroplet,       title: 'Mar Cristalino',  desc: 'Arraial do Cabo tem as águas mais transparentes do RJ' },
  { faIcon: faFish,          title: 'Vida Marinha',    desc: 'Mergulhe com tartarugas e peixes tropicais coloridos' },
  { faIcon: faSun,           title: 'Pôr do Sol',      desc: 'Pôr do sol inesquecível visto da praia, lagoa ou do nosso quintal' },
  { faIcon: faShrimp,        title: 'Gastronomia',     desc: 'Frutos do mar frescos em restaurantes à beira-mar' },
]

const MAP_EMBED_FALLBACK =
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.89!2d-42.1649324!3d-22.9426478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9715580b0260bf%3A0x98be0283ea307b2e!2sCasa+Amarela+Temporada!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr`

export default function Location() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [activeRoute, setActiveRoute] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleHouseClick = () => {
    window.open(
      `https://www.google.com/maps/place/Casa+Amarela+Temporada/@-22.9426478,-42.1649324,17z`,
      '_blank'
    )
  }

  const toggleRoute = (route) => {
    setActiveRoute(prev => prev?.dest === route.dest ? null : route)
  }

  return (
    <section className="location" id="localizacao" ref={ref}>
      <div className="location__container">

        <div className={`location__header ${visible ? 'location__header--visible' : ''}`}>
          <span className="section-tag">Localização</span>
          <h2 className="location__title">
            No coração de<br />
            <em>Arraial do Cabo</em>
          </h2>
          <p className="location__lead">
            Figueira — o bairro mais tranquilo e estratégico de Arraial.
            A praia, a lagoa e o centro tudo pertinho.
          </p>
        </div>

        <div className="location__grid">

          <div className={`location__map-wrap ${visible ? 'location__map-wrap--visible' : ''}`}>
            <div className="location__map-frame">
              <iframe
                title="Localização Casa Amarela"
                src={MAP_EMBED_FALLBACK}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <button className="location__house-btn" onClick={handleHouseClick}>
              <span className="location__house-pin">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              <div className="location__house-info">
                <strong>Casa Amarela</strong>
                <span>R. Pantanal, 15 · Parque das Garças · Arraial do Cabo · RJ · 28930-000</span>
              </div>
              <span className="location__house-action">
                Ver no Mapa
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </span>
            </button>
          </div>

          <div className={`location__routes ${visible ? 'location__routes--visible' : ''}`}>
            <div className="location__routes-header">
              <h3>Quanto tempo até cada ponto?</h3>
              <p>Clique para ver o trajeto</p>
            </div>

            <div className="location__route-tabs">
              {ROUTES.map((route, i) => (
                <div key={i} className="location__route-item">
                  <button
                    className={`location__route-tab ${activeRoute?.dest === route.dest ? 'location__route-tab--active' : ''}`}
                    style={{ '--route-color': route.color }}
                    onClick={() => toggleRoute(route)}
                  >
                    <span className="location__route-tab__fa-icon">
                      <FontAwesomeIcon icon={route.faIcon} />
                    </span>
                    <div>
                      <div className="location__route-tab-name">{route.dest}</div>
                      <div className="location__route-tab-time">{route.time}</div>
                    </div>
                    <span className="location__route-badge">{route.badge}</span>
                    <svg
                      className={`location__route-chevron ${activeRoute?.dest === route.dest ? 'location__route-chevron--open' : ''}`}
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>

                  {activeRoute?.dest === route.dest && (
                    <div className="location__steps" style={{ '--route-color': route.color }}>
                      <div className="location__steps-list">
                        {route.steps.map((step, j) => (
                          <div key={j} className="location__step">
                            <div className="location__step-num">{j + 1}</div>
                            <div className="location__step-icon">
                              <FontAwesomeIcon icon={step.faIcon} />
                            </div>
                            <div className="location__step-text">{step.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`location__highlights ${visible ? 'location__highlights--visible' : ''}`}>
          <div className="location__highlights-label">
            <span className="section-tag">Por que Arraial do Cabo?</span>
          </div>
          <div className="location__highlights-grid">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="location__highlight">
                <span className="location__highlight-icon">
                  <FontAwesomeIcon icon={h.faIcon} />
                </span>
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}