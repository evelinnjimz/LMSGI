import { useState } from "react";
import { Trash2, Plus, List, ChevronDown, ChevronUp } from "lucide-react";
import { useStore } from "../../../components/contexto/Contexto";

const EMPTY = {
  titulo: "",
  subtitulo: "",
  descripcion: "",
  largadescripcion: "",
  imagen: "",
  etiquetas: "",
  coloretiquetas: "#6366f1",
  precio: "0",
  notaprecio: "",
  duracion: "",
  incluye: ""
};

export const AdminServicios = () => {
  const { servicios = [], addServicio, deleteServicio, loading } = useStore(); 

  const [vista, setVista] = useState<"lista" | "nuevo">("lista");
  const [form, setForm] = useState(EMPTY);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="apage"><p className="aempty">Cargando servicios...</p></div>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    if (!form.titulo.trim() || !form.etiquetas.trim()) {
      setErrMsg("El título y las etiquetas principales son obligatorios");
      return;
    }

    try {
      setSaving(true);
      setErrMsg("");

      const nuevoId = Math.floor(Date.now() / 1000);

      const servicioData = {
        id: nuevoId,
        titulo: form.titulo,
        subtitulo: form.subtitulo || form.titulo,
        descripcion: form.descripcion,
        largadescripcion: form.largadescripcion,
        imagen: form.imagen || null,
        etiquetas: form.etiquetas,
        coloretiquetas: form.coloretiquetas || "#6366f1",
        precio: Number(form.precio) || 0, // Convertido correctamente a número real
        notaprecio: form.notaprecio,
        duracion: form.duracion,
        incluye: form.incluye
      };

      await addServicio(servicioData as any);

      setForm(EMPTY);
      setShowAdvanced(false);
      setOk(true);
      setTimeout(() => { setOk(false); setVista("lista"); }, 1400);
    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar el servicio");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Servicios</h1>
          <p className="apage__sub">{(servicios || []).length} servicios en Supabase</p>
        </div>
        <div className="apage__btns">
          <button className={`apage__tab ${vista === "lista" ? "apage__tab--on" : ""}`} onClick={() => setVista("lista")}><List size={13} /> Listado</button>
          <button className={`apage__tab ${vista === "nuevo" ? "apage__tab--on" : ""}`} onClick={() => setVista("nuevo")}><Plus size={13} /> Nuevo</button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {(servicios || []).length === 0 ? (
            <p className="aempty">No hay servicios aún</p>
          ) : (
            <table className="atable">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Etiquetas</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(servicios || []).map((s) => (
                  <tr key={s.id}>
                    <td><strong>{s.titulo}</strong></td>
                    <td><span className="abadge">{s.etiquetas || "---"}</span></td>
                    <td>{s.precio ? `${s.precio}€` : "Gratis/Consultar"}</td>
                    <td>
                      <button className="adel" onClick={() => s.id && deleteServicio(s.id)}>
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
            <h2 className="aform__titulo">Nuevo Servicio</h2>
            <div className="aform__grid">
              <input name="titulo" placeholder="Título del servicio" value={form.titulo} onChange={onChange} />
              <input name="etiquetas" placeholder="Etiquetas principales (Ej: Desarrollo, Consultoría)" value={form.etiquetas} onChange={onChange} />
              <input name="imagen" placeholder="URL de la imagen (Opcional)" value={form.imagen} onChange={onChange} />
              <textarea name="descripcion" placeholder="Breve descripción del servicio" value={form.descripcion} onChange={onChange} className="aform__textarea" />
            </div>

            <button 
              type="button" 
              onClick={() => setShowAdvanced(!showAdvanced)} 
              className="flex items-center gap-2 text-sm font-semibold my-4 text-[#e879a0] cursor-pointer hover:underline"
            >
              {showAdvanced ? (
                <>Ocultar especificaciones de venta <ChevronUp size={16} /></>
              ) : (
                <>Ver todas las especificaciones de venta <ChevronDown size={16} /></>
              )}
            </button>

            {showAdvanced && (
              <div className="aform__grid border-t border-white/5 pt-4 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="number" name="precio" placeholder="Precio (€)" value={form.precio} onChange={onChange} />
                  <input name="notaprecio" placeholder="Nota de precio (Ej: /mes, Pago único)" value={form.notaprecio} onChange={onChange} />
                  <input name="duracion" placeholder="Tiempo estimado (Ej: 5 días laborables)" value={form.duracion} onChange={onChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="subtitulo" placeholder="Subtítulo expandido" value={form.subtitulo} onChange={onChange} />
                  <div className="flex items-center gap-3 bg-[#1a1b2d] px-3 rounded-xl border border-white/10">
                    <span className="text-white/40 text-sm">Color Etiqueta:</span>
                    <input type="color" name="coloretiquetas" value={form.coloretiquetas} onChange={onChange} className="w-10 h-8 cursor-pointer bg-transparent border-none" />
                  </div>
                </div>
                <input name="incluye" placeholder="¿Qué incluye? (Separado por comas: Soporte, Hosting, Código)" value={form.incluye} onChange={onChange} />
                <textarea name="largadescripcion" placeholder="Detalles avanzados o condiciones del servicio" value={form.largadescripcion} onChange={onChange} className="aform__textarea h-32" />
              </div>
            )}

            {errMsg && <div className="aform__err">✗ {errMsg}</div>}
            {ok && <div className="aform__ok">✓ Guardado con éxito</div>}
            <button onClick={onSubmit} disabled={saving} className="aform__submit mt-4">{saving ? "Guardando..." : "Crear servicio"}</button>
          </div>
        </div>
      )}
    </div>
  );
};