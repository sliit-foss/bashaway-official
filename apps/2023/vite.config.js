import { default as path } from 'path';
import { defineConfig } from 'vite';
import { default as react } from '@vitejs/plugin-react';

export default defineConfig(async () => {
  return {
    plugins: [react()],
    base: './',
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    }
  };
});
