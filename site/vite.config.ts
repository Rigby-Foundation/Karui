import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      { find: /^karui\/core$/, replacement: resolve(__dirname, '../src/core/index.ts') },
      { find: /^karui\/ssr$/, replacement: resolve(__dirname, '../src/ssr/index.ts') },
      { find: /^karui\/router\/file-based$/, replacement: resolve(__dirname, '../src/router/file-based.ts') },
      { find: /^karui\/router$/, replacement: resolve(__dirname, '../src/router/index.ts') },
      { find: /^karui\/jsx$/, replacement: resolve(__dirname, '../src/jsx/index.ts') },
      { find: /^karui\/jsx-runtime$/, replacement: resolve(__dirname, '../src/jsx/jsx-runtime.ts') },
      { find: /^karui\/jsx-dev-runtime$/, replacement: resolve(__dirname, '../src/jsx/jsx-dev-runtime.ts') },
      { find: /^karui$/, replacement: resolve(__dirname, '../src/index.ts') }
    ]
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'karui'
  },
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/app.tsx')
    }
  }
});
