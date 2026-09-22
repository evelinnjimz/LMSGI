import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export function ProyectoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estados para guardar los datos
  const [project, setProject] = useState<any>(null);
  const [nextProject, setNextProject] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerDetalle() {
      setCargando(true);
      
      // Obtenemos todos los proyectos ordenados para poder calcular cuál es el "siguiente"
      const { data, error } = await supabase
        .from("Proyectos")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error al cargar detalles:", error.message);
      } else if (data && data.length > 0) {
        // Buscamos el proyecto actual
        const currentIndex = data.findIndex((p) => p.id === Number(id));
        
        if (currentIndex !== -1) {
          setProject(data[currentIndex]);
          // Calculamos el siguiente proyecto (si es el último, vuelve al primero)
          const nextIndex = (currentIndex + 1) % data.length;
          setNextProject(data[nextIndex]);
        } else {
          setProject(null);
        }
      }
      setCargando(false);
    }

    if (id) {
      obtenerDetalle();
    }
  }, [id]); // Se vuelve a ejecutar si el ID de la URL cambia

  // Pantalla de carga
  if (cargando) {
    return (
      <div className="text-center pt-20 text-[#9ca3b8] font-['Nunito',sans-serif]">
        <p>Cargando proyecto...</p>
      </div>
    );
  }

  // Si no se encuentra el proyecto
  if (!project) {
    return (
      <div className="text-center pt-20 text-[#9ca3b8] font-['Nunito',sans-serif]">
        <p>Proyecto no encontrado</p>
        <button onClick={() => navigate("/proyectos")} className="mt-4 text-[#e879a0] underline">
          Volver a proyectos
        </button>
      </div>
    );
  }

  // Preparar los datos (fechas, etiquetas, características)
  const anio = project.fecha ? project.fecha.substring(0, 4) : "";
  const listaEtiquetas = project.etiquetas ? project.etiquetas.split(',').map((t: string) => t.trim()) : [];
  const colorAcento = project.coloretiquetas || "#e879a0";

  // Las características parecen estar guardadas como un texto con formato de lista ["item 1", "item 2"] en tu BD
  let listaCaracteristicas: string[] = [];
  try {
    // Intentamos leerlo como JSON (por cómo se veía en tu captura de pantalla)
    listaCaracteristicas = typeof project.caracteristicas === 'string' 
      ? JSON.parse(project.caracteristicas) 
      : project.caracteristicas;
  } catch (e) {
    // Si no es un JSON, lo separamos por comas
    listaCaracteristicas = project.caracteristicas ? project.caracteristicas.split(',') : [];
  }

  return (
    <main className="max-w-3xl mx-auto px-6 pt-12 pb-24 font-['Nunito',sans-serif] text-[#e2e8f0]">
      {/* Back button */}
      <button 
        onClick={() => navigate("/proyectos")}
        className="flex items-center gap-2 text-sm mb-10 text-[#9ca3b8] font-semibold hover:text-white transition-colors"
      >
        <ArrowLeft size={15} /> Todos los proyectos
      </button>

      {/* Hero Image */}
      <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 bg-[#13141f]">
        <img 
          src={project.imagen} 
          alt={project.titulo}
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#4a4f6a]">{anio}</span>
            <span className="w-1 h-1 rounded-full bg-[#4a4f6a]" />
            {project.estado && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                project.estado === "En progreso" 
                  ? "bg-[#e879a0]/15 text-[#e879a0]" 
                  : "bg-white/5 text-[#4a4f6a]"
              }`}>
                {project.estado}
              </span>
            )}
          </div>
          <h1 className="text-[clamp(1.8rem,5vw,2.4rem)] font-extrabold tracking-tight leading-[1.15]">
            {project.titulo}
            <span className="text-[#9ca3b8] font-medium"> — {project.subtitulo}</span>
          </h1>
        </div>

        <div className="flex gap-2 shrink-0">
          {project.link && project.link !== "NULL" && (
            <a href={project.link} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#e879a0] to-[#c44569] hover:opacity-90 transition-opacity">
              <ExternalLink size={13} /> Demo
            </a>
          )}
          {/* Si añades una columna "github" a tu BD, puedes descomentar este botón: */}
          {/* <a href={project.github} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border border-white/10 text-[#9ca3b8] hover:border-white/20 hover:text-white transition-colors">
            GitHub
          </a> 
          */}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {listaEtiquetas.map((tag: string) => (
          <span key={tag} 
            className="text-xs px-3 py-1 rounded-full font-semibold"
            style={{ backgroundColor: `${colorAcento}15`, color: colorAcento }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="w-full h-px mb-8 bg-white/5" />

      {/* Description */}
      <p className="text-base mb-10 text-[#9ca3b8] leading-8">
        {project.largadescripcion}
      </p>

      {/* Features */}
      {listaCaracteristicas && listaCaracteristicas.length > 0 && (
        <div className="rounded-2xl border border-white/5 p-6 mb-12 bg-[#1a1b2d]">
          <h2 className="mb-5 text-sm font-extrabold tracking-widest text-[#e2e8f0] uppercase">
            Qué incluye
          </h2>
          <ul className="flex flex-col gap-3">
            {listaCaracteristicas.map((f: string) => (
              <li key={f} className="flex items-start gap-3 text-sm text-[#9ca3b8]">
                <CheckCircle2 size={14} className="mt-1 shrink-0" style={{ color: colorAcento }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next project */}
      {nextProject && (
        <div className="border-t border-white/5 pt-8">
          <p className="text-xs mb-3 font-semibold tracking-[0.06em] text-[#4a4f6a] uppercase">
            Siguiente proyecto
          </p>
          <button onClick={() => navigate(`/proyectos/${nextProject.id}`)}
            className="group flex items-center gap-4 w-full text-left transition-transform bg-transparent border-0 cursor-pointer"
          >
            <div className="w-16 h-11 rounded-lg overflow-hidden shrink-0">
              <img src={nextProject.imagen} alt={nextProject.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="font-bold text-[#e2e8f0] text-[0.95rem]">{nextProject.titulo}</p>
              <p className="text-xs text-[#4a4f6a]">{nextProject.subtitulo}</p>
            </div>
            <ArrowLeft size={14} className="ml-auto rotate-180 opacity-0 group-hover:opacity-100 transition-opacity text-[#e879a0]" />
          </button>
        </div>
      )}
    </main>
  );
}