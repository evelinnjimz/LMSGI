export interface Project {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  image: string;
  tags: string[];
  accent: string;
  year: string;
  status: "Completado" | "En progreso";
  features: string[];
  demo: string;
  github: string;
}

export const proyectos: Project[] = [
  {
    id: 1,
    title: "Fintrack",
    subtitle: "Finanzas Personales",
    desc: "App para registrar gastos e ingresos con gráficos mensuales y exportación a CSV.",
    longDesc: "Fintrack nació de la necesidad de tener un control visual y claro de mis finanzas personales. Permite registrar ingresos y gastos, organizarlos por categorías, ver resúmenes mensuales en gráficos interactivos y exportar todo a CSV. La autenticación está hecha con Google a través de Supabase.",
    image: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["React", "TypeScript", "Supabase", "Recharts"],
    accent: "#a78bfa",
    year: "2024",
    status: "Completado",
    features: [
      "Dashboard con resumen mensual de ingresos y gastos",
      "Gráficos de barras y dona por categoría",
      "Exportación de datos a CSV",
      "Autenticación con Google vía Supabase",
      "Modo oscuro nativo",
    ],
    demo: "#",
    github: "#",
  },
  {
    id: 2,
    title: "LinkBio",
    subtitle: "Página de Links",
    desc: "Generador tipo Linktree con editor en tiempo real y analíticas de clics.",
    longDesc: "LinkBio es una alternativa a Linktree construida desde cero. Tiene un editor en tiempo real donde puedes personalizar colores, fuentes y ordenar los links con drag & drop. Cada link registra sus clics en una base de datos para ver cuáles funcionan mejor.",
    image: "https://images.unsplash.com/photo-1554177255-61502b352de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["Next.js", "Tailwind", "Prisma", "PostgreSQL"],
    accent: "#60a5fa",
    year: "2024",
    status: "Completado",
    features: [
      "Editor visual con preview en tiempo real",
      "Temas de color y tipografía personalizables",
      "Drag & drop para reordenar links",
      "Analíticas de clics por enlace",
      "URL personalizada por usuario",
    ],
    demo: "#",
    github: "#",
  },
  {
    id: 3,
    title: "UI Kit",
    subtitle: "Component Library",
    desc: "Librería de 30+ componentes React documentados con Storybook y soporte dark mode.",
    longDesc: "Un sistema de componentes reutilizables construido con React, TypeScript y Radix UI como base accesible. Cada componente está documentado en Storybook con ejemplos de uso, variantes y props. Incluye theming completo y soporte para dark mode.",
    image: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["React", "TypeScript", "Storybook", "Radix UI"],
    accent: "#818cf8",
    year: "2023",
    status: "En progreso",
    features: [
      "30+ componentes accesibles con Radix UI",
      "Documentación interactiva en Storybook",
      "Sistema de theming con CSS variables",
      "Dark mode y light mode",
      "Publicado como paquete npm",
    ],
    demo: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Portfolio v1",
    subtitle: "Rediseño Personal",
    desc: "Primera versión de mi portafolio. Diseño y desarrollo completo desde cero con CSS puro.",
    longDesc: "El primer portafolio que construí desde cero, sin frameworks ni librerías de UI. Fue el proyecto donde aprendí realmente a maquetar, animar con CSS y hacer un sitio responsive que se vea bien en cualquier dispositivo. El diseño lo hice en Figma antes de tocar código.",
    image: "https://images.unsplash.com/photo-1746365588686-a3e1846a3476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["HTML", "CSS", "JavaScript", "Figma"],
    accent: "#e879a0",
    year: "2023",
    status: "Completado",
    features: [
      "Diseño completo en Figma antes de codear",
      "Animaciones con CSS puro y keyframes",
      "100% responsive sin frameworks",
      "Modo oscuro con CSS variables",
      "Score 98 en Lighthouse performance",
    ],
    demo: "#",
    github: "#",
  },
  {
    id: 5,
    title: "TaskFlow",
    subtitle: "Gestor de Tareas",
    desc: "Kanban board con drag & drop, prioridades y vista de calendario semanal.",
    longDesc: "TaskFlow es un gestor de tareas tipo Kanban con columnas personalizables, drag & drop entre columnas, etiquetas de prioridad (alta, media, baja), fechas límite y una vista de calendario semanal. Todo persiste en localStorage sin necesidad de backend.",
    image: "https://images.unsplash.com/photo-1615803697515-3cb782c2a65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["React", "TypeScript", "React DnD", "Zustand"],
    accent: "#5ecfa0",
    year: "2024",
    status: "Completado",
    features: [
      "Tablero Kanban con columnas personalizables",
      "Drag & drop entre columnas con React DnD",
      "Etiquetas de prioridad por tarea",
      "Vista de calendario semanal",
      "Persistencia automática en localStorage",
    ],
    demo: "#",
    github: "#",
  },
  {
    id: 6,
    title: "WeatherNow",
    subtitle: "Clima en Tiempo Real",
    desc: "App del clima con pronóstico de 7 días, íconos animados y geolocalización.",
    longDesc: "WeatherNow consume la API de OpenWeatherMap para mostrar el clima actual y el pronóstico de 7 días de cualquier ciudad del mundo. Tiene geolocalización automática, íconos animados según la condición climática y un historial de búsquedas recientes.",
    image: "https://images.unsplash.com/photo-1534271057238-c2c170a76672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["React", "OpenWeather API", "CSS Modules"],
    accent: "#f97316",
    year: "2023",
    status: "Completado",
    features: [
      "Clima actual y pronóstico de 7 días",
      "Búsqueda por ciudad con autocompletado",
      "Geolocalización automática",
      "Íconos animados según condición",
      "Historial de ciudades recientes",
    ],
    demo: "#",
    github: "#",
  },
];