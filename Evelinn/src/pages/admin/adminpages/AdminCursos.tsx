import { useState } from "react";
import { 
  Trash2, Plus, List, ChevronDown, 
  CheckCircle2, AlertCircle, BookOpen, ImageIcon, Tag,
  Folder, ExternalLink
} from "lucide-react";
import { useStore } from "../../../components/contexto/Contexto";

const EMPTY = {
  titulo: "",
  subtitulo: "",
  descripcion: "",
  largadescripcion: "",
  imagen: "",
  etiquetas: "General",
  coloretiqueta: "#6366f1",
  duracion: "",
  nivel: "",
  clases: "",
  enlace: "",
};

export const AdminCursos = () => {
  const { cursos = [], addCurso, deleteCurso, loading } = useStore(); 

  const [vista, setVista] = useState<"lista" | "nuevo">("lista");
  const [form, setForm] = useState(EMPTY);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400 space-y-4">
        <div className="w-10 h-10 border-4 border-[#1e2538] border-t-[#5b32f6] rounded-full animate-spin"></div>
        <p className="font-medium animate-pulse text-sm">Cargando catálogo...</p>
      </div>
    );
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleNuevo = () => {
    setForm(EMPTY);
    setVista("nuevo");
    setShowAdvanced(false);
  };

  const onSubmit = async () => {
    if (!form.titulo.trim() || !form.subtitulo.trim() || !form.descripcion.trim()) {
      setErrMsg("El título, el subtítulo y la descripción corta son obligatorios");
      return;
    }
    try {
      setSaving(true);
      setErrMsg("");
      
      const nuevoId = Math.floor(Date.now() / 1000);

      const cursoData = {
        id: nuevoId,
        titulo: form.titulo,
        subtitulo: form.subtitulo,
        descripcion: form.descripcion,
        largadescripcion: form.largadescripcion,
        imagen: form.imagen || "",
        etiquetas: form.etiquetas || "General",
        coloretiqueta: form.coloretiqueta || "#5b32f6",
        duracion: form.duracion,
        nivel: form.nivel,
        clases: form.clases,
        enlace: form.enlace
      };

      await addCurso(cursoData); 
      
      setForm(EMPTY);
      setShowAdvanced(false);
      setOk(true);
      setTimeout(() => { 
        setOk(false); 
        setVista("lista"); 
      }, 1500);
    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar el curso");
    } finally {
      setSaving(false);
    }
  };

  // Clases CSS actualizadas para el diseño oscuro de la imagen
  const inputClass = "w-full bg-[#050810] border border-[#1e2538] rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:bg-[#0a0f1d] focus:outline-none focus:ring-2 focus:ring-[#5b32f6]/50 focus:border-[#5b32f6] transition-all duration-300 text-sm font-normal";
  const labelClass = "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8a94a6] mb-2 ml-1";

  return (
    <div className="mw-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100">
      
      {/* HEADER DE LA PÁGINA (Idéntico a la imagen) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 bg-[#0c111d] p-5 md:p-6 rounded-2xl border border-[#1e2538]">
        
        {/* Lado Izquierdo: Icono + Títulos */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#1a2035] border border-[#262f4d] rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
            <Folder className="text-[#6366f1]" size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-white tracking-tight mb-0.5">
              Catálogo de Cursos
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <p className="text-[#8a94a6] text-sm font-medium">
                {(cursos || []).length} {(cursos || []).length === 1 ? 'curso registrado' : 'cursos registrados'}
              </p>
            </div>
          </div>
        </div>

        {/* Pestañas / Tabs Modernos estilo Toggle */}
        <div className="flex bg-[#050810] border border-[#1e2538] p-1 rounded-xl w-fit">
          <button 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              vista === "lista" 
                ? "bg-[#5b32f6] text-white shadow-md" 
                : "text-[#8a94a6] hover:text-white hover:bg-[#1a2035]/50"
            }`} 
            onClick={() => setVista("lista")}
          >
            <List size={16} /> Listado
          </button>
          <button 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              vista === "nuevo" 
                ? "bg-[#5b32f6] text-white shadow-md" 
                : "text-[#8a94a6] hover:text-white hover:bg-[#1a2035]/50"
            }`} 
            onClick={handleNuevo}
          >
            <Plus size={16} /> Nuevo Curso
          </button>
        </div>
      </div>

      {/* VISTA 1: LISTA DE CURSOS */}
      {vista === "lista" && (
        <div className="bg-[#0c111d] border border-[#1e2538] rounded-2xl overflow-hidden">
          {(cursos || []).length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center">
              <div className="w-16 h-16 bg-[#1a2035] rounded-2xl flex items-center justify-center mb-4 border border-[#262f4d]">
                <BookOpen size={28} className="text-[#6366f1]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No hay cursos todavía</h3>
              <p className="text-[#8a94a6] max-w-sm mb-6 text-sm">Empieza a crear tu catálogo de cursos para que aparezcan en esta lista.</p>
              <button onClick={handleNuevo} className="flex items-center gap-2 text-sm font-medium text-white bg-[#5b32f6] hover:bg-[#4c28d4] px-5 py-2.5 rounded-xl transition-colors">
                <Plus size={16} /> Añadir el primer curso
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1e2538]">
                    <th className="px-6 py-4 text-[11px] font-bold text-[#8a94a6] uppercase tracking-wider">Curso</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#8a94a6] uppercase tracking-wider hidden md:table-cell">Etiquetas</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#8a94a6] uppercase tracking-wider hidden lg:table-cell">Enlace</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-[#8a94a6] uppercase tracking-wider text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2538]">
                  {(cursos || []).map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                      {/* Columna Curso (Imagen + Textos) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {c.imagen ? (
                            <img src={c.imagen} alt={c.titulo} className="w-11 h-11 rounded-xl object-cover bg-[#1a2035] border border-[#262f4d] shrink-0" />
                          ) : (
                            <div className="w-11 h-11 rounded-xl bg-[#1a2035] flex items-center justify-center border border-[#262f4d] shrink-0">
                              <ImageIcon size={18} className="text-[#4a5578]" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-semibold text-white tracking-tight">
                              {c.titulo}
                            </p>
                            <p className="text-xs text-[#8a94a6] mt-0.5 line-clamp-1">
                              {c.subtitulo}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      {/* Columna Etiquetas */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center">
                          <span 
                            className="text-xs font-medium px-3 py-1.5 rounded-lg border w-fit"
                            style={{ 
                              color: c.coloretiqueta || '#818cf8', 
                              backgroundColor: `${c.coloretiqueta || '#818cf8'}15`,
                              borderColor: `${c.coloretiqueta || '#818cf8'}30`
                            }}
                          >
                            {c.etiquetas || "General"}
                          </span>
                        </div>
                      </td>
                      
                      {/* Columna Enlace */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        {c.enlace ? (
                          <a 
                            href={c.enlace} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-sm text-[#818cf8] hover:text-[#a5b4fc] transition-colors w-fit"
                          >
                            Visitar <ExternalLink size={14} />
                          </a>
                        ) : (
                          <span className="text-[#4a5578] text-sm">-</span>
                        )}
                      </td>
                      
                      {/* Columna Acciones */}
                      <td className="px-6 py-4 text-right">
                        <button 
                          className="p-2 rounded-lg text-[#8a94a6] hover:bg-red-500/10 hover:text-red-400 transition-colors inline-flex justify-center items-center" 
                          onClick={() => c.id && deleteCurso(c.id)}
                          title="Borrar curso"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* VISTA 2: FORMULARIO NUEVO CURSO (Adaptado al nuevo diseño) */}
      {vista === "nuevo" && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0c111d] border border-[#1e2538] rounded-2xl p-6 md:p-8 relative overflow-hidden">
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white">Crear Nuevo Curso</h2>
              <p className="text-[#8a94a6] text-sm mt-1">Completa la información básica para añadir un proyecto al catálogo.</p>
            </div>
            
            <div className="space-y-6 relative z-10">
              
              {/* Bloque 1: Info Básica */}
              <div className="bg-[#050810]/50 p-5 rounded-2xl border border-[#1e2538] space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Título del curso *</label>
                    <input name="titulo" placeholder="Ej: Máster en React" value={form.titulo} onChange={onChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Subtítulo *</label>
                    <input name="subtitulo" placeholder="Ej: Desde cero a producción" value={form.subtitulo} onChange={onChange} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    <ImageIcon size={14} className="text-[#4a5578]" /> Imagen destacada (URL)
                  </label>
                  <input name="imagen" placeholder="https://..." value={form.imagen} onChange={onChange} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Descripción Corta *</label>
                  <textarea name="descripcion" placeholder="Breve resumen..." value={form.descripcion} onChange={onChange} className={`${inputClass} resize-y min-h-[100px] leading-relaxed`} />
                </div>
              </div>

              {/* Botón Desplegable Ajustes Avanzados */}
              <div>
                <button 
                  type="button" 
                  onClick={() => setShowAdvanced(!showAdvanced)} 
                  className={`flex items-center justify-between w-full px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    showAdvanced 
                      ? "bg-[#5b32f6]/10 border-[#5b32f6]/30 text-[#818cf8]" 
                      : "bg-[#050810] border-[#1e2538] text-[#8a94a6] hover:bg-[#1a2035]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Tag size={16} /> Ajustes avanzados y temario
                  </span>
                  <div className={`transform transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
              </div>

              {/* Panel de Campos Avanzados */}
              <div className={`transition-all duration-500 overflow-hidden ${showAdvanced ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-6 bg-[#050810]/80 rounded-2xl border border-[#1e2538] space-y-6 mt-2">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Etiqueta principal</label>
                      <input name="etiquetas" placeholder="Ej: Frontend" value={form.etiquetas} onChange={onChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Color de Etiqueta</label>
                      <div className="flex items-center gap-3 bg-[#050810] border border-[#1e2538] rounded-xl px-4 py-2 h-[46px]">
                        <input type="color" name="coloretiqueta" value={form.coloretiqueta} onChange={onChange} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0" />
                        <span className="text-sm font-mono text-[#8a94a6] uppercase">{form.coloretiqueta}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}>Duración</label>
                      <input name="duracion" placeholder="Ej: 25 horas" value={form.duracion} onChange={onChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Nivel</label>
                      <input name="nivel" placeholder="Ej: Intermedio" value={form.nivel} onChange={onChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Modalidad</label>
                      <input name="clases" placeholder="Ej: 100% Online" value={form.clases} onChange={onChange} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Enlace Externo (Opcional)</label>
                    <input name="enlace" placeholder="https://..." value={form.enlace} onChange={onChange} className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Descripción Larga / Temario</label>
                    <textarea name="largadescripcion" placeholder="Escribe el temario completo..." value={form.largadescripcion} onChange={onChange} className={`${inputClass} resize-y min-h-[140px] leading-relaxed`} />
                  </div>
                </div>
              </div>

              {/* Notificaciones */}
              {errMsg && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{errMsg}</span>
                </div>
              )}
              
              {ok && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>¡Curso guardado correctamente! Redirigiendo...</span>
                </div>
              )}
              
              {/* Botón de Enviar */}
              <div className="pt-6 mt-4 flex justify-end border-t border-[#1e2538]">
                <button 
                  onClick={onSubmit} 
                  disabled={saving} 
                  className="w-full md:w-auto bg-[#5b32f6] hover:bg-[#4c28d4] text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 disabled:opacity-50 text-sm"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Guardando...
                    </span>
                  ) : "Crear proyecto"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};