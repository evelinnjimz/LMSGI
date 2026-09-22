// src/layouts/BackLayout.tsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { BookOpen, Layers, Briefcase, LogOut, ShieldCheck, LayoutDashboard } from "lucide-react"; // Añadido LayoutDashboard

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
      loading && setLoading(false);
    };
    activeSessionCheck();
  }, [navigate]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontFamily: 'sans-serif' }}>Cargando panel...</div>;
  if (!sessionActive) return null;

  return (
    <div className="adm-layout" style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', width: '100vw' }}>
      
      {/* BARRA LATERAL (MENU ASIDE) */}
      <aside className="asb" style={{ display: 'flex', flexDirection: 'column', width: '260px', backgroundColor: '#0f172a', color: 'white', padding: '1.5rem 1rem', boxSizing: 'border-box' }}>
        <div style={{ flex: 1 }}>
          <div className="asb__logo" style={{ marginBottom: '1.5rem' }}>
            <span className="asb__logo-icon">
              <ShieldCheck size={18} style={{ color: '#818cf8' }} />
            </span>
            <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Evelinn Panel</span>
          </div>

          <p className="asb__section-label">Gestión de contenido</p>
          
          <nav className="asb__nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* ENLACE DE INICIO: Se activa solo cuando el path es exactamente "/admin" o "/admin/" */}
            <Link 
              to="/admin" 
              className={`asb__link ${location.pathname === '/admin' || location.pathname === '/admin/' ? 'asb__link--active' : ''}`}
            >
              <LayoutDashboard size={16} /> <span style={{ color: 'inherit' }}>Inicio</span>
            </Link>

            <Link 
              to="/admin/cursos" 
              className={`asb__link ${location.pathname.includes('/cursos') ? 'asb__link--active' : ''}`}
            >
              <BookOpen size={16} /> <span style={{ color: 'inherit' }}>Cursos</span>
            </Link>
            
            <Link 
              to="/admin/servicios" 
              className={`asb__link ${location.pathname.includes('/servicios') ? 'asb__link--active' : ''}`}
            >
              <Layers size={16} /> <span style={{ color: 'inherit' }}>Servicios</span>
            </Link>
            
            <Link 
              to="/admin/proyectos" 
              className={`asb__link ${location.pathname.includes('/trabajos') || location.pathname.includes('/proyectos') ? 'asb__link--active' : ''}`}
            >
              <Briefcase size={16} /> <span style={{ color: 'inherit' }}>Proyectos</span>
            </Link>
          </nav>
        </div>

        {/* PARTE INFERIOR DEL USER */}
        <div className="asb__bottom">
          <div className="asb__user">
            <div className="asb__avatar">
              {userEmail.substring(0, 2).toUpperCase()}
            </div>
            <div className="asb__user-info" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600, color: 'white' }}>Administrador</span>
              <span style={{ color: '#94a3b8', fontSize: '0.75rem', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userEmail}</span>
            </div>
          </div>

          <button 
            onClick={() => supabase.auth.signOut().then(() => navigate('/'))} 
            className="asb__link" 
            style={{ marginTop: '1rem', color: '#f87171', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%' }}
          >
            <LogOut size={16} /> <span style={{ color: 'inherit' }}>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* PANEL DERECHO DE CONTENIDO */}
      <main className="adm-main" style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
        <Outlet />
      </main>

    </div>
  );
}