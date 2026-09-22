import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import {
  CapIcon,
  ChipIcon,
  CompassIcon,
  DownloadIcon,
  MailIcon,
  PinIcon,
  ServerIcon,
  TerminalIcon,
} from "../../components/icons/Icons"
import imgavatar from "../../assets/logo/ProfileIcon.png"
import { supabase } from "../../lib/supabaseClient"

/* ------------------------------------------------------------------ */
/*  Contenido & Tipos                                                 */
/* ------------------------------------------------------------------ */

const PROFILE = {
  firstName: "Evelinn",
  lastName: "Jiménez Bautista",
  role: "Estudiante de Administración de Sistemas Informáticos en Red (ASIR)",
  location: "Huércal-Overa, España",
  status: "Disponible para prácticas / empleo",
  bio: "Administro servidores Linux y Windows y diseño infraestructuras de red seguras. Me apasiona la resolución metódica de problemas y la automatización mediante scripting.",
}

type Estudios = {
  id: string
  titulo: string
  subtitulo: string
  fecha: string
  estado: "active" | "done" | "faded"
  etiquetas: string[]
  orden: number
}

// Tipo que coincide exactamente con las columnas de tu tabla 'habilidades'
type HabilidadItem = {
  id: string
  nombre: string
  categoria: string
  icono: string
  creacion?: string
}

// Función auxiliar para mapear el campo 'icono' a un icono de React
const getIconComponent = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "server":
      return <ServerIcon />
    case "terminal":
      return <TerminalIcon />
    case "compass":
      return <CompassIcon />
    default:
      return <ChipIcon />
  }
}

/* ------------------------------------------------------------------ */
/*  Página                                                            */
/* ------------------------------------------------------------------ */

export function SobreMi() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-fog">
      <AmbientGlow />

      <main className="mx-auto w-full max-w-4xl px-6 py-20 sm:py-28">
        <Hero />
        <Divider />
        <Estudios />
        <Divider />
        <Habilidades />
      </main>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Secciones                                                         */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="grid grid-cols-1 gap-8 sm:grid-cols-[176px_1fr] sm:gap-10">
      <Reveal delay={40}>
        <div className="group relative w-fit">
          <div
            className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-glow-pink via-glow-violet to-glow-pink opacity-70 blur-[6px]"
          />
          <div className="relative">
            <img
              src={imgavatar}
              alt={`Retrato de ${PROFILE.firstName} ${PROFILE.lastName}`}
              className="h-[172px] w-[172px] rounded-[20px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-glow-pink/25 bg-glow-pink/10 px-3 py-1 font-display font-bold text-[10.5px] uppercase tracking-[0.04em] text-glow-pink">
            <span
              className="h-1.5 w-1.5 rounded-full bg-glow-pink"
              style={{ animation: "dot-ping 2s ease-in-out infinite" }}
            />
            {PROFILE.status}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-hair bg-white/[0.03] px-3 py-1 font-display font-bold text-[11px] text-mute">
            <PinIcon /> {PROFILE.location}
          </span>
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-[52px]">
          {PROFILE.firstName}{" "}
          <span className="bg-gradient-to-r from-[#ea698b] via-pink-500 to-purple-800 bg-clip-text text-transparent">
            {PROFILE.lastName}
          </span>
        </h1>
        <p className="mt-2 text-[15px] font-medium text-fog/85">{PROFILE.role}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-mute">{PROFILE.bio}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="https://drive.google.com/file/d/1eZsWjIavHTX39lefrxgMKNHsS7OeONzt/view?usp=sharing"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-glow-pink to-glow-violet px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(217,70,239,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_38px_-6px_rgba(217,70,239,0.75)]"
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-[#ea698b] via-pink-500 to-purple-800"
            />
            <DownloadIcon />
            <span className="relative">Descargar CV (PDF)</span>
          </a>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-xl border border-hair bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-fog transition-all duration-300 hover:-translate-y-0.5 hover:border-glow-violet/40 hover:bg-white/[0.06]"
          >
            <MailIcon /> Contactar
          </a>
        </div>
      </Reveal>
    </section>
  )
}

const DOT_TONE: Record<Estudios["estado"], string> = {
  active: "border-glow-pink bg-glow-pink/25",
  done: "border-glow-violet bg-glow-violet/25",
  faded: "border-mute/40 bg-ink",
}

function Estudios() {
  const [estudios, setEstudios] = useState<Estudios[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function fetchEstudios() {
      try {
        const { data, error } = await supabase
          .from("estudios")
          .select("*")
          .order("orden", { ascending: true })

        if (error) throw error
        if (data) setEstudios(data as Estudios[])
      } catch (err) {
        console.error("Error consultando la tabla estudios:", err)
      } finally {
        setCargando(false)
      }
    }

    fetchEstudios()
  }, [])

  return (
    <Reveal delay={80} as="section">
      <SectionHeader eyebrow="Estudios" title="Trayectoria Académica" icon={<CapIcon />} />

      {cargando ? (
        <div className="mt-10 py-12 text-center text-sm font-medium text-mute/60 animate-pulse">
          Cargando trayectoria académica...
        </div>
      ) : (
        <ol className="relative mt-10">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-glow-pink/50 via-glow-violet/25 to-transparent" />
          {estudios.map((s) => (
            <li key={s.id} className="relative pb-11 pl-9 last:pb-0">
              <span
                className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${DOT_TONE[s.estado]}`}
                style={s.estado === "active" ? { animation: "dot-ping 2.4s ease-out infinite" } : undefined}
              />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h3
                  className={`font-display text-lg font-bold leading-snug ${
                    s.estado === "faded" ? "text-fog/70" : "text-white"
                  }`}
                >
                  {s.titulo}
                </h3>
                <span className="w-fit shrink-0 rounded-full border border-hair bg-white/[0.03] px-3 py-1 font-display font-bold text-[11px] text-mute sm:ml-4">
                  {s.fecha}
                </span>
              </div>
              <p className="mt-1.5 text-sm font-medium text-glow-violet/80">{s.subtitulo}</p>
              <ul className="mt-3 space-y-1.5">
                {s.etiquetas?.map((b, index) => (
                  <li key={index} className="flex gap-2.5 text-[14.5px] leading-relaxed text-mute">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-glow-violet/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </Reveal>
  )
}

function Habilidades() {
  const [habilidades, setHabilidades] = useState<HabilidadItem[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function fetchHabilidades() {
      try {
        const { data, error } = await supabase
          .from("habilidades")
          .select("*")
          .order("creacion", { ascending: true })

        if (error) throw error
        if (data) setHabilidades(data as HabilidadItem[])
      } catch (err) {
        console.error("Error consultando la tabla habilidades:", err)
      } finally {
        setCargando(false)
      }
    }

    fetchHabilidades()
  }, [])

  // Agrupamos los elementos por 'categoria'
  const categoriasAgrupadas = habilidades.reduce<
    Record<string, { icono: string; items: string[] }>
  >((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = {
        icono: item.icono,
        items: [],
      }
    }
    acc[item.categoria].items.push(item.nombre)
    return acc
  }, {})

  return (
    <Reveal delay={80} as="section">
      <SectionHeader eyebrow="Habilidades clave" title="Enfoque Técnico" icon={<ChipIcon />} />

      {cargando ? (
        <div className="mt-10 py-12 text-center text-sm font-medium text-mute/60 animate-pulse">
          Cargando habilidades...
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {Object.entries(categoriasAgrupadas).map(([categoria, group]) => (
            <article
              key={categoria}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-hair bg-white/[0.025] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-glow-violet/35 hover:bg-white/[0.05]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-glow-violet/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-glow-pink/20 to-glow-violet/20 text-glow-pink ring-1 ring-inset ring-glow-violet/25">
                  {getIconComponent(group.icono)}
                </span>
                <h3 className="font-display text-base font-bold text-white">{categoria}</h3>
              </div>
              <div className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                {group.items.map((nombreSkill) => (
                  <span
                    key={nombreSkill}
                    className="rounded-md border border-hair bg-ink/60 px-2.5 py-1 font-mono text-[11px] text-fog/75 transition-colors duration-300 group-hover:border-glow-violet/25"
                  >
                    {nombreSkill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/*  Primitivas de UI                                                  */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode
  delay?: number
  as?: "div" | "section"
}) {
  return (
    <Tag className="reveal" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

function SectionHeader({
  eyebrow,
  title,
  icon,
}: {
  eyebrow: string
  title: string
  icon: ReactNode
}) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/[0.03] text-glow-pink">
        {icon}
      </span>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-glow-violet/80">
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
      </div>
    </div>
  )
}

function Divider() {
  return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-hair to-transparent" />
}

function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.20),transparent)] blur-2xl" />
      <div className="absolute -left-40 top-1/3 h-[440px] w-[440px] rounded-full bg-[radial-gradient(closest-side,rgba(244,114,182,0.14),transparent)] blur-2xl" />
      <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.14),transparent)] blur-2xl" />
    </div>
  )
}