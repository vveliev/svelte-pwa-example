import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: [
        './src'
          ]
    }
  },
  optimizeDeps: {
    exclude: [
      '@inlang/paraglide-js/internal/adapter-utils',
      'clsx',
      'deepmerge',
      'intl-messageformat'
    ]
  }
});
