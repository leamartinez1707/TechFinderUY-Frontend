import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import obfuscator from 'vite-plugin-obfuscator'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    obfuscator({
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      debugProtection: true,
      disableConsoleOutput: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false, // 🔒 No genera archivos .map que revelan el código original
    minify: 'esbuild',
  },
})
