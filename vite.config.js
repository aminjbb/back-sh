import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],

  resolve: { mainFields: [
    'browser',
    'module',
    'main',
    'jsnext:main',
    'jsnext'
  ],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

})
