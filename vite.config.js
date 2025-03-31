import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     proxy: {
//       '/admin': {
//         target: (import.meta.env?.VITE_BASE_URL || "https://apilv.cricgiri.com"),
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/admin/,'')
//       }
//     }
//   }
// })


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())  
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/admin': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/admin/, ''),
        }
      }
    }
  }
})
