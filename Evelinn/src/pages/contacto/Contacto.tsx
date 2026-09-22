import { useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import { AtSign, Clock, MapPin, ShieldCheck, Boxes, Send, Copy, Check, Phone } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { ContactForm } from "./ContactoForm";

const EMAIL = "evelinnjimz@gmail.com";
const PHONE = "+34 631 07 94 69";
const WHATSAPP = "https://wa.me/34631079469";

type IconType = ComponentType<{ size?: number; className?: string }>;

const PROFILES: { icon: IconType; label: string; handle: string; href: string }[] = [
  { icon: FaGithub, label: "GitHub", handle: "@evelinnjimz", href: "https://github.com/evelinnjimz" },
  { icon: FaLinkedin, label: "LinkedIn", handle: "in/evelinn", href: "#" },
  { icon: FaXTwitter, label: "Twitter/X", handle: "@shyrenn", href: "#" },
  { icon: FaInstagram, label: "Instagram", handle: "@evelx_nn", href: "#" },
];

const BADGES: { icon: IconType; title: string; body: string }[] = [
  { icon: Boxes, title: "Modalidad FCT", body: "Convenio de centro para incorporación como Técnica en Sistemas." },
  { icon: ShieldCheck, title: "Compromiso", body: "Proactiva, resolutiva y con documentación rigurosa." },
];

const CARD = "animate-rise rounded-3xl border border-hairline bg-surface/80 p-6 sm:p-7";
const at = (i: number): CSSProperties => ({ ["--i" as string]: i });

function ContactCard() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className={CARD} style={at(1)}>
      <div className="mb-4 flex items-center gap-2 text-pink">
        <AtSign size={16} />
        <span className="font-display text-xs font-semibold uppercase tracking-[0.18em]">Contacto directo</span>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={copyEmail}
          className="group flex items-center gap-3 rounded-2xl border border-hairline bg-ink/50 p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-pink/30"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-pink/10 text-pink transition-transform duration-200 group-hover:scale-110">
            {copied ? <Check size={16} className="text-emerald-400" /> : <AtSign size={16} />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-sm text-fg">{EMAIL}</span>
            <span className="block text-xs text-dim">{copied ? "¡Copiado!" : "Toca para copiar"}</span>
          </span>
          <Copy size={15} className="shrink-0 text-dim transition-colors group-hover:text-pink" />
        </button>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 rounded-2xl border border-hairline bg-ink/50 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400 transition-transform duration-200 group-hover:scale-110">
            <Phone size={16} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-sm text-fg">{PHONE}</span>
            <span className="block text-xs text-dim">Escríbeme por WhatsApp</span>
          </span>
          <Send size={15} className="shrink-0 text-dim transition-all group-hover:translate-x-0.5 group-hover:text-emerald-400" />
        </a>
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm text-muted">
        <Clock size={15} className="text-pink" />
        Respondo en menos de 24 h.
      </p>
    </section>
  );
}

export function Contacto() {
  return (
    <main className="min-h-screen bg-ink px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="animate-rise mb-12 max-w-2xl" style={at(0)}>
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-pink">
            <span className="size-2 animate-pulse-dot rounded-full bg-pink" />
            Conectemos
          </span>
          <h1 className="mt-4 font-display text-6xl font-extrabold tracking-tight text-fg-strong">
            Hablemos<span className="text-pink">.</span>
          </h1>
          <p className="mt-4 text-lg text-muted">
            Disponible como <b className="font-semibold text-fg">Técnica Junior / Prácticas FCT</b> y para soporte de
            infraestructura.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Columna Izquierda: Info */}
          <div className="flex flex-col gap-6">
            <ContactCard />

            <section className={CARD} style={at(2)}>
              <div className="mb-3 flex items-center gap-2 text-violet">
                <MapPin size={16} />
                <h2 className="font-display text-lg font-bold text-fg-strong">Huercal-Overa, España</h2>
              </div>
              <p className="text-sm text-muted">Avda Guillermo Reyna, 5</p>
            </section>

            <section className={CARD} style={at(3)}>
              <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-pink">Perfiles</span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {PROFILES.map(({ icon: Icon, label, handle, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-hairline bg-ink/50 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-pink/30 hover:bg-pink/5"
                  >
                    <span className="text-fg/70 transition-colors duration-200 group-hover:text-pink shrink-0">
                      <Icon size={18} />
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-fg">{label}</span>
                      <span className="text-xs text-muted truncate">{handle}</span>
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Columna Derecha: Formulario + Badges */}
          <div className="flex flex-col gap-6">
            <ContactForm />

            <div className="grid gap-4 sm:grid-cols-2">
              {BADGES.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="animate-rise rounded-3xl border border-hairline bg-surface/60 p-6 transition-colors duration-200 hover:border-violet/25"
                  style={at(4)}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Icon size={18} className="text-violet" />
                    <h3 className="font-display text-base font-semibold text-fg-strong">{title}</h3>
                  </div>
                  <p className="text-sm text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}