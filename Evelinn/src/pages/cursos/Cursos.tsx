import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Clock, 
  Users,
  Server,
  Sparkles
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export function Cursos() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerCursos() {
      const { data, error } = await supabase
        .from("Cursos") // Nombre exacto de la tabla en Supabase
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error al cargar cursos:", error.message);
      } else if (data) {
        setCursos(data);
      }
      setCargando(false);
    }

    obtenerCursos();
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0814] w-full pt-16 pb-24 font-['Nunito',sans-serif] text-[#e2e8f0]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* ─── ENCABEZADO ESTILO TECH / TERMINAL ─── */}
        <div className="mb-12">     

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-white mb-4">
            Cursos y{" "}
            <span className="bg-gradient-to-r from-[#e879a0] to-[#c44569] bg-clip-text text-transparent">
              Certificados
            </span>
          </h1>
          
          <p className="text-base text-[#9ca3b8] max-w-xl">
            {cargando 
              ? "Sincronizando catálogo de formación..." 
              : `${cursos.length} cursos disponibles · diseño, redes y desarrollo frontend`}
          </p>
        </div>

        {/* ─── INDICADOR DE CARGA ─── */}
        {cargando && (
          <div className="flex items-center gap-3 text-[#e879a0] font-mono animate-pulse py-8">
            <Server size={18} />
            <p>Obteniendo cursos desde Supabase...</p>
          </div>
        )}

        {/* ─── GRID DE CURSOS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/cursos/${c.id}`)}
              className="group flex flex-col bg-[#130f1d] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#e879a0]/40 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(232,121,160,0.1)]"
            >
              {/* Contenedor de Imagen */}
              <div className="relative h-48 w-full overflow-hidden bg-[#0b0814]">
                <img
                  src={c.imagen}
                  alt={c.titulo}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Overlay en gradiente inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#130f1d] via-transparent to-transparent opacity-90" />

                {/* Badge de Nivel */}
                <span
                  className="absolute top-3 right-3 text-[11px] font-mono px-3 py-1 rounded-md shadow-lg border border-white/10"
                  style={{
                    backgroundColor: c.coloretiqueta ? `${c.coloretiqueta}dd` : "#e879a0dd",
                    color: "#ffffff",
                    fontWeight: 700,
                  }}
                >
                  {c.nivel}
                </span>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">

                  {/* Título */}
                  <h3 className="text-lg font-bold text-white group-hover:text-[#e879a0] transition-colors leading-snug line-clamp-2">
                    {c.titulo}
                  </h3>

                  {/* Descripción */}
                  <p className="text-xs text-[#9ca3b8] leading-relaxed line-clamp-3">
                    {c.descripcion}
                  </p>
                </div>

                {/* Metadata (Duración, Estudiantes y Botón) */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-[#9ca3b8]">
                      <Clock size={13} className="text-[#e879a0]" /> 
                      {c.duracion}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-[#9ca3b8]">
                      <Users size={13} className="text-[#e879a0]" /> 
                      {c.estudiantes || "0"}
                    </span>
                  </div>

                  {/* Flecha de Acción */}
                  <div className="p-2 rounded-lg bg-white/5 text-[#e879a0] group-hover:bg-[#e879a0] group-hover:text-[#0b0814] transition-all duration-200">
                    <ArrowRight size={14} />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ─── BANNER INFERIOR ─── */}
        {!cargando && cursos.length > 0 && (
          <div className="mt-16 bg-[#130f1d] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles size={20} className="text-[#e879a0] shrink-0" />
              <p className="text-xs sm:text-sm text-[#9ca3b8]">
                Todos los cursos incluyen material de apoyo, laboratorios prácticos y acceso a los repositorios de código.
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}