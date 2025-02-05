import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0', // Membuat server bisa diakses dari luar
    port: 3000,       // Opsional, sesuaikan dengan port yang kamu inginkan
  }
})
