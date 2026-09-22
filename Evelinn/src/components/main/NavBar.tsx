import { useState } from "react";
import { Link, NavLink } from "react-router";
import { User, Menu, X } from "lucide-react";

// ─── CONFIGURACIÓN DE RUTAS ──────────────────────────────────────────────────
const NAV_LINKS = [
  { name: "Inicio",    href: "/" },
  { name: "Sobre mí", href: "/sobre-mi" },
  { name: "Proyectos", href: "/proyectos" },
  { name: "Cursos",   href: "/cursos" },
];

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#1a1a2e] sticky top-0 z-[9999] shadow-lg font-[Nunito,sans-serif]">
      <div className="mx-auto w-full max-w-[1400px] px-8 py-4 flex items-center justify-between relative">

        {/* 1. LOGO / NOMBRE */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="italic text-[#e8a0bf] text-xl font-bold tracking-wide transition-transform duration-200 hover:scale-105 no-underline"
        >
          Evelinn
        </Link>

        {/* 2. MENÚ ESCRITORIO */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, name }) => (
            <NavLink
              key={href}
              to={href}
              end={href === "/"}
              className={({ isActive }) =>
                `text-[0.95rem] pb-1 transition-colors duration-200 no-underline border-b-2 whitespace-nowrap
                ${isActive
                  ? "font-bold text-[#e8a0bf] border-[#e8a0bf]"
                  : "font-medium text-[#c4bcd8] border-transparent hover:text-[#e8a0bf]"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* 3. ICONO CONTACTO ESCRITORIO */}
        <NavLink
          to="/contacto"
          title="Contacto & Redes"
          className={({ isActive }) =>
            `hidden md:flex items-center justify-center p-1 transition-all duration-200 hover:scale-110 hover:rotate-6
            ${isActive ? "text-[#e8a0bf] drop-shadow-[0_0_6px_#e8a0bf]" : "text-[#c4bcd8]"}`
          }
        >
          <User size={22} strokeWidth={1.8} />
        </NavLink>

        {/* 4. BOTÓN HAMBURGUESA MÓVIL */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex md:hidden text-[#c4bcd8] hover:text-[#e8a0bf] transition-colors focus:outline-none"
          aria-label="Menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* 5. MENÚ DESPLEGABLE MÓVIL */}
        {menuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-[#1e1e35] shadow-xl flex flex-col px-8 py-4 gap-1 border-t border-[#e8a0bf]/5">
            {NAV_LINKS.map(({ href, name }) => (
              <NavLink
                key={href}
                to={href}
                end={href === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-left text-base py-2.5 border-b border-[#e8a0bf]/10 transition-colors no-underline
                  ${isActive ? "text-[#e8a0bf] font-bold" : "text-[#c4bcd8] font-normal"}`
                }
              >
                {name}
              </NavLink>
            ))}

            {/* Enlace de Contacto dentro del menú móvil */}
            <NavLink
              to="/contacto"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-left text-base py-2.5 flex items-center gap-2 transition-colors no-underline
                ${isActive ? "text-[#e8a0bf] font-bold" : "text-[#c4bcd8] font-normal"}`
              }
            >
              <User size={18} strokeWidth={1.8} />
              Contacto
            </NavLink>
          </nav>
        )}

      </div>
    </header>
  );
};
