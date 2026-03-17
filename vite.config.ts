import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'video-range-support',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.match(/\.(mp4|webm|ogg)$/)) return next()
          const filePath = path.join(__dirname, 'public', req.url)
          if (!fs.existsSync(filePath)) return next()

          const stat = fs.statSync(filePath)
          const fileSize = stat.size
          const range = req.headers.range

          if (range) {
            const parts = range.replace(/bytes=/, '').split('-')
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
            const chunkSize = end - start + 1
            const file = fs.createReadStream(filePath, { start, end })
            res.writeHead(206, {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunkSize,
              'Content-Type': 'video/mp4',
            })
            file.pipe(res)
          } else {
            res.writeHead(200, {
              'Content-Length': fileSize,
              'Content-Type': 'video/mp4',
              'Accept-Ranges': 'bytes',
            })
            fs.createReadStream(filePath).pipe(res)
          }
        })
      },
    },
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
