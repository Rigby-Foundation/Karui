import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@rigbyhost/karui/jsx-runtime': resolve(__dirname, 'src/jsx/jsx-runtime.ts'),
      '@rigbyhost/karui/jsx-dev-runtime': resolve(__dirname, 'src/jsx/jsx-dev-runtime.ts'),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@rigbyhost/karui',
  },
  build: {
    outDir: 'dist/ssr/client',
    emptyOutDir: true,
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/ssr/entry-client.ts'),
    },
  },
});
