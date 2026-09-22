import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Wrench, Briefcase, BookOpen,
  Plus, Mail
} from "lucide-react";

const NAV = [
  { label: "Servicios", to: "/admin/servicios", icon: Wrench },
  { label: "Proyectos", to: "/admin/proyectos", icon: Briefcase }, // ← Modificado aquí
  { label: "Cursos",    to: "/admin/cursos",    icon: BookOpen },
  { label: "Contacto", to: "/admin/sociales", icon: Mail },
];

export const SidebarAdmin = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  return (
    <aside className="asb">
      {/* Logo */}
      <div className="asb__logo">
        <div className="asb__logo-icon"><LayoutDashboard size={13}/></div>
        <span className="asb__logo-text">Panel</span>
      </div>

      {/* Quick Create */}
      <button className="asb__quick" onClick={() => nav("/admin")}>
        <Plus size={13}/><span>Creación rápida</span>
        <Mail size={13} className="asb__mail"/>
      </button>

      {/* Nav principal */}
      <nav className="asb__nav">
        {NAV.map(({ label, to, icon: Icon }) => (
          <Link 
            key={to} 
            to={to}
            className={`asb__link ${pathname === to ? "asb__link--active" : ""}`}
          >
            <Icon size={14}/><span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}