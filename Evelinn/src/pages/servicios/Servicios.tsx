import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const PINK = "#e879a0";
const PINK2 = "#c44569";
const MUTED = "#9ca3b8";
const DIM = "#4a4f6a";

export function Servicios() {
  const navigate = useNavigate();
  const [servicios, setServicios] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerServicios() {
      const { data, error } = await supabase
        .from("Servicios")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error al cargar servicios:", error.message);
      } else if (data) {
        setServicios(data);
      }
      setCargando(false);
    }

    obtenerServicios();
  }, []);

  return (
    <main style={{ fontFamily: "'Nunito', sans-serif", color: "#e2e8f0" }}
      className="max-w-5xl mx-auto px-6 pt-16 pb-24">

      <div className="mb-10">
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.025em" }}>
          Mis{" "}
          <span style={{ background: `linear-gradient(90deg, ${PINK}, ${PINK2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            servicios
          </span>
        </h1>
        <p className="mt-2 text-sm" style={{ color: MUTED }}>
            {cargando ? "Cargando..." : "Diseño y desarrollo frontend a medida."}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {servicios.map((s) => (
          <button key={s.id} onClick={() => navigate(`/servicios/${s.id}`)}
            className="group rounded-2xl border p-6 text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-white/10 flex flex-col gap-4"
            style={{ backgroundColor: "#13141f", borderColor: "rgba(255,255,255,0.07)" }}>

            {/* Price + title row */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p style={{ fontWeight: 800, color: "#e2e8f0", fontSize: "1.05rem" }}>{s.titulo}</p>
                <p className="text-xs mt-0.5" style={{ color: DIM }}>{s.subtitulo}</p>
              </div>
              <div className="text-right shrink-0">
                <p style={{ fontSize: "1.5rem", fontWeight: 800, background: `linear-gradient(90deg, ${PINK}, ${PINK2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
                  {s.precio}$
                </p>
                <p className="text-xs" style={{ color: DIM }}>{s.notaprecio}</p>
              </div>
            </div>

            <p className="text-sm" style={{ color: MUTED, lineHeight: 1.6 }}>{s.descripcion}</p>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs" style={{ color: DIM }}>{s.duracion}</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: PINK }} />
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}