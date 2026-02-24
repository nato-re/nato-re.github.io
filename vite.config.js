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
      name: 'watch-slides',
      configureServer(server) {
        // Caminho absoluto para o manifesto na pasta public
        const manifestPath = path.resolve(__dirname, 'public/slides-manifest.json')
        
        // Força o Vite a observar este arquivo específico
        server.watcher.add(manifestPath)

        server.watcher.on('change', (file) => {
          if (file === manifestPath) {
            console.log('[Vite] Manifesto alterado, avisando cliente...')
            // Envia um evento customizado em vez de dar reload total
            server.ws.send({
              type: 'custom',
              event: 'manifest-changed',
              data: { updated: true }
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
