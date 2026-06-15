import { useState } from "react";

// ── IMAGENS — troque apenas o nome do arquivo ──────────────────────────
import imgPraiaFigueira    from "../../src/assets/praia_img4.png";
import imgPraiaMonteAlto   from "../../src/assets/praia_monte_alto.webp";
import imgPrainha          from "../../src/assets/prainha_img.jpg";
import imgPraiaGrande      from "../../src/assets/praia_grande.jpg";
import imgPraiaForno       from "../../src/assets/praia_do_forno.jpg";
import imgPontalAtalaia    from "../../src/assets/praia_atalaia.jpg";
import imgLagoaAraruama    from "../../src/assets/lagoa_figueira.jpg";
import imgLagoaMonteAlto   from "../../src/assets/lagoa_monte_alto.jpg";
import imgPontalAlcaira    from "../../src/assets/pontal_alcaira.jpg";
import imgCentroArraial    from "../../src/assets/centro_arraial.jpg";
import imgCentroFigueira   from "../../src/assets/centro_figueira.webp";
import imgCentroCaboFrio   from "../../src/assets/centro_cabo_frio.jpg";


/* ─── DADOS ──────────────────────────────────────────────────────────── */
const SECOES = [
  {
    id: "praias",
    titulo: "Praias",
    subtitulo: "Água cristalina a poucos minutos",
    bg: "#f5f1e8",
    pontos: [
      {
        id: 1,
        nome: "Praia de Figueira",
        distancia: "4 min a pé",
        descricao:
          "Apenas 4 minutos a pé de casa, a Praia de Figueira é um refúgio sossegado e raramente cheio, ideal para quem busca privacidade. O grande destaque são suas águas que, em certos períodos, ficam tão claras e cristalinas que lembram o Caribe.",
        dica: "Se pensar em ir embora cedo, fique: o pôr do sol em Figueira é um espetáculo memorável que fecha o dia com chave de ouro.",
        destaque: true,
        tag: "Praia",
      },
      {
        id: 2,
        nome: "Praia de Monte Alto",
        distancia: "2 min de carro",
        descricao:
          "A praia oceânica do próprio bairro da Casa Amarela. Extensa, com areia larga e mar aberto, é bem menos movimentada que as praias centrais de Arraial — ideal para longas caminhadas, pôr do sol sem multidão e aquele contato direto com a natureza da Restinga de Massambaba. Os ventos constantes animam quem curte kite e windsurf.",
        dica: "Vá ao entardecer: a combinação de dunas, restinga e céu alaranjado rende fotos incríveis e praticamente sem gente.",
        destaque: false,
        tag: "Praia",
      },
      {
        id: 3,
        nome: "Prainha",
        distancia: "15 min de carro",
        descricao:
          "Pequena enseada abraçada entre os morros do Mirante e do Forno, a Prainha é uma das primeiras maravilhas que se vê ao chegar em Arraial do Cabo. Suas águas são calmas, coloridas e ótimas para banho. O canto esquerdo da praia costuma ser bem mais tranquilo — e é por lá também que começa o acesso à Graçainha, famosa pelo snorkel com tartarugas marinhas.",
        dica: "Evite o canto direito nos fins de semana, fica bem movimentado. O canto esquerdo é quase uma praia à parte, quieta e com aquela vista clássica de Arraial.",
        destaque: false,
        tag: "Praia",
      },
      {
        id: 4,
        nome: "Praia Grande",
        distancia: "10 min de carro",
        descricao:
          "A praia mais longa de Arraial, com quilômetros de areia branca de formação dunar e ondas suaves para stand-up paddle. Estrutura completa de quiosques sem abrir mão da beleza natural — ótima para quem quer um dia de praia com tudo à mão.",
        dica: "Perfeita para o pôr do sol com uma água de coco na mão. A areia clara brilha de um jeito único no fim da tarde.",
        destaque: false,
        tag: "Praia",
      },
      {
        id: 5,
        nome: "Praia do Forno",
        distancia: "15 min de carro + trilha",
        descricao:
          "Considerada uma das praias mais bonitas do Brasil. Água em tons de esmeralda, pedras que formam piscinas naturais e um isolamento que faz tudo parecer intocado. Vale cada passo da trilha — e cada segundo que você ficar lá.",
        dica: "Chegue antes das 9h. Leve água, protetor e comida — não há estrutura na praia.",
        destaque: true,
        tag: "Praia",
      },
      {
        id: 6,
        nome: "Pontal do Atalaia",
        distancia: "18 min de carro",
        descricao:
          "Um dos cartões-postais mais fotografados do Brasil. A descida pela famosa escadaria de madeira com 250 degraus revela, a cada passo, uma vista deslumbrante do oceano até chegar às Prainhas — duas faixas de areia branca com águas tão cristalinas que dá para ver os pés mesmo submerso. Na maré baixa, as duas praias se fundem numa só.",
        dica: "Chegue cedo: de sexta a domingo após as 9h a areia já fica lotada. Na semana é outro mundo — tranquilo e ainda mais bonito.",
        destaque: true,
        tag: "Praia",
      },
    ],
  },
  {
    id: "lagoas",
    titulo: "Lagoas",
    subtitulo: "Calma e paisagem sem fim",
    bg: "#1A1410",
    pontos: [
      {
        id: 7,
        nome: "Lagoa de Figueira",
        distancia: "10 min de carro",
        descricao:
          "A maior laguna hipersalina do mundo — a água é quase duas vezes mais salgada que o mar e por isso nunca forma ondas. Vento constante, horizonte infinito e o melhor cenário para windsurf e kite do litoral fluminense.",
        dica: "As margens do lado de Arraial são menos movimentadas. Vale explorar para achar um trecho tranquilo longe das escolinhas de kite.",
        destaque: true,
        tag: "Lagoa",
      },
      {
        id: 8,
        nome: "Lagoa de Monte Alto",
        distancia: "3 min a pé",
        descricao:
          "Calma, cercada de mata e a poucos passos de casa — perfeita para esfriar as pernas depois de um dia de praia. Crianças adoram a água rasa e a tranquilidade do lugar.",
        dica: "Dá para ir a pé, sem precisar de carro. É literalmente ali na esquina.",
        destaque: false,
        tag: "Lagoa",
      },
      {
        id: 9,
        nome: "Pontal do Alcaíra (Arubinha)",
        distancia: "20 min de carro + acesso de terra",
        descricao:
          "Também chamada de Arubinha ou Caminho de Moisés, a Ponta da Alcaíra é um banco de areia branca que avança por mais de 700 metros dentro da Lagoa de Araruama, com água de ambos os lados — a esquerda mais funda e azul, a direita rasa e cheia de conchas. Um cenário que lembra as Maldivas, escondido entre os bairros de Figueira e Monte Alto.",
        dica: "O acesso é por estrada de terra — de carro comum dá, mas com cuidado. A melhor pedida é o passeio de buggy saindo de Arraial, que já inclui o trajeto e outras paradas.",
        destaque: true,
        tag: "Lagoa",
      },
    ],
  },
  {
    id: "centro",
    titulo: "Centro & Passeios",
    subtitulo: "História, cultura e gastronomia",
    bg: "#f5f1e8",
    pontos: [
      {
        id: 10,
        nome: "Centro de Arraial do Cabo",
        distancia: "12 min de carro",
        descricao:
          "O coração histórico de Arraial: feiras de artesanato, restaurantes de frutos do mar frescos e a Igreja Nossa Senhora dos Remédios. O mirante com vista para a Praia dos Anjos vale a parada — especialmente ao entardecer, quando a luz dourada toma conta da baía.",
        dica: "Desça até o trapiche para ver os barcos de pesca chegando no fim da tarde. Ambiente genuíno de cidade pesqueira, sem nada de artificioso.",
        destaque: false,
        tag: "Passeio",
      },
      {
        id: 11,
        nome: "Centro de Figueira",
        distancia: "8 min de carro",
        descricao:
          "O distrito de Figueira tem uma vida local bem tranquila, com mercadinho, padaria, pizzaria e pescadaria — tudo o que você precisa para abastecer a casa sem precisar ir até o centro de Arraial. Fica às margens da lagoa, com clima de comunidade pequena e autêntica.",
        dica: "Ótimo para comprar peixes frescos direto do pescador pela manhã. Bem mais barato e gostoso do que qualquer restaurante turístico.",
        destaque: false,
        tag: "Passeio",
      },

      {
        id: 12,
        nome: "Centro de Cabo Frio",
        distancia: "20 min de carro",
        descricao:
          "A cidade vizinha tem canal, a Fortaleza de São Mateus do século XVII, calçadão beira-canal e uma vida noturna bem mais agitada. Vale o passeio para jantar bem e conhecer o famoso mercado de moda que tornou Cabo Frio referência na região.",
        dica: "Prefira ir durante a semana para evitar o trânsito intenso dos fins de semana. O calçadão à noite tem boa energia.",
        destaque: false,
        tag: "Passeio",
      },
    ],
  },
];

/* ─── ONDA SVG ───────────────────────────────────────────────────────── */
function Onda({ de, para }) {
  return (
    <div style={{ display: "block", lineHeight: 0, background: de, marginBottom: -1 }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 80 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,0 C480,80 960,0 1440,60 L1440,80 L0,80 Z" fill={para} />
      </svg>
    </div>
  );
}

/* ─── ÍCONE ──────────────────────────────────────────────────────────── */
const IconPin = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

/* ─── PALETA ─────────────────────────────────────────────────────────── */
const C = {
  escuro:      "#1A1410",
  cardBg:      "#211d16",
  cardBgLight: "rgba(255,255,255,0.72)",
  amarelo:     "#F5C200",
  titulo:      "#F0EBE0",
  tituloLight: "#1a1410",
  corpo:       "#7a7060",
  corpoLight:  "#5a5040",
  dica:        "#5c5448",
  dicaLight:   "#9a8f80",
  muted:       "#4a4338",
  mutedLight:  "#b0a898",
};

const BADGE = {
  Praia:   { cor: "#5eb8cc", bg: "rgba(94,184,204,0.12)" },
  Lagoa:   { cor: "#56b892", bg: "rgba(86,184,146,0.12)" },
  Passeio: { cor: "#c9a94a", bg: "rgba(201,169,74,0.12)" },
};

const FOTOS = {
  "Praia de Figueira":          imgPraiaFigueira,
  "Praia de Monte Alto":        imgPraiaMonteAlto,
  "Prainha":                    imgPrainha,
  "Praia Grande":               imgPraiaGrande,
  "Praia do Forno":             imgPraiaForno,
  "Pontal do Atalaia":          imgPontalAtalaia,
  "Lagoa de Figueira":          imgLagoaAraruama,
  "Lagoa de Monte Alto":        imgLagoaMonteAlto,
  "Pontal do Alcaíra (Arubinha)": imgPontalAlcaira,
  "Centro de Arraial do Cabo":  imgCentroArraial,
  "Centro de Figueira":         imgCentroFigueira,
  "Centro de Cabo Frio":        imgCentroCaboFrio,
};

const getFoto = (ponto) => FOTOS[ponto.nome];


/* ─── CARD (desktop) ─────────────────────────────────────────────────── */
function Card({ ponto, invertido, light }) {
  const [hov, setHov] = useState(false);
  const badge   = BADGE[ponto.tag] ?? { cor: C.amarelo, bg: "rgba(245,194,0,0.10)" };
  const cardBg  = light ? C.cardBgLight : C.cardBg;
  const tituloC = light ? C.tituloLight : C.titulo;
  const corpoC  = light ? C.corpoLight  : C.corpo;
  const dicaC   = light ? C.dicaLight   : C.dica;
  const mutedC  = light ? C.mutedLight  : C.muted;

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateAreas: invertido ? '"texto foto"' : '"foto texto"',
        borderRadius: "1.5rem",
        overflow: "hidden",
        background: cardBg,
        border: `1px solid ${
          hov
            ? (light ? "rgba(245,194,0,0.22)" : "rgba(245,194,0,0.14)")
            : (light ? "rgba(26,20,16,0.06)"  : "rgba(255,255,255,0.04)")
        }`,
        boxShadow: hov
          ? (light ? "0 8px 40px rgba(26,20,16,0.09)"  : "0 8px 40px rgba(0,0,0,0.22)")
          : (light ? "0 2px 16px rgba(26,20,16,0.055)" : "0 2px 16px rgba(0,0,0,0.12)"),
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        minHeight: 320,
      }}
    >
      {/* FOTO */}
      <div style={{ gridArea: "foto", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: invertido
            ? `linear-gradient(to right, ${cardBg}e0 0%, transparent 42%)`
            : `linear-gradient(to left,  ${cardBg}e0 0%, transparent 42%)`,
        }}/>
        {ponto.destaque && (
          <span style={{
            position: "absolute", top: 14, left: 14, zIndex: 2,
            background: C.amarelo, color: "#1A1410",
            fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.22rem 0.65rem", borderRadius: "2rem",
          }}>Favorito da casa</span>
        )}
        <img src={getFoto(ponto)} alt={ponto.nome}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hov ? "scale(1.045)" : "scale(1)",
            transition: "transform 0.7s ease",
          }}/>
      </div>

      {/* TEXTO */}
      <div style={{
        gridArea: "texto",
        padding: "2.5rem 2.25rem",
        display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.9rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{
            background: badge.bg, color: badge.cor,
            fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "2rem",
          }}>{ponto.tag}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.22rem",
            fontSize: "0.67rem", color: mutedC }}>
            <IconPin/> {ponto.distancia}
          </span>
        </div>

        <h3 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(1.2rem, 2vw, 1.65rem)",
          fontWeight: 900, lineHeight: 1.1, color: tituloC, margin: 0,
        }}>
          {ponto.nome}
        </h3>

        <div style={{
          width: hov ? 42 : 26, height: 1.5,
          background: C.amarelo, borderRadius: 2, opacity: 0.6,
          transition: "width 0.4s ease",
        }}/>

        <p style={{ fontSize: "0.86rem", lineHeight: 1.78, color: corpoC, margin: 0 }}>
          {ponto.descricao}
        </p>

        <div style={{ borderLeft: `2px solid ${C.amarelo}35`, paddingLeft: "0.85rem" }}>
          <p style={{ fontSize: "0.77rem", lineHeight: 1.6, color: dicaC, margin: 0, fontStyle: "italic" }}>
            {ponto.dica}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ─── CARD MOBILE ────────────────────────────────────────────────────── */
function CardMobile({ ponto, light }) {
  const badge   = BADGE[ponto.tag] ?? { cor: C.amarelo, bg: "rgba(245,194,0,0.10)" };
  const cardBg  = light ? C.cardBgLight : C.cardBg;
  const tituloC = light ? C.tituloLight : C.titulo;
  const corpoC  = light ? C.corpoLight  : C.corpo;
  const dicaC   = light ? C.dicaLight   : C.dica;
  const mutedC  = light ? C.mutedLight  : C.muted;

  return (
    <article style={{
      borderRadius: "1.25rem", overflow: "hidden",
      background: cardBg,
      border: `1px solid ${light ? "rgba(26,20,16,0.06)" : "rgba(255,255,255,0.04)"}`,
      boxShadow: light ? "0 2px 16px rgba(26,20,16,0.055)" : "0 2px 16px rgba(0,0,0,0.12)",
    }}>
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: `linear-gradient(to bottom, transparent 40%, ${C.escuro}bb 100%)`,
        }}/>
        {ponto.destaque && (
          <span style={{
            position: "absolute", top: 12, left: 12, zIndex: 2,
            background: C.amarelo, color: C.escuro,
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.2rem 0.55rem", borderRadius: "2rem",
          }}>Favorito</span>
        )}
        <img src={getFoto(ponto)} alt={ponto.nome}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
      </div>

      <div style={{ padding: "1.2rem 1.35rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{
            background: badge.bg, color: badge.cor,
            fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.18rem 0.55rem", borderRadius: "2rem",
          }}>{ponto.tag}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem",
            fontSize: "0.67rem", color: mutedC }}>
            <IconPin/> {ponto.distancia}
          </span>
        </div>

        <h3 style={{
          fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 900,
          color: tituloC, margin: 0, lineHeight: 1.2,
        }}>
          {ponto.nome}
        </h3>

        <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: corpoC, margin: 0 }}>
          {ponto.descricao}
        </p>

        <div style={{ borderLeft: `2px solid ${C.amarelo}35`, paddingLeft: "0.75rem" }}>
          <p style={{ fontSize: "0.74rem", lineHeight: 1.55, color: dicaC, margin: 0, fontStyle: "italic" }}>
            {ponto.dica}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ─── PÁGINA ─────────────────────────────────────────────────────────── */
export default function Roteiro() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);

  useState(() => {
    const handle = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  });

  const px = mobile ? "1.25rem" : "3rem";

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cards-grid { display: flex; flex-direction: column; gap: 1.75rem; }
        .card-in {
          opacity: 0; transform: translateY(24px);
          animation: entra 0.55s ease forwards;
        }
        @keyframes entra { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <div style={{
        background: "#1A1410",
        padding: mobile ? "4rem 1.25rem 3.5rem" : "5rem 3rem 4rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -80, right: -80, width: 320, height: 320,
          borderRadius: "50%", background: "rgba(245,194,0,0.04)", pointerEvents: "none",
        }}/>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase",
            color: "rgba(250,250,245,0.28)", marginBottom: "1.5rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            <span>Casa Amarela</span>
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: "#F5C200" }}>Roteiro</span>
          </p>
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: mobile ? "clamp(2rem, 9vw, 2.8rem)" : "clamp(2.8rem, 5vw, 4.2rem)",
            fontWeight: 900, lineHeight: 0.95, color: "#FAFAF5", marginBottom: "1.25rem",
          }}>
            O que fazer em<br/>
            <span style={{ color: "#F5C200" }}>Arraial do Cabo</span>
          </h1>
          <p style={{
            fontSize: mobile ? "0.88rem" : "1rem",
            color: "rgba(250,250,245,0.45)", lineHeight: 1.65, maxWidth: 520,
          }}>
            Curadoria de quem mora aqui e recebe há mais de 6 anos.
            Praias, lagoas e passeios imperdíveis — todos perto da Casa Amarela.
          </p>
        </div>
      </div>

      {/* ── SEÇÕES ──────────────────────────────────────────────────── */}
      {SECOES.map((secao, si) => {
        const bgAnterior = si === 0 ? "#1A1410" : SECOES[si - 1].bg;
        const claro = secao.bg === "#f5f1e8";
        const py = mobile ? "3.5rem" : "5rem";

        return (
          <div key={secao.id}>
            <Onda de={bgAnterior} para={secao.bg} />
            <div style={{ background: secao.bg, padding: `${py} ${px}` }}>
              <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <div style={{ marginBottom: "2.75rem" }}>
                  <p style={{
                    fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase",
                    color: claro ? "#b0a48a" : "rgba(250,250,245,0.28)",
                    marginBottom: "0.4rem",
                  }}>
                    {secao.subtitulo}
                  </p>
                  <h2 style={{
                    fontFamily: "Georgia, serif",
                    fontSize: mobile ? "clamp(1.5rem, 6vw, 2rem)" : "clamp(1.8rem, 3.5vw, 2.5rem)",
                    fontWeight: 900, lineHeight: 1.05, margin: 0,
                    color: claro ? "#1A1410" : "#FAFAF5",
                  }}>
                    {secao.titulo}
                  </h2>
                </div>

                <div className="cards-grid">
                  {secao.pontos.map((ponto, idx) => (
                    <div key={ponto.id} className="card-in" style={{ animationDelay: `${idx * 0.07}s` }}>
                      {mobile
                        ? <CardMobile ponto={ponto} light={claro} />
                        : <Card ponto={ponto} invertido={idx % 2 !== 0} light={claro} />
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Onda de={SECOES[SECOES.length - 1].bg} para="#1A1410" />

      {/* ── CTA FINAL ───────────────────────────────────────────────── */}
      <div style={{
        background: "#1A1410",
        padding: mobile ? "3rem 1.25rem 5rem" : "4rem 3rem 6rem",
      }}>
        <div style={{
          maxWidth: 960, margin: "0 auto",
          display: "flex", flexDirection: mobile ? "column" : "row",
          alignItems: mobile ? "flex-start" : "center",
          justifyContent: "space-between", gap: "2rem",
        }}>
          <div>
            <p style={{
              fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(250,250,245,0.28)", marginBottom: "0.75rem",
            }}>Pronto para explorar?</p>
            <h3 style={{
              fontFamily: "Georgia, serif",
              fontSize: mobile ? "1.6rem" : "2.2rem",
              fontWeight: 900, lineHeight: 1.1, color: "#FAFAF5",
            }}>
              Reserve a Casa Amarela<br/>
              <span style={{ color: "#F5C200" }}>e viva tudo isso.</span>
            </h3>
          </div>
          <a
            href="#reservar"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              background: "#F5C200", color: "#1A1410",
              padding: "1rem 2rem", borderRadius: "3rem",
              fontWeight: 700, fontSize: "0.9rem",
              textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(245,194,0,0.35)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Verificar disponibilidade
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}