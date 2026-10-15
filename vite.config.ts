import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH and BUILD_ID are set by the GitHub Pages workflow.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  define: {
    __BUILD_ID__: JSON.stringify(process.env.BUILD_ID ?? 'local'),
  },
});
