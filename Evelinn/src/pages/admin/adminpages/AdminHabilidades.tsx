import { useState } from "react";
import {
  Trash2,
  Plus,
  List,
  Code2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Tag,
  Star
} from "lucide-react";
import { useStore } from "../../../components/contexto/Contexto";

const EMPTY = {
  nombre: "",
  categoria: "",
  icono: "",
};

export const AdminHabilidades = () => {
  // Asegúrate de tener estas funciones y estado en tu Contexto/Zustand
  const { habilidades = [], addHabilidad, deleteHabilidad, loading } = useStore();

  const [vista, setVista] = useState<"lista" | "nuevo">("lista");
  const [form, setForm] = useState(EMPTY);
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm font-medium">Cargando habilidades desde Supabase...</p>
      </div>
    );
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    if (!form.nombre.trim() || !form.categoria.trim()) {
      setErrMsg("El nombre y la categoría son obligatorios");
      return;
    }
    try {
      setSaving(true);
      setErrMsg("");

      // Supabase requiere un UUID para el id y un timestamp para creacion
      const habilidadData = {
        id: crypto.randomUUID(), 
        nombre: form.nombre,
        categoria: form.categoria,
        icono: form.icono,
        creacion: new Date().toISOString(),
      };

      await addHabilidad(habilidadData);

      setForm(EMPTY);
      setOk(true);
      setTimeout(() => {
        setOk(false);
        setVista("lista");
      }, 1400);
    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar la habilidad");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100">
      {/* HEADER DE LA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Habilidades Técnicas
            </h1>
            <p className="text-sm text-slate-400 mt-0.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {(habilidades || []).length} habilidad{(habilidades || []).length !== 1 ? "es" : ""} registrada{(habilidades || []).length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* NAVEGACIÓN TAB */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800/80 self-start sm:self-auto">
          <button
            onClick={() => setVista("lista")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              vista === "lista"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <List className="w-4 h-4" /> Listado
          </button>
          <button
            onClick={() => setVista("nuevo")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              vista === "nuevo"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Plus className="w-4 h-4" /> Nueva Habilidad
          </button>
        </div>
      </div>

      {/* VISTA 1: LISTADO DE HABILIDADES */}
      {vista === "lista" && (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {(habilidades || []).length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
              <div className="p-4 bg-slate-800/50 rounded-full text-slate-500">
                <Code2 className="w-8 h-8" />
              </div>
              <p className="text-slate-400 font-medium text-base">
                No hay habilidades guardadas aún
              </p>
              <button
                onClick={() => setVista("nuevo")}
                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
              >
                <Plus className="w-4 h-4" /> Añadir mi primera habilidad
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">Habilidad</th>
                    <th className="py-4 px-6 font-semibold">Categoría</th>
                    <th className="py-4 px-6 font-semibold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {(habilidades || []).map((h) => (
                    <tr
                      key={h.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/60 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {h.icono ? (
                              <img
                                src={h.icono}
                                alt={h.nombre}
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-slate-500" />
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-white block group-hover:text-indigo-300 transition-colors">
                              {h.nombre}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
                          {h.categoria}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => h.id && deleteHabilidad(h.id)}
                          title="Eliminar habilidad"
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* VISTA 2: FORMULARIO DE NUEVA HABILIDAD */}
      {vista === "nuevo" && (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-3xl mx-auto">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
            <Star className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">
              Añadir Nueva Habilidad
            </h2>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nombre */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Nombre de la Habilidad *
                </label>
                <input
                  name="nombre"
                  placeholder="Ej: React, Node.js, Figma..."
                  value={form.nombre}
                  onChange={onChange}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Categoría */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-indigo-400" /> Categoría *
                </label>
                <input
                  name="categoria"
                  placeholder="Ej: Frontend, Backend, Diseño..."
                  value={form.categoria}
                  onChange={onChange}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Icono */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-indigo-400" /> URL del Icono (SVG/PNG)
                </label>
                <input
                  name="icono"
                  placeholder="https://cdn.iconscout.com/icon/.../react.svg"
                  value={form.icono}
                  onChange={onChange}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* ALERTAS Y MENSAJES */}
            {errMsg && (
              <div className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errMsg}</span>
              </div>
            )}

            {ok && (
              <div className="flex items-center gap-2 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>¡Habilidad añadida correctamente!</span>
              </div>
            )}

            {/* BOTÓN SUBMIT */}
            <div className="pt-4">
              <button
                onClick={onSubmit}
                disabled={saving}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando habilidad...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Guardar Habilidad</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};