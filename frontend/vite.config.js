import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // jsxInject: `import React from 'react';`, // Disable preamble detection
  // base: 'http://localhost:5173/',
  server:{
    proxy:{
      '/api':'http://localhost:3000',
    }
  },
  plugins: [react()],
});
