import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const jsxRuntimeAlias = {
  '@rigbyhost/karui/jsx-runtime': resolve(__dirname, 'src/jsx/jsx-runtime.ts'),
  '@rigbyhost/karui/jsx-dev-runtime': resolve(__dirname, 'src/jsx/jsx-dev-runtime.ts'),
};

export default defineConfig({
  resolve: {
    alias: jsxRuntimeAlias,
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@rigbyhost/karui',
  },
  build: {
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Karui',
      formats: ['es', 'umd', 'iife'],
      fileName: (format) => `@rigbyhost/karui.${format}.js`,
    },
    outDir: 'dist/vite',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
