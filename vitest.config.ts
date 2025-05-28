import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      reporter: 'html',
      reportsDirectory: 'reports/coverage'
    },
    environment: 'jsdom',
    globals: true,
    server: {
      deps: {
        inline: ['@clickhouse/click-ui']
      }
    },
    setupFiles: 'vitest.setup.ts'
  }
});
