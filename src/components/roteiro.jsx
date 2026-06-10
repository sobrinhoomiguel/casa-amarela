import { useState } from "react";

/* ─── DATA ──────────────────────────────────────────────────────────── */
const PONTOS = [
  {
    id: 1,
    categoria: "praia",
    nome: "Praia de Figueira",
    distancia: "4 min a pé",
    descricao:
      "Considerada uma das praias mais bonitas do Brasil, o Forno surpreende com água cristalina em tons de esmeralda e pedras que formam uma piscina natural protegida. O acesso é feito por trilha ou barco — vale cada passo.",
    dica: "Chegue antes das 9h para pegar uma sombra e água calma.",
    foto: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    destaque: true,
  },
  {
    id: 2,
    categoria: "praia",
    nome: "Prainha",
    distancia: "12 min de carro",
    descricao:
      "Pequena e resguardada, as Prainhas ficam entre falésias e oferecem um dos melhores pontos de mergulho da região. A água é tão transparente que você vê o fundo mesmo de longe.",
    dica: "Leve equipamento de snorkel — a vida marinha é excepcional.",
    foto: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80",
    destaque: false,
  },
  {
    id: 3,
    categoria: "praia",
    nome: "Praia Grande",
    distancia: "5 min de carro",
    descricao:
      "A praia mais acessível e animada de Arraial, com quiosques, stand-up paddle e ondas perfeitas para iniciantes. Ideal para quem quer estrutura sem abrir mão da beleza natural.",
    dica: "Perfeita para o pôr do sol com uma água de coco na mão.",
    foto: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=900&q=80",
    destaque: false,
  },
  {
    id: 4,
    categoria: "lagoa",
    nome: "Lagoa de Figueira",
    distancia: "10 min de carro",
    descricao:
      "A maior laguna hipersalina do mundo — a água é quase duas vezes mais salgada que o mar e por isso nunca forma ondas. Ideal para descansar, fazer windsurf e contemplar o horizonte sem fim.",
    dica: "As margens do lado de Arraial são menos movimentadas. Vale explorar.",
    foto: "https://images.unsplash.com/photo-1566024146169-1b2a985b2c8b?w=900&q=80",
    destaque: true,
  },
  {
    id: 5,
    categoria: "lagoa",
    nome: "Lagoa de Monte Alto",
    distancia: "3 min a pé",
    descricao:
      "A lagoa que dá nome ao bairro da Casa Amarela. Calma, cercada de verde e a poucos passos de casa — perfeita para o fim da tarde após um dia de praia. Crianças adoram a rasa e a tranquilidade.",
    dica: "Você não precisa nem de carro. Dá pra ir caminhando direto da casa.",
    foto: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
    destaque: false,
  },
  {
    id: 6,
    categoria: "centro",
    nome: "Centro de Figueira",
    distancia: "15 min de carro",
    descricao:
      "Ruas de paralelepípedo, igrejas coloniais e o famoso mirante com vista para o Canal de Itajuru. Uma tarde passeando pelo centro revela a história de um dos povoados mais antigos do litoral fluminense.",
    dica: "Visite a Igreja Nossa Senhora dos Remédios e desça até o trapiche para ver os barcos de pesca.",
    foto: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
    destaque: false,
  },
  {
    id: 7,
    categoria: "centro",
    nome: "Centro de Arraial do Cabo",
    distancia: "14 min de carro",
    descricao:
      "Um dos cartões postais de Arraial, o farol fica no topo de uma falésia com vista panorâmica para as praias e o oceano aberto. O caminho até lá já é um espetáculo.",
    dica: "Vá no final da tarde para ver a iluminação dourada nas falésias.",
    foto: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80",
    destaque: true,
  },
  {
    id: 8,
    categoria: "centro",
    nome: "Centro de Cabo Frio",
    distancia: "15 min de carro (saída do pier)",
    descricao:
      "O passeio clássico de Arraial leva você às praias inacessíveis por terra, com paradas para mergulho e snorkel. As escunas saem cedo e costumam lotar — reserva com antecedência.",
    dica: "Prefira os passeios que saem às 8h. A luz da manhã nas pedras do Forno é de tirar o fôlego.",
    foto: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80",
    destaque: false,
  },
];

const FILTROS = [
  { key: "todos", label: "Todos" },
  { key: "praia", label: "Praias" },
  { key: "lagoa", label: "Lagoas" },
  { key: "centro", label: "Centro & Passeios" },
];

/* ─── ICONES INLINE ─────────────────────────────────────────────────── */
const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconLamp = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.9-3.5 6.2L15 17H9l-.5-1.8A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/>
  </svg>
);

/* ─── BADGE CATEGORIA ────────────────────────────────────────────────── */
const BADGE_STYLE = {
  praia:  { bg: "rgba(59,191,219,0.15)", color: "#3BBFDB", label: "Praia" },
  lagoa:  { bg: "rgba(29,158,117,0.15)", color: "#1D9E75", label: "Lagoa" },
  centro: { bg: "rgba(245,194,0,0.15)",  color: "#C49B00", label: "Passeio" },
};

/* ─── CARD ───────────────────────────────────────────────────────────── */
function Card({ ponto, invertido }) {
  const badge = BADGE_STYLE[ponto.categoria];

  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateAreas: invertido ? '"texto foto"' : '"foto texto"',
        borderRadius: "1.25rem",
        overflow: "hidden",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        minHeight: 340,
      }}
    >
      {/* FOTO */}
      <div
        style={{
          gridArea: "foto",
          position: "relative",
          overflow: "hidden",
          minHeight: 280,
        }}
      >
        <img
          src={ponto.foto}
          alt={ponto.nome}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        />
        {ponto.destaque && (
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: "#F5C200",
              color: "#1A1410",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.3rem 0.7rem",
              borderRadius: "2rem",
            }}
          >
            Favorito da casa
          </span>
        )}
      </div>

      {/* TEXTO */}
      <div
        style={{
          gridArea: "texto",
          padding: "2.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {/* Badge categoria + distância */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          <span
            style={{
              background: badge.bg,
              color: badge.color,
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.28rem 0.75rem",
              borderRadius: "2rem",
            }}
          >
            {badge.label}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            <IconPin /> {ponto.distancia}
          </span>
        </div>

        {/* Nome */}
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {ponto.nome}
        </h2>

        {/* Descrição */}
        <p
          style={{
            fontSize: "0.88rem",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          {ponto.descricao}
        </p>

        {/* Dica */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
            background: "rgba(245,194,0,0.08)",
            border: "1px solid rgba(245,194,0,0.2)",
            borderRadius: "0.75rem",
            padding: "0.75rem 1rem",
          }}
        >
          <span style={{ color: "#F5C200", flexShrink: 0, marginTop: "1px" }}>
            <IconLamp />
          </span>
          <p
            style={{
              fontSize: "0.78rem",
              lineHeight: 1.55,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            {ponto.dica}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ─── CARD MOBILE (stack vertical) ──────────────────────────────────── */
function CardMobile({ ponto }) {
  const badge = BADGE_STYLE[ponto.categoria];

  return (
    <article
      style={{
        borderRadius: "1.25rem",
        overflow: "hidden",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        <img
          src={ponto.foto}
          alt={ponto.nome}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {ponto.destaque && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "#F5C200",
              color: "#1A1410",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.28rem 0.65rem",
              borderRadius: "2rem",
            }}
          >
            Favorito
          </span>
        )}
      </div>

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span
            style={{
              background: badge.bg,
              color: badge.color,
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.25rem 0.65rem",
              borderRadius: "2rem",
            }}
          >
            {badge.label}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.28rem",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            <IconPin /> {ponto.distancia}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.2rem",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {ponto.nome}
        </h2>

        <p
          style={{
            fontSize: "0.85rem",
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          {ponto.descricao}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.45rem",
            background: "rgba(245,194,0,0.08)",
            border: "1px solid rgba(245,194,0,0.2)",
            borderRadius: "0.65rem",
            padding: "0.65rem 0.85rem",
          }}
        >
          <span style={{ color: "#F5C200", flexShrink: 0, marginTop: "1px" }}>
            <IconLamp />
          </span>
          <p
            style={{
              fontSize: "0.76rem",
              lineHeight: 1.55,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            {ponto.dica}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────── */
export default function Roteiro() {
  const [filtro, setFiltro] = useState("todos");
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);

  // detecta resize
  useState(() => {
    const handle = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  });

  const visíveis =
    filtro === "todos" ? PONTOS : PONTOS.filter(p => p.categoria === filtro);

  return (
    <>
      <style>{`
        :root {
          --amarelo: #F5C200;
          --escuro:  #1A1410;
          --branco:  #FAFAF5;
          --card-bg:     #ffffff;
          --card-border: #e8e4da;
          --text-primary:   #1A1410;
          --text-secondary: #5a5248;
          --text-muted:     #9c9488;
          --page-bg:        #f5f1e8;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --card-bg:        #1e1a14;
            --card-border:    #2e2820;
            --text-primary:   #FAFAF5;
            --text-secondary: #b0a898;
            --text-muted:     #756d62;
            --page-bg:        #141210;
          }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--page-bg); }

        .filtro-btn {
          padding: 0.55rem 1.2rem;
          border-radius: 2rem;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: all 0.22s ease;
          background: var(--card-bg);
          color: var(--text-secondary);
          border-color: var(--card-border);
          white-space: nowrap;
        }
        .filtro-btn:hover {
          border-color: var(--amarelo);
          color: var(--text-primary);
        }
        .filtro-btn--ativo {
          background: var(--amarelo);
          color: var(--escuro);
          border-color: var(--amarelo);
        }
        .filtro-btn--ativo:hover {
          background: var(--amarelo);
          color: var(--escuro);
        }

        .cards-lista {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card-animado {
          opacity: 0;
          transform: translateY(24px);
          animation: surgir 0.5s ease forwards;
        }
        @keyframes surgir {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "var(--page-bg)",
          paddingBottom: "5rem",
        }}
      >
        {/* ── HEADER ────────────────────────────────────────────────── */}
        <div
          style={{
            background: "var(--escuro)",
            padding: mobile ? "3.5rem 1.25rem 2.5rem" : "4rem 3rem 3rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Detalhe decorativo */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(245,194,0,0.06)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            {/* Breadcrumb */}
            <p
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(250,250,245,0.35)",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>Casa Amarela</span>
              <span>›</span>
              <span style={{ color: "#F5C200" }}>Roteiro</span>
            </p>

            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: mobile ? "clamp(2rem, 8vw, 2.8rem)" : "clamp(2.8rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "#FAFAF5",
                marginBottom: "0.75rem",
              }}
            >
              O que fazer em{" "}
              <span style={{ color: "#F5C200" }}>Arraial do Cabo</span>
            </h1>

            <p
              style={{
                fontSize: mobile ? "0.88rem" : "1rem",
                color: "rgba(250,250,245,0.55)",
                lineHeight: 1.6,
                maxWidth: 560,
                marginBottom: "2rem",
              }}
            >
              Curadoria de quem mora aqui e recebe há mais de 6 anos. Praias,
              lagoas e passeios imperdíveis, todos perto da Casa Amarela.
            </p>

            {/* Filtros */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {FILTROS.map(f => (
                <button
                  key={f.key}
                  className={`filtro-btn${filtro === f.key ? " filtro-btn--ativo" : ""}`}
                  onClick={() => setFiltro(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTADOR ──────────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: mobile ? "1.5rem 1.25rem 0" : "2rem 3rem 0",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {visíveis.length}{" "}
            {visíveis.length === 1 ? "local encontrado" : "locais encontrados"}
          </p>
        </div>

        {/* ── CARDS ─────────────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: mobile ? "1.25rem 1.25rem 0" : "1.5rem 3rem 0",
          }}
        >
          <div className="cards-lista">
            {visíveis.map((ponto, idx) =>
              mobile ? (
                <div
                  key={ponto.id}
                  className="card-animado"
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  <CardMobile ponto={ponto} />
                </div>
              ) : (
                <div
                  key={ponto.id}
                  className="card-animado"
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  <Card ponto={ponto} invertido={idx % 2 !== 0} />
                </div>
              )
            )}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: 960,
            margin: mobile ? "3rem auto 0" : "4rem auto 0",
            padding: mobile ? "0 1.25rem" : "0 3rem",
          }}
        >
          <div
            style={{
              background: "var(--escuro)",
              borderRadius: "1.25rem",
              padding: mobile ? "2rem 1.5rem" : "2.5rem 3rem",
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              alignItems: mobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(250,250,245,0.35)",
                  marginBottom: "0.5rem",
                }}
              >
                Pronto para explorar?
              </p>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: mobile ? "1.4rem" : "1.75rem",
                  fontWeight: 900,
                  color: "#FAFAF5",
                  lineHeight: 1.15,
                }}
              >
                Reserve a Casa Amarela <br />
                <span style={{ color: "#F5C200" }}>e viva tudo isso.</span>
              </h3>
            </div>
            <a
              href="#reservar"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                background: "#F5C200",
                color: "#1A1410",
                padding: "0.9rem 1.8rem",
                borderRadius: "3rem",
                fontWeight: 700,
                fontSize: "0.88rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(245,194,0,0.35)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Verificar disponibilidade
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}