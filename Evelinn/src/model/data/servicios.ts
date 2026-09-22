export interface Service {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  image: string;
  tags: string[];
  accent: string;
  price: string;
  priceNote: string;
  deliveryTime: string;
  includes: string[];
}

export const servicios: Service[] = [
  {
    id: 1,
    title: "Landing Page",
    subtitle: "Diseño + Desarrollo",
    desc: "Una página de presentación rápida, bonita y optimizada para convertir visitas en clientes.",
    longDesc: "Diseño y desarrollo completo de tu landing page desde cero. Desde el concepto visual hasta el deploy en producción. Incluye diseño en Figma, desarrollo en React o HTML/CSS puro, formulario de contacto funcional y versión 100% responsive.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["Figma", "React", "Tailwind", "SEO"],
    accent: "#e879a0",
    price: "€350",
    priceNote: "pago único",
    deliveryTime: "5–7 días",
    includes: [
      "Diseño personalizado en Figma",
      "Desarrollo responsive (móvil + desktop)",
      "Formulario de contacto funcional",
      "Optimización básica de SEO",
      "Deploy incluido (Vercel o Netlify)",
      "1 ronda de revisiones",
    ],
  },
  {
    id: 2,
    title: "Web Completa",
    subtitle: "Multi-página a medida",
    desc: "Sitio web de varias páginas con diseño propio, CMS opcional y listo para escalar.",
    longDesc: "Desarrollo de sitio web completo con múltiples páginas, sistema de navegación, blog o CMS opcional y diseño a medida. Ideal para portfolios profesionales, pequeñas empresas o proyectos personales que necesitan más que una landing.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["Next.js", "TypeScript", "CMS", "Supabase"],
    accent: "#818cf8",
    price: "€800",
    priceNote: "desde",
    deliveryTime: "2–3 semanas",
    includes: [
      "Diseño completo en Figma de todas las páginas",
      "Desarrollo con Next.js y TypeScript",
      "Panel de administración o CMS opcional",
      "Autenticación de usuarios si se necesita",
      "Optimización de rendimiento y SEO",
      "2 rondas de revisiones",
    ],
  },
  {
    id: 3,
    title: "Diseño UI",
    subtitle: "Solo diseño en Figma",
    desc: "Diseño de interfaz completo en Figma listo para que tu equipo de dev lo implemente.",
    longDesc: "Diseño de interfaz de usuario en Figma con componentes organizados, guía de estilos, tokens de color y tipografía, y prototipo interactivo. Entrego todo documentado para que cualquier desarrollador pueda implementarlo sin preguntas.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["Figma", "Design System", "Prototipado"],
    accent: "#60a5fa",
    price: "€250",
    priceNote: "por proyecto",
    deliveryTime: "3–5 días",
    includes: [
      "Wireframes de baja fidelidad",
      "Diseño final en alta fidelidad",
      "Componentes organizados en Figma",
      "Guía de estilos (colores, tipografía, espaciado)",
      "Prototipo interactivo navegable",
      "Archivo Figma entregado al cliente",
    ],
  },
  {
    id: 4,
    title: "Revisión de código",
    subtitle: "Frontend Audit",
    desc: "Auditoría de tu proyecto frontend: rendimiento, accesibilidad, buenas prácticas y mejoras.",
    longDesc: "Revisión completa de tu proyecto React o Next.js. Analizo el código en busca de problemas de rendimiento, accesibilidad, estructura de componentes y buenas prácticas. Entrego un informe detallado con las recomendaciones priorizadas y ejemplos de cómo mejorar cada punto.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
    tags: ["React", "Performance", "Accesibilidad", "Best Practices"],
    accent: "#5ecfa0",
    price: "€150",
    priceNote: "por auditoría",
    deliveryTime: "2–3 días",
    includes: [
      "Revisión de estructura de componentes",
      "Análisis de rendimiento (Lighthouse)",
      "Revisión de accesibilidad (WCAG)",
      "Detección de bugs y code smells",
      "Informe en PDF con recomendaciones",
      "Llamada de 30 min para resolver dudas",
    ],
  },
];
