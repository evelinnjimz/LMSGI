import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const PINK = "#e879a0";
const PINK2 = "#c44569";
const MUTED = "#9ca3b8";
const DIM = "#4a4f6a";

export function ServicioDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [service, setService] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerServicio() {
      setCargando(true);
      const { data, error } = await supabase
        .from("Servicios")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error("Error al cargar servicio:", error.message);
      } else {
        setService(data);
      }
      setCargando(false);
    }

    if (id) obtenerServicio();
  }, [id]);

  if (cargando) {
    return <div className="text-center pt-20 text-[#9ca3b8]">Cargando...</div>;
  }

  if (!service) {
    return (
      <div className="text-center pt-20 text-white font-nunito">
        <h2>Servicio no encontrado</h2>
        <button onClick={() => navigate('/servicios')} className="mt-4 text-[#e879a0] border-0 bg-transparent cursor-pointer">
          Volver a servicios
        </button>
      </div>
    );
  }



  // Usamos un color por defecto si no tenemos columna 'accent' en servicios
  const accentColor = service.accent || PINK;

  return (
    <main
      style={{ fontFamily: "'Nunito', sans-serif", color: "#e2e8f0" }}
      className="max-w-xl mx-auto px-6 pt-12 pb-24"
    >
      <button
        onClick={() => navigate('/servicios')}
        className="flex items-center gap-2 text-sm mb-8 bg-transparent border-0 cursor-pointer hover:text-white transition-colors duration-200"
        style={{ color: MUTED, fontWeight: 600 }}
      >
        <ArrowLeft size={15} /> Servicios
      </button>

      {/* Price hero */}
      <div
        className="rounded-2xl border p-8 text-center mb-6"
        style={{ backgroundColor: "#1a1b2d", borderColor: `${accentColor}25` }}
      >
        <p className="text-sm mb-2" style={{ color: MUTED }}>{service.subtitulo}</p>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "12px" }}>
          {service.titulo}
        </h1>
        <p style={{ fontSize: "3rem", fontWeight: 800, background: `linear-gradient(90deg, ${PINK}, ${PINK2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
          {service.precio}$
        </p>
        <p className="text-xs mt-1" style={{ color: DIM }}>
          {service.notaprecio} · {service.duracion}
        </p>
      </div>

     {/* What's included */}
      {service.incluye && (
        <div
          className="rounded-2xl border p-6 mb-5 backdrop-blur-sm shadow-xl"
          style={{ backgroundColor: "#13141f", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p 
            className="text-xs mb-4 flex items-center gap-2 font-black tracking-wider text-[#e2e8f0] uppercase"
            style={{ letterSpacing: "0.06em" }}
          >
            <span className="w-1.5 h-3 bg-indigo-500 rounded-full" /> {/* Pequeño detalle visual de acento */}
            Incluye
          </p>
          
          <ul className="flex flex-col gap-3 text-sm text-slate-300">
            {service.incluye
              .split(',') // Separa el texto por cada coma
              .map((item: string) => {
                // Limpiamos las comillas extra, espacios en blanco o corchetes que vengan de la base de datos
                const textoLimpio = item.replace(/["'[\]]/g, "").trim();
                
                // Si el elemento quedó vacío tras la limpieza, no lo renderizamos
                if (!textoLimpio) return null;

                return (
                  <li key={textoLimpio} className="flex items-start gap-3 group transition-colors duration-200 hover:text-white">
                    {/* Icono de Check / Tick Minimalista y Elegante */}
                    <svg 
                      className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0 bg-emerald-500/10 p-0.5 rounded-full" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{textoLimpio}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => navigate('/contacto')}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm transition-all duration-200 hover:opacity-85 border-0 cursor-pointer"
        style={{ background: `linear-gradient(90deg, ${PINK}, ${PINK2})`, color: "#fff", fontWeight: 700 }}
      >
        <MessageCircle size={14} /> Contratar · {service.precio}$
      </button>
    </main>
  );
}