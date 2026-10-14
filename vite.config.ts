import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: { ignored: ['**/artifacts/**', '**/test-results/**', '**/playwright-report/**'] },
  },
  define: {
    __PROJECT_IMAGE_FILES__: JSON.stringify(
      existsSync('public/images/projects')
        ? readdirSync('public/images/projects').map((file) => `/images/projects/${file}`)
        : [],
    ),
    __PROFILE_IMAGE_EXISTS__: JSON.stringify(
      existsSync(fileURLToPath(new URL('./public/images/shaun-profile.jpg', import.meta.url))),
    ),
  },
})
