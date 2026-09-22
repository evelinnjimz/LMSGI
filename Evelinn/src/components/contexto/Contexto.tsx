import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../../lib/supabaseClient"; 

export interface ICursos {
  id?: number;
  created_at?: string;
  titulo: string;
  subtitulo?: string;
  descripcion?: string;
  largadescripcion?: string;
  imagen?: string;
  etiquetas?: string;
  coloretiqueta?: string;
  duracion?: string;
  nivel?: string;
  clases?: string;
  enlace?: string;
}

export interface IServicio {
  id?: number;
  created_at?: string;
  titulo: string;
  subtitulo?: string;
  descripcion?: string;
  largadescripcion?: string;
  imagen?: string;
  etiquetas?: string;
  coloretiqueta?: string;
  precio: number;
  notaprecio?: string;
  duracion?: string;
  incluye?: string;
}

export interface IProyectos {
  id?: number;
  created_at?: string;
  titulo: string;
  subtitulo?: string;
  descripcion?: string;
  largadescripcion?: string;
  imagen?: string;
  etiquetas?: string;
  coloretiquetas?: string;
  fecha?: string;
  estado?: string;
  caracteristicas?: string;
  link?: string;
}

interface Store {
  cursos: ICursos[];
  servicios: IServicio[];
  proyectos: IProyectos[];
  loading: boolean;
  error: string | null;
  addCurso: (curso: ICursos) => Promise<void>;
  deleteCurso: (id: number) => Promise<void>;
  addServicio: (servicio: IServicio) => Promise<void>;
  deleteServicio: (id: number) => Promise<void>;
  addProyecto: (proyecto: IProyectos) => Promise<void>;
  deleteProyecto: (id: number) => Promise<void>;
}

const StoreContext = createContext<Store>({} as Store);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cursos, setCursos] = useState<ICursos[]>([]);
  const [servicios, setServicios] = useState<IServicio[]>([]);
  const [proyectos, setProyectos] = useState<IProyectos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarTodo();

    const channel = supabase
      ?.channel("portfolio-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "Cursos" }, cargarCursos)
      .on("postgres_changes", { event: "*", schema: "public", table: "Servicios" }, cargarServicios)
      .on("postgres_changes", { event: "*", schema: "public", table: "Proyectos" }, cargarProyectos)
      .subscribe();

    return () => {
      if (channel) supabase?.removeChannel(channel);
    };
  }, []);

  async function cargarTodo() {
    setLoading(true);
    await Promise.all([cargarCursos(), cargarServicios(), cargarProyectos()]);
    setLoading(false);
  }

  async function cargarCursos() {
    if (!supabase) return;
    const { data, error } = await supabase.from("Cursos").select("*").order("id", { ascending: false });
    if (error) { setError(error.message); return; }
    setCursos(data || []);
  }

  async function cargarServicios() {
    if (!supabase) return;
    const { data, error } = await supabase.from("Servicios").select("*").order("id", { ascending: false });
    if (error) { setError(error.message); return; }
    setServicios(data || []);
  }

  async function cargarProyectos() {
    if (!supabase) return;
    const { data, error } = await supabase.from("Proyectos").select("*").order("id", { ascending: false });
    if (error) { setError(error.message); return; }
    setProyectos(data || []);
  }

  async function addCurso(curso: ICursos) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { error } = await supabase.from("Cursos").upsert([curso]);
    if (error) throw error;
    await cargarCursos();
  }

  async function addServicio(servicio: IServicio) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { error } = await supabase.from("Servicios").upsert([servicio]);
    if (error) throw error;
    await cargarServicios();
  }

  async function addProyecto(proyecto: IProyectos) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { error } = await supabase.from("Proyectos").upsert([proyecto]);
    if (error) throw error;
    await cargarProyectos();
  }

  async function deleteCurso(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("Cursos").delete().eq("id", id);
    if (error) { console.error(error); return; }
    setCursos((prev) => prev.filter((c) => c.id !== id));
  }

  async function deleteServicio(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("Servicios").delete().eq("id", id);
    if (error) { console.error(error); return; }
    setServicios((prev) => prev.filter((s) => s.id !== id));
  }

  async function deleteProyecto(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("Proyectos").delete().eq("id", id);
    if (error) { console.error(error); return; }
    setProyectos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <StoreContext.Provider value={{
      cursos, servicios, proyectos, loading, error,
      addCurso, deleteCurso, addServicio, deleteServicio, addProyecto, deleteProyecto
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);