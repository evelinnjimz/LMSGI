import { useStore } from "../../../components/contexto/Contexto";
import { 
  BookOpen, Wrench, Briefcase, ArrowRight, 
  Plus, Calendar
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
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-medium text-sm tracking-wide">Sincronizando con Supabase...</p>
        </div>
      </div>
    );
  }

  // Tomamos los 3 últimos proyectos añadidos para la sección de actividad reciente
  const ultimosProyectos = proyectos.slice(0, 3);

  const stats = [
    { 
      label: "Cursos Activos", 
      count: cursos.length, 
      icon: BookOpen, 
      to: "/admin/cursos", 
      color: "text-indigo-400", 
      bg: "bg-indigo-500/10 border border-indigo-500/20" 
    },
    { 
      label: "Servicios Ofrecidos", 
      count: servicios.length, 
      icon: Wrench, 
      to: "/admin/servicios", 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10 border border-emerald-500/20" 
    },
    { 
      label: "Proyectos Publicados", 
      count: proyectos.length, 
      icon: Briefcase, 
      to: "/admin/proyectos", 
      color: "text-amber-400", 
      bg: "bg-amber-500/10 border border-amber-500/20" 
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto w-full space-y-8 font-sans">
      
      {/* ── 1. CABECERA ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Panel de administración
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Bienvenido de nuevo. Controla y actualiza el contenido de tu web desde un solo lugar.
          </p>
        </div>
        <div className="flex items-center gap-2.5 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 shadow-sm self-start">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Modo Edición Activo
          </span>
        </div>
      </div>

      {/* ── 2. TARJETAS DE MÉTRICAS (STATS) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(({ label, count, icon: Icon, to, color, bg }) => (
          <Link 
            key={label} 
            to={to} 
            className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${bg} ${color}`}>
                <Icon size={24} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-3xl font-black text-white leading-none">{count}</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <ArrowRight size={18} />
            </div>
          </Link>
        ))}
      </div>

      {/* ── 3. SECCIÓN EN COLUMNAS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: GRÁFICO + ÚLTIMOS ELEMENTOS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Bloque Gráfico */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-white">Visitas totales</h3>
                <p className="text-slate-400 text-xs mt-0.5">Métricas de tráfico pasivo en tu portafolio</p>
              </div>
              <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold border border-indigo-500/20">
                +18% este mes
              </div>
            </div>
            
            <div className="h-[270px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={GRAFICO_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="fecha" tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }} axisLine={false} tickLine={false} dx={-10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#0f172a", 
                      borderColor: "#334155", 
                      borderRadius: "12px", 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)", 
                      color: "#f8fafc",
                      fontSize: "12px" 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visitas" 
                    stroke="#818cf8" 
                    strokeWidth={3} 
                    fill="url(#colorVisitas)" 
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#0f172a", fill: "#818cf8" }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bloque: Últimos proyectos reales en base de datos */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6">
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Proyectos recientes</h3>
                <p className="text-slate-400 text-xs mt-0.5">Últimos trabajos sincronizados en Supabase</p>
              </div>
              <Link to="/admin/proyectos" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-slate-800/80">
              {ultimosProyectos.length === 0 ? (
                <p className="text-sm text-slate-400 py-6 text-center">No hay proyectos disponibles aún.</p>
              ) : (
                ultimosProyectos.map((p: any, i: number) => (
                  <div key={p.id || i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-300 font-bold text-sm shrink-0">
                        #{i + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {p.titulo || p.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                          <Calendar size={12} className="text-slate-500" /> {p.fecha || "Reciente"}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/admin/proyectos`)} 
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
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
        <div className="space-y-6">
          
          {/* Tarjeta: Accesos de creación directa */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6">
            <h3 className="text-base font-bold text-white mb-4">Accesos Rápidos</h3>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => navigate('/admin/proyectos')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-800 hover:border-indigo-500/40 bg-slate-800/50 hover:bg-slate-800 text-slate-200 text-sm font-semibold transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Plus size={16} />
                  </div>
                  <span>Publicar nuevo Proyecto</span>
                </div>
                <ArrowRight size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </button>

              <button 
                onClick={() => navigate('/admin/cursos')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-800 hover:border-emerald-500/40 bg-slate-800/50 hover:bg-slate-800 text-slate-200 text-sm font-semibold transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Plus size={16} />
                  </div>
                  <span>Subir nuevo Curso</span>
                </div>
                <ArrowRight size={14} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </button>

              <button 
                onClick={() => navigate('/admin/servicios')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-800 hover:border-amber-500/40 bg-slate-800/50 hover:bg-slate-800 text-slate-200 text-sm font-semibold transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Plus size={16} />
                  </div>
                  <span>Configurar Servicio</span>
                </div>
                <ArrowRight size={14} className="text-slate-500 group-hover:text-amber-400 transition-colors" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};