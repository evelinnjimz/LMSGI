import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { Inicio } from "../pages/inicio/Inicio"
import { SobreMi } from "../pages/sobremi/SobreMi"
import { Contacto } from "../pages/contacto/Contacto"
import { Servicios } from "../pages/servicios/Servicios"
import { Proyectos } from "../pages/proyectos/Proyectos"
import { Cursos } from "../pages/cursos/Cursos"
import { ProyectoDetalle } from "../pages/proyectos/ProyectoDetalle"
import { CursoDetalle } from "../pages/cursos/CursoDetalle"
import { ServicioDetalle } from "../pages/servicios/ServicioDetalle"
import { BackLayout } from "../layouts/BackLayout"
import { AdminInicio } from "../pages/admin/adminpages/AdminInicio" // 1. Importación añadida
import { AdminServicios } from "../pages/admin/adminpages/AdminServicios"
import { AdminProyectos } from "../pages/admin/adminpages/AdminProyectos"
import { AdminCursos } from "../pages/admin/adminpages/AdminCursos"
import { AuthLayout } from "../layouts/AuthLayout"
import { Login } from "../pages/auth/Login"
import { StoreProvider } from "../components/contexto/Contexto"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          {/* Rutas Públicas (Usuario) */}
          <Route element={<MainLayout />} >
            <Route path="/" element={<Inicio />} />
            <Route path="/sobremi" element={<SobreMi />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/cursos/:id" element={<CursoDetalle />} />
            <Route path="/servicios/:id" element={<ServicioDetalle />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Rutas Privadas (Panel de Administración) */}
          <Route path="/admin" element={<BackLayout />}>
            {/* 2. Ruta index añadida: Al entrar a /admin cargará AdminInicio en el Outlet */}
            <Route index element={<AdminInicio />} /> 
            
            <Route path="servicios" element={<AdminServicios />} />
            <Route path="proyectos" element={<AdminProyectos />} />
            <Route path="cursos" element={<AdminCursos />} />
          </Route>

          {/* Autenticación */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
          </Route>
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  )
}