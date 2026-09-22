import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, CheckCircle2, Clock, Users } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const PINK = "#e879a0";
const PINK2 = "#c44569";
const MUTED = "#9ca3b8";

export function CursoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerDetalle() {
      setCargando(true);
      // Buscamos el curso específico en la tabla "Cursos"
      const { data, error } = await supabase
        .from("Cursos")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error("Error al cargar curso:", error.message);
      } else {
        setCourse(data);
      }
      setCargando(false);
    }

    if (id) obtenerDetalle();
  }, [id]);

  if (cargando) {
    return <div className="text-center pt-20 text-[#9ca3b8]">Cargando curso...</div>;
  }

  if (!course) {
    return (
      <div className="text-center pt-20 text-[#9ca3b8]" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <p>Curso no encontrado</p>
        <button onClick={() => navigate("/cursos")} className="mt-4 text-[#e879a0] underline bg-transparent border-0 cursor-pointer">
          Volver a los cursos
        </button>
      </div>
    );
  }

  // Parseamos las clases (si vienen como string JSON desde la BD)
  let listaLecciones: string[] = [];
  try {
    listaLecciones = typeof course.clases === 'string' ? JSON.parse(course.clases) : (course.clases || []);
  } catch (e) {
    listaLecciones = [];
  }

  return (
    <main style={{ fontFamily: "'Nunito', sans-serif", color: "#e2e8f0" }}
      className="max-w-2xl mx-auto px-6 pt-12 pb-24">

      <button onClick={() => navigate("/cursos")}
        className="flex items-center gap-2 text-sm mb-8 bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-white"
        style={{ color: MUTED, fontWeight: 600 }}>
        <ArrowLeft size={15} /> Todos los cursos
      </button>

      {/* Image */}
      <div className="w-full h-52 rounded-2xl overflow-hidden mb-7 bg-[#13141f]">
        <img src={course.imagen} alt={course.titulo} className="w-full h-full object-cover" />
      </div>

      {/* Header */}
      <span className="text-xs px-2.5 py-1 rounded-full mb-3 inline-block"
        style={{ backgroundColor: `${course.coloretiqueta || PINK}18`, color: course.coloretiqueta || PINK, fontWeight: 600 }}>
        {course.nivel}
      </span>
      <h1 className="mb-2" style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        {course.titulo}
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <span className="flex items-center gap-1.5 text-sm" style={{ color: MUTED }}>
          <Clock size={13} style={{ color: course.coloretiqueta || PINK }} /> {course.duracion}
        </span>
        <span className="flex items-center gap-1.5 text-sm" style={{ color: MUTED }}>
          <Users size={13} style={{ color: course.coloretiqueta || PINK }} /> {course.estudiantes || 0} estudiantes
        </span>
      </div>

      <p className="text-sm mb-8" style={{ color: MUTED, lineHeight: 1.8 }}>
        {course.largadescripcion}
      </p>

      {/* Lessons */}
      {listaLecciones.length > 0 && (
        <div className="rounded-2xl border p-5 mb-8"
          style={{ backgroundColor: "#1a1b2d", borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="text-xs mb-4" style={{ fontWeight: 800, color: "#e2e8f0", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Qué aprenderás
          </p>
          <ul className="flex flex-col gap-2.5">
            {listaLecciones.map((l: string, index: number) => (
              <li key={index} className="flex items-start gap-3 text-sm" style={{ color: MUTED, lineHeight: 1.6 }}>
                <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: course.coloretiqueta || PINK }} />
                {l}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      {course.enlace && course.enlace !== "NULL" && (
        <a href={course.enlace} target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm transition-all duration-200 hover:opacity-85"
          style={{ background: `linear-gradient(90deg, ${PINK}, ${PINK2})`, color: "#fff", fontWeight: 700 }}>
          <ExternalLink size={13} /> Ver curso completo
        </a>
      )}
    </main>
  );
}