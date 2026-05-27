import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/pitchr-client-guide-v2/',
  plugins: [react()],
});
