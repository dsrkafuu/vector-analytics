import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgIcons from 'vite-plugin-svg-icons';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    vue({
      template: { compilerOptions: { compatConfig: { MODE: 2 } } },
    }),

    // svg spirit loader
    svgIcons({
      iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
      symbolId: 'icon-[name]',
    }),
  ],

  // project root
  root: path.resolve(__dirname, 'src'),

  // import alias
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // vue migration build
      vue: '@vue/compat',
    },
  },

  // css variable inject
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @import "@/scss/variables.scss";
        `,
      },
    },
  },

  // dev api server proxy
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3022',
        changeOrigin: true,
      },
    },
  },
});
