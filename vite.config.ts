import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import fs from 'fs';

const excludeMsw = () => {
  return {
    name: 'exclude-msw',
    resolveId: (source: string) => {
      return source === 'virtual-module' ? source : null;
    },
    renderStart: (outputOptions) => {
      const mswScriptLocation = path.resolve(outputOptions.dir, 'mockServiceWorker.js');
      fs.rm(mswScriptLocation, () => console.log(`Removed ${mswScriptLocation}`));
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      insertTypesEntry: true
    }),
    excludeMsw()
  ],

  build: {
    minify: false,
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'index',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@clickhouse/click-ui'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'React-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
          '@clickhouse/click-ui': 'click-ui'
        }
      }
    }
  }
});
