import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import imgLogo from "../../assets/logo/LogoEv.png";
import imgAvatar from "../../assets/Profile/ProfileEv.png";

const NAV = [
  { name: "Inicio", href: "/" },
  { name: "Sobre Mí", href: "/sobremi" },
  { name: "Proyectos", href: "/proyectos" },
  { name: "Cursos", href: "/cursos" },
  { name: "Servicios", href: "/servicios" },
  { name: "Contacto", href: "/contacto" }
];

const JK = "'Plus Jakarta Sans', sans-serif";

export const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const activeItem = NAV.find((link) => link.href === currentPath)?.name || "Inicio";

  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const pillTarget = hovered ?? activeItem;

  const navRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    const updatePillPosition = () => {
      const idx = NAV.findIndex(item => item.name === pillTarget);
      const btn = btnRefs.current[idx];
      const nav = navRef.current;
      
      if (!btn || !nav || idx === -1) return;
      
      const nb = nav.getBoundingClientRect();
      const bb = btn.getBoundingClientRect();
      setPill({ left: bb.left - nb.left, width: bb.width });
    };

    updatePillPosition();
    window.addEventListener("resize", updatePillPosition);
    return () => window.removeEventListener("resize", updatePillPosition);
  }, [pillTarget, currentPath]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-[20px] ${
        scrolled 
          ? "bg-[rgba(13,8,22,0.95)] border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.7)]" 
          : "bg-[rgba(14,9,20,0.99)] border-b border-transparent"
      }`}
    >
      <div className="max-w-[1460px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-8 lg:px-12 py-3">

        {/* ── Brand ── */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-[52px] h-[52px] rounded-xl overflow-hidden shrink-0">
            <img src={imgLogo} alt="Logo de Evelinn" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-white text-[20px] tracking-tight whitespace-nowrap group-hover:text-purple-200 transition-colors duration-200"
               style={{ fontFamily: JK, fontWeight: 700 }}>
              Evelinn J. Bautista
            </p>
            <p className="text-[rgba(216,180,254,0.6)] text-[11px] tracking-widest mt-0.5 whitespace-nowrap"
               style={{ fontFamily: JK }}>
              ASIR · Informática & Redes
            </p>
          </div>
        </Link>

        {/* ── Desktop nav (Nueva estructura técnica cápsula) ── */}
        <nav
          ref={navRef}
          className="hidden lg:flex items-center relative gap-1 p-1 rounded-full bg-[#080410]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)]"
          onMouseLeave={() => setHovered(null)}
        >
          {pill && (
            <span 
              className="absolute top-1 h-[calc(100%-8px)] bg-gradient-to-r from-[#ea698b]/20 to-[#973aa8]/25 border border-[#ea698b]/40 rounded-full transition-all duration-300 ease-out pointer-events-none shadow-[0_0_12px_rgba(234,105,139,0.2)]" 
              style={{ left: pill.left, width: pill.width }} 
            />
          )}

          {NAV.map((link, i) => {
            const isActive = activeItem === link.name;
            const isTarget = pillTarget === link.name;
            
            return (
              <Link
                key={link.name}
                to={link.href}
                ref={el => { btnRefs.current[i] = el; }}
                onMouseEnter={() => setHovered(link.name)}
                className={`relative z-10 px-4 py-1.5 rounded-full text-[13px] tracking-wide whitespace-nowrap transition-colors duration-200 inline-block ${
                  isActive ? "font-semibold text-white" : "font-medium"
                } ${isTarget ? "text-[#ea698b]" : "text-[#8a93a3] hover:text-white"}`}
                style={{ fontFamily: JK }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* ── Tablet nav (md–lg) ── */}
        <nav className="hidden md:flex lg:hidden items-center gap-1 overflow-x-auto p-1 rounded-full bg-[#080410]/60 border border-white/[0.06]">
          {NAV.map((link) => {
            const isActive = activeItem === link.name;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-all duration-200 shrink-0 inline-block ${
                  isActive 
                    ? "font-semibold text-white bg-[rgba(234,105,139,0.2)] border border-[rgba(234,105,139,0.4)]" 
                    : "font-medium text-[#8a93a3] hover:text-white"
                }`}
                style={{ fontFamily: JK }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* ── Right actions ── */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(249,168,212,0.08)] border border-[rgba(249,168,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#f9a8d4] animate-pulse" />
            <span className="text-[#f9a8d4] text-[10.5px] tracking-wider whitespace-nowrap font-bold font-display" >
              DISPONIBLE PRÁCTICAS / EMPLEO
            </span>
          </div>

          <button className="px-5 py-2 rounded-xl text-white text-[13px] font-semibold bg-gradient-to-r from-[#ea698b] to-[#973aa8] hover:shadow-[0_0_20px_rgba(234,105,139,0.3)] hover:opacity-95 transition-all duration-200"
                  style={{ fontFamily: JK }}>
            Descargar CV
          </button>

          <div className="w-[48px] h-[48px] rounded-full overflow-hidden shrink-0 cursor-pointer border border-purple-500/30 bg-[#130a21] hover:border-purple-400 transition-colors">
            <img 
              src={imgAvatar} 
              alt="Evelinn" 
              className="w-full h-full object-cover rounded-full" 
            />
          </div>
        </div>

        {/* ── Hamburger ── */}
        <button
          className={`md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl transition-colors duration-200 border ${
            open ? "bg-[rgba(147,51,234,0.1)] border-[rgba(88,28,135,0.3)]" : "bg-transparent border-[rgba(88,28,135,0.3)]"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-300 ${open ? "bg-[#ea698b] translate-y-[6.5px] rotate-45" : "bg-[#c0ccd8]"}`} />
          <span className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-300 ${open ? "opacity-0" : "bg-[#c0ccd8]"}`} />
          <span className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-300 ${open ? "bg-[#ea698b] -translate-y-[6.5px] -rotate-45" : "bg-[#c0ccd8]"}`} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[480px] opacity-100 border-t border-white/[0.08]" : "max-h-0 opacity-0 border-none"
        }`}
      >
        <div className="px-4 pt-3 pb-5 space-y-3 bg-[#0a0610]">
          <div className="grid grid-cols-3 gap-1.5">
            {NAV.map((link) => {
              const isActive = activeItem === link.name;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`block text-center px-3 py-3 rounded-xl text-[13px] transition-all duration-200 ${
                    isActive
                      ? "font-semibold text-[#ea698b] bg-[rgba(234,105,139,0.1)] border border-[rgba(234,105,139,0.28)]"
                      : "font-medium text-[#8a93a3] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]"
                  }`}
                  style={{ fontFamily: JK }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button className="px-4 py-2 rounded-xl text-white text-[13px] font-semibold shrink-0 bg-gradient-to-r from-[#ea698b] to-[#973aa8]"
                    style={{ fontFamily: JK }}>
              Descargar CV
            </button>
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0 border border-purple-500/30 bg-[#130a21]">
              <img 
                src={imgAvatar} 
                alt="Evelinn" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};