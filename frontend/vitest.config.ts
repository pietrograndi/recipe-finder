// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['./tests/*.ts', '**/node_modules/**'],
  },
});
