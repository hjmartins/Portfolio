// Portfólio Henrique Martins — design do protótipo "Portfolio Henrique v3"
// Substitui src/App.tsx. Tailwind v4 (já configurado via @import "tailwindcss").
// Fontes: adicione no index.html, dentro de <head>:
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

const C = {
  bg: "#0b0f14",
  panel: "#0e141b",
  panel2: "#111a23",
  line: "#1a2230",
  line2: "#253141",
  ink: "#e6ecf2",
  muted: "#a8b8c6",
  dim: "#8b9aa8",
  acc: "#35d6c5",
  accink: "#04201d",
  accsoft: "rgba(53,214,197,.10)",
} as const

const mono = { fontFamily: "'JetBrains Mono', monospace" }
const sans = { fontFamily: "Archivo, sans-serif" }

type Project = {
  num: string
  title: string
  slot: string
  desc: string
  m1v: string
  m1k: string
  m2v: string
  m2k: string
  stack: string[]
}

const projects: Project[] = [
  {
    num: "01",
    title: "ETL de ponta a ponta",
    slot: "diagrama da arquitetura",
    desc: "Pipeline construída do zero: extração agendada, DAGs em Airflow com retries e alertas, transformação em dbt com testes e camadas, carga em ClickHouse para consulta analítica.",
    m1v: "preencher",
    m1k: "volume / frequência",
    m2v: "E2E",
    m2k: "ingestão → consumo",
    stack: ["Airflow", "dbt", "ClickHouse", "Python", "SQL"],
  },
  {
    num: "02",
    title: "Pipelines na GCP",
    slot: "diagrama dos serviços",
    desc: "Ingestão e processamento em serviços gerenciados do Google Cloud, com execução agendada, logging e dados modelados em BigQuery para análise.",
    m1v: "preencher",
    m1k: "volume / frequência",
    m2v: "GCP",
    m2k: "ambiente",
    stack: ["GCP", "BigQuery", "Cloud Storage", "Python"],
  },
  {
    num: "03",
    title: "Data lake on-premise",
    slot: "camadas do data lake",
    desc: "Data lake em infraestrutura própria, organizado em camadas raw → staging → curated, com processos de carga versionados em Git e rodando em containers.",
    m1v: "preencher",
    m1k: "volume / frequência",
    m2v: "on-prem",
    m2k: "ambiente",
    stack: ["Docker", "Linux", "Python", "SQL"],
  },
]

const stack = [
  { label: "Dados", items: ["Python", "SQL", "dbt", "Pandas"] },
  { label: "Orquestração", items: ["Airflow"] },
  { label: "Armazenamento", items: ["ClickHouse", "BigQuery", "Postgres"] },
  { label: "Cloud", items: ["GCP", "Cloud Storage"] },
  { label: "Infra", items: ["Docker", "Linux", "Git"] },
]

const roles = [
  { when: "preencher", title: "Cargo atual", org: "Empresa", note: "Uma linha sobre o que você entrega hoje — pipelines em produção, times atendidos." },
  { when: "preencher", title: "Cargo anterior", org: "Empresa", note: "O que você construiu ali: migração, primeira pipeline, automação." },
  { when: "preencher", title: "Início", org: "Empresa / formação", note: "Onde você começou a trabalhar com dados." },
]

const contacts = [
  { label: "email", value: "hjmartins88@gmail.com", icon: "✉", href: "mailto:hjmartins88@gmail.com", external: false },
  { label: "linkedin", value: "/in/henrique-martins", icon: "↗", href: "https://www.linkedin.com/in/henrique-jos%C3%A9-dos-santos-martins-a14235236", external: true },
  { label: "github", value: "github.com/hjmartins", icon: "↗", href: "https://github.com/hjmartins", external: true },
]

const pipeline = [
  { num: "01", title: "extract · APIs · Postgres", sub: "python · carga incremental", delay: "0s" },
  { num: "02", title: "orchestrate · Airflow", sub: "DAGs idempotentes · retries · alertas", delay: ".7s" },
  { num: "03", title: "transform · dbt", sub: "staging → marts · testes de dados", delay: "1.4s" },
]

const GlobalCss = () => (
  <style>{`
    @keyframes beat { 0%,100% { transform: scale(1); opacity: .5 } 50% { transform: scale(1.4); opacity: 1 } }
    @keyframes sweep { 0% { transform: translateX(-110%) } 100% { transform: translateX(320%) } }
    @keyframes dashdown { to { background-position-y: 12px } }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: ${C.bg}; color: ${C.ink}; font-family: Archivo, sans-serif; }
    ::selection { background: ${C.accsoft}; }
    a:focus-visible, button:focus-visible { outline: 2px solid ${C.acc}; outline-offset: 2px; }
  `}</style>
)

const Dot = () => (
  <span
    className="inline-block rounded-full"
    style={{ width: 7, height: 7, background: C.acc, animation: "beat 1.8s ease-in-out infinite" }}
  />
)

function Header() {
  const nav = [
    ["Trabalho", "trabalho"],
    ["Stack", "stack"],
    ["Sobre", "sobre"],
    ["Contato", "contato"],
  ]
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between gap-6 py-7"
      style={{ background: C.bg, borderBottom: `1px solid ${C.line}` }}
    >
      <div style={{ ...mono, fontSize: 13, letterSpacing: ".02em", color: C.dim }}>
        <span style={{ color: C.acc, fontWeight: 700 }}>HM</span> · eng. de dados
      </div>
      <nav className="flex gap-[clamp(14px,2.4vw,34px)]">
        {nav.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className="transition-colors hover:!text-[#e6ecf2]"
            style={{ ...mono, fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: C.dim, textDecoration: "none" }}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function PipelineCard() {
  return (
    <div className="min-w-0 overflow-hidden rounded-lg" style={{ border: `1px solid ${C.line}`, background: C.panel }}>
      <div
        className="flex items-center justify-between gap-3 px-[18px] py-[13px]"
        style={{ ...mono, fontSize: 11.5, letterSpacing: ".06em", color: C.dim, background: C.panel2, borderBottom: `1px solid ${C.line}` }}
      >
        <span>dag · etl_ponta_a_ponta</span>
        <span className="flex items-center gap-[7px]" style={{ color: C.acc }}>
          <Dot />
          running
        </span>
      </div>

      <div className="px-5 py-6">
        {pipeline.map((s) => (
          <div key={s.num}>
            <div className="grid items-center gap-[14px]" style={{ gridTemplateColumns: "34px minmax(0,1fr)" }}>
              <div style={{ ...mono, fontSize: 11, color: C.acc, textAlign: "center" }}>{s.num}</div>
              <div className="relative overflow-hidden rounded-[5px] px-4 py-[14px]" style={{ border: `1px solid ${C.line2}`, background: C.panel2 }}>
                <div className="text-[15px] font-semibold">{s.title}</div>
                <div style={{ ...mono, fontSize: 11.5, color: C.dim, marginTop: 4 }}>{s.sub}</div>
                <div
                  className="absolute inset-0"
                  style={{
                    width: "28%",
                    background: `linear-gradient(90deg, transparent, ${C.accsoft}, transparent)`,
                    animation: `sweep 3.4s linear ${s.delay} infinite`,
                  }}
                />
              </div>
            </div>
            <div className="grid gap-[14px]" style={{ gridTemplateColumns: "34px minmax(0,1fr)" }}>
              <div className="flex justify-center">
                <div
                  style={{
                    width: 1,
                    height: 24,
                    backgroundImage: `repeating-linear-gradient(180deg, ${C.acc} 0 5px, transparent 5px 12px)`,
                    animation: "dashdown .8s linear infinite",
                  }}
                />
              </div>
              <div />
            </div>
          </div>
        ))}

        <div className="grid items-center gap-[14px]" style={{ gridTemplateColumns: "34px minmax(0,1fr)" }}>
          <div style={{ ...mono, fontSize: 11, color: C.acc, textAlign: "center" }}>04</div>
          <div className="rounded-[5px] px-4 py-[14px]" style={{ border: `1px solid ${C.acc}`, background: C.accsoft }}>
            <div className="text-[15px] font-semibold">load · ClickHouse · BigQuery</div>
            <div style={{ ...mono, fontSize: 11.5, color: C.muted, marginTop: 4 }}>pronto para BI e análise</div>
          </div>
        </div>
      </div>

      <div className="px-5 py-[14px]" style={{ ...mono, fontSize: 11, letterSpacing: ".06em", color: C.dim, background: C.panel2, borderTop: `1px solid ${C.line}` }}>
        é isso que eu construo e mantenho, de ponta a ponta
      </div>
    </div>
  )
}

function Hero() {
  const metrics = [
    ["3", "pipelines completas"],
    ["2", "ambientes: GCP · on-prem"],
    ["E2E", "ingestão → consumo"],
  ]
  return (
    <section
      id="Home"
      className="grid items-center gap-[clamp(32px,5vw,72px)] pt-[clamp(56px,8vw,104px)] pb-[clamp(48px,6vw,88px)]"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))" }}
    >
      <div className="min-w-0">
        <div className="mb-7 flex items-center gap-[10px]" style={{ ...mono, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.acc }}>
          <Dot />
          Disponível para novos projetos
        </div>
        <h1 className="m-0 text-[clamp(52px,8.5vw,108px)] font-extrabold leading-[.92]" style={{ letterSpacing: "-0.035em", textWrap: "balance" }}>
          Henrique
          <br />
          <span style={{ color: "#5f6d7a" }}>Martins</span>
        </h1>
        <p className="mt-7 max-w-[46ch] text-[clamp(18px,1.55vw,23px)] leading-[1.5]" style={{ color: C.muted, textWrap: "pretty" }}>
          Engenheiro de dados especializado em <strong className="font-semibold" style={{ color: C.ink }}>criar e manter pipelines</strong> — da ingestão à camada analítica, em GCP e on-premise.
        </p>

        <div className="mt-10 flex flex-wrap gap-[14px]">
          <a
            href="#trabalho"
            className="rounded-[3px] px-7 py-[15px] font-bold transition-opacity hover:opacity-[.88]"
            style={{ ...mono, fontSize: 13, letterSpacing: ".06em", background: C.acc, color: C.accink, textDecoration: "none" }}
          >
            ver projetos →
          </a>
          <a
            href="#contato"
            className="rounded-[3px] px-7 py-[15px] transition-colors hover:!border-[#35d6c5] hover:!text-[#35d6c5]"
            style={{ ...mono, fontSize: 13, letterSpacing: ".06em", border: `1px solid ${C.line2}`, color: C.ink, textDecoration: "none" }}
          >
            falar comigo
          </a>
        </div>

        <div
          className="mt-[52px] grid gap-x-6 gap-y-7 pt-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", borderTop: `1px solid ${C.line}` }}
        >
          {metrics.map(([v, k]) => (
            <div key={k}>
              <div className="text-[30px] font-bold" style={{ letterSpacing: "-0.02em" }}>{v}</div>
              <div style={{ ...mono, fontSize: 11, letterSpacing: ".09em", textTransform: "uppercase", color: C.dim, marginTop: 6 }}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      <PipelineCard />
    </section>
  )
}

function Work() {
  return (
    <section id="trabalho" className="py-[clamp(56px,7vw,96px)]" style={{ borderTop: `1px solid ${C.line}` }}>
      <div className="mb-[clamp(36px,5vw,60px)] flex flex-wrap items-baseline justify-between gap-6">
        <h2 className="m-0 text-[clamp(32px,4.4vw,56px)] font-bold" style={{ letterSpacing: "-0.03em" }}>Trabalho selecionado</h2>
        <span style={{ ...mono, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.dim }}>03 pipelines</span>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}>
        {projects.map((p) => (
          <article key={p.num} className="overflow-hidden rounded-lg transition-colors" style={{ border: `1px solid ${C.line}`, background: C.panel }}>
            <div
              className="flex h-[156px] items-center justify-center"
              style={{
                borderBottom: `1px solid ${C.line}`,
                backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 1px, transparent 1px 9px)",
              }}
            >
              <span style={{ ...mono, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: C.dim, background: C.panel, padding: "6px 12px", border: `1px dashed ${C.line2}` }}>
                {p.slot}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="m-0 text-[22px] font-semibold" style={{ letterSpacing: "-0.015em" }}>{p.title}</h3>
                <span style={{ ...mono, fontSize: 11, color: C.dim }}>{p.num}</span>
              </div>
              <p className="mt-[10px] mb-0 text-[15px] leading-[1.55]" style={{ color: C.muted, textWrap: "pretty" }}>{p.desc}</p>
              <div className="my-5 flex flex-wrap gap-7">
                {[[p.m1v, p.m1k], [p.m2v, p.m2k]].map(([v, k]) => (
                  <div key={k}>
                    <div style={{ ...mono, fontSize: 15, fontWeight: 700, color: C.acc }}>{v}</div>
                    <div style={{ ...mono, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: C.dim, marginTop: 5 }}>{k}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-[6px] pt-4" style={{ borderTop: `1px solid ${C.line}` }}>
                {p.stack.map((t) => (
                  <span key={t} className="rounded-[3px] px-[9px] py-1" style={{ ...mono, fontSize: 11, color: C.dim, border: `1px solid ${C.line2}` }}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section id="stack" className="py-[clamp(56px,7vw,96px)]" style={{ borderTop: `1px solid ${C.line}` }}>
      <h2 className="mt-0 mb-[clamp(36px,5vw,56px)] text-[clamp(32px,4.4vw,56px)] font-bold" style={{ letterSpacing: "-0.03em" }}>Stack</h2>
      <div className="grid">
        {stack.map((g) => (
          <div key={g.label} className="grid items-baseline gap-5 py-[22px]" style={{ gridTemplateColumns: "minmax(150px, 220px) minmax(0,1fr)", borderTop: `1px solid ${C.line}` }}>
            <div style={{ ...mono, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.acc }}>{g.label}</div>
            <div className="flex flex-wrap gap-x-[22px] gap-y-[10px] text-[16px]">
              {g.items.map((i) => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  const facts = [
    ["Base", "São Paulo, BR"],
    ["Formato", "Remoto / híbrido"],
    ["Início", "Imediato"],
  ]
  return (
    <section
      id="sobre"
      className="grid gap-[clamp(32px,5vw,72px)] py-[clamp(56px,7vw,96px)]"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", borderTop: `1px solid ${C.line}` }}
    >
      <div className="min-w-0">
        <h2 className="mt-0 mb-7 text-[clamp(32px,4.4vw,56px)] font-bold" style={{ letterSpacing: "-0.03em" }}>Sobre</h2>
        <p className="mt-0 mb-5 max-w-[56ch] text-[17.5px] leading-[1.65]" style={{ color: C.muted, textWrap: "pretty" }}>
          Meu trabalho é construir pipelines que continuem funcionando depois do deploy: execução previsível, falhas visíveis e dados confiáveis na ponta.
        </p>
        <p className="m-0 max-w-[56ch] text-[17.5px] leading-[1.65]" style={{ color: C.muted, textWrap: "pretty" }}>
          Já levei pipelines completas do zero à produção — orquestração em Airflow, modelagem em dbt, carga em ClickHouse e BigQuery — tanto na GCP quanto em infraestrutura própria.
        </p>
        <div className="mt-10 grid gap-6 pt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", borderTop: `1px solid ${C.line}` }}>
          {facts.map(([k, v]) => (
            <div key={k}>
              <div style={{ ...mono, fontSize: 11, letterSpacing: ".09em", textTransform: "uppercase", color: C.dim }}>{k}</div>
              <div className="mt-[5px] text-[16px]">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <div className="mb-5" style={{ ...mono, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.dim }}>Trajetória</div>
        {roles.map((r) => (
          <div key={r.title} className="grid gap-5 py-5" style={{ gridTemplateColumns: "110px minmax(0,1fr)", borderTop: `1px solid ${C.line}` }}>
            <div className="self-start pt-[3px]" style={{ ...mono, fontSize: 12, color: C.acc, borderBottom: `1px dashed ${C.acc}` }}>{r.when}</div>
            <div>
              <div className="text-[17px] font-semibold">{r.title}</div>
              <div className="mt-[3px] text-[14.5px]" style={{ color: C.dim }}>{r.org}</div>
              <div className="mt-2 text-[14.5px] leading-[1.5]" style={{ color: C.muted }}>{r.note}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contato" className="py-[clamp(64px,8vw,112px)]" style={{ borderTop: `1px solid ${C.line}` }}>
      <div className="mb-5" style={{ ...mono, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: C.acc }}>contato</div>
      <h2 className="m-0 text-[clamp(38px,6.5vw,82px)] font-extrabold leading-none" style={{ letterSpacing: "-0.035em", textWrap: "balance" }}>
        Bora construir seu
        <br />
        próximo pipeline.
      </h2>
      <p className="mt-6 max-w-[52ch] text-[17.5px] leading-[1.6]" style={{ color: C.muted, textWrap: "pretty" }}>
        Aberto a oportunidades de emprego, projetos freelance e consultorias. Respondo em até 24h.
      </p>

      <div className="mt-10 grid max-w-[620px] gap-3">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-[18px] rounded-md px-5 py-[18px] transition-colors hover:!border-[#35d6c5] hover:!bg-[#111a23]"
            style={{ border: `1px solid ${C.line}`, background: C.panel, color: "inherit", textDecoration: "none" }}
          >
            <span className="w-6 text-center text-[18px]" style={{ ...mono, color: C.acc }}>{c.icon}</span>
            <span className="min-w-0">
              <span className="block" style={{ ...mono, fontSize: 11, letterSpacing: ".09em", textTransform: "uppercase", color: C.dim }}>{c.label}</span>
              <span className="mt-1 block break-all" style={{ ...mono, fontSize: 14.5, color: C.ink }}>{c.value}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div style={{ ...sans, background: C.bg, color: C.ink }}>
      <GlobalCss />
      <div className="mx-auto max-w-[1440px] px-[clamp(20px,5vw,72px)]">
        <Header />
        <Hero />
        <Work />
        <Stack />
        <About />
        <Contact />
        <footer
          className="flex flex-wrap justify-between gap-4 pt-7 pb-11"
          style={{ ...mono, fontSize: 11.5, color: C.dim, borderTop: `1px solid ${C.line}` }}
        >
          <span>© 2026 Henrique Martins</span>
          <span>engenharia de dados</span>
        </footer>
      </div>
    </div>
  )
}
