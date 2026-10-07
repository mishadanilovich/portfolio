import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    // По умолчанию node: контент-модель и layout-модуль сцены — чистая логика,
    // а инициализация jsdom занимает основное время прогона. Файлам с рендером
    // компонентов нужен докблок `// @vitest-environment jsdom` в первой строке.
    environment: 'node',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'scripts/**/*.{test,spec}.{ts,mts}'],
    css: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
