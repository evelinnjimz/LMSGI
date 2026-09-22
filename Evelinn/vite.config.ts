import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <─── 1. COMPRUEBA QUE ESTA LÍNEA ESTÉ AQUÍ

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <─── 2. ¡Y ESTA TAMBIÉN EN LA LISTA DE PLUGINS!
  ],
})