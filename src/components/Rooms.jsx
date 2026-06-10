import { useRef, useEffect, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft, faChevronRight, faUpRightAndDownLeftFromCenter,
  faDoorOpen, faTv, faUtensils, faShower, faBed, faStar,
  faSeedling, faCar, faFire, faWater, faSnowflake,
  faRulerCombined, faWind, faGem, faLock, faUsers,
  faPersonSwimming,
} from '@fortawesome/free-solid-svg-icons'
import './Rooms.css'
import piscinaImg1   from '../assets/piscina_img.png'
import piscinaImg2   from '../assets/piscina_img2.png'
import quartoImg1    from '../assets/quarto_img.png'
import quartoImg2    from '../assets/quarto_img2.png'
import salaImg1      from '../assets/sala_img.png'
import salaImg2      from '../assets/sala_img2.png'
import cozinhaImg    from '../assets/cozinha_img.png'
import cozinhaImg2   from '../assets/cozinha_img2.png'
import banheiroImg   from '../assets/banheiro_img.png'
import banheiroImg2  from '../assets/banheiro_img2.png'
import suiteImg      from '../assets/suite_img.png'
import suiteImg2     from '../assets/suite_img2.png'
import quintalImg    from '../assets/quintal_img.png'
import quintalImg2   from '../assets/quintal_img2.png'
import gourmetImg    from '../assets/gourmet_img.png'
import gourmetImg2   from '../assets/gourmet_img2.png'
import banheiro3Img  from '../assets/banheiro3_img.png'
import varandaImg    from '../assets/varanda_img.png'
import garagemImg    from '../assets/garagem_img.png'

const getBg = (img, position = 'center') =>
  !img || img.startsWith('linear') || img.startsWith('#')
    ? { background: img }
    : { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: position }

function RoomModal({ room, onClose }) {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const images = room.images?.length ? room.images : [room.bg, room.bg]

  return (
    <div className="room-modal__backdrop" onClick={onClose}>
      <div className="room-modal" onClick={e => e.stopPropagation()}>
        <button className="room-modal__close" onClick={onClose} aria-label="Fechar">✕</button>

        <div className="room-modal__gallery">
          <div className="room-modal__main-img" style={getBg(images[activeImg])}>
            {room.faIcon && (
              <span className="room-modal__main-icon">
                <FontAwesomeIcon icon={room.faIcon} />
              </span>
            )}
            {images.length > 1 && (
              <div className="room-modal__img-nav">
                <button onClick={() => setActiveImg(p => Math.max(0, p - 1))} disabled={activeImg === 0}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{activeImg + 1} / {images.length}</span>
                <button onClick={() => setActiveImg(p => Math.min(images.length - 1, p + 1))} disabled={activeImg === images.length - 1}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="room-modal__thumbs">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`room-modal__thumb${i === activeImg ? ' room-modal__thumb--active' : ''}`}
                  style={getBg(img)}
                  onClick={() => setActiveImg(i)}
                >
                  {room.faIcon && (
                    <span className="room-modal__thumb-icon">
                      <FontAwesomeIcon icon={room.faIcon} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="room-modal__info">
          <div className="room-modal__tag">{room.tag}</div>
          <h2 className="room-modal__name">{room.name}</h2>
          <p className="room-modal__desc">{room.fullDesc || room.desc}</p>

          {room.specs?.length > 0 && (
            <div className="room-modal__specs">
              {room.specs.map(spec => (
                <div key={spec.label} className="room-modal__spec">
                  <span className="room-modal__spec-icon">
                    <FontAwesomeIcon icon={spec.faIcon} />
                  </span>
                  <div>
                    <div className="room-modal__spec-label">{spec.label}</div>
                    <div className="room-modal__spec-value">{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="room-modal__highlights-title">Destaques</div>
          <ul className="room-modal__highlights">
            {room.highlights.map(h => (
              <li key={h}><span className="room-modal__dot" />{h}</li>
            ))}
          </ul>

          <a 
            href="https://wa.me/5521982338037?text=Ol%C3%A1!%20Vi%20a%20Casa%20Amarela%20em%20Arraial%20do%20Cabo%20e%20quero%20saber%20sobre%20disponibilidade!"
            target="_blank"
            rel="noopener noreferrer"
            className="room-modal__cta"
          >
            Reservar agora →
          </a>
        </div>
      </div>
    </div>
  )
}

const ROOMS = [
  {
    id: 'varanda', label: '01', name: 'Varanda', tag: 'Área Externa', faIcon: faDoorOpen,
    desc: 'Espaço de entrada aconchegante, perfeito para receber com estilo.',
    fullDesc: 'A varanda é o cartão de visitas da Casa Amarela. Espaçosa, ventilada e cheia de charme, é o lugar ideal para uma conversa ao entardecer ou para receber os amigos com classe.',
    highlights: ['Espaço amplo', 'Bem ventilada', 'Área de convivência'],
    specs: [
      { faIcon: faRulerCombined, label: 'Ambiente',   value: 'Externo coberto' },
      { faIcon: faWind,          label: 'Ventilação', value: 'Natural' },
    ],
    bg: varandaImg, images: [varandaImg],
  },
  {
    id: 'sala', label: '02', name: 'Sala com TV', tag: 'Área Interna', faIcon: faTv,
    desc: 'Sala climatizada com TV para os momentos de descanso e entretenimento.',
    fullDesc: 'Sala de estar ampla e confortável, perfeita para relaxar depois de um longo dia de praia. Com TV de tela grande e sofá confortável para toda a família.',
    highlights: ['Smart TV', 'Sofá confortável'],
    specs: [
      { faIcon: faTv,        label: 'TV',            value: 'Smart TV' },
      { faIcon: faGem,       label: 'Mobília',      value: 'Sofá completo' },
    ],
    bg: salaImg1, images: [salaImg1, salaImg2],
  },
  {
    id: 'cozinha', label: '03', name: 'Cozinha Americana', tag: 'Área Interna', faIcon: faUtensils,
    desc: 'Cozinha integrada e bem equipada, ideal para refeições em família.',
    fullDesc: 'Cozinha americana integrada à sala, com bancada em granito e todos os utensílios necessários para preparar desde um café da manhã especial até um jantar completo.',
    highlights: ['Totalmente equipada', 'Bancada em granito', 'Integrada à sala'],
    specs: [
      { faIcon: faFire,      label: 'Fogão',     value: 'Fogão potente' },
      { faIcon: faSnowflake, label: 'Geladeira', value: 'Inclusa' },
      { faIcon: faGem,       label: 'Bancada',   value: 'Granito' },
    ],
    bg: cozinhaImg, images: [cozinhaImg, cozinhaImg2],
  },
  {
    id: 'banheiro', label: '04', name: 'Banheiro', tag: 'Área Interna', faIcon: faShower,
    desc: 'Banheiro completo e bem acabado com chuveiro quente.',
    fullDesc: 'Banheiro social completo e bem acabado, com chuveiro quente, boa pressão e todo o conforto necessário para sua estadia.',
    highlights: ['Chuveiro quente', 'Boa pressão'],
    specs: [
      { faIcon: faShower, label: 'Chuveiro', value: 'Água quente' },
      { faIcon: faGem,    label: 'Tipo',     value: 'Banheiro social' },
    ],
    bg: banheiroImg, images: [banheiroImg, banheiroImg2],
  },
  {
    id: 'quarto1', label: '05', name: 'Quarto 1', tag: 'Área Interna', faIcon: faBed,
    desc: 'Quarto confortável, climatizado e com colchões livres',
    fullDesc: 'Quarto espaçoso com ar-condicionado, cama de casal, cama de solteiro e colchões livres. Pensado para proporcionar o descanso que você merece depois de um dia inesquecível.',
    highlights: ['1 cama de casal', '1 cama de solteiro', '2 colchões livres', 'Cabideiro'],
    specs: [
      { faIcon: faBed,       label: 'Camas',       value: '1 cama de casal' },
      { faIcon: faSnowflake, label: 'Climatização', value: 'Ar-condicionado' },
    ],
    bg: quartoImg1, images: [quartoImg1, quartoImg2],
  },
  {
    id: 'suite', label: '06', name: 'Suíte', tag: 'Área Interna', faIcon: faStar,
    desc: 'Suíte completa com banheiro privativo — o máximo em conforto.',
    fullDesc: 'A suíte é o ambiente mais completo da casa. Com banheiro privativo, cama de casal, ar-condicionado e toda a privacidade que o casal precisa para uma estadia perfeita.',
    highlights: ['2 camas de casal', 'Banheiro privativo', 'Ar-condicionado', 'Espaço amplo'],
    specs: [
      { faIcon: faBed,       label: 'Camas',        value: '2 camas de casal' },
      { faIcon: faShower,    label: 'Banheiro',     value: 'Privativo incluso' },
      { faIcon: faSnowflake, label: 'Climatização', value: 'Ar-condicionado' },
    ],
    bg: suiteImg, images: [suiteImg, suiteImg2],
  },
  {
    id: 'gramado', label: '07', name: 'Gramado Sintético', tag: 'Quintal', faIcon: faSeedling,
    desc: 'Amplo quintal com grama sintética — verde o ano todo.',
    fullDesc: 'O quintal é um dos destaques da Casa Amarela. Com grama sintética de altíssima qualidade, sempre verde e sem lama, é o espaço perfeito para crianças brincarem e adultos relaxarem.',
    highlights: ['Sempre verde', 'Sem lama ou manutenção', 'Ideal para crianças', 'Espaço amplo'],
    specs: [
      { faIcon: faSeedling, label: 'Grama',          value: 'Sintética premium' },
      { faIcon: faUsers,    label: 'Indicado para', value: 'Famílias com crianças' },
    ],
    bg: quintalImg, images: [quintalImg, quintalImg2],
  },
  {
    id: 'garagem', label: '08', name: 'Garagem', tag: 'Externo', faIcon: faCar,
    desc: 'Garagem externa espaçosa para múltiplos veículos.',
    fullDesc: 'Garagem externa com espaço generoso para acomodar múltiplos veículos com segurança. Ideal para grupos que chegam de carro de outras cidades.',
    highlights: ['Múltiplos veículos', 'Espaço amplo', 'Segura'],
    specs: [
      { faIcon: faCar,  label: 'Capacidade', value: '4 carros' },
      { faIcon: faLock, label: 'Segurança',  value: 'Portão com acesso' },
    ],
    bg: garagemImg, images: [garagemImg],
  },
  {
    id: 'gourmet', label: '09', name: 'Área Gourmet', tag: 'Lazer', faIcon: faUtensils,
    desc: 'Área gourmet completa com bancada em granito e cooktop, e claro, nossa grande churrasqueira.',
    fullDesc: 'A área gourmet é o coração das festas na Casa Amarela. Bancada em pedra, cooktop embutido, pia e banheiro de apoio — tudo para o churrasco perfeito.',
    highlights: ['Cooktop embutido', 'Churrasqueira', 'Pia inclusa', 'Banheiro de apoio'],
    specs: [
      { faIcon: faFire,   label: 'Lazer',    value: 'Churrasqueira' },
      { faIcon: faGem,    label: 'Bancada',  value: 'Granito completo' },
      { faIcon: faShower, label: 'Banheiro', value: 'Apoio externo' },
    ],
    bg: gourmetImg, images: [gourmetImg, gourmetImg2],
  },
  {
    id: 'banheiro3', label: '10', name: 'Banheiro Externo', tag: 'Lazer', faIcon: faShower,
    desc: 'Banheiro de apoio externo, prático para uso direto da piscina.',
    fullDesc: 'Banheiro externo para uso direto da piscina, mantendo a casa sempre limpa e organizada.',
    highlights: ['Acesso direto da piscina', 'Prático', 'Mantém a casa limpa'],
    specs: [
      { faIcon: faShower, label: 'Tipo',   value: 'Banheiro de apoio' },
      { faIcon: faWater,  label: 'Acesso', value: 'Direto da piscina' },
    ],
    bg: banheiro3Img, images: [banheiro3Img],
  },
  {
    id: 'piscina', label: '11', name: 'Piscina', tag: 'Lazer', faIcon: faPersonSwimming,
    desc: 'Piscina privativa com deck de madeira e espreguiçadeiras.',
    fullDesc: 'A estrela da Casa Amarela. Piscina privativa de água cristalina, rodeada por deck de madeira e espreguiçadeiras — o paraíso particular que você tanto merecia.',
    highlights: ['Piscina exclusiva', 'Deck de madeira', 'Espreguiçadeiras', 'Chuveiro externo'],
    specs: [
      { faIcon: faPersonSwimming, label: 'Piscina',  value: 'Privativa exclusiva' },
      { faIcon: faGem,            label: 'Deck',     value: 'Madeira com revestimento' },
      { faIcon: faShower,         label: 'Chuveiro', value: 'Externo incluso' },
    ],
    bg: piscinaImg1, images: [piscinaImg1, piscinaImg2],
  },
]

export default function Rooms() {
  const trackRef    = useRef(null)
  const sectionRef  = useRef(null)
  const [active, setActive]               = useState(0)
  const [isDragging, setIsDragging]       = useState(false)
  const [dragMoved, setDragMoved]         = useState(false)
  const [startX, setStartX]               = useState(0)
  const [scrollLeft, setScrollLeft]       = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [modalRoom, setModalRoom]         = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const handleScroll = () => {
      const cardWidth = track.querySelector('.room-card')?.offsetWidth + 24 || 344
      const idx = Math.round(track.scrollLeft / cardWidth)
      setActive(Math.min(Math.max(idx, 0), ROOMS.length - 1))
    }
    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((idx) => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.querySelector('.room-card')?.offsetWidth + 24 || 344
    track.scrollTo({ left: cardWidth * idx, behavior: 'smooth' })
    setActive(idx)
  }, [])

  const onMouseDown = (e) => {
    setIsDragging(true); setDragMoved(false)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }
  const onMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault(); setDragMoved(true)
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = scrollLeft - (x - startX)
  }
  const onMouseUp = () => setIsDragging(false)

  const groupedByTag = [...new Set(ROOMS.map(r => r.tag))]

  return (
    <section className="rooms" id="sobre" ref={sectionRef}>
      <div className={`rooms__header${headerVisible ? ' rooms__header--visible' : ''}`}>
        <div className="rooms__header-left">
          <span className="section-tag">A Casa</span>
          <h2 className="rooms__title">
            Conheça cada<br />
            <em>cantinho da casa</em>
          </h2>
        </div>
        <div className="rooms__header-right">
          <p className="rooms__lead">
            Ambientes pensados para o seu conforto e lazer.
            Arraste para explorar — clique para ver detalhes.
          </p>
          <div className="rooms__nav-arrows">
            <button className="rooms__arrow" onClick={() => scrollTo(Math.max(0, active - 1))} disabled={active === 0}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="rooms__counter">
              <strong>{String(active + 1).padStart(2, '0')}</strong>
              <span>/{String(ROOMS.length).padStart(2, '0')}</span>
            </span>
            <button className="rooms__arrow" onClick={() => scrollTo(Math.min(ROOMS.length - 1, active + 1))} disabled={active === ROOMS.length - 1}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

      <div className={`rooms__tabs${headerVisible ? ' rooms__tabs--visible' : ''}`}>
        {groupedByTag.map(tag => {
          const firstIdx = ROOMS.findIndex(r => r.tag === tag)
          return (
            <button
              key={tag}
              className={`rooms__tab${ROOMS[active]?.tag === tag ? ' rooms__tab--active' : ''}`}
              onClick={() => scrollTo(firstIdx)}
            >
              {tag}
            </button>
          )
        })}
      </div>

      <div
        className={`rooms__track${isDragging ? ' rooms__track--dragging' : ''}`}
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="rooms__track-inner">
          {ROOMS.map((room, i) => (
            <div
              key={room.id}
              className={`room-card${i === active ? ' room-card--active' : ''}`}
              onClick={() => { if (!dragMoved) setModalRoom(room) }}
            >
              <div className="room-card__photo" style={getBg(room.bg)}>
                <div className="room-card__photo-overlay" />
                {room.faIcon && (
                  <span className="room-card__photo-icon">
                    <FontAwesomeIcon icon={room.faIcon} />
                  </span>
                )}
                <div className="room-card__photo-badge">{room.tag}</div>
                <div className="room-card__number">{room.label}</div>
                <div className="room-card__expand-hint">
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                  Ver detalhes
                </div>
              </div>
              <div className="room-card__info">
                <h3 className="room-card__name">{room.name}</h3>
                <p className="room-card__desc">{room.desc}</p>
                <ul className="room-card__highlights">
                  {room.highlights.slice(0, 3).map(h => (
                    <li key={h}><span className="room-card__dot" />{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="rooms__end-spacer">
            <div className="rooms__end-cta">
              <span className="rooms__end-cta__icon">
                <FontAwesomeIcon icon={faWater} />
              </span>
              <p>Ficou com vontade?</p>
              
              <a 
                href="https://wa.me/5521982338037?text=Ol%C3%A1!%20Vi%20a%20Casa%20Amarela%20em%20Arraial%20do%20Cabo%20e%20quero%20saber%20sobre%20disponibilidade!"
                className="rooms__end-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar agora
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="rooms__dots">
        {ROOMS.map((_, i) => (
          <button
            key={i}
            className={`rooms__dot${i === active ? ' rooms__dot--active' : ''}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>

      {modalRoom && <RoomModal room={modalRoom} onClose={() => setModalRoom(null)} />}
    </section>
  )
}