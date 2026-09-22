// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col justify-center items-center p-4 font-sans antialiased">
      
      {/* Elemento decorativo de fondo (un sutil gradiente difuminado) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-[30%] left-[20%] w-[600px] h-[600px] bg-gradient-to-tr from-[#e879a0] to-[#c44569] rounded-full blur-[140px]"></div>
      </div>

      {/* Contenedor principal donde se renderizará el Login o el Register */}
      <div className="w-full max-w-sm relative z-10">
        <Outlet />
      </div>

      {/* Un pie de página muy discreto para la pantalla de login */}
      <footer className="mt-8 text-center relative z-10">
        <p className="text-[11px] tracking-widest text-slate-600 uppercase font-bold">
          © {new Date().getFullYear()} · Panel de Control Seguro
        </p>
      </footer>

    </div>
  );
}