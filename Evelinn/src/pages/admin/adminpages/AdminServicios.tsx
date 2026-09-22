import React, { useState } from "react";
import { 
  Trash2, Plus, List, ChevronDown, ChevronUp, 
  Wrench, Check, AlertCircle, Sparkles, Layers 
} from "lucide-react";
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-medium text-sm tracking-wide">Cargando servicios desde Supabase...</p>
        </div>
      </div>
    );
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        precio: Number(form.precio) || 0,
        notaprecio: form.notaprecio,
        duracion: form.duracion,
        incluye: form.incluye
      };

      await addServicio(servicioData as any);

      setForm(EMPTY);
      setShowAdvanced(false);
      setOk(true);
      setTimeout(() => { 
        setOk(false); 
        setVista("lista"); 
      }, 1400);
    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar el servicio");
    } finally {
      setSaving(false);
    }
  };

  const totalServicios = (servicios || []).length;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 ">
      
      {/* ── 1. TARJETA DE CABECERA Y CONMUTADOR DE VISTA ── */}
      <div className="bg-[#0b0f19] rounded-2xl border border-slate-800/80 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <Wrench size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Gestión de Servicios
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-slate-400 text-xs font-medium">
                {totalServicios} {totalServicios === 1 ? "servicio registrado" : "servicios registrados"}
              </p>
            </div>
          </div>
        </div>

        {/* Pestañas de Navegación Estilo Píldora */}
        <div className="flex items-center gap-1 bg-[#05070d] p-1.5 rounded-xl border border-slate-800/80 self-start md:self-auto shadow-inner">
          <button
            onClick={() => setVista("lista")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              vista === "lista"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <List size={15} />
            <span>Listado</span>
          </button>
          <button
            onClick={() => setVista("nuevo")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
              vista === "nuevo"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Plus size={15} />
            <span>Nuevo Servicio</span>
          </button>
        </div>
      </div>

      {/* ── 2. VISTA DE LISTADO ── */}
      {vista === "lista" && (
        <div className="bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">
          {totalServicios === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 mb-4">
                <Wrench size={24} />
              </div>
              <h3 className="text-slate-200 font-bold text-lg mb-1">No hay servicios registrados</h3>
              <p className="text-slate-400 text-sm max-w-md mb-6">
                Aún no has añadido ningún servicio a la plataforma. Comienza creando el primero.
              </p>
              <button
                onClick={() => setVista("nuevo")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <Plus size={16} /> Crear Servicio
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-slate-950/40 text-slate-400 text-xs uppercase tracking-wider font-bold">
                    <th className="py-4 px-6">Servicio</th>
                    <th className="py-4 px-6">Etiquetas</th>
                    <th className="py-4 px-6">Precio</th>
                    <th className="py-4 px-6 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-sm">
                  {(servicios || []).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="py-4 px-6 font-semibold text-white">
                        <div className="flex items-center gap-3">
                          {s.imagen ? (
                            <img
                              src={s.imagen}
                              alt={s.titulo}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                              {s.titulo?.charAt(0)?.toUpperCase() || "S"}
                            </div>
                          )}
                          <div>
                            <p className="text-white group-hover:text-indigo-400 transition-colors font-bold">
                              {s.titulo}
                            </p>
                            {s.duracion && (
                              <p className="text-xs text-slate-400 mt-0.5">{s.duracion}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        {s.etiquetas ? (
                          <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/80 border border-slate-700/70 text-indigo-300">
                            {s.etiquetas}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">Sin etiquetas</span>
                        )}
                      </td>
                      
                      <td className="py-4 px-6 font-bold text-slate-200">
                        {s.precio ? (
                          <span className="text-indigo-400 font-extrabold">{s.precio}€</span>
                        ) : (
                          <span className="text-slate-400 text-xs font-medium">Consultar / Gratis</span>
                        )}
                        {s.notaprecio && (
                          <span className="text-xs text-slate-400 font-normal ml-1">({s.notaprecio})</span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => s.id && deleteServicio(s.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                          title="Eliminar servicio"
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

      {/* ── 3. VISTA DE CREACIÓN (FORMULARIO) ── */}
      {vista === "nuevo" && (
        <div className="bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="border-b border-slate-800/80 pb-5 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Crear Nuevo Servicio</h2>
              <p className="text-xs text-slate-400 mt-1">Completa la información para agregar una oferta a tu catálogo.</p>
            </div>
            <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
              <Sparkles size={18} />
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Campos Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Título del servicio <span className="text-indigo-400">*</span>
                </label>
                <input
                  name="titulo"
                  placeholder="Ej: Desarrollo Web Fullstack"
                  value={form.titulo}
                  onChange={onChange}
                  className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Etiquetas principales <span className="text-indigo-400">*</span>
                </label>
                <input
                  name="etiquetas"
                  placeholder="Ej: React, Tailwind, Supabase"
                  value={form.etiquetas}
                  onChange={onChange}
                  className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  URL de la imagen (Opcional)
                </label>
                <input
                  name="imagen"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={form.imagen}
                  onChange={onChange}
                  className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Breve descripción
                </label>
                <textarea
                  name="descripcion"
                  rows={3}
                  placeholder="Resume en 2 o 3 frases lo que ofrece este servicio..."
                  value={form.descripcion}
                  onChange={onChange}
                  className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
                />
              </div>
            </div>

            {/* Acordeón Opciones Avanzadas / Ventas */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-slate-300 text-sm font-semibold transition-all group cursor-pointer"
              >
                <span className="flex items-center gap-2 text-indigo-400 group-hover:text-indigo-300 font-medium">
                  <Layers size={16} />
                  {showAdvanced ? "Ocultar especificaciones de venta" : "Ver todas las especificaciones de venta (Precio, tiempo, detalles)"}
                </span>
                {showAdvanced ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
              </button>

              {showAdvanced && (
                <div className="mt-4 p-5 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-5 animate-in fade-in duration-200">
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Precio (€)</label>
                      <input
                        type="number"
                        name="precio"
                        placeholder="0"
                        value={form.precio}
                        onChange={onChange}
                        className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nota de precio</label>
                      <input
                        name="notaprecio"
                        placeholder="Ej: /mes, Pago único, Desde"
                        value={form.notaprecio}
                        onChange={onChange}
                        className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiempo estimado</label>
                      <input
                        name="duracion"
                        placeholder="Ej: 5 días laborables"
                        value={form.duracion}
                        onChange={onChange}
                        className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subtítulo expandido</label>
                      <input
                        name="subtitulo"
                        placeholder="Subtítulo complementario"
                        value={form.subtitulo}
                        onChange={onChange}
                        className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Color de la etiqueta</label>
                      <div className="flex items-center gap-3 bg-slate-900/70 border border-slate-700/80 rounded-xl px-3 py-1.5">
                        <input
                          type="color"
                          name="coloretiquetas"
                          value={form.coloretiquetas}
                          onChange={onChange}
                          className="w-8 h-8 cursor-pointer bg-transparent border-0 rounded"
                        />
                        <span className="text-xs font-mono text-slate-300">{form.coloretiquetas}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">¿Qué incluye?</label>
                    <input
                      name="incluye"
                      placeholder="Soporte 24/7, Documentación, Código Fuente (Separado por comas)"
                      value={form.incluye}
                      onChange={onChange}
                      className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detalles avanzados</label>
                    <textarea
                      name="largadescripcion"
                      rows={4}
                      placeholder="Condiciones del servicio, alcance completo o requerimientos del cliente..."
                      value={form.largadescripcion}
                      onChange={onChange}
                      className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-y"
                    />
                  </div>

                </div>
              )}
            </div>

            {/* Mensajes de Estado */}
            {errMsg && (
              <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
                <AlertCircle size={18} className="shrink-0" />
                <span>{errMsg}</span>
              </div>
            )}

            {ok && (
              <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm font-medium">
                <Check size={18} className="shrink-0" />
                <span>¡Servicio guardado con éxito!</span>
              </div>
            )}

            {/* Botón de Enviar */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Crear Servicio</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};