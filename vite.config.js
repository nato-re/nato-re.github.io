import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
{
      name: 'watch-slides-content',
      configureServer(server) {
        // Observa a pasta onde ficam os HTMLs dos slides
        const slidesPath = path.resolve(__dirname, 'public/slides')
        server.watcher.add(slidesPath)

        server.watcher.on('change', (file) => {
          const fileName = path.basename(file, '.html')
          console.log(`[Vite] Slide alterado: ${fileName}`)

          // Se o arquivo alterado for um HTML dentro da pasta de slides
          if (file.includes('dist/slides') && file.endsWith('.html')) {
            const fileName = path.basename(file, '.html')
            console.log(`[Vite] Slide alterado2: ${fileName}`)
            
            // Avisa o front-end qual slide mudou
            server.ws.send({
              type: 'custom',
              event: 'slide-content-update',
              data: { slideId: fileName }
            })
          }
        })
      }
    }
  ],
  base: '/',
  server: {
    watch: {
      ignored: ['node_modules/**']
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'images/[name][extname]'
          } else if (/\.css$/.test(name ?? '')) {
            return 'css/[name][extname]'
          }
          return '[name][extname]'
        }
      }
    }
  }
})
