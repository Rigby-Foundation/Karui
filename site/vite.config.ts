import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@rigbyhost\/karui\/core$/, replacement: resolve(__dirname, '../src/core/index.ts') },
      { find: /^@rigbyhost\/karui\/ssr$/, replacement: resolve(__dirname, '../src/ssr/index.ts') },
      { find: /^@rigbyhost\/karui\/router\/file-based$/, replacement: resolve(__dirname, '../src/router/file-based.ts') },
      { find: /^@rigbyhost\/karui\/router$/, replacement: resolve(__dirname, '../src/router/index.ts') },
      { find: /^@rigbyhost\/karui\/jsx$/, replacement: resolve(__dirname, '../src/jsx/index.ts') },
      { find: /^@rigbyhost\/karui\/jsx-runtime$/, replacement: resolve(__dirname, '../src/jsx/jsx-runtime.ts') },
      { find: /^@rigbyhost\/karui\/jsx-dev-runtime$/, replacement: resolve(__dirname, '../src/jsx/jsx-dev-runtime.ts') },
      { find: /^@rigbyhost\/karui$/, replacement: resolve(__dirname, '../src/index.ts') }
    ]
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@rigbyhost/karui'
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
