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

export interface IHabilidad {
  id?: string;
  nombre: string;
  categoria: string;
  icono?: string;
  creacion?: string;
}

export interface IEstudio {
  id?: string;
  created_at?: string;
  titulo: string;
  subtitulo?: string;
  fecha?: string;
  estado?: string;
  etiquetas?: string[];
  orden?: number;
}

interface Store {
  cursos: ICursos[];
  servicios: IServicio[];
  proyectos: IProyectos[];
  habilidades: IHabilidad[];
  estudios: IEstudio[];
  loading: boolean;
  error: string | null;
  addCurso: (curso: ICursos) => Promise<void>;
  deleteCurso: (id: number) => Promise<void>;
  addServicio: (servicio: IServicio) => Promise<void>;
  deleteServicio: (id: number) => Promise<void>;
  addProyecto: (proyecto: IProyectos) => Promise<void>;
  deleteProyecto: (id: number) => Promise<void>;
  addHabilidad: (habilidad: IHabilidad) => Promise<void>;
  deleteHabilidad: (id: string) => Promise<void>;
  addEstudio: (estudio: IEstudio) => Promise<void>;
  deleteEstudio: (id: string) => Promise<void>;
}

const StoreContext = createContext<Store>({} as Store);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cursos, setCursos] = useState<ICursos[]>([]);
  const [servicios, setServicios] = useState<IServicio[]>([]);
  const [proyectos, setProyectos] = useState<IProyectos[]>([]);
  const [habilidades, setHabilidades] = useState<IHabilidad[]>([]);
  const [estudios, setEstudios] = useState<IEstudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarTodo();

    const channel = supabase
      ?.channel("portfolio-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "Cursos" }, cargarCursos)
      .on("postgres_changes", { event: "*", schema: "public", table: "Servicios" }, cargarServicios)
      .on("postgres_changes", { event: "*", schema: "public", table: "Proyectos" }, cargarProyectos)
      .on("postgres_changes", { event: "*", schema: "public", table: "habilidades" }, cargarHabilidades)
      .on("postgres_changes", { event: "*", schema: "public", table: "estudios" }, cargarEstudios)
      .subscribe();

    return () => {
      if (channel) supabase?.removeChannel(channel);
    };
  }, []);

  async function cargarTodo() {
    setLoading(true);
    await Promise.all([
      cargarCursos(), 
      cargarServicios(), 
      cargarProyectos(), 
      cargarHabilidades(),
      cargarEstudios()
    ]);
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

  async function cargarHabilidades() {
    if (!supabase) return;
    const { data, error } = await supabase.from("habilidades").select("*").order("creacion", { ascending: false });
    if (error) { setError(error.message); return; }
    setHabilidades(data || []);
  }

  async function cargarEstudios() {
    if (!supabase) return;
    // Nombre de tabla en minúsculas: 'estudios'
    const { data, error } = await supabase.from("estudios").select("*");
    if (error) { setError(error.message); return; }
    setEstudios(data || []);
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

  async function addHabilidad(habilidad: IHabilidad) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { error } = await supabase.from("habilidades").upsert([habilidad]);
    if (error) throw error;
    await cargarHabilidades();
  }

  async function addEstudio(estudio: IEstudio) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { error } = await supabase.from("estudios").upsert([estudio]);
    if (error) throw error;
    await cargarEstudios();
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

  async function deleteHabilidad(id: string) {
    if (!supabase) return;
    const { error } = await supabase.from("habilidades").delete().eq("id", id);
    if (error) { console.error(error); return; }
    setHabilidades((prev) => prev.filter((h) => h.id !== id));
  }

  async function deleteEstudio(id: string) {
    if (!supabase) return;
    const { error } = await supabase.from("estudios").delete().eq("id", id);
    if (error) { console.error(error); return; }
    setEstudios((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <StoreContext.Provider value={{
      cursos, servicios, proyectos, habilidades, estudios, loading, error,
      addCurso, deleteCurso, addServicio, deleteServicio, addProyecto, deleteProyecto, addHabilidad, deleteHabilidad, addEstudio, deleteEstudio
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);