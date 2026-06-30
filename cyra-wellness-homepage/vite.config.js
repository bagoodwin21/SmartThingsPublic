import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves project repos at /<repo-name>/
  base: '/SmartThingsPublic/',
})
