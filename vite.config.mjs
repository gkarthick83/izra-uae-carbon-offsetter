import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(async () => {
  const tailwindcss = (await import('tailwindcss')).default;
  const autoprefixer = (await import('autoprefixer')).default;

  return {
    build: { outDir: "build", chunkSizeWarningLimit: 2000 },
    plugins: [tsconfigPaths(), react()],
    server: {
      port: 3000,
      host: "0.0.0.0",
      strictPort: true,
      proxy: {
        // Proxy to our new MERN backend
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
        // Keep Supabase proxy for any remaining Supabase calls during transition
        '/auth/v1': {
          target: 'https://yxkelbllidfqazncwpzk.supabase.co',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth\/v1/, '/auth/v1')
        },
        '/rest/v1': {
          target: 'https://yxkelbllidfqazncwpzk.supabase.co',
          changeOrigin: true,
          headers: {
            'apikey': 'sb_publishable_B9RKcrKjg4kfeNQ-8zo79A_LwLUBn81'
          }
        }
      }
    },
    css: { postcss: { plugins: [tailwindcss, autoprefixer] } }
  };
});