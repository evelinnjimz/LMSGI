import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { 
  BookOpen, 
  Layers, 
  Briefcase, 
  LogOut, 
  ShieldCheck, 
  LayoutDashboard, 
  Sparkles, 
  GraduationCap 
} from "lucide-react";

export function BackLayout() {
  const [loading, setLoading] = useState(true);
  const [sessionActive, setSessionActive] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const activeSessionCheck = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth/login");
      } else {
        setSessionActive(true);
        setUserEmail(session.user?.email || "Admin");
      }
      if (loading) setLoading(false);
    };
    activeSessionCheck();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen w-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>Cargando panel de administración...</span>
        </div>
      </div>
    );
  }

  if (!sessionActive) return null;

  const isLinkActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path || location.pathname === `${path}/`;
    }
    return location.pathname.includes(path);
  };

  const getLinkClasses = (active: boolean) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm"
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
    }`;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* BARRA LATERAL (ASIDE) */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between p-4 shrink-0 z-20">
        <div className="flex flex-col gap-6">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800/80">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <ShieldCheck size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-white tracking-wide">Evelinn Panel</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Dashboard Admin</span>
            </div>
          </div>

          {/* Navegación Principal */}
          <nav className="flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider px-3 mb-1">
              Gestión de contenido
            </p>

            <Link 
              to="/admin" 
              className={getLinkClasses(isLinkActive('/admin', true))}
            >
              <LayoutDashboard size={18} />
              <span>Inicio</span>
            </Link>

            <Link 
              to="/admin/cursos" 
              className={getLinkClasses(isLinkActive('/cursos'))}
            >
              <BookOpen size={18} />
              <span>Cursos</span>
            </Link>
            
            <Link 
              to="/admin/servicios" 
              className={getLinkClasses(isLinkActive('/servicios'))}
            >
              <Layers size={18} />
              <span>Servicios</span>
            </Link>
            
            <Link 
              to="/admin/proyectos" 
              className={getLinkClasses(isLinkActive('/proyectos') || isLinkActive('/trabajos'))}
            >
              <Briefcase size={18} />
              <span>Proyectos</span>
            </Link>

            <Link 
              to="/admin/habilidades" 
              className={getLinkClasses(isLinkActive('/habilidades'))}
            >
              <Sparkles size={18} />
              <span>Habilidades</span>
            </Link>

            <Link 
              to="/admin/estudios" 
              className={getLinkClasses(isLinkActive('/estudios'))}
            >
              <GraduationCap size={18} />
              <span>Estudios</span>
            </Link>
          </nav>
        </div>

        {/* PERFIL & LOGOUT */}
        <div className="border-t border-slate-800/80 pt-4 space-y-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md border border-indigo-400/20 shrink-0">
              {userEmail.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-semibold text-white truncate">Administrador</span>
              <span className="text-[11px] text-slate-400 truncate" title={userEmail}>
                {userEmail}
              </span>
            </div>
          </div>

          <button 
            onClick={() => supabase.auth.signOut().then(() => navigate('/'))} 
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent transition-all cursor-pointer"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL DE CONTENIDO */}
      <main className="flex-1 overflow-y-auto bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/60 via-slate-950 to-slate-950 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
}