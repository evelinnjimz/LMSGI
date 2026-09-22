import { useEffect, useRef, useState } from "react";
// Importamos los iconos de marcas y los genéricos de react-icons
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa6";
import { LuMail, LuLock } from "react-icons/lu";

import imgLogo from "../../assets/logo/LogoEv.png";

/* ── Constants ──────────────────────────────────────────────── */
const JK = "'Plus Jakarta Sans', sans-serif";

const NAV = [
  { label: "Proyectos", href: "/proyectos" },
  { label: "Cursos", href: "/cursos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
];

// Asignamos el componente de react-icons correspondiente a cada red social
const SOCIALS = [
  { label: "Email", icon: LuMail, href: "mailto:evelinnjimz@gmail.com" },
  { label: "GitHub", icon: FaGithub, href: "https://github.com/evelinn" },
  { label: "LinkedIn", icon: FaLinkedin, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "https://instagram.com/evelxn" },
  { label: "Facebook", icon: FaFacebook, href: "#" },
];

/* ── Component ──────────────────────────────────────────────── */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const obs = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) { 
          setVisible(true); 
          obs.disconnect(); 
        } 
      },
      { threshold: 0.05 }
    );
    
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const revealBase = "transition-all duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)]";
  const revealOff = "opacity-0 translate-y-[22px]";
  const revealOn = "opacity-100 translate-y-0";

  return (
    <footer
      ref={ref}
      className="relative z-10 w-full bg-[rgba(15,12,22)] border-t border-[#ea698b]/5 m-0 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* ── Grid Responsive (1 col móvil / 3 cols desktop) ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-16 py-8 sm:py-12 md:items-center">

          {/* Brand */}
          <div className={`flex flex-col items-center md:items-start text-center md:text-left gap-5 ${revealBase} ${visible ? revealOn : revealOff}`} style={{ transitionDelay: ".05s" }}>
            <div className="flex flex-col sm:flex-row items-center gap-3 group cursor-pointer">
              <div className="w-[70px] h-[70px] rounded-xl overflow-hidden shrink-0">
                <img src={imgLogo} alt="Logo de Evelinn" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <p className="font-display font-extrabold text-[38px] sm:text-[32px] tracking-[-0.5px] leading-[1.2]">
                  <span className="text-white group-hover:text-purple-200 transition-colors duration-200">Evelinn </span>
                  <span className="text-[#ea698b]">JB</span>
                </p>
              </div>
            </div>
          </div>

          {/* Nav — Grid 2 columnas en móvil / Fila horizontal en desktop */}
          <div className={`flex flex-col items-center w-full ${revealBase} ${visible ? revealOn : revealOff}`} style={{ transitionDelay: ".13s" }}>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {NAV.map((item, i) => (
                <button
                  key={item.label}
                  className="group px-8 sm:px-8 py-3 sm:py-3.5 bg-[#08050e]/80 border border-purple-900/30 rounded-xl text-left 
                             transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]
                             hover:-translate-y-1 hover:scale-105 hover:bg-[#ea698b]/10 hover:border-[#ea698b]/45 
                             hover:shadow-[0_14px_36px_-6px_rgba(234,105,139,.22)] active:scale-95"
                  style={{ transitionDelay: `${visible ? .18 + i * .07 : 0}s` }}
                >
                  <span style={{ fontFamily: JK }} className="block font-semibold text-[13px] sm:text-[16px] transition-colors duration-200 text-[#c4cdd9] group-hover:text-white whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Socials + badge */}
          <div className={`flex flex-col items-center md:items-end gap-4 ${revealBase} ${visible ? revealOn : revealOff}`} style={{ transitionDelay: ".22s" }}>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {SOCIALS.map((s, i) => {
                const IconComponent = s.icon;
                const isExternal = s.href.startsWith("http");
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="group w-[45px] h-[45px] sm:w-[46px] sm:h-[46px] flex items-center justify-center bg-[#08050e]/80 border border-purple-900/30 rounded-xl
                               transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]
                               hover:-translate-y-1 hover:scale-110 hover:bg-purple-600/20 hover:border-purple-600/50
                               hover:shadow-[0_12px_30px_-4px_rgba(147,51,234,.4)] active:scale-90"
                    style={{ transitionDelay: `${visible ? .28 + i * .06 : 0}s` }}
                  >
                    <IconComponent size={18} className="text-gray-500/70 transition-colors duration-200 group-hover:text-purple-300" />
                  </a>
                );
              })}
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-pink-500/10 border border-pink-500/20 animate-badge-glow max-w-full">
              <span className="inline-block w-2 h-2 rounded-full bg-pink-500 shrink-0 animate-pink-pulse" />
              <span className="font-display font-bold text-[12.5px] sm:text-[12px] text-pink-300 tracking-[.04em] whitespace-nowrap overflow-hidden text-ellipsis">
                DISPONIBLE PRÁCTICAS / EMPLEO
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className={`h-[1px] origin-center transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] delay-500
                      ${visible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`} 
          style={{ background: "linear-gradient(90deg,transparent,rgba(147,51,234,.3) 25%,rgba(234,105,139,.25) 40%,transparent)" }} 
        />

        {/* Bottom bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-center sm:text-left ${revealBase} ${visible ? revealOn : revealOff}`}
             style={{ transitionDelay: ".52s" }}>
          <p className="font-normal text-[15px] sm:text-s text-gray-500/65 tracking-[.02em]">
            © 2026{" "}
            <span className="text-purple-400/75 font-semibold">Evelinn Jiménez Bautista</span>
            {" "}· Todos los derechos reservados.
          </p>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="px-3 py-1.5 rounded-full bg-purple-900/10 border border-purple-900/30">
              <span className="font-display font-bold text-[12.5px] sm:text-[12px] text-purple-400/80 tracking-[.06em]">
                1° ASIR · LENGUAJE DE MARCAS
              </span>
            </div>

            <button
              type="button"
              onClick={() => { window.location.href = "/login"; }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-900/10 border border-purple-900/20"
            >
              <LuLock size={12} className="text-purple-400/70" />
              <span className="font-display font-bold text-[12.5px] sm:text-[12px] text-purple-400/80 tracking-[.06em]">ADMIN</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}