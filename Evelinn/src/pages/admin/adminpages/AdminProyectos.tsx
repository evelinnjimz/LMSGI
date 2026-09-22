import { useState } from "react";
import { Trash2, Plus, List, ChevronDown, ChevronUp } from "lucide-react";
import { useStore } from "../../../components/contexto/Contexto"; 

const EMPTY = {
  titulo: "",
  subtitulo: "",
  etiquetas: "",
  coloretiquetas: "#6366f1",
  descripcion: "",
  largadescripcion: "",
  imagen: "",
  fecha: new Date().toISOString().split('T')[0],
  estado: "Completado",
  caracteristicas: "",
  link: "",
};

export const AdminProyectos = () => {
  const { proyectos = [], addProyecto, deleteProyecto, loading } = useStore();

  const [vista, setVista] = useState<"lista" | "nuevo">("lista");
  const [form, setForm] = useState(EMPTY);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="apage"><p className="aempty">Cargando proyectos...</p></div>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    if (!form.titulo.trim() || !form.etiquetas.trim()) {
      setErrMsg("El título y las etiquetas del proyecto son obligatorios");
      return;
    }
    try {
      setSaving(true);
      setErrMsg("");

      const nuevoId = Math.floor(Date.now() / 1000);

      const proyectoData = {
        id: nuevoId,
        titulo: form.titulo,
        subtitulo: form.subtitulo || form.titulo,
        descripcion: form.descripcion,
        largadescripcion: form.largadescripcion,
        imagen: form.imagen || "https://placeholder.co/600x400",
        etiquetas: form.etiquetas,
        coloretiquetas: form.coloretiquetas || "#6366f1",
        fecha: form.fecha,
        estado: form.estado,
        caracteristicas: form.caracteristicas,
        link: form.link
      };

      await addProyecto(proyectoData);
      
      setForm(EMPTY);
      setShowAdvanced(false);
      setOk(true);
      setTimeout(() => { setOk(false); setVista("lista"); }, 1400);
    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Trabajos / Proyectos</h1>
          <p className="apage__sub">{(proyectos || []).length} proyectos en Supabase</p>
        </div>
        <div className="apage__btns">
          <button className={`apage__tab ${vista === "lista" ? "apage__tab--on" : ""}`} onClick={() => setVista("lista")}><List size={13} /> Listado</button>
          <button className={`apage__tab ${vista === "nuevo" ? "apage__tab--on" : ""}`} onClick={() => setVista("nuevo")}><Plus size={13} /> Nuevo</button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {(proyectos || []).length === 0 ? (
            <p className="aempty">No hay proyectos guardados aún</p>
          ) : (
            <table className="atable">
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th>Etiquetas</th>
                  <th>Enlace</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(proyectos || []).map((p) => (
                  <tr key={p.id}>
                    <td><strong>{p.titulo}</strong></td>
                    <td><span className="abadge">{p.etiquetas || "---"}</span></td>
                    <td>{p.link ? <a href={p.link} target="_blank" rel="noreferrer" className="text-indigo-600 underline">Ver enlace</a> : "---"}</td>
                    <td>
                      <button className="adel" onClick={() => p.id && deleteProyecto(p.id)}>
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
            <h2 className="aform__titulo">Nuevo Proyecto</h2>
            <div className="aform__grid">
              <input name="titulo" placeholder="Título del proyecto" value={form.titulo} onChange={onChange} />
              <input name="etiquetas" placeholder="Etiquetas (Ej: UI/UX, Mobile App)" value={form.etiquetas} onChange={onChange} />
              <input name="link" placeholder="URL del proyecto online (Link)" value={form.link} onChange={onChange} />
              <input name="imagen" placeholder="URL de la captura/imagen" value={form.imagen} onChange={onChange} />
              <textarea name="descripcion" placeholder="Descripción resumida del proyecto" value={form.descripcion} onChange={onChange} className="aform__textarea" />
            </div>

            <button 
              type="button" 
              onClick={() => setShowAdvanced(!showAdvanced)} 
              className="flex items-center gap-2 text-sm font-semibold my-4 text-[#e879a0] cursor-pointer hover:underline"
            >
              {showAdvanced ? (
                <>Ocultar datos de producción <ChevronUp size={16} /></>
              ) : (
                <>Ver todos los datos de producción <ChevronDown size={16} /></>
              )}
            </button>

            {showAdvanced && (
              <div className="aform__grid border-t border-white/5 pt-4 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="date" name="fecha" value={form.fecha} onChange={onChange} />
                  <input name="estado" placeholder="Estado (Ej: En proceso, Finalizado)" value={form.estado} onChange={onChange} />
                  <div className="flex items-center gap-3 bg-[#1a1b2d] px-3 rounded-xl border border-white/10">
                    <span className="text-white/40 text-sm">Color:</span>
                    <input type="color" name="coloretiquetas" value={form.coloretiquetas} onChange={onChange} className="w-10 h-8 cursor-pointer bg-transparent border-none" />
                  </div>
                </div>
                <input name="subtitulo" placeholder="Subtítulo o cliente del proyecto" value={form.subtitulo} onChange={onChange} />
                <input name="caracteristicas" placeholder="Tecnologías usadas (Separadas por comas: Next.js, Tailwind, Node)" value={form.caracteristicas} onChange={onChange} />
                <textarea name="largadescripcion" placeholder="Caso de estudio detallado / Descripción extendida" value={form.largadescripcion} onChange={onChange} className="aform__textarea h-32" />
              </div>
            )}

            {errMsg && <div className="aform__err">✗ {errMsg}</div>}
            {ok && <div className="aform__ok">✓ Guardado con éxito</div>}
            <button onClick={onSubmit} disabled={saving} className="aform__submit mt-4">{saving ? "Guardando..." : "Crear proyecto"}</button>
          </div>
        </div>
      )}
    </div>
  );
};