import { default as react } from '@vitejs/plugin-react';
import { default as tailwindcss } from '@tailwindcss/vite';
import { default as path } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(async () => {
  return {
    plugins: [react(), tailwindcss()],
    base: './',
    resolve: {
      alias: {
        '@/': `${path.resolve(import.meta.dirname, 'src')}/`
      }
    },
    optimizeDeps: {
      rolldownOptions: {
        transform: {
          define: {
            global: 'globalThis'
          }
        }
      }
    }
  };
});
