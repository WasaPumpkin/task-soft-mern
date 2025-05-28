//vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // Import the plugin
import path from 'path'; // Import the path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // React plugin
    tsconfigPaths(), // Enable tsconfig paths resolution
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'), // Define the alias
      '@features': path.resolve(__dirname, './src/features'), // Define the alias
      '@img': path.resolve(__dirname, './src/img'), // Add this for image aliases
    },
  },
  css: {
    preprocessorOptions: {
      // Add any preprocessor options here if needed
    },
  },
});