import { useEffect, useState } from "react";
import {Code2, Cpu, Database, FolderKanban, Mail, Network, Router, Server, Terminal, Wrench,} from "lucide-react";
import heroPhoto from "../../assets/Profile/ProfileEv.jpeg";
const roles = ["Técnica Informática","Programadora","Administradora de Sistemas","Especialista en Redes",];

const areas = [
  {
    icon: Router,
    title: "Sistemas & Redes (ASIR)",
    desc: "Configuración de routers/switches, redes locales, virtualización, servidores Linux y Windows.",
    tags: ["Linux/Debian", "Windows Server", "VLANs / Cisco"],
  },
  {
    icon: Code2,
    title: "Programación & Scripting",
    desc: "Automatización de tareas, scripts en Bash y Python, desarrollo web básico y lógica de software.",
    tags: ["Bash", "Python", "HTML / CSS / JS"],
  },
  {
    icon: Wrench,
    title: "Soporte & Mantenimiento",
    desc: "Diagnóstico de hardware, resolución de incidencias informáticas y puesta a punto de equipos.",
    tags: ["Hardware", "Helpdesk", "Optimización"],
  },
];

const stack = [
  { name: "Linux", icon: Terminal, color: "#f7c948" },
  { name: "Debian", icon: Terminal, color: "#d70a53" },
  { name: "Ubuntu Server", icon: Server, color: "#e95420" },
  { name: "Windows Server", icon: Server, color: "#4fa3e0" },
  { name: "VMware", icon: Cpu, color: "#78bdf0" },
  { name: "Cisco / VLANs", icon: Network, color: "#5ecfa0" },
  { name: "TCP/IP", icon: Network, color: "#9b7fe8" },
  { name: "DNS / DHCP", icon: Network, color: "#e879a0" },
  { name: "Firewalls", icon: Router, color: "#ff8b6a" },
  { name: "Bash", icon: Terminal, color: "#8bd450" },
  { name: "Python", icon: Code2, color: "#4fa3e0" },
  { name: "JavaScript", icon: Code2, color: "#f7c948" },
  { name: "React", icon: Code2, color: "#61dafb" },
  { name: "HTML / CSS", icon: Code2, color: "#e879a0" },
  { name: "MySQL", icon: Database, color: "#4fa3e0" },
  { name: "PostgreSQL", icon: Database, color: "#6f9ee8" },
  { name: "MongoDB", icon: Database, color: "#5ecfa0" },
];

const rowA = stack.slice(0, 9);
const rowB = stack.slice(9);

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    let delay = deleting ? 45 : 90;

    if (!deleting && text === current) {
      delay = 1600; // pausa al completar
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      delay = 300;
    }

    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

function TechChip({ tech }: { tech: (typeof stack)[number] }) {
  const Icon = tech.icon;
  return (
    <div
      className="group flex shrink-0 items-center gap-3 rounded-2xl border border-white/8 bg-surface px-5 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
      style={{ boxShadow: "0 0 0 0 transparent" }}
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-xl border border-white/8 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${tech.color}1a`, color: tech.color }}
      >
        <Icon size={18} />
      </span>
      <span className="font-display text-[15px] font-semibold whitespace-nowrap">{tech.name}</span>
    </div>
  );
}

export function Inicio() {
  const typed = useTypewriter(roles);

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-[#f2f0f7]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(155,127,232,0.22),transparent_60%),radial-gradient(ellipse_50%_40%_at_80%_0%,rgba(236,106,149,0.16),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ── Hero ── */}
        <section className="grid items-start gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <h1
              className="animate-fade-up mt-6 font-display text-[clamp(2.6rem,5.5vw,4.2rem)] font-semibold leading-[1.05] tracking-tight"
              style={{ animationDelay: "0.08s" }}
            >
              Hola, soy{" "}
              {/* Cambiado el gradiente del título principal a Rosa -> Morado -> Rosa */}
              <span className="bg-gradient-to-r from-[#ea698b] via-pink-500 to-purple-800 bg-clip-text text-transparent font-extrabold">
                Evelinn Jiménez Bautista
              </span>
            </h1>

            {/* Texto rotativo */}
            <p
              className="animate-fade-up mt-5 flex items-center font-display text-xl font-semibold text-[#d6d4e0] sm:text-2xl"
              style={{ animationDelay: "0.16s" }}
              aria-live="polite"
            >
              <span className="mr-2 text-muted">Soy</span>
              {/* Cambiado el gradiente del texto rotativo a Rosa -> Morado */}
              <span className="bg-gradient-to-r from-[#ea698b] to-purple-500 bg-clip-text text-transparent font-extrabold">
                {typed}
              </span>
              <span className="caret h-6 sm:h-7" />
            </p>

            <p
              className="animate-fade-up mt-5 max-w-xl leading-relaxed text-muted"
              style={{ animationDelay: "0.24s" }}
            >
              Apasionada por la administración de sistemas, redes e infraestructura informática, con
              base en desarrollo de software y scripting. Buscando oportunidades y prácticas para
              seguir creciendo en el sector tecnológico.
            </p>

            <div
              className="animate-fade-up mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: "0.32s" }}
            >
              <a
                href="/Proyectos"
                // Botón principal adaptado al nuevo esquema de color
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-800 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-transform hover:scale-[1.03]"
              >
                <FolderKanban size={16} /> Ver Mis Proyectos
              </a>
              <a
                href="/Contacto"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                <Mail size={16} /> Contactar Conmigo
              </a>
            </div>
          </div>

          {/* Foto grande */}
          <div className="animate-fade-up relative mx-auto w-full max-w-md" style={{ animationDelay: "0.2s" }}>
            {/* Halo detrás de la foto */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_30%,rgba(236,106,149,0.35),rgba(155,127,232,0.15),transparent_70%)] blur-2xl" />

            <div className="animate-float overflow-hidden rounded-[2rem] border border-white/12 bg-surface shadow-2xl shadow-black/50">
              <img
                src={heroPhoto}
                alt="Evelinn Jiménez Bautista"
                className="aspect-[2/2] w-full object-cover"
              />
              {/* Degradado inferior + etiqueta */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-200 rounded-b-[2rem] bg-gradient-to-t from-black/90 to-purple-900/50" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 font-display font-bold text-xs">
                <span className="text-white/80">Huércal-Overa, ES</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Áreas Principales ── */}
        <section className="border-t border-white/6 py-20">
          <div className="grid gap-5 md:grid-row-2 md:items-center items-center text-center">
              <p className="font-display text-sm font-bold uppercase tracking-[0.4em] text-[#ea698b]">Competencias Clave</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Áreas Principales</h2>
          </div>

          <div className="mt-20 grid gap-5 lg:grid-cols-3">
            {areas.map(({ icon: Icon, title, desc, tags }) => (
              <article
                key={title}
                // Añadido hover en borde rosa y un sutil resplandor en la tarjeta
                className="group rounded-2xl border border-white/8 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ea698b]/50 hover:shadow-[0_8px_30px_-6px_rgba(234,105,139,0.15)]"
              >
                {/* Añadido cambio de color de fondo y borde del contenedor del icono al hacer hover */}
                <div className="grid h-16 place-items-center rounded-xl border border-white/6 bg-white/[0.03] transition-colors duration-300 group-hover:border-[#ea698b]/50 group-hover:bg-[#ea698b]/10">
                  {/* El icono empieza gris claro y se vuelve rosa al hacer hover */}
                  <Icon size={22} className="text-gray-400 transition-all duration-300 group-hover:scale-110 group-hover:text-[#ea698b]" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-[#c9b8f5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Stack Tecnológico (carruseles animados) ── */}
        <section className="border-t border-white/6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm font-bold uppercase tracking-[0.4em] text-[#ea698b]">Tecnologías</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Programas &amp; Herramientas</h2>
          </div>

          <div className="relative mt-12 flex flex-col gap-4">
            <div className="marquee py-1">
              <div className="marquee-track">
                {[...rowA, ...rowA].map((tech, i) => (
                  <TechChip key={`a-${i}`} tech={tech} />
                ))}
              </div>
            </div>

            <div className="marquee py-1">
              <div className="marquee-track reverse">
                {[...rowB, ...rowB, ...rowB].map((tech, i) => (
                  <TechChip key={`b-${i}`} tech={tech} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}