import { useState } from "react";
import {
  Trash2,
  Plus,
  List,
  ChevronDown,
  ChevronUp,
  FolderKanban,
  ExternalLink,
  Tag,
  Calendar,
  Globe,
  Image as ImageIcon,
  Palette,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Layers,
  Code2
} from "lucide-react";
import { useStore } from "../../../components/contexto/Contexto";

const EMPTY = {
  titulo: "",
  subtitulo: "",
  etiquetas: "",
  coloretiquetas: "#6366f1",
  descripcion: "",
  largadescripcion: "",
  imagen: "",
  fecha: new Date().toISOString().split("T")[0],
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

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-sm font-medium">Cargando proyectos desde Supabase...</p>
      </div>
    );
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        imagen: form.imagen || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
        etiquetas: form.etiquetas,
        coloretiquetas: form.coloretiquetas || "#6366f1",
        fecha: form.fecha,
        estado: form.estado,
        caracteristicas: form.caracteristicas,
        link: form.link,
      };

      await addProyecto(proyectoData);

      setForm(EMPTY);
      setShowAdvanced(false);
      setOk(true);
      setTimeout(() => {
        setOk(false);
        setVista("lista");
      }, 1400);
    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar el proyecto");
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
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Trabajos & Proyectos
            </h1>
            <p className="text-sm text-slate-400 mt-0.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {(proyectos || []).length} proyecto{(proyectos || []).length !== 1 ? "s" : ""} registrado{(proyectos || []).length !== 1 ? "s" : ""}
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
            <Plus className="w-4 h-4" /> Nuevo Proyecto
          </button>
        </div>
      </div>

      {/* VISTA 1: LISTADO DE PROYECTOS */}
      {vista === "lista" && (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {(proyectos || []).length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
              <div className="p-4 bg-slate-800/50 rounded-full text-slate-500">
                <FolderKanban className="w-8 h-8" />
              </div>
              <p className="text-slate-400 font-medium text-base">
                No hay proyectos guardados aún
              </p>
              <button
                onClick={() => setVista("nuevo")}
                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
              >
                <Plus className="w-4 h-4" /> Crear mi primer proyecto
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">Proyecto</th>
                    <th className="py-4 px-6 font-semibold">Etiquetas</th>
                    <th className="py-4 px-6 font-semibold">Enlace</th>
                    <th className="py-4 px-6 font-semibold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {(proyectos || []).map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/60 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {p.imagen ? (
                              <img
                                src={p.imagen}
                                alt={p.titulo}
                                className="w-full h-full object-cover"
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
                              {p.titulo}
                            </span>
                            {p.subtitulo && (
                              <span className="text-xs text-slate-400 block line-clamp-1">
                                {p.subtitulo}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border"
                          style={{
                            backgroundColor: `${p.coloretiquetas || "#6366f1"}15`,
                            color: p.coloretiquetas || "#818cf8",
                            borderColor: `${p.coloretiquetas || "#6366f1"}30`,
                          }}
                        >
                          {p.etiquetas || "General"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {p.link ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 hover:underline font-medium"
                          >
                            <span>Visitar</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-slate-500 text-xs">Sin enlace</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => p.id && deleteProyecto(p.id)}
                          title="Eliminar proyecto"
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

      {/* VISTA 2: FORMULARIO DE NUEVO PROYECTO */}
      {vista === "nuevo" && (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">
              Crear Nuevo Proyecto
            </h2>
          </div>

          <div className="space-y-5">
            {/* CAMPOS BÁSICOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Título */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <FolderKanban className="w-3.5 h-3.5 text-indigo-400" /> Título del proyecto *
                </label>
                <input
                  name="titulo"
                  placeholder="Ej: E-Commerce Redesign"
                  value={form.titulo}
                  onChange={onChange}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Etiquetas */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-indigo-400" /> Etiquetas *
                </label>
                <input
                  name="etiquetas"
                  placeholder="Ej: UI/UX, React, E-Commerce"
                  value={form.etiquetas}
                  onChange={onChange}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* URL Link */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" /> URL Enlace Web
                </label>
                <input
                  name="link"
                  placeholder="https://micartera.com/proyecto"
                  value={form.link}
                  onChange={onChange}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* URL Imagen */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-indigo-400" /> URL de Captura o Portada
                </label>
                <input
                  name="imagen"
                  placeholder="https://midominio.com/imagen.jpg"
                  value={form.imagen}
                  onChange={onChange}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Descripción Resumida */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-indigo-400" /> Descripción Resumida
              </label>
              <textarea
                name="descripcion"
                placeholder="Resumen corto de los logros, objetivos o metas del proyecto..."
                value={form.descripcion}
                onChange={onChange}
                rows={3}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
              />
            </div>

            {/* BOTÓN DESPLEGABLE DE OPCIONES AVANZADAS */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 px-3 py-2 rounded-lg transition-all"
              >
                {showAdvanced ? (
                  <>
                    <span>Ocultar detalles de producción</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Ver más detalles de producción</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* SECCIÓN DESPLEGABLE */}
            {showAdvanced && (
              <div className="p-5 bg-slate-950/50 border border-slate-800/80 rounded-xl space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Fecha */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Fecha
                    </label>
                    <input
                      type="date"
                      name="fecha"
                      value={form.fecha}
                      onChange={onChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Estado */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" /> Estado
                    </label>
                    <input
                      name="estado"
                      placeholder="Ej: Completado, En desarrollo"
                      value={form.estado}
                      onChange={onChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Color de Etiquetas */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-indigo-400" /> Color Distintivo
                    </label>
                    <div className="flex items-center gap-3 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800">
                      <input
                        type="color"
                        name="coloretiquetas"
                        value={form.coloretiquetas}
                        onChange={onChange}
                        className="w-8 h-7 cursor-pointer bg-transparent border-0 rounded"
                      />
                      <span className="text-xs text-slate-400 font-mono">
                        {form.coloretiquetas}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtítulo / Cliente */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">
                    Subtítulo / Nombre del Cliente
                  </label>
                  <input
                    name="subtitulo"
                    placeholder="Ej: Cliente corporativo o Subtítulo descriptivo"
                    value={form.subtitulo}
                    onChange={onChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Tecnologías / Características */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Tecnologías clave
                  </label>
                  <input
                    name="caracteristicas"
                    placeholder="Ej: Next.js, Tailwind CSS, Supabase, TypeScript"
                    value={form.caracteristicas}
                    onChange={onChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Descripción Detallada */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">
                    Caso de Estudio / Descripción Larga
                  </label>
                  <textarea
                    name="largadescripcion"
                    placeholder="Explicación detallada de la arquitectura, retos, metodología y resultados..."
                    value={form.largadescripcion}
                    onChange={onChange}
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>
            )}

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
                <span>¡Proyecto creado correctamente!</span>
              </div>
            )}

            {/* BOTÓN SUBMIT */}
            <div className="pt-2">
              <button
                onClick={onSubmit}
                disabled={saving}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando proyecto...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Guardar Proyecto</span>
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