import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Other server options...

    // Enable polling for file changes
    watch: {
      usePolling: true,
    },
  },
});
