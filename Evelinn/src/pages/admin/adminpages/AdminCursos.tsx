import { useState } from "react";
import { Trash2, Plus, List, ChevronDown, ChevronUp } from "lucide-react";
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
  const [showAdvanced, setShowAdvanced] = useState(false); // Desplegable ver más
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="apage"><p className="aempty">Cargando cursos...</p></div>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
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
        imagen: form.imagen || "https://placeholder.co/600x400",
        etiquetas: form.etiquetas || "General",
        coloretiqueta: form.coloretiqueta || "#6366f1",
        duracion: form.duracion,
        nivel: form.nivel,
        clases: form.clases,
        enlace: form.enlace
      };

      await addCurso(cursoData); 
      
      setForm(EMPTY);
      setShowAdvanced(false);
      setOk(true);
      setTimeout(() => { setOk(false); setVista("lista"); }, 1400);
    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar en Supabase");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Cursos</h1>
          <p className="apage__sub">{(cursos || []).length} cursos en Supabase</p>
        </div>
        <div className="apage__btns">
          <button className={`apage__tab ${vista === "lista" ? "apage__tab--on" : ""}`} onClick={() => setVista("lista")}><List size={13} /> Listado</button>
          <button className={`apage__tab ${vista === "nuevo" ? "apage__tab--on" : ""}`} onClick={() => setVista("nuevo")}><Plus size={13} /> Nuevo</button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {(cursos || []).length === 0 ? (
            <p className="aempty">No hay cursos aún</p>
          ) : (
            <table className="atable">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Subtítulo</th>
                  <th>Descripción</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(cursos || []).map((c) => (
                  <tr key={c.id}>
                    <td><strong>{c.titulo}</strong></td>
                    <td>{c.subtitulo || "---"}</td>
                    <td>{c.descripcion ? `${c.descripcion.substring(0, 50)}...` : "---"}</td>
                    <td>
                      <button className="adel" onClick={() => c.id && deleteCurso(c.id)}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {vista === "nuevo" && (
        <div className="aform-wrap">
          <div className="aform">
            <h2 className="aform__titulo">Nuevo Curso</h2>
            
            {/* Campos Principales */}
            <div className="aform__grid">
              <input name="titulo" placeholder="Título del curso (Obligatorio)" value={form.titulo} onChange={onChange} />
              <input name="subtitulo" placeholder="Subtítulo del curso (Obligatorio)" value={form.subtitulo} onChange={onChange} />
              <input name="imagen" placeholder="URL de la imagen" value={form.imagen} onChange={onChange} />
              <textarea name="descripcion" placeholder="Descripción Corta (Obligatorio)" value={form.descripcion} onChange={onChange} className="aform__textarea" />
            </div>

            {/* Botón interactivo para desplegar más campos */}
            <button 
              type="button" 
              onClick={() => setShowAdvanced(!showAdvanced)} 
              className="flex items-center gap-2 text-sm font-semibold my-4 text-[#e879a0] cursor-pointer hover:underline"
            >
              {showAdvanced ? (
                <>Ocultar campos avanzados <ChevronUp size={16} /></>
              ) : (
                <>Ver todos los campos avanzados <ChevronDown size={16} /></>
              )}
            </button>

            {/* Campos Ocultos / Avanzados */}
            {showAdvanced && (
              <div className="aform__grid border-t border-white/5 pt-4 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="etiquetas" placeholder="Etiquetas (Ej: React, Finanzas)" value={form.etiquetas} onChange={onChange} />
                  <div className="flex items-center gap-3 bg-[#1a1b2d] px-3 rounded-xl border border-white/10">
                    <span className="text-white/40 text-sm">Color:</span>
                    <input type="color" name="coloretiqueta" value={form.coloretiqueta} onChange={onChange} className="w-10 h-8 cursor-pointer bg-transparent border-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input name="duracion" placeholder="Duración (Ej: 20 horas)" value={form.duracion} onChange={onChange} />
                  <input name="nivel" placeholder="Nivel (Ej: Principiante, Avanzado)" value={form.nivel} onChange={onChange} />
                  <input name="clases" placeholder="Clases (Ej: Online, Presencial)" value={form.clases} onChange={onChange} />
                </div>
                <input name="enlace" placeholder="Enlace de redirección externo (Link)" value={form.enlace} onChange={onChange} />
                <textarea name="largadescripcion" placeholder="Descripción Larga o Temario completo del curso" value={form.largadescripcion} onChange={onChange} className="aform__textarea h-32" />
              </div>
            )}

            {errMsg && <div className="aform__err">✗ {errMsg}</div>}
            {ok && <div className="aform__ok">✓ Guardado con éxito</div>}
            <button onClick={onSubmit} disabled={saving} className="aform__submit mt-4">{saving ? "Guardando..." : "Crear curso"}</button>
          </div>
        </div>
      )}
    </div>
  );
};