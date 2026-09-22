export interface Course {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  image: string;
  tags: string[];
  accent: string;
  duration: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  students: string;
  lessons: string[];
  link: string;
}

export const cursos: Course[] = [
  {
    id: 1,
    title: "Diseño de Interfaces Modernas",
    subtitle: "Figma + React + Tailwind",
    desc: "De wireframe a componente final. Todo el proceso de diseño y desarrollo en un solo curso.",
    longDesc: "Un curso completo que cubre todo el flujo de trabajo moderno: diseñar en Figma, trasladar el diseño a React y estilarlo con Tailwind CSS. Aprenderás a pensar como diseñadora y desarrolladora al mismo tiempo.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["Figma", "React", "Tailwind CSS"],
    accent: "#e879a0",
    duration: "8h",
    level: "Intermedio",
    students: "340+",
    lessons: [
      "Fundamentos de diseño UI y sistemas visuales",
      "Prototipado en Figma desde cero",
      "Componentes React bien estructurados",
      "Estilado con Tailwind CSS v4",
      "Responsive design y mobile-first",
    ],
    link: "#",
  },
  {
    id: 2,
    title: "CSS que Impresiona",
    subtitle: "Animaciones y trucos avanzados",
    desc: "Animaciones, grid avanzado y los trucos de CSS que nadie te enseñó en otros cursos.",
    longDesc: "Aprende las técnicas de CSS que marcan la diferencia entre un sitio aburrido y uno que deja huella. Keyframes, transitions, custom properties, grid avanzado y micro-interacciones explicadas desde cero.",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["CSS", "Animaciones", "Grid"],
    accent: "#818cf8",
    duration: "5h",
    level: "Básico",
    students: "210+",
    lessons: [
      "Custom properties y theming dinámico",
      "Animaciones con keyframes y transitions",
      "CSS Grid avanzado para layouts complejos",
      "Micro-interacciones que sorprenden",
      "Performance de animaciones en el navegador",
    ],
    link: "#",
  },
  {
    id: 3,
    title: "Portafolio desde Cero",
    subtitle: "Diseño, código y publicación",
    desc: "Construye tu portafolio profesional paso a paso. Desde el diseño hasta publicarlo en línea.",
    longDesc: "El portafolio es tu carta de presentación. En este curso construimos uno completo: diseño en Figma, desarrollo con React y deploy en Vercel. Incluye estrategias para mostrar tus proyectos de la mejor manera.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["React", "Figma", "Vercel"],
    accent: "#5ecfa0",
    duration: "6h",
    level: "Básico",
    students: "180+",
    lessons: [
      "Estrategia y contenido del portafolio",
      "Diseño en Figma paso a paso",
      "Desarrollo con React y CSS",
      "Deploy en Vercel con dominio personalizado",
      "SEO básico y optimización de imágenes",
    ],
    link: "#",
  },
];
