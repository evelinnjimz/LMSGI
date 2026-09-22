import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Server,
} from "lucide-react";

import { FaGithub } from "react-icons/fa6";

import { supabase } from "../../lib/supabaseClient";

export function Proyectos() {
  const navigate = useNavigate();
  
  // 1. Creamos el estado para guardar los datos de Supabase
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // 2. Usamos useEffect para traer los datos nada más cargar la página
  useEffect(() => {
    async function obtenerProyectos() {
      const { data, error } = await supabase
        .from("Proyectos") // Nombre exacto con mayúscula
        .select("*")
        .order("id", { ascending: true }); // Los ordena por ID

      if (error) {
        console.error("Error al cargar los proyectos:", error.message);
      } else if (data) {
        setProyectos(data);
      }
      setCargando(false);
    }

    obtenerProyectos();
  }, []);

  return (
    // Fondo oscuro que simula el de la imagen
    <main className="min-h-screen bg-[#0b0814] w-full pt-16 pb-24 font-['Nunito',sans-serif] text-[#e2e8f0]">
      
      <div className="max-w-6xl mx-auto px-6">
        {/* ─── HEADER ESTILO TERMINAL ─── */}
        <div className="mb-10">
          
          <h1 className="text-4xl md:text-5xl text-transparent bg-gradient-to-r from-pink-400 to-purple-800 bg-clip-text font-extrabold tracking-tight  leading-[1.1] mb-4">
            Mis Proyectos
          </h1>
          <p className="max-w-2xl text-base text-[#9ca3b8] leading-relaxed">
            {cargando ? "Estableciendo conexión con la base de datos..." : "Proyectos prácticos desarrollados durante mi formación en ASIR y proyectos personales de programación y redes."}
          </p>
        </div>

        {/* ─── GRID DE PROYECTOS ─── */}
        {cargando && (
          <div className="flex items-center gap-3 text-[#e879a0] font-mono animate-pulse">
            <Server size={18} />
            <p>Obteniendo datos de Supabase...</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proyectos.map((p) => {
            // Convertimos la cadena de texto de etiquetas en un array
            const listaEtiquetas = p.etiquetas 
              ? p.etiquetas.split(',').map((t: string) => t.trim()) 
              : [];

            return (
              <article
                key={p.id}
                className="group flex flex-col bg-[#130f1d] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#e879a0]/30 hover:shadow-[0_0_30px_rgba(232,121,160,0.05)]"
              >
                {/* ─── IMAGEN Y BADGE SUPERIOR ─── */}
                <div 
                  className="relative h-56 w-full overflow-hidden bg-[#0b0814] cursor-pointer"
                  onClick={() => navigate(`/proyectos/${p.id}`)}
                >
                  <img 
                    src={p.imagen} 
                    alt={p.titulo} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                  />
                  {p.estado && (
                    <div className="absolute top-4 right-4 bg-[#0b0814]/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-sm">
                      <span className="text-[10px] font-mono font-bold text-[#e879a0] tracking-widest uppercase">
                        {p.estado}
                      </span>
                    </div>
                  )}
                </div>

                {/* ─── CONTENIDO DE LA TARJETA ─── */}
                <div className="flex flex-col flex-1 p-6">

                  {/* Título */}
                  <h3 
                    onClick={() => navigate(`/proyectos/${p.id}`)}
                    className="text-xl font-bold text-white mb-2 cursor-pointer hover:text-[#e879a0] transition-colors line-clamp-1"
                  >
                    {p.titulo}
                  </h3>

                  {/* Descripción */}
                  <p className="text-sm text-[#9ca3b8] leading-relaxed mb-6 line-clamp-2">
                    {p.descripcion}
                  </p>
                  
                  {/* Tags (Mapeo desde Supabase) */}
                  <div className="flex flex-wrap gap-2 mt-auto mb-6">
                    {listaEtiquetas.slice(0, 4).map((tag: string) => (
                      <span 
                        key={tag} 
                        className="text-[11px] px-2.5 py-1 rounded-md font-mono bg-white/5 border border-white/10 text-[#9ca3b8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ─── BOTONES DE ACCIÓN ─── */}
                  <div className="flex items-center gap-4 pt-5 border-t border-white/5 mt-auto">
                    <button
                      onClick={() => navigate(`/proyectos/${p.id}`)}
                      className="bg-[#e879a0]/10 text-[#e879a0] hover:bg-[#e879a0] hover:text-[#0b0814] transition-all duration-200 px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2"
                    >
                      Ver Detalles <ArrowRight size={16} />
                    </button>
                    
                    <a 
                      href="https://github.com/evelinnjimz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#9ca3b8] hover:text-white transition-colors text-sm font-mono px-4 py-2"
                    >
                      <FaGithub size={16} /> <span className="hidden sm:inline">GitHub</span>
                    </a>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center">
          <a
          href="https://github.com/evelinnjimz"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200 px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
            <FaGithub size={18} /> Explorar Repositorios
          </a>
        </div>

      </div>
    </main>
  );
}