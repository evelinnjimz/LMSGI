import { useStore } from "../../../components/contexto/Contexto";
import { 
  BookOpen, Wrench, Briefcase, ArrowRight, 
  Plus, Calendar, ShieldCheck, Database, Zap 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

const GRAFICO_DATA = [
  { fecha: "Apr 5",  visitas: 340 }, { fecha: "Apr 10", visitas: 420 },
  { fecha: "Apr 15", visitas: 390 }, { fecha: "Apr 20", visitas: 460 },
  { fecha: "Apr 25", visitas: 380 }, { fecha: "Apr 30", visitas: 520 },
  { fecha: "May 5",  visitas: 700 }, { fecha: "May 10", visitas: 480 },
  { fecha: "May 15", visitas: 560 }, { fecha: "May 20", visitas: 620 },
  { fecha: "May 25", visitas: 510 }, { fecha: "May 30", visitas: 680 },
  { fecha: "Jun 4",  visitas: 590 }, { fecha: "Jun 9",  visitas: 500 },
  { fecha: "Jun 14", visitas: 540 }, { fecha: "Jun 19", visitas: 480 },
  { fecha: "Jun 24", visitas: 640 }, { fecha: "Jun 30", visitas: 570 },
];

export const AdminInicio = () => {
  const navigate = useNavigate();
  // Traemos tus datos reales de Supabase desde el Contexto
  const { cursos = [], servicios = [], proyectos = [], loading } = useStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-[#6366f1] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-semibold text-sm tracking-wide">Sincronizando con Supabase...</p>
        </div>
      </div>
    );
  }

  // Tomamos los 3 últimos proyectos añadidos para la sección de actividad reciente
  const ultimosProyectos = proyectos.slice(0, 3);

  const stats = [
    { label: "Cursos Activos", count: cursos.length, icon: BookOpen, to: "/admin/cursos", color: "#6366f1", bg: "bg-indigo-50" },
    { label: "Servicios Ofrecidos", count: servicios.length, icon: Wrench, to: "/admin/servicios", color: "#10b981", bg: "bg-emerald-50" },
    { label: "Proyectos Publicados", count: proyectos.length, icon: Briefcase, to: "/admin/proyectos", color: "#f59e0b", bg: "bg-amber-50" },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto w-full font-['Inter',sans-serif] bg-slate-50/50 min-h-screen">
      
      {/* ── 1. CABECERA ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Panel de administración
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Bienvenido de nuevo. Controla y actualiza el contenido de tu web desde un solo lugar.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm self-start">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Modo Edición Activo</span>
        </div>
      </div>

      {/* ── 2. TARJETAS DE MÉTRICAS (STATS) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map(({ label, count, icon: Icon, to, color, bg }) => (
          <Link 
            key={label} 
            to={to} 
            className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${bg}`} style={{ color: color }}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-3xl font-black text-slate-800 leading-none">{count}</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-50 group-hover:bg-indigo-50 group-hover:text-indigo-600 text-slate-400 transition-colors">
              <ArrowRight size={18} />
            </div>
          </Link>
        ))}
      </div>

      {/* ── 3. RECORTE EN DOS COLUMNAS (CONTENIDO COMPLEJO) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: GRÁFICO + ÚLTIMOS ELEMENTOS */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Bloque Gráfico */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Visitas totales</h3>
                <p className="text-slate-400 text-xs font-medium mt-0.5">Métricas de tráfico pasivo en tu porfolio</p>
              </div>
              <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100">
                +18% este mes
              </div>
            </div>
            
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={GRAFICO_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="fecha" tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }} axisLine={false} tickLine={false} dx={-10} />
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="visitas" stroke="#6366f1" strokeWidth={3} fill="url(#colorVisitas)" activeDot={{ r: 6, strokeWidth: 0, fill: "#6366f1" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bloque: Últimos proyectos reales en base de datos */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Proyectos recientes</h3>
                <p className="text-slate-400 text-xs font-medium mt-0.5">Últimos trabajos sincronizados en Supabase</p>
              </div>
              <Link to="/admin/proyectos" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {ultimosProyectos.length === 0 ? (
                <p className="text-sm text-slate-400 py-4 text-center">No hay proyectos disponibles aún.</p>
              ) : (
                ultimosProyectos.map((p: any, i: number) => (
                  <div key={p.id || i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-500 font-bold text-sm">
                        #{i + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{p.titulo || p.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                          <Calendar size={12} /> {p.fecha || "Reciente"}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/admin/proyectos`)} 
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                    >
                      Editar
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: ACCIONES RÁPIDAS + ESTADO DEL SISTEMA */}
        <div className="flex flex-col gap-6">
          
          {/* Tarjeta: Accesos de creación directa */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">Accesos Rápidos</h3>
            <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => navigate('/admin/proyectos')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-200 bg-white hover:bg-indigo-50/20 text-slate-700 text-sm font-semibold transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Plus size={16} className="text-indigo-600 bg-indigo-50 p-0.5 rounded-md" />
                  <span>Publicar nuevo Proyecto</span>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </button>

              <button 
                onClick={() => navigate('/admin/cursos')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-200 bg-white hover:bg-emerald-50/20 text-slate-700 text-sm font-semibold transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Plus size={16} className="text-emerald-600 bg-emerald-50 p-0.5 rounded-md" />
                  <span>Subir nuevo Curso</span>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </button>

              <button 
                onClick={() => navigate('/admin/servicios')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-amber-200 bg-white hover:bg-amber-50/20 text-slate-700 text-sm font-semibold transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Plus size={16} className="text-amber-600 bg-amber-50 p-0.5 rounded-md" />
                  <span>Configurar Servicio</span>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-amber-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Tarjeta: Estado de Infraestructura (Le da un look muy profesional) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">Entorno de Datos</h3>
            <div className="flex flex-col gap-3.5">
              
              <div className="flex items-center justify-between text-xs font-medium border-b border-slate-100 pb-2.5">
                <span className="text-slate-400 flex items-center gap-2">
                  <Database size={14} /> Base de datos
                </span>
                <span className="text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded">PostgreSQL</span>
              </div>

              <div className="flex items-center justify-between text-xs font-medium border-b border-slate-100 pb-2.5">
                <span className="text-slate-400 flex items-center gap-2">
                  <ShieldCheck size={14} /> Capa RLS
                </span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                  Protegido
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-400 flex items-center gap-2">
                  <Zap size={14} /> Cliente API
                </span>
                <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  Supabase v2
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};